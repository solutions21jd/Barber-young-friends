<script setup>
import logo from '../assets/logo.jpg'
import icono from '../assets/icono.jpg'
</script>

<template>
  <header class="nav">
    <div class="inner">
      <RouterLink to="/" class="brand">
        <span class="lg"><img :src="icono" alt="" /></span>
        <b>Young Friends</b>
      </RouterLink>
      <nav class="links" aria-label="Principal">
        <RouterLink class="link" to="/">Inicio</RouterLink>
        <RouterLink class="link" to="/agendar/barbero">Barberos</RouterLink>
        <RouterLink class="link" to="/agendar/servicio">Servicios</RouterLink>
        <RouterLink class="btn sm" to="/agendar/barbero">Agendar cita</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav {
  background: var(--surface);
  border-bottom: 1px solid var(--line);
}
.inner {
  max-width: 1240px;
  margin-inline: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 28px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  text-decoration: none;
}
.lg {
  width: 54px;
  height: 46px;
  border-radius: 8px;
  background: var(--logo-ground);
  display: grid;
  place-items: center;
  overflow: hidden;
  flex: none;
}
.lg img {
  height: 50px;
  width: auto;
  display: block;
}
.brand b {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 20px;
  line-height: 1;
}
.links {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.link {
  padding: 8px 12px;
  font-weight: 600;
  font-size: 14px;
  color: var(--muted);
  text-decoration: none;
}
.link:hover {
  color: var(--fg);
}
.link[aria-current='page'] {
  color: var(--fg);
  box-shadow: inset 0 -3px 0 var(--spray);
}

@media (max-width: 900px) {
  .inner {
    padding-inline: 16px;
  }
  .link {
    display: none;
  }
}
@media (max-width: 520px) {
  .brand b {
    font-size: 17px;
  }
}
</style>
