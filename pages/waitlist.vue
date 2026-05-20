<script setup lang="ts">
// Page dédiée liste d'attente — accessible via :
//   nursy.be/waitlist       (FR, défaut)
//   nursy.be/nl/waitlist    (NL, préfixe i18n)
//
// Ouvre immédiatement la modale d'inscription puis redirige vers l'accueil.

const { open: openWaitlistModal } = useWaitlistModal()
const localePath = useLocalePath()

// Pas d'indexation : page de redirection utilitaire
useSeoMeta({ robots: 'noindex, nofollow' })

onMounted(async () => {
  openWaitlistModal('social_link')
  await navigateTo(localePath('/'))
})
</script>

<template>
  <div />
</template>
