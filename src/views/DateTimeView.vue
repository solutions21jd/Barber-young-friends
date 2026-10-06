<script setup>
import { computed } from 'vue'
import FlowLayout from '../components/FlowLayout.vue'
import { useBooking } from '../composables/useBooking'

const {
  state,
  barber,
  dateLabel,
  monthLabel,
  canPrevMonth,
  calendar,
  slots,
  selectDate,
  selectHour,
  shiftMonth,
} = useBooking()

const weekdays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

const groups = computed(() =>
  [
    { label: 'Mañana', slots: slots.value.filter((s) => s.hour < 14) },
    { label: 'Tarde', slots: slots.value.filter((s) => s.hour >= 14) },
  ].filter((g) => g.slots.length > 0),
)
</script>

<template>
  <FlowLayout :step="2" title="¿Cuándo vienes?">
    <div class="dt">
      <div class="panel">
        <div class="phead">
          <h2>{{ monthLabel }}</h2>
          <div class="mnav">
            <button type="button" class="mbtn" aria-label="Mes anterior" :disabled="!canPrevMonth" @click="shiftMonth(-1)">‹</button>
            <button type="button" class="mbtn" aria-label="Mes siguiente" @click="shiftMonth(1)">›</button>
          </div>
        </div>
        <div class="cal" role="group" aria-label="Día">
          <div v-for="n in weekdays" :key="n" class="dh">{{ n }}</div>
          <template v-for="(c, i) in calendar" :key="i">
            <span v-if="!c"></span>
            <button
              v-else
              type="button"
              :aria-pressed="state.date === c.iso"
              :disabled="c.closed"
              @click="selectDate(c.iso)"
            >
              {{ c.day }}
            </button>
          </template>
        </div>
      </div>

      <div class="panel">
        <h2>{{ barber.name }} · {{ dateLabel }}</h2>
        <div v-for="g in groups" :key="g.label" class="slotgroup">
          <span class="lbl">{{ g.label }}</span>
          <div class="slots" role="group" :aria-label="g.label">
            <button
              v-for="s in g.slots"
              :key="s.hour"
              type="button"
              class="slot"
              :aria-pressed="state.hour === s.hour"
              :disabled="s.taken"
              :aria-label="s.taken ? `${s.label} ocupado` : s.label"
              @click="selectHour(s.hour)"
            >
              {{ s.label }}
            </button>
          </div>
        </div>
        <p v-if="!groups.length" class="note">{{ barber.name }} no atiende este día.</p>
        <div class="legend">
          <span><i class="a"></i>Libre</span>
          <span><i class="t"></i>Ocupado</span>
        </div>
      </div>
    </div>

    <template #actions>
      <RouterLink class="btn ghost" to="/agendar/servicio">Atrás</RouterLink>
      <RouterLink class="btn" to="/agendar/confirmar">Continuar</RouterLink>
    </template>
  </FlowLayout>
</template>

<style scoped>
.dt {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  gap: 22px;
}
.panel {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 16px;
  min-width: 0;
}
h2 {
  margin: 0 0 12px;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--muted);
}
.phead {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}
.phead h2 {
  margin: 0;
}
.mnav {
  display: flex;
  gap: 6px;
}
.mbtn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid var(--line);
  background: transparent;
  font-size: 18px;
  line-height: 1;
  padding: 0;
}
.mbtn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.cal {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 6px;
}
.dh {
  font-family: var(--font-mono);
  font-size: 11px;
  text-align: center;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding-bottom: 4px;
}
.cal button {
  aspect-ratio: 1;
  max-height: 56px;
  width: 100%;
  border-radius: 10px;
  border: 1px solid var(--line);
  background: transparent;
  font-weight: 700;
  font-size: 15px;
  padding: 0;
}
.cal button[aria-pressed='true'],
.slot[aria-pressed='true'] {
  background: var(--spray);
  border-color: var(--spray);
  color: var(--on-spray);
}
.cal button:disabled {
  border-color: transparent;
  color: var(--muted);
  opacity: 0.5;
  cursor: not-allowed;
}

.slotgroup {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 14px;
}
.lbl {
  font-family: var(--font-mono);
  font-size: 11.5px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--muted);
}
.slots {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 6px;
}
.slot {
  padding: 10px 0;
  min-width: 0;
  border-radius: 10px;
  border: 1px solid var(--line);
  background: transparent;
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 14px;
  text-align: center;
}
.slot:disabled {
  border-style: dashed;
  color: var(--muted);
  text-decoration: line-through;
  cursor: not-allowed;
  opacity: 0.8;
}
.legend {
  display: flex;
  gap: 16px;
  font-size: 12.5px;
  color: var(--muted);
  margin-top: 14px;
}
.legend span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.legend i {
  width: 12px;
  height: 12px;
  border-radius: 3px;
  display: inline-block;
}
.legend .a {
  background: var(--spray);
}
.legend .t {
  border: 1px dashed var(--muted);
}

@media (max-width: 900px) {
  .dt {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 520px) {
  .slots {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
