const GA4_ID = 'G-DRRMVY0SF0'

export default defineNuxtPlugin((nuxtApp) => {
  // 1. Init dataLayer
  window.dataLayer = window.dataLayer || []
  function gtag(...args: unknown[]) { window.dataLayer.push(args) }
  window.gtag = gtag as typeof window.gtag

  // 2. Consent Mode v2 — tout denied par défaut
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500,
  })

  gtag('js', new Date())
  
  // ✅ CORRECTION : Le config DOIT être ici, avant le chargement du script.
  // Il sera mis en attente et exécuté dès que le script sera prêt.
  gtag('config', GA4_ID)

  // 3. Vérification du cookie existant
  const consentCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('nursy_cookie_consent='))
    ?.split('=')[1]

  if (consentCookie === 'true') {
    gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    })
  }

  // 4. Charger gtag.js en différé
  const loadGtag = () => {
    if (document.querySelector(`script[src*="${GA4_ID}"]`)) return
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`
    document.head.appendChild(script)
  }

  // Attention : 3000ms c'est long. Si un utilisateur quitte avant 3s, il n'est pas tracké.
  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadGtag, { timeout: 3000 })
  } else {
    setTimeout(loadGtag, 3000)
  }

  // 5. (Optionnel mais recommandé) Tracker les changements de page (SPA)
  nuxtApp.hook('page:finish', () => {
    // Cela permet de tracker les navigations internes dans Nuxt
    gtag('event', 'page_view', {
      page_location: window.location.href,
      page_path: window.location.pathname
    })
  })
})

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}