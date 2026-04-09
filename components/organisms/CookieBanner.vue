<script setup lang="ts">
const { t } = useI18n()

// Cookie stocké 1 an (max-age en secondes)
const consent = useCookie<boolean | null>('nursy_cookie_consent', {
  maxAge: 60 * 60 * 24 * 365,
  sameSite: 'lax',
  secure: true,
})

// La bannière est visible uniquement si le choix n'a pas encore été fait
const isVisible = computed(() => consent.value === null || consent.value === undefined)

function accept() {
  consent.value = true
  // Charge GTM immédiatement après acceptation sans attendre une interaction
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-NW6JXRS3'
    document.head.appendChild(script)
  }
}

function refuse() {
  consent.value = false
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="translate-y-full opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-full opacity-0"
  >
    <!-- fixed bottom + z-50 : flotte au-dessus du contenu, zéro impact layout (CLS=0) -->
    <div
      v-if="isVisible"
      class="fixed bottom-0 left-0 w-full z-50"
      role="dialog"
      aria-live="polite"
      :aria-label="t('cookies.banner_aria')"
    >
      <div
        class="bg-white/90 backdrop-blur-md border-t border-secondary/30 shadow-lg px-4 py-4 md:py-5"
      >
        <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

          <!-- Texte -->
          <p class="font-jakarta text-sm text-text-main leading-relaxed max-w-2xl">
            {{ t('cookies.message') }}
            <a
              href="/confidentialite"
              rel="noopener"
              class="underline text-primary hover:text-primary-dark transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            >
              {{ t('cookies.privacy_link') }}
            </a>.
          </p>

          <!-- Boutons -->
          <div class="flex items-center gap-3 shrink-0">
            <!-- Refuser : outline -->
            <button
              type="button"
              class="font-manrope font-semibold text-sm px-5 py-2.5 rounded-full border border-secondary text-text-main hover:bg-secondary/20 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[44px]"
              @click="refuse"
            >
              {{ t('cookies.refuse') }}
            </button>

            <!-- Accepter : primaire -->
            <button
              type="button"
              class="font-manrope font-semibold text-sm px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 min-h-[44px]"
              @click="accept"
            >
              {{ t('cookies.accept') }}
            </button>
          </div>

        </div>
      </div>
    </div>
  </Transition>
</template>
