<script setup>
const { isOpen, close } = useDemoModal()

const videoRef = ref(null)

watch(isOpen, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
  if (!val && videoRef.value) {
    videoRef.value.pause()
    videoRef.value.currentTime = 0
  }
  if (val) {
    nextTick(() => {
      videoRef.value?.play().catch(() => {})
    })
  }
})

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
          class="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
          style="background: rgba(10, 14, 20, 0.75); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px)"
          role="dialog"
          aria-modal="true"
          aria-label="Démonstration de l'application Nursy"
          @click.self="close"
        >
          <!-- Conteneur phone -->
          <div
            class="relative flex flex-col items-center"
            @click.stop
          >
            <!-- Bouton fermer -->
            <button
              type="button"
              class="absolute -top-10 right-0 flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              aria-label="Fermer la démo"
              @click="close"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Vidéo -->
            <div class="overflow-hidden rounded-2xl shadow-2xl bg-black"
                 style="width: min(320px, 85vw); aspect-ratio: 9/19.5">
              <video
                ref="videoRef"
                class="w-full h-full object-cover"
                :src="'/NursyPromo.mp4'"
                playsinline
                loop
                preload="metadata"
              />
            </div>

            <!-- Label sous la vidéo -->
            <p class="mt-5 font-jakarta text-xs text-white/50 tracking-wide">
              Nursy — aperçu de l'application
            </p>
          </div>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>
