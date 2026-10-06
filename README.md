# Young Friends Barber Style · App de citas

Front-end en Vue 3 + Vite + Vue Router. Hoy usa datos de ejemplo.

## Cómo correrlo

```bash
npm install
npm run dev
```

Se abre en `http://localhost:5173`. Para generar la versión de producción: `npm run build`.

## Estructura

```
src/
  assets/logo.jpg            Logo de la barbería
  styles/tokens.css          Colores y fuentes (las variables del diseño)
  styles/base.css            Botones, tarjetas y estilos compartidos
  data/mock.js               Barberos, servicios, horarios y horarios ocupados de ejemplo
  composables/useBooking.js  Estado de la cita en curso (barbero, servicio, día, hora, datos)
  router/index.js            Rutas de las 5 pantallas
  components/                SiteNav, StepBar, SummaryCard, FlowLayout, BarberAvatar
  views/                     HomeView, BarberView, ServiceView, DateTimeView, ConfirmView
```

## Rutas

| Ruta                 | Pantalla          |
| -------------------- | ----------------- |
| `/`                  | Inicio            |
| `/agendar/barbero`   | 1 · Barbero       |
| `/agendar/servicio`  | 2 · Servicio      |
| `/agendar/horario`   | 3 · Fecha y hora  |
| `/agendar/confirmar` | 4 · Confirmación  |

## Dónde se conecta la lógica

- `src/data/mock.js`: `BARBERS`, `SERVICES` y `isTaken()` se reemplazan por llamadas a la API.
- `src/composables/useBooking.js`: `confirmBooking()` es donde va el envío de la cita al servidor.
  También ahí están `slotTaken()` y `firstFree()`, que deciden qué horarios se ven libres.

## Cambiar el diseño

Los colores y las tipografías están en `src/styles/tokens.css`. El acento del logo es `--spray`.
