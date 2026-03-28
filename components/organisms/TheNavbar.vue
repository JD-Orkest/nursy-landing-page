<script setup>
// ref et useI18n sont auto-importés dans Nuxt 3
const { t, locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const isMenuOpen = ref(false)

const navLinks = [
  { key: 'nav.profiles', href: '#profiles' },
  { key: 'nav.modularity', href: '#modularity' },
  { key: 'nav.features', href: '#features' },
  { key: 'nav.security', href: '#security' },
]

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
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
        <!-- TODO: Remplacer par <img src="~/assets/images/logo.svg" alt="Nursy" class="h-8 w-auto" /> -->
        <svg
          class="w-7 h-7 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
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
        <!-- NuxtLink génère un <a href="/nl/"> réel → meilleur SEO et accessibilité -->
        <div
          class="flex items-center rounded-lg overflow-hidden"
          role="group"
          :aria-label="t('lang.switcher_aria')"
        >
          <NuxtLink
            v-for="lang in ['fr', 'nl']"
            :key="lang"
            :to="switchLocalePath(lang)"
            class="px-3 min-h-[36px] flex items-center text-xs font-semibold font-manrope uppercase transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
            :class="
              locale === lang
                ? 'bg-primary text-white'
                : 'text-info hover:text-primary hover:bg-secondary/20'
            "
            :aria-current="locale === lang ? 'true' : undefined"
          >
            {{ t(`lang.${lang}`) }}
          </NuxtLink>
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
            <NuxtLink
              v-for="lang in ['fr', 'nl']"
              :key="lang"
              :to="switchLocalePath(lang)"
              class="px-5 min-h-[48px] flex items-center text-sm font-semibold font-manrope uppercase rounded-xl transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              :class="
                locale === lang
                  ? 'bg-primary text-white'
                  : 'bg-secondary/20 text-info hover:text-primary'
              "
              :aria-current="locale === lang ? 'true' : undefined"
              @click="closeMenu"
            >
              {{ t(`lang.${lang}`) }}
            </NuxtLink>
          </div>

          <BaseButton href="#download" variant="primary" class="mt-1 w-full" @click="closeMenu">
            {{ t('nav.download') }}
          </BaseButton>
        </div>
      </div>
    </Transition>
  </header>
</template>
