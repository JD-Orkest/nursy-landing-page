// Composable useGtag compatible avec le plugin gtag-lazy.client.ts
// Remplace l'export du module nuxt-gtag (les appels sont mis en queue
// dans window.dataLayer jusqu'à ce que GTM se charge après interaction)
export function useGtag() {
  const gtag = (command: string, eventName: string, params?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag(command, eventName, params)
    }
  }
  return { gtag }
}
