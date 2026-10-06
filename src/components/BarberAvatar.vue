<script setup>
defineProps({
  name: { type: String, required: true },
  size: { type: String, default: 'md' }, // 'md' | 'lg'
})
</script>

<template>
  <span class="avatar" :class="size">{{ name.charAt(0) }}</span>
</template>

<style scoped>
.avatar {
  width: 48px;
  height: 48px;
  flex: none;
  display: grid;
  place-items: center;
  background: var(--spray);
  color: var(--on-spray);
  border-radius: 58% 42% 55% 45% / 48% 56% 44% 52%;
  font-family: var(--font-display);
  font-size: 24px;
  line-height: 1;
}
.avatar.lg {
  width: 72px;
  height: 72px;
  font-size: 36px;
}
</style>
