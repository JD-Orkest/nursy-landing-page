<script setup>
defineProps({
  status: { type: String, required: true },
  label: { type: String, required: true },
})
</script>

<template>
  <div
    class="flex items-center gap-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg px-4 py-3 border border-white/60 w-max"
    role="status"
    :aria-label="`${status} : ${label}`"
  >
    <span
      class="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 shrink-0"
      aria-hidden="true"
    >
      <svg
        class="w-4 h-4 text-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2.5"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </span>
    <div class="flex flex-col leading-none gap-0.5">
      <span class="text-[10px] font-semibold tracking-widest uppercase text-info">{{ status }}</span>
      <span class="text-sm font-bold text-primary font-manrope">{{ label }}</span>
    </div>
  </div>
</template>
