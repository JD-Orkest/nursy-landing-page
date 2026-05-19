<script setup>
const { t, tm, rt } = useI18n()
const { open: openContactModal } = useContactModal()
const { open: openWaitlistModal } = useWaitlistModal()

const sharedFeatures = computed(() => tm('pricing.shared_features'))
const groupFeatures  = computed(() => tm('pricing.plan_group.features'))
</script>

<template>
  <section id="pricing" class="bg-surface-card py-20 md:py-28" aria-labelledby="pricing-title">
    <div class="max-w-7xl mx-auto px-4 md:px-8">

      <!-- ─── En-tête ─── -->
      <!-- <div class="text-center mb-12 md:mb-16">
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
      </div> -->

      <!-- ─── Bloc « bientôt » ─── -->
      <div class="flex flex-col items-center text-center gap-8 py-8 md:py-12">

        <!-- Icône horloge -->
        <div class="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <svg class="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l3.5 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <!-- Texte -->
        <div class="max-w-xl space-y-4">
          <h3 class="font-manrope font-extrabold text-2xl md:text-3xl text-text-main">
            {{ t('pricing.teaser_title') }}
          </h3>
          <p class="font-jakarta text-base text-info leading-relaxed">
            {{ t('pricing.teaser_body') }}
          </p>
        </div>

        <!-- CTA -->
        <div class="flex flex-col items-center gap-3">
          <button
            type="button"
            class="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white font-manrope font-semibold rounded-xl min-h-[52px] px-8 text-base shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            @click="openWaitlistModal('pricing_teaser')"
          >
            <svg class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {{ t('pricing.teaser_cta') }}
          </button>
          <p class="font-jakarta text-xs text-info">
            {{ t('pricing.teaser_note') }}
          </p>
        </div>

      </div>

      <!--
      ╔══════════════════════════════════════════════════════════════╗
      ║  Grille tarifaire — commentée en attendant la publication   ║
      ╚══════════════════════════════════════════════════════════════╝

      <!-- ─── Grille 3 plans (badge · prix · nom · description uniquement) ─── -->
      <!--<div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch"> -->

        <!-- ── Plan Hebdomadaire ── -->
        <!--<div class="relative bg-surface rounded-2xl border border-secondary/40 overflow-hidden">-->
          <!-- Contenu flou -->
          <!--<div class="p-7 flex flex-col gap-5 blur-xl opacity-40 pointer-events-none select-none">
            <span class="inline-flex items-center self-start bg-secondary/30 text-primary-dark text-xs font-bold font-manrope tracking-wider uppercase rounded-full px-3 py-1">
              {{ t('pricing.plan_weekly.badge') }}
            </span>

            <div class="flex items-end gap-1">
              <p class="font-manrope font-extrabold text-4xl text-text-main leading-none">
                bientôt
              </p>
              <span class="font-jakarta text-sm text-info mb-0.5"></span>
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
        </div>-->

        <!-- ── Plan Mensuel ── -->
         <!--
        <div class="relative bg-surface rounded-2xl border border-secondary/40 overflow-hidden">
          <div class="p-7 flex flex-col gap-5 blur-xl opacity-40 pointer-events-none select-none">
            <span class="inline-flex items-center self-start bg-secondary/30 text-primary-dark text-xs font-bold font-manrope tracking-wider uppercase rounded-full px-3 py-1">
              {{ t('pricing.plan_monthly.badge') }}
            </span>

            <div class="flex items-end gap-1">
              <p class="font-manrope font-extrabold text-4xl text-text-main leading-none">
                bientôt
              </p>
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
        </div>

        <!-- ── Plan Annuel ── -->
        <!--<div class="relative bg-surface rounded-2xl border-2 border-primary ring-4 ring-primary/20 overflow-hidden shadow-xl shadow-primary/10">
          <div class="p-7 flex flex-col gap-5 blur-xl opacity-40 pointer-events-none select-none">
            <span class="inline-flex items-center self-start bg-primary text-white text-xs font-bold font-manrope tracking-wider uppercase rounded-full px-3 py-1">
              {{ t('pricing.plan_yearly.badge') }}
            </span>

            <div>
              <p class="font-manrope font-extrabold text-5xl text-primary leading-none">bientôt</p>
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

      </div>-->

      <!-- ─── Carte Bureaux Infirmiers ─── -->
       <!--
      <div class="mt-6 lg:mt-8 rounded-2xl border border-secondary/40 bg-surface p-7 lg:p-10">
        <div class="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
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
          <div class="flex flex-col gap-6 lg:w-80 lg:shrink-0">
            <ul class="flex flex-col gap-3" role="list">
              <li v-for="(item, idx) in groupFeatures" :key="idx" class="flex items-start gap-3 font-jakarta text-sm text-text-main">
                <svg class="w-5 h-5 text-primary shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span>{{ rt(item) }}</span>
              </li>
            </ul>
            <button type="button"
              class="inline-flex items-center justify-center border-2 border-primary text-primary font-manrope font-semibold rounded-xl min-h-[48px] px-6 text-sm hover:bg-primary hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              @click="openContactModal">
              {{ t('pricing.plan_group.cta') }}
            </button>
          </div>
        </div>
      </div>

      -->

    </div>
  </section>
</template>

