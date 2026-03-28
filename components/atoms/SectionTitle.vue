<script setup>
defineProps({
  eyebrow: { type: String, default: null },
  centered: { type: Boolean, default: false },
  light: { type: Boolean, default: false },
  titleId: { type: String, default: null },
})
</script>

<template>
  <div :class="['space-y-3', { 'text-center': centered }]">
    <span
      v-if="eyebrow"
      class="inline-block text-xs font-semibold tracking-widest uppercase rounded-full px-3 py-1"
      :class="light ? 'text-secondary bg-white/20' : 'text-primary bg-secondary/40'"
    >
      {{ eyebrow }}
    </span>
    <h2
      :id="titleId ?? undefined"
      class="font-manrope font-extrabold leading-tight text-3xl md:text-4xl lg:text-5xl"
      :class="light ? 'text-white' : 'text-text-main'"
    >
      <slot />
    </h2>
    <p
      v-if="$slots.subtitle"
      class="font-jakarta text-base md:text-lg leading-relaxed max-w-2xl"
      :class="[light ? 'text-secondary' : 'text-info', { 'mx-auto': centered }]"
    >
      <slot name="subtitle" />
    </p>
  </div>
</template>
