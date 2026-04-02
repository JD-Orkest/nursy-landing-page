export const useContactModal = () => {
  const isOpen = useState('contact-modal-open', () => false)
  const { gtag } = useGtag()
  return {
    isOpen,
    open: () => {
      isOpen.value = true
      gtag('event', 'contact_modal_open')
    },
    close: () => { isOpen.value = false },
  }
}
