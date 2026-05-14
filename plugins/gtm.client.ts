// ── Google Tag Manager — Consent Mode v2 ──────────────────────────────────────
// Stratégie :
//   1. Initialise dataLayer + consent defaults (tout denied) AVANT le chargement GTM
//   2. Si l'utilisateur avait déjà accepté (cookie persisté), update vers granted
//   3. Charge GTM au premier idle du navigateur (zéro impact TBT au démarrage)
//      → GTM se charge toujours, mais GA4 ne pose de cookies que si granted

const GTM_ID = 'GTM-NW6JXRS3'

export default defineNuxtPlugin(() => {
  // ── 1. Initialise dataLayer ───────────────────────────────────────────────
  window.dataLayer = window.dataLayer || []

  function gtag(...args: unknown[]) {
    window.dataLayer.push(args)
  }

  // ── 2. Consent Mode v2 — défauts (doit être poussé AVANT le snippet GTM) ─
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500,
  })

  gtag('js', new Date())

  // Expose gtag globalement pour les composants
  window.gtag = gtag as typeof window.gtag

  // ── 3. Si consentement déjà accordé → update immédiat ────────────────────
  const consentCookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith('nursy_cookie_consent='))
    ?.split('=')[1]

  if (consentCookie === 'true') {
    gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    })
  }

  // ── 4. Chargement GTM différé au premier idle ─────────────────────────────
  const loadGTM = () => {
    if (document.querySelector(`script[src*="${GTM_ID}"]`)) return
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
    document.head.appendChild(script)
  }

  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadGTM, { timeout: 3000 })
  } else {
    // Fallback pour Safari
    setTimeout(loadGTM, 3000)
  }
})

// ── Augmentation de type pour window ────────────────────────────────────────
declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}
