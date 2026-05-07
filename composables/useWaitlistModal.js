export const useWaitlistModal = () => {
  const isOpen = useState('waitlist-modal-open', () => false)
  const { gtag } = useGtag()
  return {
    isOpen,
    open: () => {
      isOpen.value = true
      gtag('event', 'waitlist_modal_open')
    },
    close: () => { isOpen.value = false },
  }
}
