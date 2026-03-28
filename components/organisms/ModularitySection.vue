<script setup>
const { t } = useI18n()

const steps = ['step1', 'step2', 'step3']
</script>

<template>
  <section id="modularity" class="bg-surface py-20 md:py-28" aria-labelledby="modularity-title">
    <div class="max-w-7xl mx-auto px-4 md:px-8">

      <!-- Titre de section -->
      <div class="text-center mb-12 md:mb-16">
        <p class="font-manrope font-bold text-xs tracking-widest uppercase text-primary mb-3">
          {{ t('modularity.eyebrow') }}
        </p>
        <h2
          id="modularity-title"
          class="font-manrope font-extrabold text-3xl md:text-4xl lg:text-5xl text-text-main mb-4"
        >
          {{ t('modularity.title') }}
        </h2>
        <p class="font-jakarta text-base md:text-lg text-info max-w-2xl mx-auto">
          {{ t('modularity.subtitle') }}
        </p>
      </div>

      <!-- Étapes -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
        <div
          v-for="step in steps"
          :key="step"
          class="flex flex-col items-center text-center gap-4 bg-surface-card rounded-2xl p-8 shadow-sm border border-secondary/30"
        >
          <!-- Numéro -->
          <div
            class="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shrink-0"
          >
            <span class="font-manrope font-extrabold text-xl text-white">
              {{ t(`modularity.${step}.number`) }}
            </span>
          </div>

          <h3 class="font-manrope font-bold text-xl text-text-main">
            {{ t(`modularity.${step}.title`) }}
          </h3>
          <p class="font-jakarta text-sm text-info leading-relaxed">
            {{ t(`modularity.${step}.text`) }}
          </p>
        </div>
      </div>

      <!-- Légende -->
      <p class="text-center font-jakarta text-sm text-info/70 italic mt-10 max-w-2xl mx-auto">
        {{ t('modularity.caption') }}
      </p>

    </div>
  </section>
</template>
