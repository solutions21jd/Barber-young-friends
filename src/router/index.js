import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BarberView from '../views/BarberView.vue'
import ServiceView from '../views/ServiceView.vue'
import DateTimeView from '../views/DateTimeView.vue'
import ConfirmView from '../views/ConfirmView.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'inicio', component: HomeView },
    { path: '/agendar/barbero', name: 'barbero', component: BarberView },
    { path: '/agendar/servicio', name: 'servicio', component: ServiceView },
    { path: '/agendar/horario', name: 'horario', component: DateTimeView },
    { path: '/agendar/confirmar', name: 'confirmar', component: ConfirmView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
