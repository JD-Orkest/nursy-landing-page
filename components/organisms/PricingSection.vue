<script setup>
const { t, tm, rt } = useI18n()
const { open: openContactModal } = useContactModal()

const testFeatures  = computed(() => tm('pricing.plan_test.features'))
const indieFeatures = computed(() => tm('pricing.plan_indie.features'))
const groupFeatures = computed(() => tm('pricing.plan_group.features'))
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

      <!-- ─── Grille tarifaire ─── -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">

        <!-- ── Plan Test ── -->
        <div class="bg-surface rounded-2xl border border-secondary/40 p-8 flex flex-col gap-6">
          <!-- Badge -->
          <span class="inline-flex items-center self-start bg-secondary/30 text-primary-dark text-xs font-bold font-manrope tracking-wider uppercase rounded-full px-3 py-1">
            {{ t('pricing.plan_test.badge') }}
          </span>

          <!-- Prix -->
          <div>
            <p class="font-manrope font-extrabold text-4xl text-text-main">
              {{ t('pricing.plan_test.price') }}
            </p>
          </div>

          <!-- Nom & Description -->
          <div>
            <h3 class="font-manrope font-bold text-lg text-text-main mb-2">
              {{ t('pricing.plan_test.name') }}
            </h3>
            <p class="font-jakarta text-sm text-info leading-relaxed">
              {{ t('pricing.plan_test.description') }}
            </p>
          </div>

          <!-- Séparateur -->
          <hr class="border-secondary/30" />

          <!-- Features -->
          <ul class="flex flex-col gap-3 flex-1" role="list">
            <li
              v-for="(item, idx) in testFeatures"
              :key="idx"
              class="flex items-start gap-3 font-jakarta text-sm text-text-main"
            >
              <svg class="w-5 h-5 text-primary shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>{{ rt(item) }}</span>
            </li>
          </ul>

          <!-- CTA -->
          <a
            href="#download"
            class="mt-auto inline-flex items-center justify-center border-2 border-primary text-primary font-manrope font-semibold rounded-xl min-h-[48px] px-6 text-sm hover:bg-primary hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {{ t('pricing.plan_test.cta') }}
          </a>
        </div>

        <!-- ── Plan Indépendante (mise en avant) ── -->
        <div class="relative bg-surface rounded-2xl border-2 border-primary ring-4 ring-primary/20 p-8 flex flex-col gap-6 shadow-xl shadow-primary/10">
          <!-- Badge populaire -->
          <span class="inline-flex items-center self-start bg-primary text-white text-xs font-bold font-manrope tracking-wider uppercase rounded-full px-3 py-1">
            {{ t('pricing.plan_indie.badge') }}
          </span>

          <!-- Prix -->
          <div class="flex items-end gap-1">
            <p class="font-manrope font-extrabold text-5xl text-primary leading-none">
              {{ t('pricing.plan_indie.price') }}
            </p>
            <span class="font-jakarta text-base text-info mb-1">{{ t('pricing.plan_indie.duration') }}</span>
          </div>

          <!-- Nom & Description -->
          <div>
            <h3 class="font-manrope font-bold text-lg text-text-main mb-2">
              {{ t('pricing.plan_indie.name') }}
            </h3>
            <p class="font-jakarta text-sm text-info leading-relaxed">
              {{ t('pricing.plan_indie.description') }}
            </p>
          </div>

          <!-- Note fiscale -->
          <div class="flex items-center gap-2 bg-primary/8 rounded-xl px-4 py-3">
            <svg class="w-4 h-4 text-primary shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
            <span class="font-jakarta text-xs text-primary font-medium">{{ t('pricing.plan_indie.tax_note') }}</span>
          </div>

          <!-- Séparateur -->
          <hr class="border-primary/20" />

          <!-- Features -->
          <ul class="flex flex-col gap-3 flex-1" role="list">
            <li
              v-for="(item, idx) in indieFeatures"
              :key="idx"
              class="flex items-start gap-3 font-jakarta text-sm text-text-main"
            >
              <svg class="w-5 h-5 text-primary shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>{{ rt(item) }}</span>
            </li>
          </ul>

          <!-- CTA -->
          <a
            href="#download"
            class="mt-auto inline-flex items-center justify-center bg-gradient-to-r from-primary to-primary-dark text-white font-manrope font-semibold rounded-xl min-h-[48px] px-6 text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {{ t('pricing.plan_indie.cta') }}
          </a>
        </div>

        <!-- ── Plan Groupements ── -->
        <div class="bg-surface rounded-2xl border border-secondary/40 p-8 flex flex-col gap-6">
          <!-- Badge -->
          <span class="inline-flex items-center self-start bg-secondary/30 text-primary-dark text-xs font-bold font-manrope tracking-wider uppercase rounded-full px-3 py-1">
            {{ t('pricing.plan_group.badge') }}
          </span>

          <!-- Prix -->
          <div>
            <p class="font-manrope font-extrabold text-4xl text-text-main">
              {{ t('pricing.plan_group.price') }}
            </p>
          </div>

          <!-- Nom & Description -->
          <div>
            <h3 class="font-manrope font-bold text-lg text-text-main mb-2">
              {{ t('pricing.plan_group.name') }}
            </h3>
            <p class="font-jakarta text-sm text-info leading-relaxed">
              {{ t('pricing.plan_group.description') }}
            </p>
          </div>

          <!-- Séparateur -->
          <hr class="border-secondary/30" />

          <!-- Features -->
          <ul class="flex flex-col gap-3 flex-1" role="list">
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

          <!-- CTA -->
          <button
            type="button"
            class="mt-auto inline-flex items-center justify-center border-2 border-primary text-primary font-manrope font-semibold rounded-xl min-h-[48px] px-6 text-sm hover:bg-primary hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            @click="openContactModal"
          >
            {{ t('pricing.plan_group.cta') }}
          </button>
        </div>

      </div>
    </div>
  </section>
</template>
