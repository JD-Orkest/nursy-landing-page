<script setup>
const { t, tm, rt } = useI18n()

const titItems = computed(() => tm('profiles.titulaire.items'))
const repItems = computed(() => tm('profiles.replacant.items'))
</script>

<template>
  <section id="profiles" class="bg-surface-card py-20 md:py-28" aria-labelledby="profiles-title">
    <div class="max-w-7xl mx-auto px-4 md:px-8">

      <!-- Titre de section -->
      <div class="text-center mb-12 md:mb-16">
        <p class="font-manrope font-bold text-xs tracking-widest uppercase text-primary mb-3">
          {{ t('profiles.eyebrow') }}
        </p>
        <h2
          id="profiles-title"
          class="font-manrope font-extrabold text-3xl md:text-4xl lg:text-5xl text-text-main mb-4"
        >
          {{ t('profiles.title') }}
        </h2>
        <p class="font-jakarta text-base md:text-lg text-info max-w-2xl mx-auto">
          {{ t('profiles.subtitle') }}
        </p>
      </div>

      <!-- Cards côte à côte -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">

        <!-- ─── Carte Titulaire ─── -->
        <div class="bg-surface rounded-2xl border-2 border-primary p-8 flex flex-col gap-6">
          <span
            class="inline-flex items-center self-start bg-primary/10 text-primary text-xs font-bold font-manrope tracking-wider uppercase rounded-full px-3 py-1"
          >
            {{ t('profiles.titulaire.badge') }}
          </span>

          <div>
            <h3 class="font-manrope font-extrabold text-2xl text-text-main mb-3">
              {{ t('profiles.titulaire.title') }}
            </h3>
            <p class="font-jakarta text-base text-info leading-relaxed">
              {{ t('profiles.titulaire.text') }}
            </p>
          </div>

          <ul class="flex flex-col gap-3" role="list">
            <li
              v-for="(item, idx) in titItems"
              :key="idx"
              class="flex items-start gap-3 font-jakarta text-sm text-text-main"
            >
              <svg
                class="w-5 h-5 text-primary shrink-0 mt-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>{{ rt(item) }}</span>
            </li>
          </ul>

          <a
            href="#download"
            class="mt-auto inline-flex items-center justify-center bg-gradient-to-r from-primary to-primary-dark text-white font-manrope font-semibold rounded-xl min-h-[48px] px-6 text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {{ t('profiles.titulaire.cta') }}
          </a>
        </div>

        <!-- ─── Carte Remplaçant ─── -->
        <div class="bg-surface rounded-2xl border-2 border-secondary p-8 flex flex-col gap-6">
          <span
            class="inline-flex items-center self-start bg-secondary/30 text-primary-dark text-xs font-bold font-manrope tracking-wider uppercase rounded-full px-3 py-1"
          >
            {{ t('profiles.replacant.badge') }}
          </span>

          <div>
            <h3 class="font-manrope font-extrabold text-2xl text-text-main mb-3">
              {{ t('profiles.replacant.title') }}
            </h3>
            <p class="font-jakarta text-base text-info leading-relaxed">
              {{ t('profiles.replacant.text') }}
            </p>
          </div>

          <ul class="flex flex-col gap-3" role="list">
            <li
              v-for="(item, idx) in repItems"
              :key="idx"
              class="flex items-start gap-3 font-jakarta text-sm text-text-main"
            >
              <svg
                class="w-5 h-5 text-primary shrink-0 mt-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>{{ rt(item) }}</span>
            </li>
          </ul>

          <a
            href="#download"
            class="mt-auto inline-flex items-center justify-center border-2 border-primary text-primary font-manrope font-semibold rounded-xl min-h-[48px] px-6 text-sm hover:bg-primary hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {{ t('profiles.replacant.cta') }}
          </a>
        </div>

      </div>
    </div>
  </section>
</template>
