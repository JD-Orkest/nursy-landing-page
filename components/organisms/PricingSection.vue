<script setup>
const { t, tm, rt } = useI18n()
const { open: openContactModal } = useContactModal()
const { open: openWaitlistModal } = useWaitlistModal()

const replacedFeatures  = computed(() => tm('pricing.plan_replaced.features'))
const replacingFeatures = computed(() => tm('pricing.plan_replacing.features'))
const groupFeatures     = computed(() => tm('pricing.plan_group.features'))
</script>

<template>
  <section id="pricing" class="bg-surface-card py-20 md:py-28" aria-labelledby="pricing-title">
    <div class="max-w-7xl mx-auto px-4 md:px-8">

      <!-- ─── Bandeau phase de lancement ─── -->
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 shadow-lg shadow-amber-300/40 mb-10 md:mb-14 px-6 py-5 flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
        <!-- Décoration lumineuse -->
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.25)_0%,_transparent_60%)] pointer-events-none" aria-hidden="true"></div>

        <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-white/25 shrink-0">
          <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
          </svg>
        </div>

        <div class="flex-1">
          <span class="inline-block font-manrope font-extrabold text-xs tracking-widest uppercase text-white/80 mb-0.5">
            {{ t('pricing.launch_label') }}
          </span>
          <p class="font-manrope font-bold text-white text-base md:text-lg leading-snug">
            {{ t('pricing.launch_text') }}
          </p>
        </div>
      </div>

      <!-- ─── En-tête ─── -->
      <div class="text-center mb-10 md:mb-14">
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

      <!-- ─── Badge accès gratuit ─── -->
      <div class="flex justify-center mb-10">
        <div class="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 font-manrope font-semibold text-sm rounded-full px-5 py-2.5">
          <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ t('pricing.free_access_note') }}
        </div>
      </div>

      <!-- ─── Grille 2 plans ─── -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch mb-6 lg:mb-8">

        <!-- ── Plan Titulaire (gratuit) ── -->
        <div class="relative bg-surface rounded-2xl border border-secondary/40 overflow-hidden flex flex-col">
          <div class="p-7 flex flex-col gap-5 flex-1">
            <span class="inline-flex items-center self-start bg-green-100 text-green-700 text-xs font-bold font-manrope tracking-wider uppercase rounded-full px-3 py-1">
              {{ t('pricing.plan_replaced.badge') }}
            </span>

            <div class="flex items-end gap-2">
              <p class="font-manrope font-extrabold text-5xl text-text-main leading-none">
                {{ t('pricing.plan_replaced.price') }}
              </p>
              <span class="font-jakarta text-sm text-green-600 font-semibold mb-1">
                {{ t('pricing.plan_replaced.price_note') }}
              </span>
            </div>

            <div>
              <h3 class="font-manrope font-bold text-xl text-text-main mb-2">
                {{ t('pricing.plan_replaced.name') }}
              </h3>
              <p class="font-jakarta text-sm text-info leading-relaxed">
                {{ t('pricing.plan_replaced.description') }}
              </p>
            </div>

            <ul class="flex flex-col gap-3 flex-1" role="list">
              <li
                v-for="(item, idx) in replacedFeatures"
                :key="idx"
                class="flex items-start gap-3 font-jakarta text-sm text-text-main"
              >
                <svg class="w-5 h-5 text-green-500 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span>{{ rt(item) }}</span>
              </li>
            </ul>

            <button
              type="button"
              class="mt-auto inline-flex items-center justify-center bg-green-600 text-white font-manrope font-semibold rounded-xl min-h-[52px] px-8 text-base shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
              @click="openWaitlistModal('pricing_replaced')"
            >
              {{ t('pricing.plan_replaced.cta') }}
            </button>
          </div>
        </div>

        <!-- ── Plan Remplaçante (14,99 €/mois) ── -->
        <div class="relative bg-surface rounded-2xl border-2 border-primary ring-4 ring-primary/20 overflow-hidden shadow-xl shadow-primary/10 flex flex-col">
          <div class="p-7 flex flex-col gap-5 flex-1">
            <span class="inline-flex items-center self-start bg-primary text-white text-xs font-bold font-manrope tracking-wider uppercase rounded-full px-3 py-1">
              {{ t('pricing.plan_replacing.badge') }}
            </span>

            <div class="flex items-end gap-2">
              <p class="font-manrope font-extrabold text-5xl text-primary leading-none">
                {{ t('pricing.plan_replacing.price') }}
              </p>
              <span class="font-jakarta text-sm text-info mb-1">
                {{ t('pricing.plan_replacing.duration') }}
              </span>
            </div>

            <!-- Badge visites incluses -->
            <div class="inline-flex items-center gap-1.5 bg-primary/10 text-primary font-jakarta text-xs font-semibold rounded-lg px-3 py-1.5 self-start">
              <svg class="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {{ t('pricing.plan_replacing.visits_included') }}
            </div>

            <div>
              <h3 class="font-manrope font-bold text-xl text-text-main mb-2">
                {{ t('pricing.plan_replacing.name') }}
              </h3>
              <p class="font-jakarta text-sm text-info leading-relaxed">
                {{ t('pricing.plan_replacing.description') }}
              </p>
            </div>

            <ul class="flex flex-col gap-3" role="list">
              <li
                v-for="(item, idx) in replacingFeatures"
                :key="idx"
                class="flex items-start gap-3 font-jakarta text-sm text-text-main"
              >
                <svg class="w-5 h-5 text-primary shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span>{{ rt(item) }}</span>
              </li>
            </ul>

            <!-- Tarification supplémentaire -->
            <div class="bg-surface-card rounded-xl p-4 border border-secondary/30 flex items-start gap-3">
              <svg class="w-4 h-4 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="font-jakarta text-xs text-info leading-relaxed">
                {{ t('pricing.plan_replacing.extra_visits_note') }}
              </p>
            </div>

            <button
              type="button"
              class="mt-auto inline-flex items-center justify-center bg-gradient-to-r from-primary to-primary-dark text-white font-manrope font-semibold rounded-xl min-h-[52px] px-8 text-base shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              @click="openWaitlistModal('pricing_replacing')"
            >
              {{ t('pricing.plan_replacing.cta') }}
            </button>
          </div>
        </div>

      </div>

      <!-- ─── Carte Équipes ─── -->
      <div class="rounded-2xl border border-secondary/40 bg-surface p-7 lg:p-10">
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
            <!-- <p class="font-manrope font-extrabold text-3xl text-text-main">
              {{ t('pricing.plan_group.price') }}
            </p> -->
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
            <button
              type="button"
              class="inline-flex items-center justify-center border-2 border-primary text-primary font-manrope font-semibold rounded-xl min-h-[48px] px-6 text-sm hover:bg-primary hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              @click="openContactModal"
            >
              {{ t('pricing.plan_group.cta') }}
            </button>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
