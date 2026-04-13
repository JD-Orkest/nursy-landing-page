<script setup>
// Attribut lang dynamique sur <html> selon la locale active (fr / nl)
const { locale } = useI18n()
useHead(computed(() => ({
  htmlAttrs: { lang: locale.value },
})))

// Nom de marque officiel pour les SERP Google
useSeoMeta({
  ogSiteName: 'Nursy',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Nursy',
        url: 'https://nursy.be/',
      }),
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
