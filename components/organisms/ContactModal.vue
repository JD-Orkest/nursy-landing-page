<script setup>
const { isOpen, close } = useContactModal()
const { showToast } = useToast()
const { t } = useI18n()
const { gtag } = useGtag()
const config = useRuntimeConfig()

const RECAPTCHA_SITE_KEY = '6LdjdKMsAAAAAI8_G6M5hNa34wx839RYEI-r_aJ5'

// ── Chargement du script reCAPTCHA (seulement côté client) ────────────────
useHead({
  script: [
    {
      src: `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`,
      async: true,
      defer: true,
    },
  ],
})

const form = reactive({ firstname: '', lastname: '', phone: '', email: '', message: '' })
const errors = reactive({ firstname: '', lastname: '', phone: '', email: '', message: '' })
const isSubmitting = ref(false)
const hasError = ref(false)
const firstInput = ref(null)

function clearErrors() {
  errors.firstname = errors.lastname = errors.phone = errors.email = errors.message = ''
}

function validate() {
  clearErrors()
  let valid = true
  if (!form.firstname.trim()) { errors.firstname = t('contact.field_required'); valid = false }
  if (!form.lastname.trim()) { errors.lastname = t('contact.field_required'); valid = false }
  if (!form.phone.trim()) { errors.phone = t('contact.field_required'); valid = false }
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

  const messageText = `Prénom: ${form.firstname}\nNom de famille: ${form.lastname}\nEmail: ${form.email}\nTéléphone: ${form.phone}\nMessage: ${form.message}`

  // ── reCAPTCHA v3 ──────────────────────────────────────────────────────────
  window.grecaptcha.ready(() => {
    window.grecaptcha
      .execute(RECAPTCHA_SITE_KEY, { action: 'submit' })
      .then(async (token) => {
        try {
          await $fetch(config.public.apiUrl, {
            method: 'POST',
            body: {
              message: messageText,
              recaptcha_token: token,
            },
          })
          form.firstname = form.lastname = form.phone = form.email = form.message = ''
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
      })
      .catch(() => {
        hasError.value = true
        isSubmitting.value = false
      })
  })
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

              <!-- Prélastname + lastname côte à côte -->
              <div class="grid grid-cols-2 gap-3">
                <div class="flex flex-col gap-1">
                  <label class="text-xs font-semibold text-text-main" style="font-family: 'PT Sans', sans-serif">
                    {{ t('contact.first_name') }} *
                  </label>
                  <input
                    ref="firstInput"
                    v-model="form.firstname"
                    type="text"
                    autocomplete="given-name"
                    class="bg-[#eaefef] px-4 py-3 text-sm text-text-main placeholder:text-[#9BB3B3] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow w-full"
                    style="border-radius: 6px; font-family: 'PT Sans', sans-serif"
                    :class="{ 'ring-2 ring-red-400/40': errors.firstname }"
                    :placeholder="t('contact.first_name')"
                  />
                  <span v-if="errors.firstname" class="text-xs text-red-500" style="font-family: 'PT Sans', sans-serif">{{ errors.firstname }}</span>
                </div>
                <div class="flex flex-col gap-1">
                  <label class="text-xs font-semibold text-text-main" style="font-family: 'PT Sans', sans-serif">
                    {{ t('contact.last_name') }} *
                  </label>
                  <input
                    v-model="form.lastname"
                    type="text"
                    autocomplete="family-name"
                    class="bg-[#eaefef] px-4 py-3 text-sm text-text-main placeholder:text-[#9BB3B3] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow w-full"
                    style="border-radius: 6px; font-family: 'PT Sans', sans-serif"
                    :class="{ 'ring-2 ring-red-400/40': errors.lastname }"
                    :placeholder="t('contact.last_name')"
                  />
                  <span v-if="errors.lastname" class="text-xs text-red-500" style="font-family: 'PT Sans', sans-serif">{{ errors.lastname }}</span>
                </div>
              </div>

              <!-- Téléphone -->
              <div class="flex flex-col gap-1">
                <label class="text-xs font-semibold text-text-main" style="font-family: 'PT Sans', sans-serif">
                  {{ t('contact.phone') }} *
                </label>
                <input
                  v-model="form.phone"
                  type="tel"
                  autocomplete="tel"
                  class="bg-[#eaefef] px-4 py-3 text-sm text-text-main placeholder:text-[#9BB3B3] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow w-full"
                  style="border-radius: 6px; font-family: 'PT Sans', sans-serif"
                  :class="{ 'ring-2 ring-red-400/40': errors.phone }"
                  placeholder="+32 4xx xx xx xx"
                />
                <span v-if="errors.phone" class="text-xs text-red-500" style="font-family: 'PT Sans', sans-serif">{{ errors.phone }}</span>
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

              <!-- Mention légale reCAPTCHA v3 -->
              <p class="text-center text-[11px] text-[#9BB3B3] leading-relaxed" style="font-family: 'PT Sans', sans-serif">
                Ce site est protégé par reCAPTCHA.
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener" class="underline hover:text-info transition-colors">Politique de confidentialité</a>
                et
                <a href="https://policies.google.com/terms" target="_blank" rel="noopener" class="underline hover:text-info transition-colors">Conditions d'utilisation</a>
                de Google s'appliquent.
              </p>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>
