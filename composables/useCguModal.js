export const useCguModal = () => {
  const isOpen = useState('cgu-modal-open', () => false)

  return {
    isOpen,
    open: () => { isOpen.value = true },
    close: () => { isOpen.value = false },
  }
}