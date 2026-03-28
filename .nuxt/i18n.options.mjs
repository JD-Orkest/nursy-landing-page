
// @ts-nocheck
import locale_fr_46json_b46b0cdb from "#nuxt-i18n/b46b0cdb";
import locale_nl_46json_246b3dd1 from "#nuxt-i18n/246b3dd1";

export const localeCodes =  [
  "fr",
  "nl"
]

export const localeLoaders = {
  fr: [
    {
      key: "locale_fr_46json_b46b0cdb",
      load: () => Promise.resolve(locale_fr_46json_b46b0cdb),
      cache: true
    }
  ],
  nl: [
    {
      key: "locale_nl_46json_246b3dd1",
      load: () => Promise.resolve(locale_nl_46json_246b3dd1),
      cache: true
    }
  ]
}

export const vueI18nConfigs = []

export const nuxtI18nOptions = {
  restructureDir: false,
  experimental: {
    localeDetector: "",
    switchLocalePathLinkSSR: false,
    autoImportTranslationFunctions: false,
    typedPages: true,
    typedOptionsAndMessages: false,
    generatedLocaleFilePathFormat: "absolute",
    alternateLinkCanonicalQueries: false,
    hmr: true
  },
  bundle: {
    compositionOnly: true,
    runtimeOnly: false,
    fullInstall: true,
    dropMessageCompiler: false,
    optimizeTranslationDirective: false
  },
  compilation: {
    strictMessage: true,
    escapeHtml: false
  },
  customBlocks: {
    defaultSFCLang: "json",
    globalSFCScope: false
  },
  locales: [
    {
      code: "fr",
      language: "fr-BE",
      name: "Français",
      files: [
        {
          path: "/Users/juliendeprez/Dev/Projets/nursy-landing/locales/fr.json",
          cache: undefined
        }
      ]
    },
    {
      code: "nl",
      language: "nl-BE",
      name: "Nederlands",
      files: [
        {
          path: "/Users/juliendeprez/Dev/Projets/nursy-landing/locales/nl.json",
          cache: undefined
        }
      ]
    }
  ],
  defaultLocale: "fr",
  defaultDirection: "ltr",
  routesNameSeparator: "___",
  trailingSlash: false,
  defaultLocaleRouteNameSuffix: "default",
  strategy: "prefix_except_default",
  lazy: false,
  langDir: "locales/",
  rootRedirect: undefined,
  detectBrowserLanguage: {
    alwaysRedirect: false,
    cookieCrossOrigin: false,
    cookieDomain: null,
    cookieKey: "nursy_lang",
    cookieSecure: false,
    fallbackLocale: "",
    redirectOn: "root",
    useCookie: true
  },
  differentDomains: false,
  baseUrl: "https://nursy.app",
  customRoutes: "page",
  pages: {},
  skipSettingLocaleOnNavigate: false,
  types: "composition",
  debug: false,
  parallelPlugin: false,
  multiDomainLocales: false,
  i18nModules: []
}

export const normalizedLocales = [
  {
    code: "fr",
    language: "fr-BE",
    name: "Français",
    files: [
      {
        path: "/Users/juliendeprez/Dev/Projets/nursy-landing/locales/fr.json",
        cache: undefined
      }
    ]
  },
  {
    code: "nl",
    language: "nl-BE",
    name: "Nederlands",
    files: [
      {
        path: "/Users/juliendeprez/Dev/Projets/nursy-landing/locales/nl.json",
        cache: undefined
      }
    ]
  }
]

export const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n"
export const parallelPlugin = false
export const isSSG = false
export const hasPages = true

export const DEFAULT_COOKIE_KEY = "i18n_redirected"
export const DEFAULT_DYNAMIC_PARAMS_KEY = "nuxtI18nInternal"
export const SWITCH_LOCALE_PATH_LINK_IDENTIFIER = "nuxt-i18n-slp"
/** client **/
if(import.meta.hot) {

function deepEqual(a, b, ignoreKeys = []) {
  // Same reference?
  if (a === b) return true

  // Check if either is null or not an object
  if (a == null || b == null || typeof a !== 'object' || typeof b !== 'object') {
    return false
  }

  // Get top-level keys, excluding ignoreKeys
  const keysA = Object.keys(a).filter(k => !ignoreKeys.includes(k))
  const keysB = Object.keys(b).filter(k => !ignoreKeys.includes(k))

  // Must have the same number of keys (after ignoring)
  if (keysA.length !== keysB.length) {
    return false
  }

  // Check each property
  for (const key of keysA) {
    if (!keysB.includes(key)) {
      return false
    }

    const valA = a[key]
    const valB = b[key]

    // Compare functions stringified
    if (typeof valA === 'function' && typeof valB === 'function') {
      if (valA.toString() !== valB.toString()) {
        return false
      }
    }
    // If nested, do a normal recursive check (no ignoring at deeper levels)
    else if (typeof valA === 'object' && typeof valB === 'object') {
      if (!deepEqual(valA, valB)) {
        return false
      }
    }
    // Compare primitive values
    else if (valA !== valB) {
      return false
    }
  }

  return true
}



async function loadCfg(config) {
  const nuxt = useNuxtApp()
  const { default: resolver } = await config()
  return typeof resolver === 'function' ? await nuxt.runWithContext(() => resolver()) : resolver
}


  import.meta.hot.accept("../locales/fr.json", async mod => {
    localeLoaders["fr"][0].load = () => Promise.resolve(mod.default)
    await useNuxtApp()._nuxtI18nDev.resetI18nProperties("fr")
  })

  import.meta.hot.accept("../locales/nl.json", async mod => {
    localeLoaders["nl"][0].load = () => Promise.resolve(mod.default)
    await useNuxtApp()._nuxtI18nDev.resetI18nProperties("nl")
  })



}
/** client-end **/