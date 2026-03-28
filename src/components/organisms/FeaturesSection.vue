<script setup>
import { useI18n } from 'vue-i18n'
import SectionTitle from '../atoms/SectionTitle.vue'
import FeatureCard from '../molecules/FeatureCard.vue'

const { t } = useI18n()

/**
 * Chaque feature expose une clé i18n et un chemin SVG (iconPath).
 * TODO: Remplacer iconPath par les icônes officielles de la charte Nursy.
 */
const features = [
  {
    key: 'market',
    // TODO: Remplacer par l'icône "Marché des remplaçants" officielle
    iconPath:
      'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  },
  {
    key: 'katz',
    // TODO: Remplacer par l'icône "Échelle de Katz" officielle
    iconPath:
      'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
  },
  {
    key: 'dossiers',
    // TODO: Remplacer par l'icône "Dossiers Intelligents" officielle
    iconPath:
      'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
  {
    key: 'models',
    // TODO: Remplacer par l'icône "Modèles de Tournées" officielle
    iconPath:
      'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
  },
]
</script>

<template>
  <section
    id="features"
    class="bg-surface py-20 md:py-28"
    aria-labelledby="features-title"
  >
    <div class="max-w-7xl mx-auto px-4 md:px-8">

      <!-- Titre de section -->
      <SectionTitle
        :eyebrow="t('features.eyebrow')"
        title-id="features-title"
        centered
      >
        {{ t('features.title') }}
        <template #subtitle>{{ t('features.subtitle') }}</template>
      </SectionTitle>

      <!-- Grille responsive : 1 col mobile → 2 col md → 4 col lg -->
      <div class="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        <FeatureCard
          v-for="feature in features"
          :key="feature.key"
          :title="t(`features.${feature.key}.title`)"
          :text="t(`features.${feature.key}.text`)"
        >
          <template #icon>
            <!-- TODO: Remplacer par l'icône SVG officielle de la fonctionnalité -->
            <svg
              class="w-6 h-6 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" :d="feature.iconPath" />
            </svg>
          </template>
        </FeatureCard>
      </div>

    </div>
  </section>
</template>
