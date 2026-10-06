<script setup>
import StepBar from './StepBar.vue'
import SummaryCard from './SummaryCard.vue'

defineProps({
  step: { type: Number, required: true }, // 0 a 3
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
})
</script>

<template>
  <StepBar :current="step" />
  <div class="flow">
    <section class="main">
      <h1 class="title">{{ title }}</h1>
      <p v-if="subtitle" class="sub">{{ subtitle }}</p>
      <slot />
      <div class="actions">
        <slot name="actions" />
      </div>
    </section>
    <SummaryCard>
      <slot name="side" />
    </SummaryCard>
  </div>
</template>

<style scoped>
.flow {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 32px;
  padding: 24px 28px 40px;
  align-items: start;
}
.main {
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-width: 0;
}
.title {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(28px, 3.4vw, 40px);
  line-height: 1.05;
  margin: 0;
  text-wrap: balance;
}
.sub {
  margin: -8px 0 0;
  color: var(--muted);
  max-width: 60ch;
}
.actions {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-top: 6px;
}
@media (max-width: 900px) {
  .flow {
    grid-template-columns: 1fr;
    padding-inline: 16px;
  }
}
</style>
