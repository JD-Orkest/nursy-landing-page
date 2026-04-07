// GTM est chargé uniquement après la première interaction utilisateur
// (scroll, clic, mouvement de souris, toucher, touche clavier)
// → évite de bloquer le thread principal au démarrage (TBT)

export default defineNuxtPlugin(() => {
  const GTM_ID = 'GTM-NW6JXRS3'

  // Initialise dataLayer + window.gtag AVANT le chargement de GTM
  // pour que les events envoyés avant le chargement soient mis en queue
  window.dataLayer = window.dataLayer || []
  window.gtag = function (...args: unknown[]) {
    window.dataLayer.push(args)
  }
  window.gtag('js', new Date())

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
