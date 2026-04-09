// GTM est chargé UNIQUEMENT si l'utilisateur a donné son consentement aux cookies
// ET après la première interaction (scroll, clic, etc.) → zéro TBT au démarrage

export default defineNuxtPlugin(() => {
  const GTM_ID = 'GTM-NW6JXRS3'
  const consent = useCookie<boolean | null>('nursy_cookie_consent')

  // Initialise dataLayer + window.gtag immédiatement pour mettre les events en queue
  // Ils seront traités par GTM uniquement si le script est effectivement chargé
  window.dataLayer = window.dataLayer || []
  window.gtag = function (...args: unknown[]) {
    window.dataLayer.push(args)
  }
  window.gtag('js', new Date())

  // Si pas de consentement explicite, on n'attache même pas les listeners
  if (consent.value !== true) return

  let loaded = false

  const loadGTM = () => {
    if (loaded) return
    loaded = true

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
    document.head.appendChild(script)

    TRIGGER_EVENTS.forEach((e) =>
      window.removeEventListener(e, loadGTM)
    )
  }

  const TRIGGER_EVENTS: (keyof WindowEventMap)[] = [
    'scroll',
    'click',
    'mousemove',
    'touchstart',
    'keydown',
  ]

  TRIGGER_EVENTS.forEach((e) =>
    window.addEventListener(e, loadGTM, { once: true, passive: true })
  )
})

// Type augmentation pour window
declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}
