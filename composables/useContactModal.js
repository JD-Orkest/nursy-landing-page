export const useContactModal = () => {
  const isOpen = useState('contact-modal-open', () => false)
  const { track } = useAnalytics()
  return {
    isOpen,
    open: (source = 'unknown') => {
      isOpen.value = true
      track('contact_open', { source })
    },
    close: () => { isOpen.value = false },
  }
}
