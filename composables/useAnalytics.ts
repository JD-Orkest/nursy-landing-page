// Composable centralisé pour le tracking GA4 via GTM (dataLayer)
// Usage : const { track } = useAnalytics()
//         track('waitlist_open', { source: 'hero' })
export function useAnalytics() {
  const track = (eventName: string, params?: Record<string, unknown>) => {
    if (typeof window === 'undefined') return
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: eventName,
      ...params,
    })
  }

  return { track }
}
