export const useWaitlistModal = () => {
  const isOpen = useState('waitlist-modal-open', () => false)
  return {
    isOpen,
    open: () => { isOpen.value = true },
    close: () => { isOpen.value = false },
  }
}
