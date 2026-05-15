export function useAnalytics() {
  const track = (eventName: string, params?: Record<string, unknown>) => {
    if (typeof window === 'undefined' || !window.gtag) return
    // ✅ Syntaxe gtag native
    window.gtag('event', eventName, params ?? {})
  }

  return { track }
}
