export const useToast = () => {
  const toast = useState('app-toast-message', () => null)

  const showToast = (message, duration = 5000) => {
    toast.value = message
    if (import.meta.client) {
      setTimeout(() => { toast.value = null }, duration)
    }
  }

  return { toast, showToast }
}
