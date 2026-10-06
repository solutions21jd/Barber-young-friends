<script setup>
import logo from '../assets/logo.jpg'
import BarberAvatar from '../components/BarberAvatar.vue'
import { useBooking } from '../composables/useBooking'

const { barbers, services, firstOpenISO, firstFree, hourText, formatMoney, dayLabel } = useBooking()
</script>

<template>
  <section class="hero">
    <div>
      <h1>Tu corte, a tu hora y con tu barbero.</h1>
      <!--<p>Elige con quién te quieres cortar, escoge el servicio y reserva tu horario en menos de un minuto.</p>-->
      <div class="cta">
        <RouterLink class="btn spray" to="/agendar/barbero">Agendar cita</RouterLink>
        <RouterLink class="btn ghost" to="/agendar/servicio">Ver servicios</RouterLink>
      </div>
      <div class="hrs">
        <span><b>Lun a Dom</b> 10:00 a 19:00</span>
        <!--<span><b>Domingo</b> cerrado</span>-->
      </div>
    </div>
    <div class="biglogo"><img :src="logo" alt="Young Friends Barber Style" /></div>
  </section>

  <section class="sec">
    <div class="sh">
      <h2>Primer horario libre</h2>
      <span>Para el {{ dayLabel(firstOpenISO) }}</span>
    </div>
    <div class="grid4">
      <div v-for="b in barbers" :key="b.id" class="mini">
        <BarberAvatar :name="b.name" size="lg" />
        <b>{{ b.name }}</b>
        <small>{{ b.role }}</small>
        <span class="free">
          {{ firstFree(b.id, firstOpenISO) === null ? 'Sin horario' : hourText(firstFree(b.id, firstOpenISO)) }}
        </span>
      </div>
    </div>
  </section>

  <section class="sec">
    <div class="sh"><h2>Servicios y precios</h2></div>
    <div class="price-list">
      <div v-for="s in services" :key="s.id">
        <b>{{ s.name }}</b>
        <small>{{ s.min }} min</small>
        <span>{{ formatMoney(s.price) }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  gap: 36px;
  align-items: center;
  padding: 40px 28px 28px;
}
h1 {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(34px, 5vw, 60px);
  line-height: 1;
  margin: 0 0 14px;
  text-wrap: balance;
}
.hero p {
  margin: 0 0 22px;
  color: var(--muted);
  font-size: 17px;
  max-width: 48ch;
}
.cta {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 22px;
}
.hrs {
  display: flex;
  gap: 22px;
  flex-wrap: wrap;
  font-size: 14px;
  color: var(--muted);
}
.hrs b {
  color: var(--fg);
}
.biglogo {
  background: var(--logo-ground);
  border-radius: 20px;
  display: grid;
  place-items: center;
  padding: 14px;
}
.biglogo img {
  width: 100%;
  max-width: 380px;
  height: auto;
  display: block;
  border-radius: 12px;
}

.sec {
  padding: 8px 28px 28px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
h2 {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 26px;
}
.sh {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}
.sh span {
  font-size: 13.5px;
  color: var(--muted);
}
.grid4 {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 14px;
}
.mini {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  text-align: center;
  min-width: 0;
}
.mini b {
  font-size: 16px;
}
.mini small {
  color: var(--muted);
  font-size: 12.5px;
}
.free {
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 13px;
  background: var(--spray);
  color: var(--on-spray);
  border-radius: 999px;
  padding: 3px 12px;
  margin-top: 4px;
}
.price-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 36px;
}
.price-list div {
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding: 12px 0;
  border-bottom: 1px solid var(--line);
  min-width: 0;
}
.price-list b {
  font-size: 16px;
}
.price-list small {
  color: var(--muted);
  flex: 1;
  min-width: 0;
}
.price-list span {
  font-family: var(--font-mono);
  font-weight: 600;
}

@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
    padding-inline: 16px;
  }
  .sec {
    padding-inline: 16px;
  }
  .grid4 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .price-list {
    grid-template-columns: 1fr;
  }
  .biglogo {
    max-width: 340px;
  }
}
</style>
