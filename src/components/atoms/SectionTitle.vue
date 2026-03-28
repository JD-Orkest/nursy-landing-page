<script setup>
defineProps({
  /** Étiquette de surtitre (ex: "PILIERS DE L'APP"). */
  eyebrow: {
    type: String,
    default: null,
  },
  /** Centrer horizontalement le bloc titre. */
  centered: {
    type: Boolean,
    default: false,
  },
  /** Mode clair — textes blancs pour les fonds sombres. */
  light: {
    type: Boolean,
    default: false,
  },
  /** id HTML appliqué au <h2> pour aria-labelledby. */
  titleId: {
    type: String,
    default: null,
  },
})
</script>

<template>
  <div :class="['space-y-3', { 'text-center': centered }]">
    <!-- Surtitre / Eyebrow -->
    <span
      v-if="eyebrow"
      class="inline-block text-xs font-semibold tracking-widest uppercase rounded-full px-3 py-1"
      :class="light ? 'text-secondary bg-white/20' : 'text-primary bg-secondary/40'"
    >
      {{ eyebrow }}
    </span>

    <!-- Titre principal (slot par défaut) -->
    <h2
      :id="titleId ?? undefined"
      class="font-manrope font-extrabold leading-tight text-3xl md:text-4xl lg:text-5xl"
      :class="light ? 'text-white' : 'text-text-main'"
    >
      <slot />
    </h2>

    <!-- Sous-titre optionnel (slot nommé "subtitle") -->
    <p
      v-if="$slots.subtitle"
      class="font-jakarta text-base md:text-lg leading-relaxed max-w-2xl"
      :class="[light ? 'text-secondary' : 'text-info', { 'mx-auto': centered }]"
    >
      <slot name="subtitle" />
    </p>
  </div>
</template>
