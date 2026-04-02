<script setup>
const { t } = useI18n()

const items = [
  {
    key: 'select',
    iconPath: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  },
  {
    key: 'agenda',
    iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    key: 'data',
    iconPath: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
]
</script>

<template>
  <section
    id="replacement"
    class="py-20 md:py-28"
    style="background-color: #f8fafc"
    aria-labelledby="replacement-title"
  >
    <div class="max-w-7xl mx-auto px-4 md:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-20 items-center">

        <!-- ─── Colonne gauche : contenu (60%) ─── -->
        <div class="flex flex-col gap-8">
          <div class="flex flex-col gap-4">
            <span class="font-manrope font-bold text-xs tracking-widest text-primary uppercase">
              {{ t('replacement.eyebrow') }}
            </span>
            <h2
              id="replacement-title"
              class="font-manrope font-extrabold text-3xl md:text-4xl text-text-main leading-tight"
            >
              {{ t('replacement.title') }}
            </h2>
            <p class="font-jakarta text-base md:text-lg text-info leading-relaxed max-w-xl">
              {{ t('replacement.subtitle') }}
            </p>
          </div>

          <ul class="flex flex-col gap-6" role="list">
            <li
              v-for="item in items"
              :key="item.key"
              class="flex items-start gap-4"
            >
              <div class="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mt-0.5">
                <svg
                  class="w-5 h-5 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.5"
                  aria-hidden="true"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" :d="item.iconPath" />
                </svg>
              </div>
              <div class="flex flex-col gap-1">
                <span class="font-manrope font-bold text-base text-text-main">
                  {{ t(`replacement.items.${item.key}.title`) }}
                </span>
                <span class="font-jakarta text-sm text-info leading-relaxed">
                  {{ t(`replacement.items.${item.key}.text`) }}
                </span>
              </div>
            </li>
          </ul>

          
        </div>

        <!-- ─── Colonne droite : carte réassurance (40%) ─── -->
        <div class="w-full max-w-sm mx-auto lg:mx-0 lg:ml-auto">
          <div class="bg-surface rounded-3xl p-7 shadow-sm flex flex-col gap-5">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span class="font-manrope font-extrabold text-base text-text-main">{{ t('replacement.card.title') }}</span>
            </div>

            <ul class="flex flex-col gap-3" role="list">
              <li
                v-for="badge in ['badge1', 'badge2', 'badge3']"
                :key="badge"
                class="flex items-center gap-3 bg-surface-card rounded-xl px-4 py-3"
              >
                <svg class="w-4 h-4 text-primary shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span class="font-jakarta text-sm text-text-main">{{ t(`replacement.card.${badge}`) }}</span>
              </li>
            </ul>

           
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
