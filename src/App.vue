<script setup>
import SiteNav from './components/SiteNav.vue'
</script>

<template>
  <SiteNav />
  <main class="page">
    <RouterView />
  </main>
  <footer class="foot">
    <span>
     <a href="https://www.google.com/maps/place/20%C2%B039'52.8%22N+100%C2%B024'51.1%22W/@20.664659,-100.4167609,17z/data=!3m1!4b1!4m4!3m3!8m2!3d20.664654!4d-100.414186?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D">Ubicación</a>
    </span>
    <span>WhatsApp 55 0000 0000 </span>
  </footer>
</template>

<style scoped>
.page {
  max-width: 1240px;
  margin-inline: auto;
}
.foot {
  max-width: 1240px;
  margin-inline: auto;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  padding: 18px 28px;
  border-top: 1px solid var(--line);
  font-size: 13px;
  color: var(--muted);
}
@media (max-width: 900px) {
  .foot {
    padding-inline: 16px;
  }
}
</style>
