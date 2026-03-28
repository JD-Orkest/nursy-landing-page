<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <article
    class="bg-surface-card rounded-2xl p-6 md:p-8 flex flex-col gap-5 shadow-sm hover:shadow-md transition-shadow duration-200"
  >
    <!-- Zone icône — slot nommé "icon" avec fallback -->
    <div
      class="w-12 h-12 rounded-xl bg-surface flex items-center justify-center shrink-0"
      aria-hidden="true"
    >
      <slot name="icon">
        <!-- TODO: Insérer l'icône SVG officielle de la fonctionnalité -->
        <span class="w-6 h-6 rounded-lg bg-secondary/60 block" />
      </slot>
    </div>

    <!-- Contenu textuel -->
    <div class="space-y-2">
      <h3 class="font-manrope font-bold text-lg text-text-main leading-snug">
        {{ title }}
      </h3>
      <p class="font-jakarta text-sm text-info leading-relaxed">
        {{ text }}
      </p>
    </div>
  </article>
</template>
