const META_PIXEL_ID = '1559321565862200'

export default defineNuxtPlugin((nuxtApp) => {
  // 1. Définir le stub fbq avant tout (évite les erreurs si appelé trop tôt)
  if (!window.fbq) {
    const fbqFn: FacebookPixel = function (...args) {
      if (fbqFn.callMethod) {
        fbqFn.callMethod.apply(fbqFn, args)
      } else {
        fbqFn.queue.push(args)
      }
    }
    fbqFn.push = fbqFn
    fbqFn.loaded = false
    fbqFn.version = '2.0'
    fbqFn.queue = []
    window.fbq = fbqFn
    window._fbq = fbqFn
  }

  // 2. Charger le script et initialiser le pixel
  const loadPixel = () => {
    if (document.querySelector('script[src*="fbevents.js"]')) return

    window.fbq('init', META_PIXEL_ID)
    window.fbq('track', 'PageView')

    const script = document.createElement('script')
    script.async = true
    script.src = 'https://connect.facebook.net/en_US/fbevents.js'
    document.head.appendChild(script)

    window.fbq.loaded = true
  }

  // 3. Vérifier le consentement existant (visiteur de retour)
  const consentCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('nursy_cookie_consent='))
    ?.split('=')[1]

  if (consentCookie === 'true') {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadPixel, { timeout: 3000 })
    } else {
      setTimeout(loadPixel, 3000)
    }
  }

  // 4. Exposer loadPixel pour que CookieBanner puisse l'appeler au consentement
  nuxtApp.provide('loadMetaPixel', loadPixel)

  // 5. Tracker les changements de page (navigation SPA)
  nuxtApp.hook('page:finish', () => {
    if (window.fbq?.loaded) {
      window.fbq('track', 'PageView')
    }
  })
})

type FacebookPixel = {
  (...args: unknown[]): void
  callMethod?: (...args: unknown[]) => void
  push: FacebookPixel
  loaded: boolean
  version: string
  queue: unknown[][]
}

declare global {
  interface Window {
    fbq: FacebookPixel
    _fbq: FacebookPixel
  }
}

declare module '#app' {
  interface NuxtApp {
    $loadMetaPixel: () => void
  }
}
