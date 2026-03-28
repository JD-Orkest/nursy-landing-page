<script setup>
const { t } = useI18n()

const footerLinks = [
  { key: 'footer.legal', href: '#' },
  { key: 'footer.privacy', href: '#' },
  { key: 'footer.contact', href: '#' },
  { key: 'footer.support', href: '#' },
]
</script>

<template>
  <footer class="bg-surface-card pt-10 md:pt-14 pb-8">
    <div class="max-w-7xl mx-auto px-4 md:px-8">
      <div class="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">

        <!-- Logo -->
        <NuxtLink
          to="/"
          class="flex items-center gap-2 shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label="Nursy — retour à l'accueil"
        >
          <svg class="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <span class="font-manrope font-extrabold text-lg text-text-main">Nursy</span>
        </NuxtLink>

        <!-- Liens de navigation -->
        <nav :aria-label="t('footer.nav_aria')">
          <ul class="flex flex-wrap justify-center md:justify-start items-center gap-x-6 gap-y-2" role="list">
            <li v-for="link in footerLinks" :key="link.key">
              <a
                :href="link.href"
                class="font-jakarta text-sm text-info hover:text-primary transition-colors duration-150 min-h-[44px] inline-flex items-center rounded px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {{ t(link.key) }}
              </a>
            </li>
          </ul>
        </nav>

        <!-- Réseaux sociaux -->
        <div class="flex items-center gap-3">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            class="w-11 h-11 rounded-xl bg-surface flex items-center justify-center text-info hover:text-primary hover:bg-secondary/20 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            :aria-label="t('footer.tiktok_aria')"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.22 6.22 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.16 8.16 0 004.77 1.52V6.69z" />
            </svg>
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            class="w-11 h-11 rounded-xl bg-surface flex items-center justify-center text-info hover:text-primary hover:bg-secondary/20 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            :aria-label="t('footer.instagram_aria')"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </a>
        </div>
      </div>

      <div class="mt-10 pt-6 border-t border-secondary/20 text-center">
        <p class="font-jakarta text-xs text-info">{{ t('footer.copyright') }}</p>
      </div>
    </div>
  </footer>
</template>
