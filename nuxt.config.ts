// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  // ── SSG : génération statique pour GitHub Pages ────────────────────────────
  ssr: true,
  nitro: {
    preset: 'static',
    prerender: {
      failOnError: false,
    },
  },

  // ── Modules ────────────────────────────────────────────────────────────────
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/sitemap',
    ['nuxt-gtag', { id: 'GTM-NW6JXRS3' }],
  ],

  // ── Composants : désactive le préfixe de sous-dossier ─────────────────────
  // Sans ça, components/organisms/TheNavbar.vue → <OrganismsTheNavbar>
  // Avec pathPrefix: false → <TheNavbar> (nom du fichier uniquement)
  components: [
    { path: '~/components', pathPrefix: false },
  ],

  // ── Internationalisation (hreflang automatique) ────────────────────────────
  i18n: {
    // /fr/ + /nl/ (prefix_except_default → / = fr, /nl/ = nl)
    strategy: 'prefix_except_default',
    locales: [
      {
        code: 'fr',
        language: 'fr-BE',
        file: 'fr.json',
        name: 'Français',
      },
      {
        code: 'nl',
        language: 'nl-BE',
        file: 'nl.json',
        name: 'Nederlands',
      },
    ],
    defaultLocale: 'fr',
    // restructureDir: false → langDir résolu depuis la racine du projet (compat v8)
    restructureDir: false,
    langDir: 'locales/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'nursy_lang',
      redirectOn: 'root',
      alwaysRedirect: false,
    },
    // Les balises hreflang sont gérées via useLocaleHead() dans layouts/default.vue
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://nursy.be',
    bundle: {
      optimizeTranslationDirective: false,
    },
  },

  // ── CSS global ─────────────────────────────────────────────────────────────
  css: ['~/assets/css/tailwind.css'],

  // ── Head par défaut (complété par useSeoMeta dans chaque page) ─────────────
  app: {
    // Sur GitHub Pages (sous-dossier), NUXT_APP_BASE_URL = /nursy-landing-page/
    // Sur nursy.be (domaine racine), laisser vide → valeur par défaut '/'
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'theme-color', content: '#15919B' },
        { name: 'robots', content: 'index, follow' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=PT+Sans:wght@400;700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap',
        },
      ],
    },
  },

  // ── Tailwind ───────────────────────────────────────────────────────────────
  tailwindcss: {
    configPath: '~/tailwind.config.js',
    exposeConfig: false,
  },

  // ── PostCSS (remplace postcss.config.js) ──────────────────────────────────
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // ── Runtime Config (variables publiques) ─────────────────────────────────
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL ?? 'https://apocrine-actionably-shelley.ngrok-free.dev/api/web-contact',
    },
  },

  // ── Sitemap ────────────────────────────────────────────────────────────────
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://nursy.be',
    name: 'Nursy',
  },

  sitemap: {
    // @nuxtjs/i18n est détecté automatiquement → génère /sitemap.xml
    // avec les routes FR (/) et NL (/nl/) et les alternates hreflang
    urls: [
      { loc: '/', priority: 1.0, changefreq: 'weekly' },
      { loc: '/nl/', priority: 0.9, changefreq: 'weekly' },
    ],
  },

  // ── En-têtes de sécurité (OWASP) ──────────────────────────────────────────
  routeRules: {
    '/**': {
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      },
    },
  },
})
