<script setup>
import BarberAvatar from './BarberAvatar.vue'
import { useBooking } from '../composables/useBooking'

const { barber, service, dateLabel, hourLabel, price } = useBooking()
</script>

<template>
  <aside class="side" aria-label="Resumen de tu cita">
    <h3>Tu cita</h3>
    <div class="who">
      <BarberAvatar :name="barber.name" />
      <span>
        <b>{{ barber.name }}</b>
        <small>{{ barber.role }}</small>
      </span>
    </div>
    <dl>
      <div><dt>Servicio</dt><dd>{{ service.name }}</dd></div>
      <div><dt>Día</dt><dd>{{ dateLabel }}</dd></div>
      <div><dt>Hora</dt><dd>{{ hourLabel }}</dd></div>
      <div><dt>Duración</dt><dd>{{ service.min }} min</dd></div>
      <div class="tot"><dt>Total</dt><dd>{{ price }}</dd></div>
    </dl>
    <!-- Cada pantalla puede poner aquí su propio botón o aviso. -->
    <slot>
      <p class="note">Pagas en la barbería al terminar tu servicio.</p>
    </slot>
  </aside>
</template>

<style scoped>
.side {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 0;
  align-self: start;
}
h3 {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--muted);
}
.who {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}
.who b {
  display: block;
  font-size: 17px;
  line-height: 1.2;
}
.who small {
  color: var(--muted);
  font-size: 13px;
}
dl {
  margin: 0;
}
dl div {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 9px 0;
  border-top: 1px solid var(--line);
  font-size: 14px;
}
dt {
  color: var(--muted);
}
dd {
  margin: 0;
  font-weight: 700;
  text-align: right;
  min-width: 0;
}
.tot dd {
  font-family: var(--font-mono);
  font-size: 20px;
}
</style>
