<script setup>
const { isOpen, close } = useWaitlistModal()
const { t, locale } = useI18n()

const formUrl = computed(() =>
  locale.value === 'nl'
    ? 'https://docs.google.com/forms/d/e/1FAIpQLSdJdd7SgAnSDqLVDKS6Ct7ebNLFWJYxROu0MP3Czdr8JEHCxg/viewform?embedded=true'
    : 'https://docs.google.com/forms/d/e/1FAIpQLSfMCWRw0j96nh9QDP2YlTK-S9DH160NrSgcdHb_oIZ38KA2sw/viewform?embedded=true'
)

const iframeLoaded = ref(false)
const formSubmitted = ref(false)
let loadCount = 0

// Détecte la soumission du formulaire Google Forms :
// - 1er événement load = formulaire chargé
// - 2e événement load = page de confirmation (après envoi)
function onIframeLoad() {
  loadCount++
  if (loadCount === 1) {
    iframeLoaded.value = true
  } else if (loadCount >= 2) {
    formSubmitted.value = true
  }
}

// Réinitialise l'état de chargement à chaque ouverture
watch(isOpen, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
  if (!val) {
    iframeLoaded.value = false
    formSubmitted.value = false
    loadCount = 0
  }
})

// Echap ferme le modal
const keydownHandler = (e) => { if (e.key === 'Escape' && isOpen.value) close() }
onMounted(() => window.addEventListener('keydown', keydownHandler))
onUnmounted(() => window.removeEventListener('keydown', keydownHandler))
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isOpen"
          class="fixed inset-0 z-[9999] flex items-start sm:items-center justify-center p-0 sm:p-6 overflow-y-auto"
          style="background: rgba(24, 28, 29, 0.5); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px)"
          role="dialog"
          aria-modal="true"
          :aria-label="t('waitlist.modal_title')"
          @click.self="close"
        >
          <!-- Carte modal -->
          <!-- Mobile : plein écran depuis le haut | Desktop : centré, largeur max 720px, hauteur max 90vh -->
          <div
            class="relative bg-white w-full flex flex-col
                   rounded-none sm:rounded-xl
                   min-h-dvh sm:min-h-0
                   sm:max-w-2xl sm:max-h-[90vh]
                   shadow-2xl sm:my-auto"
            @click.stop
          >
            <!-- En-tête -->
            <div class="flex items-start justify-between px-6 pt-6 pb-4 shrink-0">
              <div>
                <h2 class="font-manrope font-extrabold text-xl text-text-main">
                  {{ t('waitlist.modal_title') }}
                </h2>
                <p class="font-jakarta text-sm text-info mt-1">
                  {{ t('waitlist.modal_subtitle') }}
                </p>
              </div>
              <button
                type="button"
                class="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-info hover:text-primary hover:bg-[#eaefef] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ml-4 mt-0.5"
                :aria-label="t('waitlist.close')"
                @click="close"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Séparateur -->
            <div class="h-px bg-gray-100 mx-6 shrink-0" />

            <!-- Zone iframe -->
            <div class="relative flex-1 overflow-auto" style="min-height: 520px">
              <!-- Spinner pendant le chargement -->
              <div
                v-if="!iframeLoaded"
                class="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white"
              >
                <svg class="w-8 h-8 text-primary animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                <p class="font-jakarta text-sm text-info">{{ t('waitlist.loading') }}</p>
              </div>

              <!-- Message de confirmation post-soumission -->
              <Transition
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="opacity-0 translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
              >
                <div
                  v-if="formSubmitted"
                  class="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 bg-white px-8 text-center"
                >
                  <!-- Icône coche -->
                  <div class="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <svg class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div class="space-y-2">
                    <h3 class="font-manrope font-extrabold text-lg text-text-main">
                      {{ t('waitlist.submitted_title') }}
                    </h3>
                    <p class="font-jakarta text-sm text-info leading-relaxed max-w-xs">
                      {{ t('waitlist.submitted_body') }}
                    </p>
                  </div>
                  <button
                    type="button"
                    class="mt-2 rounded-lg bg-primary px-6 py-2.5 font-jakarta text-sm font-semibold text-white hover:bg-primary/90 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                    @click="close"
                  >
                    {{ t('waitlist.submitted_close') }}
                  </button>
                </div>
              </Transition>

              <iframe
                :src="formUrl"
                :title="t('waitlist.modal_title')"
                class="w-full border-0"
                style="min-height: 520px; height: 100%; display: block"
                loading="lazy"
                sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
                @load="onIframeLoad"
              />
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>
