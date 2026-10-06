<script setup>
defineProps({
  current: { type: Number, required: true }, // 0 a 3
})

const steps = [
  { label: 'Barbero', to: '/agendar/barbero' },
  { label: 'Servicio', to: '/agendar/servicio' },
  { label: 'Fecha y hora', to: '/agendar/horario' },
  { label: 'Confirmación', to: '/agendar/confirmar' },
]
</script>

<template>
  <ol class="steps">
    <li v-for="(s, i) in steps" :key="s.to" :class="{ on: i === current, done: i < current }">
      <RouterLink :to="s.to">
        <i></i>
        <span>{{ i + 1 }} · {{ s.label }}</span>
      </RouterLink>
    </li>
  </ol>
</template>

<style scoped>
.steps {
  list-style: none;
  margin: 0;
  padding: 18px 28px 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}
a {
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-decoration: none;
}
i {
  height: 4px;
  border-radius: 2px;
  background: var(--line);
  display: block;
}
.on i,
.done i {
  background: var(--spray);
}
span {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--muted);
}
.on span {
  color: var(--fg);
  font-weight: 600;
}
@media (max-width: 900px) {
  .steps {
    padding-inline: 16px;
  }
}
@media (max-width: 520px) {
  span {
    font-size: 10.5px;
  }
}
</style>
