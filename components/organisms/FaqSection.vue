<script setup>
const { t } = useI18n()

const openIndex = ref(null)

const faqItems = computed(() => [
  { q: t('faq.q1.question'), a: t('faq.q1.answer') },
  { q: t('faq.q2.question'), a: t('faq.q2.answer') },
  { q: t('faq.q3.question'), a: t('faq.q3.answer') },
  { q: t('faq.q4.question'), a: t('faq.q4.answer') },
])

function toggle(index) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <section id="faq" class="bg-surface py-20 md:py-28" aria-labelledby="faq-title">
    <div class="max-w-3xl mx-auto px-4 md:px-8">
      <SectionTitle :eyebrow="t('faq.eyebrow')" title-id="faq-title" centered>
        {{ t('faq.title') }}
        <template #subtitle>{{ t('faq.subtitle') }}</template>
      </SectionTitle>

      <dl class="mt-12 md:mt-16 flex flex-col gap-3">
        <div
          v-for="(item, index) in faqItems"
          :key="index"
          class="bg-surface-card rounded-2xl shadow-sm overflow-hidden"
        >
          <dt>
            <button
              class="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-manrope font-bold text-base md:text-lg text-text-main hover:text-primary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
              :aria-expanded="openIndex === index"
              :aria-controls="`faq-answer-${index}`"
              @click="toggle(index)"
            >
              <span>{{ item.q }}</span>
              <!-- Icône chevron animée -->
              <svg
                class="w-5 h-5 shrink-0 text-primary transition-transform duration-200"
                :class="{ 'rotate-180': openIndex === index }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </dt>

          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-96"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 max-h-96"
            leave-to-class="opacity-0 max-h-0"
          >
            <dd
              v-show="openIndex === index"
              :id="`faq-answer-${index}`"
              class="px-6 pb-5"
            >
              <p class="font-jakarta text-sm md:text-base text-info leading-relaxed border-t border-secondary/20 pt-4">
                {{ item.a }}
              </p>
            </dd>
          </Transition>
        </div>
      </dl>
    </div>
  </section>
</template>
