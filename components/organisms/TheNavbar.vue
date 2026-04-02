<script setup>
// ref et useI18n sont auto-importés dans Nuxt 3
const { t, locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const router = useRouter()
const isMenuOpen = ref(false)

const navLinks = [
  { key: 'nav.profiles', href: '#profiles' },
  { key: 'nav.modularity', href: '#modularity' },
  { key: 'nav.features', href: '#features' },
  { key: 'nav.security', href: '#security' },
  { key: 'nav.pricing', href: '#pricing' },
]

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}

// Supprime le hash de l'URL et scroll en haut lors du changement de langue
function switchLang(lang) {
  const path = switchLocalePath(lang)
  const cleanPath = path.split('#')[0] || '/'
  router.push(cleanPath).then(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  })
  closeMenu()
}
</script>

<template>
  <header class="relative sticky top-0 z-50 bg-surface/80 backdrop-blur-lg shadow-sm">
    <nav
      class="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20"
      :aria-label="t('nav.main_label')"
    >
      <!-- ─── Logo ─── -->
      <NuxtLink
        to="/"
        class="flex items-center gap-2 shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        aria-label="Nursy — accueil"
      >
        <!-- Logo NURSY — path SVG inliné avec fill="currentColor" pour prendre la couleur text-primary -->
        <svg
          class="w-7 h-7 text-primary"
          viewBox="0 0 1080 1080"
          fill="currentColor"
          aria-hidden="true"
        >
          <path fill-rule="evenodd" d="m353.46 139.25c-4.86 0.54-9.38 1.93-14.96 4.61-4.4 2.11-10.42 6.04-13.38 8.74-4.08 3.72-6.41 7.07-9.66 13.9-2.36 4.95-4.78 11.36-5.38 14.25-0.76 3.71-1.08 106.14-1.08 349.75 0 326.02 0.09 344.7 1.75 348.19 0.96 2.03 3.1 4.5 4.75 5.5 1.67 1 5 1.82 7.5 1.84 3.21 0.03 5.34-0.62 7.43-2.25 1.61-1.25 3.63-3.86 4.5-5.78 1.41-3.15 1.62-37.58 2.07-348.5l0.5-345c3.37-6.97 6.19-10.69 8.43-12.75 2.24-2.06 5.76-4.2 7.82-4.74 2.06-0.55 4.88-1.01 6.25-1.02 1.38-0.01 4.08 0.5 6 1.13 1.93 0.64 4.96 2.22 6.75 3.52 1.79 1.3 4.99 4.95 7.12 8.11 2.12 3.16 8.59 13.63 14.36 23.25 5.77 9.63 20.75 34.38 33.29 55 12.55 20.63 26.72 44.02 31.51 52 4.79 7.98 14.47 23.95 21.52 35.5 7.05 11.55 19.2 31.57 26.99 44.5 7.8 12.93 19.11 31.6 25.14 41.5 6.03 9.9 14.03 22.73 17.78 28.5 3.75 5.77 9.85 15.67 13.56 22 3.7 6.33 11.03 18.7 16.28 27.5 5.24 8.8 15.31 25.44 22.37 36.99 7.06 11.54 21.53 35.39 32.17 53 10.63 17.6 20.34 33.36 21.57 35.01 1.23 1.65 3.77 4.09 5.66 5.43 1.89 1.33 5.01 2.63 6.93 2.87 2.03 0.27 4.97-0.22 7-1.15 1.92-0.89 4.29-2.97 5.25-4.63 0.96-1.66 1.75-4.82 1.75-7.02 0-2.2-0.61-5.46-1.35-7.25-0.74-1.79-4.84-9.1-9.12-16.25-4.28-7.15-15.08-24.92-24-39.5-8.92-14.58-24.46-40-34.53-56.5-10.07-16.5-20.44-33.6-23.05-38-2.6-4.4-13.02-21.73-23.15-38.5-10.13-16.77-20.84-34.32-23.79-39-2.95-4.68-11.89-19.3-19.86-32.5-7.97-13.2-18.84-31.2-24.16-40-5.31-8.8-15.28-25-22.15-36-6.87-11-18.71-30.57-26.31-43.5-7.59-12.93-19.04-31.93-25.42-42.23-6.39-10.3-14.53-23.51-18.11-29.36-3.57-5.85-9.31-13.51-12.75-17.02-4.31-4.41-8.5-7.49-13.5-9.92-5.08-2.48-9.36-3.75-14.29-4.27-3.87-0.4-10.17-0.38-14 0.05zm395.63 22.91c-1.88 1.29-4.36 4.14-5.5 6.34l-2.09 4-1 669c-3.58 7.75-5.38 10.85-6.31 11.89-0.93 1.04-3.49 2.72-5.69 3.73-2.2 1.01-6.02 1.84-8.5 1.85-2.48 0.01-6.19-0.43-8.25-0.98-2.06-0.54-5.19-2.23-6.95-3.74-1.76-1.51-7.3-9.05-12.32-16.75-5.02-7.7-12.97-20.3-17.66-28-4.7-7.7-11.23-18.5-14.51-24-3.29-5.5-12.86-21.25-21.28-35-8.41-13.75-25.06-41.2-36.99-61-11.94-19.8-30.04-49.73-40.23-66.5-10.19-16.77-25.94-42.65-34.99-57.5-9.06-14.85-19.86-32.4-24-39-4.14-6.6-10.61-17.4-14.38-24-3.77-6.6-13.8-23.25-22.29-37-8.49-13.75-18.37-29.95-21.97-36-3.6-6.05-10.09-16.63-14.44-23.5-4.35-6.88-9.33-13.98-11.07-15.79-1.74-1.81-4.74-3.71-6.67-4.23-2.26-0.62-4.74-0.6-7 0.05-1.92 0.56-4.75 2.24-6.27 3.74-1.53 1.5-3.04 4.08-3.37 5.73-0.33 1.65 0.05 5.02 0.85 7.5 0.79 2.48 14.73 26.55 30.97 53.5 16.23 26.95 43.47 71.95 60.53 100 17.06 28.05 38.42 63.15 47.46 78 9.05 14.85 23.9 39.15 33.01 54 9.11 14.85 23.21 38.02 31.34 51.5 8.13 13.48 19.13 31.7 24.45 40.5 5.32 8.8 14.77 24.33 20.99 34.5 6.22 10.17 14.23 23.45 17.8 29.5 3.57 6.05 8.29 13.7 10.5 17 2.21 3.3 5.64 7.72 7.63 9.82 1.98 2.11 6.31 5.35 9.61 7.21 3.3 1.86 8.7 4.38 12 5.59 4.86 1.78 8.09 2.2 17 2.17 8.73-0.02 12.24-0.47 17-2.2 3.3-1.19 7.8-3.23 10-4.52 2.2-1.3 6.29-4.77 9.09-7.71 2.8-2.95 6.35-7.84 7.87-10.86 1.53-3.02 3.64-8.88 4.67-13 1.84-7.28 1.89-17.37 1.88-341.75-0.01-280.88-0.23-334.77-1.38-337.5-0.76-1.79-2.6-4.38-4.1-5.75-1.9-1.74-4.14-2.6-7.38-2.84-3.61-0.26-5.41 0.19-8.06 2z" />
        </svg>
        <span class="font-manrope font-extrabold text-xl text-text-main">Nursy</span>
      </NuxtLink>

      <!-- ─── Desktop : liens de navigation ─── -->
      <ul class="hidden md:flex items-center gap-8" role="list">
        <li v-for="link in navLinks" :key="link.key">
          <a
            :href="link.href"
            class="font-jakarta text-sm font-medium text-text-main hover:text-primary transition-colors duration-150 rounded py-1 px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {{ t(link.key) }}
          </a>
        </li>
      </ul>

      <!-- ─── Desktop : sélecteur de langue + CTA ─── -->
      <div class="hidden md:flex items-center gap-4">
        <div
          class="flex items-center rounded-lg overflow-hidden"
          role="group"
          :aria-label="t('lang.switcher_aria')"
        >
          <button
            v-for="lang in ['fr', 'nl']"
            :key="lang"
            type="button"
            class="px-3 min-h-[36px] flex items-center text-xs font-semibold font-manrope uppercase transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
            :class="
              locale === lang
                ? 'bg-primary text-white'
                : 'text-info hover:text-primary hover:bg-secondary/20'
            "
            :aria-current="locale === lang ? 'true' : undefined"
            @click="switchLang(lang)"
          >
            {{ t(`lang.${lang}`) }}
          </button>
        </div>

        <BaseButton href="#download" variant="primary">
          {{ t('nav.download') }}
        </BaseButton>
      </div>

      <!-- ─── Mobile : hamburger ─── -->
      <button
        class="md:hidden flex items-center justify-center w-12 h-12 rounded-xl text-text-main hover:bg-secondary/20 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        :aria-expanded="isMenuOpen"
        :aria-label="isMenuOpen ? t('nav.close_menu') : t('nav.open_menu')"
        aria-controls="mobile-menu"
        @click="toggleMenu"
      >
        <svg
          v-if="!isMenuOpen"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg
          v-else
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <!-- ─── Mobile : tiroir ─── -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isMenuOpen"
        id="mobile-menu"
        class="md:hidden absolute top-full left-0 right-0 bg-surface/95 backdrop-blur-lg shadow-lg"
        role="dialog"
        aria-modal="true"
        :aria-label="t('nav.main_label')"
      >
        <div class="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
          <a
            v-for="link in navLinks"
            :key="link.key"
            :href="link.href"
            class="font-jakarta text-base font-medium text-text-main hover:text-primary min-h-[48px] flex items-center px-3 rounded-xl hover:bg-secondary/20 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            @click="closeMenu"
          >
            {{ t(link.key) }}
          </a>

          <div
            class="flex items-center gap-2 px-3 py-3"
            role="group"
            :aria-label="t('lang.switcher_aria')"
          >
            <button
              v-for="lang in ['fr', 'nl']"
              :key="lang"
              type="button"
              class="px-5 min-h-[48px] flex items-center text-sm font-semibold font-manrope uppercase rounded-xl transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              :class="
                locale === lang
                  ? 'bg-primary text-white'
                  : 'bg-secondary/20 text-info hover:text-primary'
              "
              :aria-current="locale === lang ? 'true' : undefined"
              @click="switchLang(lang)"
            >
              {{ t(`lang.${lang}`) }}
            </button>
          </div>

          <BaseButton href="#download" variant="primary" class="mt-1 w-full" @click="closeMenu">
            {{ t('nav.download') }}
          </BaseButton>
        </div>
      </div>
    </Transition>
  </header>
</template>
