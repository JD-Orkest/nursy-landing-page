<script setup lang="ts">
// Page dédiée liste d'attente — accessible via :
//   nursy.be/waitlist       (FR, défaut)
//   nursy.be/nl/waitlist    (NL, préfixe i18n)
//
// Ouvre immédiatement la modale ; dès que l'utilisateur la ferme,
// redirige vers l'accueil (sans laisser /waitlist dans l'URL).

const { open: openWaitlistModal, isOpen } = useWaitlistModal()
const localePath = useLocalePath()

// Pas d'indexation : page de redirection utilitaire
useSeoMeta({ robots: 'noindex, nofollow' })

onMounted(() => {
  openWaitlistModal('social_link')
})

// Dès que la modale se ferme, retour à l'accueil
watch(isOpen, (val) => {
  if (!val) navigateTo(localePath('/'))
})
</script>

<template>
  <div />
</template>
