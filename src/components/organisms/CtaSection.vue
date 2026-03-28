<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section
    id="download"
    class="bg-surface py-16 md:py-24 px-4 md:px-8"
    aria-labelledby="cta-title"
  >
    <div class="max-w-4xl mx-auto">
      <!--
        Bannière gradient :
        - rounded-none sur mobile (bord à bord pour un effet immersif)
        - rounded-3xl sur sm+ (carte flottante avec shadow)
        - negative margin -mx-4 md:mx-0 pour casser le padding parent sur mobile
      -->
      <div
        class="bg-gradient-to-br from-primary-dark to-primary
               -mx-4 sm:mx-0
               rounded-none sm:rounded-3xl
               px-6 py-14 md:px-16 md:py-20
               flex flex-col items-center gap-6 text-center
               shadow-none sm:shadow-2xl"
      >

        <!-- Titre -->
        <h2
          id="cta-title"
          class="font-manrope font-extrabold text-3xl md:text-4xl lg:text-5xl text-white leading-tight max-w-2xl"
        >
          {{ t('cta.title') }}
        </h2>

        <!-- Sous-titre -->
        <p class="font-jakarta text-base md:text-lg text-secondary leading-relaxed max-w-xl">
          {{ t('cta.subtitle') }}
        </p>

        <!-- Bouton principal — touch target min 56 px de hauteur -->
        <a
          href="#"
          class="inline-flex items-center justify-center
                 bg-white text-primary
                 font-manrope font-bold
                 rounded-2xl
                 min-h-[56px] px-8 text-base md:text-lg
                 shadow-md hover:shadow-xl
                 hover:scale-[1.02] active:scale-[0.98]
                 transition-all duration-200
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white
                 focus-visible:ring-offset-2 focus-visible:ring-offset-primary
                 mt-2"
        >
          {{ t('cta.button') }}
        </a>

        <!-- Indication plateformes -->
        <p class="font-jakarta text-sm text-secondary/70">
          {{ t('cta.platforms') }}
        </p>

      </div>
    </div>
  </section>
</template>
