export const useWaitlistModal = () => {
  const isOpen = useState('waitlist-modal-open', () => false)
  const { track } = useAnalytics()
  return {
    isOpen,
    open: (source = 'unknown') => {
      isOpen.value = true
      track('waitlist_open', { source })
    },
    close: () => { isOpen.value = false },
  }
}
