<script setup>
const { t, tm, rt } = useI18n()
const { open: openContactModal } = useContactModal()
const { gtag } = useGtag()

const sharedFeatures = computed(() => tm('pricing.shared_features'))
const groupFeatures  = computed(() => tm('pricing.plan_group.features'))
</script>

<template>
  <section id="pricing" class="bg-surface-card py-20 md:py-28" aria-labelledby="pricing-title">
    <div class="max-w-7xl mx-auto px-4 md:px-8">

      <!-- ─── En-tête ─── -->
      <div class="text-center mb-12 md:mb-16">
        <p class="font-manrope font-bold text-xs tracking-widest uppercase text-primary mb-3">
          {{ t('pricing.eyebrow') }}
        </p>
        <h2
          id="pricing-title"
          class="font-manrope font-extrabold text-3xl md:text-4xl lg:text-5xl text-text-main mb-4"
        >
          {{ t('pricing.title') }}
        </h2>
        <p class="font-jakarta text-base md:text-lg text-info max-w-2xl mx-auto">
          {{ t('pricing.subtitle') }}
        </p>
      </div>

      <!-- ─── Grille 3 plans (badge · prix · nom · description uniquement) ─── -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">

        <!-- ── Plan Hebdomadaire ── -->
        <div class="bg-surface rounded-2xl border border-secondary/40 p-7 flex flex-col gap-5">
          <span class="inline-flex items-center self-start bg-secondary/30 text-primary-dark text-xs font-bold font-manrope tracking-wider uppercase rounded-full px-3 py-1">
            {{ t('pricing.plan_weekly.badge') }}
          </span>

          <div class="flex items-end gap-1">
            <p class="font-manrope font-extrabold text-4xl text-text-main leading-none">
              {{ t('pricing.plan_weekly.price') }}
            </p>
            <span class="font-jakarta text-sm text-info mb-0.5">{{ t('pricing.plan_weekly.duration') }}</span>
          </div>

          <div>
            <h3 class="font-manrope font-bold text-lg text-text-main mb-1.5">
              {{ t('pricing.plan_weekly.name') }}
            </h3>
            <p class="font-jakarta text-sm text-info leading-relaxed">
              {{ t('pricing.plan_weekly.description') }}
            </p>
          </div>
        </div>

        <!-- ── Plan Mensuel ── -->
        <div class="bg-surface rounded-2xl border border-secondary/40 p-7 flex flex-col gap-5">
          <span class="inline-flex items-center self-start bg-secondary/30 text-primary-dark text-xs font-bold font-manrope tracking-wider uppercase rounded-full px-3 py-1">
            {{ t('pricing.plan_monthly.badge') }}
          </span>

          <div class="flex items-end gap-1">
            <p class="font-manrope font-extrabold text-4xl text-text-main leading-none">
              {{ t('pricing.plan_monthly.price') }}
            </p>
            <span class="font-jakarta text-sm text-info mb-0.5">{{ t('pricing.plan_monthly.duration') }}</span>
          </div>

          <div>
            <h3 class="font-manrope font-bold text-lg text-text-main mb-1.5">
              {{ t('pricing.plan_monthly.name') }}
            </h3>
            <p class="font-jakarta text-sm text-info leading-relaxed">
              {{ t('pricing.plan_monthly.description') }}
            </p>
          </div>
        </div>

        <!-- ── Plan Annuel (mis en avant) ── -->
        <div class="relative bg-surface rounded-2xl border-2 border-primary ring-4 ring-primary/20 p-7 flex flex-col gap-5 shadow-xl shadow-primary/10">
          <span class="inline-flex items-center self-start bg-primary text-white text-xs font-bold font-manrope tracking-wider uppercase rounded-full px-3 py-1">
            {{ t('pricing.plan_yearly.badge') }}
          </span>

          <div>
            <div class="flex items-end gap-1">
              <p class="font-manrope font-extrabold text-5xl text-primary leading-none">
                {{ t('pricing.plan_yearly.price') }}
              </p>
              <span class="font-jakarta text-sm text-info mb-0.5">{{ t('pricing.plan_yearly.duration') }}</span>
            </div>
            <p class="mt-1.5 font-jakarta text-sm font-semibold text-primary/70">
              {{ t('pricing.plan_yearly.equivalent') }}
            </p>
          </div>

          <div>
            <h3 class="font-manrope font-bold text-lg text-text-main mb-1.5">
              {{ t('pricing.plan_yearly.name') }}
            </h3>
            <p class="font-jakarta text-sm text-info leading-relaxed">
              {{ t('pricing.plan_yearly.description') }}
            </p>
          </div>
        </div>

      </div>

  
     

      <!-- ─── Carte Bureaux Infirmiers (pleine largeur) ─── -->
      <div class="mt-6 lg:mt-8 rounded-2xl border border-secondary/40 bg-surface p-7 lg:p-10">
        <div class="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">

          <!-- Gauche : texte + prix -->
          <div class="flex-1 flex flex-col gap-4">
            <span class="inline-flex items-center self-start bg-secondary/30 text-primary-dark text-xs font-bold font-manrope tracking-wider uppercase rounded-full px-3 py-1">
              {{ t('pricing.plan_group.badge') }}
            </span>

            <div>
              <h3 class="font-manrope font-bold text-xl text-text-main mb-2 lg:text-2xl">
                {{ t('pricing.plan_group.name') }}
              </h3>
              <p class="font-jakarta text-sm text-info leading-relaxed max-w-xl">
                {{ t('pricing.plan_group.description') }}
              </p>
            </div>

            <p class="font-manrope font-extrabold text-3xl text-text-main">
              {{ t('pricing.plan_group.price') }}
            </p>
          </div>

          <!-- Droite : features + CTA -->
          <div class="flex flex-col gap-6 lg:w-80 lg:shrink-0">
            <ul class="flex flex-col gap-3" role="list">
              <li
                v-for="(item, idx) in groupFeatures"
                :key="idx"
                class="flex items-start gap-3 font-jakarta text-sm text-text-main"
              >
                <svg class="w-5 h-5 text-primary shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span>{{ rt(item) }}</span>
              </li>
            </ul>

            <button
              type="button"
              class="inline-flex items-center justify-center border-2 border-primary text-primary font-manrope font-semibold rounded-xl min-h-[48px] px-6 text-sm hover:bg-primary hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              @click="() => { openContactModal(); gtag('event', 'pricing_cta_click', { plan: 'group' }) }"
            >
              {{ t('pricing.plan_group.cta') }}
            </button>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

