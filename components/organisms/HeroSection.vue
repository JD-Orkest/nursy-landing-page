<script setup>
const { t, locale } = useI18n()
const { gtag } = useGtag()

const illustrationSrc = computed(() =>
  locale.value === 'nl' ? '/illustration-nl.png' : '/illustration-fr.png'
)
</script>

<template>
  <section
    class="bg-surface min-h-[calc(100svh-4rem)] md:min-h-[calc(100svh-5rem)] flex items-center"
    aria-labelledby="hero-title"
  >
    <div class="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 w-full">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        <!-- ─── Colonne gauche : contenu ─── -->
        <div class="flex flex-col gap-6 md:gap-8">

          <!-- H1 optimisé avec mots-clés stratégiques -->
          <h1
            id="hero-title"
            class="font-manrope font-extrabold text-4xl md:text-5xl lg:text-6xl text-text-main leading-[1.1] tracking-tight"
          >
            {{ t('hero.headline_start') }}
            <span class="text-primary"> {{ t('hero.headline_highlight') }} </span>
            {{ t('hero.headline_end') }}
          </h1>

          <!-- Tagline accroche -->
          <p class="font-manrope font-bold text-xl md:text-2xl text-primary -mt-2">
            {{ t('hero.tagline') }}
          </p>

          <p class="font-jakarta text-base md:text-lg text-info leading-relaxed max-w-lg">
            {{ t('hero.subtext') }}
          </p>

          <!-- Boutons stores -->
          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4" role="group">
            <a
              href="#"
              rel="nofollow"
              class="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-primary-dark text-white font-manrope font-semibold rounded-xl min-h-[48px] px-6 text-sm md:text-base shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              :aria-label="t('hero.cta_appstore_aria')"
              @click="gtag('event', 'click_app_store')"
            >
              <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.79 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <span class="flex flex-col items-start leading-none">
                <span class="text-[10px] opacity-80">iOS</span>
                <span>{{ t('hero.cta_appstore') }}</span>
              </span>
            </a>

            <a
              href="#"
              rel="nofollow"
              class="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-primary-dark text-white font-manrope font-semibold rounded-xl min-h-[48px] px-6 text-sm md:text-base shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              :aria-label="t('hero.cta_playstore_aria')"
              @click="gtag('event', 'click_play_store')"
            >
              <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3.18 23.76c.3.17.64.24.99.2l12.45-12.45L13.2 8.1 3.18 23.76zm16.24-10.4L16.7 11.9 13.2 8.4l2.85-2.85 3.37 1.93c.96.55.96 1.93 0 2.88zM2.59.48C2.22.72 2 1.12 2 1.62v20.76c0 .5.22.9.59 1.14l.12.07L14.5 12 2.71.41.59.48z" />
              </svg>
              <span class="flex flex-col items-start leading-none">
                <span class="text-[10px] opacity-80">Android</span>
                <span>{{ t('hero.cta_playstore') }}</span>
              </span>
            </a>
          </div>

          <!-- Preuve sociale -->
          <!-- <div class="flex items-center gap-3">
            <div class="flex -space-x-2 shrink-0" aria-hidden="true">
              <div
                v-for="i in 3"
                :key="i"
                class="w-9 h-9 rounded-full bg-secondary border-2 border-surface"
              />
            </div>
            <p class="font-jakarta text-sm font-medium text-info">
              {{ t('hero.social_proof') }}
            </p>
          </div> -->
        </div>

        <!-- ─── Colonne droite : mockup iPhone ─── -->
        <div class="relative flex items-center justify-center lg:justify-end">
          <div class="relative w-full max-w-[300px] mx-auto lg:max-w-none lg:w-[360px] xl:w-[420px]">

            <NuxtImg
              :src="illustrationSrc"
              :alt="t('hero.mockup_alt')"
              format="webp"
              quality="80"
              width="840"
              height="1825"
              sizes="300px sm:360px lg:420px"
              class="w-full drop-shadow-2xl rounded-[3rem]"
              loading="eager"
              fetchpriority="high"
            />

            <div class="absolute -bottom-4 -left-2 sm:-left-6 hidden sm:block">
              <GlassBadge
                :status="t('hero.badge_status')"
                :label="t('hero.badge_label')"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
