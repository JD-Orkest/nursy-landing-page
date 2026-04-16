// Capture ?modal=xxx depuis l'URL initiale AVANT tout middleware i18n.
// Le redirect detectBrowserLanguage (alwaysRedirect) efface les query params,
// donc on persiste la valeur dans un useState global pour la récupérer
// dans le onMounted de la page cible.
export default defineNuxtPlugin(() => {
  const modalParam = new URL(window.location.href).searchParams.get('modal')
  if (modalParam) {
    const pendingModal = useState<string | null>('pending-modal', () => null)
    pendingModal.value = modalParam
  }
})
