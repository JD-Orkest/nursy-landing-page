<script setup>
import { useI18n } from 'vue-i18n'
import SectionTitle from '../atoms/SectionTitle.vue'
import ListItem from '../molecules/ListItem.vue'

const { t } = useI18n()

/**
 * Points clés affichés dans la liste de droite.
 * TODO: Remplacer chaque iconPath par l'icône SVG officielle correspondante.
 */
const securityPoints = [
  {
    key: 'messaging',
    // TODO: Remplacer par l'icône "Messagerie" officielle
    iconPath:
      'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
  },
  {
    key: 'verified',
    // TODO: Remplacer par l'icône "Profils Vérifiés" officielle
    iconPath:
      'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    key: 'sync',
    // TODO: Remplacer par l'icône "Synchronisation" officielle
    iconPath:
      'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
  },
]
</script>

<template>
  <section
    id="security"
    class="bg-surface-card py-20 md:py-28"
    aria-labelledby="security-title"
  >
    <div class="max-w-7xl mx-auto px-4 md:px-8">

      <!--
        Layout :
        - Mobile : flex-col-reverse → le texte apparaît en premier visuellement
        - Desktop lg : grille 2 colonnes côte à côte
      -->
      <div class="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        <!-- ─── Colonne gauche : carte visuelle ─── -->
        <div class="w-full max-w-md mx-auto lg:mx-0">
          <div
            class="bg-surface rounded-3xl p-5 md:p-7 flex flex-col gap-4 shadow-sm"
            role="img"
            :aria-label="t('security.visual_aria')"
          >

            <!-- Carte Biométrie (fond blanc, grand) -->
            <div class="bg-surface-card rounded-2xl p-5 md:p-6 shadow-sm">
              <div class="flex justify-end mb-4">
                <!--
                  TODO: Remplacer par l'illustration biométrie officielle
                  ex: <img src="@/assets/images/biometry-illustration.svg" alt="" aria-hidden="true" class="w-12 h-12" />
                -->
                <svg
                  class="w-10 h-10 text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.5"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  />
                </svg>
              </div>
              <h3 class="font-manrope font-bold text-base text-text-main">
                {{ t('security.biometry.title') }}
              </h3>
              <p class="font-jakarta text-sm text-info mt-1 leading-relaxed">
                {{ t('security.biometry.text') }}
              </p>
            </div>

            <!-- Deux petites cartes en bas -->
            <div class="grid grid-cols-2 gap-4">

              <!-- Données Santé Chiffrées (fond primary) -->
              <div class="bg-primary rounded-2xl p-4 flex flex-col gap-2 min-h-[80px]">
                <!-- TODO: Remplacer par l'icône "Données Santé" officielle -->
                <svg
                  class="w-7 h-7 text-white shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.5"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span class="font-manrope font-bold text-sm text-white leading-snug">
                  {{ t('security.health_data.label') }}
                </span>
              </div>

              <!-- Système de recommandation (fond blanc) -->
              <div class="bg-surface-card rounded-2xl p-4 flex flex-col gap-2 shadow-sm min-h-[80px]">
                <!-- TODO: Remplacer par l'icône "Recommandation entre pairs" officielle -->
                <svg
                  class="w-7 h-7 text-primary shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.5"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                <span class="font-manrope font-bold text-sm text-text-main leading-snug">
                  {{ t('security.recommendation.label') }}
                </span>
              </div>

            </div>
          </div>
        </div>

        <!-- ─── Colonne droite : titre + liste des points clés ─── -->
        <div class="flex flex-col gap-8 md:gap-10">
          <SectionTitle :eyebrow="t('security.eyebrow')" title-id="security-title">
            {{ t('security.title') }}
          </SectionTitle>

          <ul class="flex flex-col gap-6 md:gap-8" role="list">
            <ListItem
              v-for="point in securityPoints"
              :key="point.key"
              :title="t(`security.${point.key}.title`)"
              :text="t(`security.${point.key}.text`)"
            >
              <template #icon>
                <!-- TODO: Remplacer par l'icône SVG officielle du point de sécurité -->
                <svg
                  class="w-5 h-5 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.5"
                  aria-hidden="true"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" :d="point.iconPath" />
                </svg>
              </template>
            </ListItem>
          </ul>
        </div>

      </div>
    </div>
  </section>
</template>
