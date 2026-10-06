<script setup>
import FlowLayout from '../components/FlowLayout.vue'
import { useBooking } from '../composables/useBooking'

const { services, state, selectService, formatMoney } = useBooking()
</script>

<template>
  <FlowLayout
    :step="1"
    title="¿Qué te hacemos?"
    subtitle="El precio es el que pagas en la barbería. No se cobra nada al reservar."
  >
    <div class="grid2">
      <button
        v-for="s in services"
        :key="s.id"
        class="card"
        type="button"
        :aria-pressed="state.serviceId === s.id"
        @click="selectService(s.id)"
      >
        <span class="row">
          <span class="name">{{ s.name }}</span>
          <span class="price">{{ formatMoney(s.price) }}</span>
        </span>
        <span class="meta">{{ s.desc }}</span>
        <span class="free">{{ s.min }} min</span>
      </button>
    </div>

    <template #actions>
      <RouterLink class="btn ghost" to="/agendar/barbero">Atrás</RouterLink>
      <RouterLink class="btn" to="/agendar/horario">Continuar</RouterLink>
    </template>
  </FlowLayout>
</template>
