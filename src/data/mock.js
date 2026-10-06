// Datos de ejemplo. Cuando exista el backend, estas listas y la función
// isTaken() se reemplazan por llamadas a la API (barberos, servicios y
// horarios ocupados de cada barbero).

export const BARBERS = [
  { id: 'landin', name: 'Landin', role: 'Fade y diseños', desc: 'Degradados limpios y diseños con navaja.' },
  { id: 'alondra', name: 'Alondra', role: 'Clásico y barba', desc: 'Corte de tijera y barba perfilada.' },
  { id: 'beni', name: 'Beni', role: 'Degradados', desc: 'Skin fade, taper y texturas.' },
  { id: 'jesus', name: 'Jesús', role: 'Niños y jóvenes', desc: 'Paciencia y buen ojo para los más chicos.' },
  { id: 'yael', name: 'Yael', role: 'Niños y jóvenes', desc: 'Paciencia y buen ojo para los más chicos.' },
]

export const SERVICES = [
  { id: 'clasico', name: 'Corte clásico', min: 30, price: 100, desc: 'Tijera o máquina, con lavado y peinado.' },
  { id: 'corte-barba', name: 'Corte y barba', min: 50, price: 200, desc: 'Corte completo y barba perfilada con toalla caliente.' },
  { id: 'barba', name: 'Barba', min: 20, price: 100, desc: 'Perfilado y arreglo de barba.' },
  { id: 'fade', name: 'Fade con diseño', min: 60, price: 250, desc: 'Degradado y diseño hecho a navaja.' },
  { id: 'nino', name: 'Corte niño', min: 30, price: 80, desc: 'Para menores de 12 años.' },
  { id: 'greca', name: 'Greca sencilla', min: 30, price: 50, desc: 'Perfilado de ceja.' },
  { id: 'contorno', name: 'Contorno', min: 30, price: 40, desc: 'Delimita tu contorno.' },
]

// ---------------------------------------------------------------------------
// HORARIOS (aquí personalizas la agenda de cada barbero)
//
// Semana: 0 = domingo, 1 = lunes ... 6 = sábado.
// Cada día es { from, to, skip? } o null si ese día no trabaja:
//   from -> hora de la primera cita
//   to   -> hora de cierre (la última cita empieza a las to - 1)
//   skip -> (opcional) horas sin citas, por ejemplo la comida: [14]
// ---------------------------------------------------------------------------

// Horario base: lo usan todos los barberos que no lo cambien abajo.
export const DEFAULT_WEEK = {
  0: { from: 10, to: 19 },
  1: { from: 10, to: 19 },
  2: { from: 10, to: 19 },
  3: { from: 10, to: 19 },
  4: { from: 10, to: 19 },
  5: { from: 10, to: 19 },
  6: { from: 10, to: 19 },
  
}

// Cambios por barbero. Solo escribe los días que sean distintos al horario base.
export const SCHEDULES = {
  landin: {
    0: { from: 11, to: 19 },
    1: { from: 11, to: 19 },
    2: { from: 11, to: 19 },
    3: { from: 11, to: 19 },
    4: { from: 11, to: 19 },
    5: { from: 11, to: 19 },
    6: { from: 11, to: 19 },
  },
  alondra: {
    0: { from: 13, to: 19 },
    1: { from: 13, to: 19 },
    2: { from: 13, to: 19 },
    3: { from: 13, to: 19 },
    4: { from: 13, to: 19 },
    5: { from: 13, to: 19 },
    6: { from: 13, to: 19 },
  },
   beni: {
    0: { from: 10, to: 17 },
    1: { from: 10, to: 17 },
    2: { from: 10, to: 17 },
    3: { from: 10, to: 17 },
    4: { from: 10, to: 17 },
    5: { from: 10, to: 17 },
    6: { from: 10, to: 17 },
  },
  jesus: {
    0: { from: 10, to: 17 },
    1: { from: 10, to: 17 },
    2: { from: 10, to: 17 },
    3: { from: 10, to: 17 },
    4: { from: 10, to: 17 },
    5: { from: 10, to: 17 },
    6: { from: 10, to: 17 },
  },
  yael: {
    0: { from: 15, to: 19 },
    1: { from: 15, to: 19 },
    2: { from: 15, to: 19 },
    3: { from: 15, to: 19 },
    4: { from: 15, to: 19 },
    5: { from: 15, to: 19 },
    6: { from: 15, to: 19 },
  },
  // Ejemplos (quita el // para probarlos):
  //alondra: { 3: null, 6: { from: 9, to: 10 } },        // no trabaja miércoles; sábado 9 a 14
  //beni: { 1: { from: 10, to: 19, skip: [14, 15] } },   // lunes con comida de 14 a 16
}

// Días sueltos en que un barbero no trabaja (vacaciones, permisos...). Formato 'YYYY-MM-DD'.
export const DAYS_OFF = {
  // beni: ['2026-10-12', '2026-10-13'],
}

// Horas en que el barbero atiende ese día (lista vacía = no trabaja).
export function getHours(barberId, iso) {
  if (DAYS_OFF[barberId]?.includes(iso)) return []
  const [y, m, d] = iso.split('-').map(Number)
  const weekday = new Date(y, m - 1, d).getDay()
  const day = { ...DEFAULT_WEEK, ...SCHEDULES[barberId] }[weekday]
  if (!day) return []
  const hours = []
  for (let h = day.from; h < day.to; h++) {
    if (!day.skip?.includes(h)) hours.push(h)
  }
  return hours
}

// Citas agendadas por barbero y día. Empieza vacío: nada se marca como
// ocupado hasta que una cita se agende de verdad.
// Formato: { [barberId]: { [iso 'YYYY-MM-DD']: [horas ocupadas] } }
const bookings = {
   //landin: { '2026-10-05': [10, 11] },
}

export function isTaken(barberId, iso, hour) {
  return bookings[barberId]?.[iso]?.includes(hour) ?? false
}

// Llamar al confirmar una cita (luego se cambia por la llamada a la API).
export function book(barberId, iso, hour) {
  bookings[barberId] ??= {}
  bookings[barberId][iso] ??= []
  if (!bookings[barberId][iso].includes(hour)) {
    bookings[barberId][iso].push(hour)
  }
}