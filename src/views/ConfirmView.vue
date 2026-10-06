<script setup>
import FlowLayout from '../components/FlowLayout.vue'
import { useBooking } from '../composables/useBooking'

const { state, barber, dateLabel, hourLabel, canConfirm, confirmBooking, cancelBooking } = useBooking()
</script>

<template>
  <FlowLayout :step="3" title="Revisa tu cita" subtitle="Déjanos tus datos para avisarte si hay algún cambio.">
    <form class="form" @submit.prevent>
      <div class="field">
        <label for="f-name">Nombre</label>
        <input id="f-name" v-model="state.name" type="text" autocomplete="name" placeholder="Tu nombre" />
      </div>
      <div class="field">
        <label for="f-phone">WhatsApp</label>
        <input id="f-phone" v-model="state.phone" type="tel" autocomplete="tel" placeholder="55 0000 0000" />
      </div>
      <div class="field full">
        <label for="f-note">Notas para el barbero (opcional)</label>
        <textarea
          id="f-note"
          v-model="state.notes"
          placeholder="Por ejemplo: corte como la foto que te mando, o barba solo perfilada."
        ></textarea>
      </div>
      <!--<div class="field full">
        <div class="sw">
          <span id="remlbl">Recordarme por WhatsApp una hora antes</span>
          <button
            class="switch"
            type="button"
            role="switch"
            aria-labelledby="remlbl"
            :aria-checked="state.remind"
            @click="state.remind = !state.remind"
          ></button>
        </div>
      </div>-->
    </form>

    <div v-if="state.confirmed" class="ok" role="status" aria-live="polite">
      <b>Cita agendada</b>
      {{ state.name.trim() ? `${state.name.trim()}, te` : 'Te' }} esperamos el {{ dateLabel }} a las
      {{ hourLabel }} con {{ barber.name }}.
    </div>

    <template #actions>
      <RouterLink class="btn ghost" to="/agendar/horario">Cambiar horario</RouterLink>
    </template>

    <template #side>
      <button v-if="!state.confirmed" class="btn spray" type="button" :disabled="!canConfirm" @click="confirmBooking">
        Confirmar cita
      </button>
      <button v-else class="btn spray" type="button" @click="cancelBooking">Cancelar cita</button>
      <p class="note">Puedes cancelar o cambiar tu cita hasta 2 horas antes.</p>
    </template>
  </FlowLayout>
</template>

<style scoped>
.form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}
.field.full {
  grid-column: 1 / -1;
}
label {
  font-weight: 700;
  font-size: 14px;
}
input,
textarea {
  width: 100%;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 12px 14px;
  font-size: 15px;
}
textarea {
  min-height: 92px;
  resize: vertical;
}
input::placeholder,
textarea::placeholder {
  color: var(--muted);
}
.sw {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-weight: 600;
  font-size: 14px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 12px 14px;
}
.switch {
  width: 46px;
  height: 28px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: var(--bg);
  position: relative;
  padding: 0;
  flex: none;
}
.switch::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--muted);
  transition:
    transform 0.15s,
    background 0.15s;
}
.switch[aria-checked='true'] {
  background: var(--spray);
  border-color: var(--spray);
}
.switch[aria-checked='true']::after {
  transform: translateX(18px);
  background: var(--on-spray);
}
.ok {
  background: var(--solid);
  color: var(--on-solid);
  border-radius: 12px;
  padding: 14px 16px;
}
.ok b {
  display: block;
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 24px;
  line-height: 1.1;
  margin-bottom: 2px;
}
@media (max-width: 900px) {
  .form {
    grid-template-columns: 1fr;
  }
}
</style>
