<script setup>
const { isOpen, close } = useContactModal()
const { showToast } = useToast()
const { t } = useI18n()
const { gtag } = useGtag()

const form = reactive({ prenom: '', nom: '', telephone: '', email: '', message: '' })
const errors = reactive({ prenom: '', nom: '', telephone: '', email: '', message: '' })
const isSubmitting = ref(false)
const hasError = ref(false)
const firstInput = ref(null)

function clearErrors() {
  errors.prenom = errors.nom = errors.telephone = errors.email = errors.message = ''
}

function validate() {
  clearErrors()
  let valid = true
  if (!form.prenom.trim()) { errors.prenom = t('contact.field_required'); valid = false }
  if (!form.nom.trim()) { errors.nom = t('contact.field_required'); valid = false }
  if (!form.telephone.trim()) { errors.telephone = t('contact.field_required'); valid = false }
  if (!form.email.trim()) {
    errors.email = t('contact.field_required'); valid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = t('contact.invalid_email'); valid = false
  }
  if (!form.message.trim()) { errors.message = t('contact.field_required'); valid = false }
  return valid
}

async function submit() {
  if (!validate()) return
  isSubmitting.value = true
  hasError.value = false
  try {
    await $fetch('http://192.168.1.12/api/web-contact', { method: 'POST', body: { ...form } })
    form.prenom = form.nom = form.telephone = form.email = form.message = ''
    clearErrors()
    close()
    gtag('event', 'contact_form_success')
    showToast(t('contact.toast_success'))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch {
    hasError.value = true
  } finally {
    isSubmitting.value = false
  }
}

// Echap ferme le modal
const keydownHandler = (e) => { if (e.key === 'Escape' && isOpen.value) close() }
onMounted(() => window.addEventListener('keydown', keydownHandler))
onUnmounted(() => window.removeEventListener('keydown', keydownHandler))

// Scroll lock + autofocus
watch(isOpen, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
  if (val) nextTick(() => firstInput.value?.focus())
})
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
          class="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto"
          style="background: rgba(24, 28, 29, 0.5); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px)"
          role="dialog"
          aria-modal="true"
          :aria-label="t('contact.title')"
          @click.self="close"
        >
          <!-- Carte formulaire -->
          <div
            class="relative bg-white w-full max-w-md shadow-2xl my-auto"
            style="border-radius: 12px"
            @click.stop
          >
            <!-- En-tête -->
            <div class="flex items-start justify-between px-6 pt-6 pb-4">
              <div>
                <h2 class="font-manrope font-extrabold text-xl text-text-main">
                  {{ t('contact.title') }}
                </h2>
                <p class="font-jakarta text-sm text-info mt-1">
                  {{ t('contact.subtitle') }}
                </p>
              </div>
              <button
                type="button"
                class="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-info hover:text-primary hover:bg-[#eaefef] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ml-4 mt-0.5"
                :aria-label="t('contact.close')"
                @click="close"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Formulaire -->
            <form class="px-6 pb-6 flex flex-col gap-4" novalidate @submit.prevent="submit">

              <!-- Prénom + Nom côte à côte -->
              <div class="grid grid-cols-2 gap-3">
                <div class="flex flex-col gap-1">
                  <label class="text-xs font-semibold text-text-main" style="font-family: 'PT Sans', sans-serif">
                    {{ t('contact.first_name') }} *
                  </label>
                  <input
                    ref="firstInput"
                    v-model="form.prenom"
                    type="text"
                    autocomplete="given-name"
                    class="bg-[#eaefef] px-4 py-3 text-sm text-text-main placeholder:text-[#9BB3B3] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow w-full"
                    style="border-radius: 6px; font-family: 'PT Sans', sans-serif"
                    :class="{ 'ring-2 ring-red-400/40': errors.prenom }"
                    :placeholder="t('contact.first_name')"
                  />
                  <span v-if="errors.prenom" class="text-xs text-red-500" style="font-family: 'PT Sans', sans-serif">{{ errors.prenom }}</span>
                </div>
                <div class="flex flex-col gap-1">
                  <label class="text-xs font-semibold text-text-main" style="font-family: 'PT Sans', sans-serif">
                    {{ t('contact.last_name') }} *
                  </label>
                  <input
                    v-model="form.nom"
                    type="text"
                    autocomplete="family-name"
                    class="bg-[#eaefef] px-4 py-3 text-sm text-text-main placeholder:text-[#9BB3B3] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow w-full"
                    style="border-radius: 6px; font-family: 'PT Sans', sans-serif"
                    :class="{ 'ring-2 ring-red-400/40': errors.nom }"
                    :placeholder="t('contact.last_name')"
                  />
                  <span v-if="errors.nom" class="text-xs text-red-500" style="font-family: 'PT Sans', sans-serif">{{ errors.nom }}</span>
                </div>
              </div>

              <!-- Téléphone -->
              <div class="flex flex-col gap-1">
                <label class="text-xs font-semibold text-text-main" style="font-family: 'PT Sans', sans-serif">
                  {{ t('contact.phone') }} *
                </label>
                <input
                  v-model="form.telephone"
                  type="tel"
                  autocomplete="tel"
                  class="bg-[#eaefef] px-4 py-3 text-sm text-text-main placeholder:text-[#9BB3B3] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow w-full"
                  style="border-radius: 6px; font-family: 'PT Sans', sans-serif"
                  :class="{ 'ring-2 ring-red-400/40': errors.telephone }"
                  placeholder="+32 4xx xx xx xx"
                />
                <span v-if="errors.telephone" class="text-xs text-red-500" style="font-family: 'PT Sans', sans-serif">{{ errors.telephone }}</span>
              </div>

              <!-- E-mail -->
              <div class="flex flex-col gap-1">
                <label class="text-xs font-semibold text-text-main" style="font-family: 'PT Sans', sans-serif">
                  {{ t('contact.email') }} *
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  autocomplete="email"
                  class="bg-[#eaefef] px-4 py-3 text-sm text-text-main placeholder:text-[#9BB3B3] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow w-full"
                  style="border-radius: 6px; font-family: 'PT Sans', sans-serif"
                  :class="{ 'ring-2 ring-red-400/40': errors.email }"
                  placeholder="exemple@email.com"
                />
                <span v-if="errors.email" class="text-xs text-red-500" style="font-family: 'PT Sans', sans-serif">{{ errors.email }}</span>
              </div>

              <!-- Message -->
              <div class="flex flex-col gap-1">
                <label class="text-xs font-semibold text-text-main" style="font-family: 'PT Sans', sans-serif">
                  {{ t('contact.message') }} *
                </label>
                <textarea
                  v-model="form.message"
                  rows="4"
                  class="bg-[#eaefef] px-4 py-3 text-sm text-text-main placeholder:text-[#9BB3B3] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow resize-none w-full"
                  style="border-radius: 6px; font-family: 'PT Sans', sans-serif"
                  :class="{ 'ring-2 ring-red-400/40': errors.message }"
                  :placeholder="t('contact.placeholder_message')"
                />
                <span v-if="errors.message" class="text-xs text-red-500" style="font-family: 'PT Sans', sans-serif">{{ errors.message }}</span>
              </div>

              <!-- Erreur API -->
              <p v-if="hasError" class="text-sm text-red-500 text-center" style="font-family: 'PT Sans', sans-serif">
                {{ t('contact.send_error') }}
              </p>

              <!-- Bouton envoi -->
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full min-h-[48px] bg-gradient-to-r from-primary to-primary-dark text-white font-manrope font-semibold text-sm shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                style="border-radius: 30px"
              >
                <span v-if="!isSubmitting">{{ t('contact.submit') }}</span>
                <span v-else class="flex items-center justify-center gap-2">
                  <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {{ t('contact.sending') }}
                </span>
              </button>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>
