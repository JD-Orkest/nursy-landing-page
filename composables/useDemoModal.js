export const useDemoModal = () => {
  const isOpen = useState('demo-modal-open', () => false)
  const { track } = useAnalytics()
  return {
    isOpen,
    open: (source = 'unknown') => {
      isOpen.value = true
      track('demo_open', { source })
    },
    close: () => { isOpen.value = false },
  }
}
