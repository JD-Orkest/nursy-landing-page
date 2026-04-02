export const useContactModal = () => {
  const isOpen = useState('contact-modal-open', () => false)
  return {
    isOpen,
    open: () => { isOpen.value = true },
    close: () => { isOpen.value = false },
  }
}
