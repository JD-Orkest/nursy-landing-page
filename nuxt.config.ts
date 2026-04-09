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
    '@nuxt/image',
    ['@nuxtjs/google-fonts', {
      families: {
        Manrope: [400, 600, 700, 800],
        'PT Sans': [400, 700],
        'Plus Jakarta Sans': [400, 500, 600],
      },
      display: 'optional',
      preload: true,
      prefetch: false,
      preconnect: false,
      download: true,
      inject: true,
      outputDir: 'assets',
      fontsDir: 'fonts',
      stylePath: 'css/fonts.css',
    }],
    ['@nuxt/image', {
      quality: 80,
      formats: ['webp', 'png'],
      screens: {
        xs: 320,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
      },
    }],
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
        // Pour Google Search : taille multiple de 48x48 (ex: 96x96 ou 144x144)
        // Favicon 144x144 (multiple de 48px) pour affichage dans Google Search
        { rel: 'icon', type: 'image/png', sizes: '144x144', href: '/favicon.png' },
        // Pour iOS : icône d'accueil (recommandé : 180x180 px, fond plein, pas de transparence)
        // ⚠️  Fournissez /public/apple-touch-icon.png redimensionné en 180x180 px
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        // Google Fonts sont désormais hébergées localement via @nuxtjs/google-fonts
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

  // ── En-têtes de sécurité (OWASP) + Cache long terme ─────────────────────
  routeRules: {
    '/**': {
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      },
    },
    // Assets Nuxt : hachage dans le nom du fichier → cache 1 an immutable
    '/_nuxt/**': {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    },
    // Images statiques et fonts hébergés localement
    '/fonts/**': {
      headers: { 'Cache-Control': 'public, max-age=31536000, immutable' },
    },
    '/assets/**': {
      headers: { 'Cache-Control': 'public, max-age=31536000, immutable' },
    },
    '/_ipx/**': {
      headers: { 'Cache-Control': 'public, max-age=31536000, immutable' },
    },
  },
})
