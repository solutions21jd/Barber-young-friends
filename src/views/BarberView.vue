<script setup>
import FlowLayout from '../components/FlowLayout.vue'
import BarberAvatar from '../components/BarberAvatar.vue'
import { useBooking } from '../composables/useBooking'

const { barbers, state, selectBarber, firstFree, hourText } = useBooking()

function freeText(id) {
  const h = firstFree(id, state.date)
  const day = Number(state.date.slice(8))
  return h === null ? `Sin horarios el día ${day}` : `Libre el día ${day} a las ${hourText(h)}`
}
</script>

<template>
  <FlowLayout
    :step="0"
    title="¿Con quién te cortas?"
    subtitle="Cada barbero tiene su propia agenda. Puedes cambiar de barbero y ver sus horarios libres en el paso 3."
  >
    <div class="grid2">
      <button
        v-for="b in barbers"
        :key="b.id"
        class="card"
        type="button"
        :aria-pressed="state.barberId === b.id"
        @click="selectBarber(b.id)"
      >
        <span class="top">
          <BarberAvatar :name="b.name" size="lg" />
          <span>
            <span class="name">{{ b.name }}</span><br />
            <span class="meta">{{ b.role }}</span>
          </span>
        </span>
        <span class="meta">{{ b.desc }}</span>
        <span class="free">{{ freeText(b.id) }}</span>
      </button>
    </div>

    <template #actions>
      <RouterLink class="btn ghost" to="/">Volver al inicio</RouterLink>
      <RouterLink class="btn" to="/agendar/servicio">Continuar</RouterLink>
    </template>
  </FlowLayout>
</template>
