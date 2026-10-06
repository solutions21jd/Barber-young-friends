import { reactive, computed } from 'vue'
import { BARBERS, SERVICES, getHours, isTaken } from '../data/mock'

const pad = (n) => String(n).padStart(2, '0')
const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 })

export const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
export const fromISO = (iso) => {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}
const startOfToday = () => {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}
// Cerrado: días pasados. Los días libres de cada barbero salen de su horario.
export const isClosed = (d) => d < startOfToday()

// Primer día en que al menos un barbero atiende.
function nextOpenDay() {
  const d = startOfToday()
  while (isClosed(d) || BARBERS.every((b) => getHours(b.id, toISO(d)).length === 0)) {
    d.setDate(d.getDate() + 1)
  }
  return d
}

function slotTaken(barberId, iso, hour) {
  const now = new Date()
  if (iso === toISO(now) && hour <= now.getHours()) return true
  return isTaken(barberId, iso, hour)
}

function firstFree(barberId, iso) {
  return getHours(barberId, iso).find((h) => !slotTaken(barberId, iso, h)) ?? null
}

const firstOpen = nextOpenDay()

// Estado compartido por todas las pantallas (un solo objeto para toda la app).
const state = reactive({
  barberId: BARBERS[1].id,
  serviceId: SERVICES[1].id,
  date: toISO(firstOpen),
  hour: null,
  month: new Date(firstOpen.getFullYear(), firstOpen.getMonth(), 1),
  name: '',
  phone: '',
  notes: '',
  remind: true,
  confirmed: false,
})

// Mantiene la hora elegida válida cuando cambia el barbero o el día.
function ensureHour() {
  if (state.hour !== null && !slotTaken(state.barberId, state.date, state.hour)) return
  state.hour = firstFree(state.barberId, state.date)
}
state.hour = firstFree(state.barberId, state.date)

const barber = computed(() => BARBERS.find((b) => b.id === state.barberId))
const service = computed(() => SERVICES.find((s) => s.id === state.serviceId))
const dateLabel = computed(() =>
  fromISO(state.date).toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' }),
)
const hourLabel = computed(() => (state.hour === null ? 'Sin horario libre' : `${pad(state.hour)}:00`))
const price = computed(() => money.format(service.value.price))
const canConfirm = computed(() => state.hour !== null)

const monthLabel = computed(() => {
  const label = state.month.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })
  return label.charAt(0).toUpperCase() + label.slice(1)
})
const canPrevMonth = computed(() => {
  const cur = new Date(firstOpen.getFullYear(), firstOpen.getMonth(), 1)
  return state.month > cur
})

// Celdas del calendario, semana de lunes a domingo. null = espacio vacío.
const calendar = computed(() => {
  const y = state.month.getFullYear()
  const m = state.month.getMonth()
  const lead = (new Date(y, m, 1).getDay() + 6) % 7
  const count = new Date(y, m + 1, 0).getDate()
  const cells = Array.from({ length: lead }, () => null)
  for (let day = 1; day <= count; day++) {
    const date = new Date(y, m, day)
    const iso = toISO(date)
    cells.push({ day, iso, closed: isClosed(date) || getHours(state.barberId, iso).length === 0 })
  }
  return cells
})

const slots = computed(() =>
  getHours(state.barberId, state.date).map((h) => ({
    hour: h,
    label: `${pad(h)}:00`,
    taken: slotTaken(state.barberId, state.date, h),
  })),
)

// Primer día (desde iso, hasta 60 días) en que el barbero tiene un horario libre.
function nextFreeDate(barberId, iso) {
  const d = fromISO(iso)
  for (let i = 0; i < 60; i++) {
    if (!isClosed(d) && firstFree(barberId, toISO(d)) !== null) return toISO(d)
    d.setDate(d.getDate() + 1)
  }
  return null
}

function selectBarber(id) {
  state.barberId = id
  state.confirmed = false
  // Si el barbero no atiende el día elegido, salta a su próximo día disponible.
  if (firstFree(id, state.date) === null) {
    const next = nextFreeDate(id, state.date)
    if (next) {
      state.date = next
      const d = fromISO(next)
      state.month = new Date(d.getFullYear(), d.getMonth(), 1)
    }
  }
  ensureHour()
}
function selectService(id) {
  state.serviceId = id
  state.confirmed = false
}
function selectDate(iso) {
  state.date = iso
  state.confirmed = false
  ensureHour()
}
function selectHour(hour) {
  state.hour = hour
  state.confirmed = false
}
function shiftMonth(delta) {
  state.month = new Date(state.month.getFullYear(), state.month.getMonth() + delta, 1)
}

// Aquí va el POST al backend para crear la cita.
function confirmBooking() {
  if (!canConfirm.value) return
  state.confirmed = true
}
function cancelBooking() {
  state.confirmed = false
}

export function useBooking() {
  return {
    barbers: BARBERS,
    services: SERVICES,
    state,
    barber,
    service,
    dateLabel,
    hourLabel,
    price,
    canConfirm,
    monthLabel,
    canPrevMonth,
    calendar,
    slots,
    firstOpenISO: toISO(firstOpen),
    firstFree,
    formatMoney: (n) => money.format(n),
    hourText: (h) => `${pad(h)}:00`,
    dayLabel: (iso) => fromISO(iso).toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' }),
    selectBarber,
    selectService,
    selectDate,
    selectHour,
    shiftMonth,
    confirmBooking,
    cancelBooking,
  }
}
