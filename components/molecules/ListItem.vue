<script setup>
defineProps({
  title: { type: String, required: true },
  text: { type: String, required: true },
})
</script>

<template>
  <li class="flex items-start gap-4">
    <div
      class="shrink-0 w-10 h-10 rounded-xl bg-secondary/30 flex items-center justify-center mt-0.5"
      aria-hidden="true"
    >
      <slot name="icon">
        <span class="w-4 h-4 rounded bg-secondary/60 block" />
      </slot>
    </div>
    <div class="space-y-1 pt-0.5">
      <h4 class="font-manrope font-bold text-base text-text-main leading-snug">{{ title }}</h4>
      <p class="font-jakarta text-sm text-info leading-relaxed">{{ text }}</p>
    </div>
  </li>
</template>
