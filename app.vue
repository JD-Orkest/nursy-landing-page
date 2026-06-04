<script setup>
// Attribut lang dynamique sur <html> selon la locale active (fr / nl)
const { locale } = useI18n()
useHead(computed(() => ({
  htmlAttrs: { lang: locale.value },
})))

// Nom de marque officiel pour les SERP Google
useSeoMeta({
  ogSiteName: 'Nursy',
  applicationName: 'Nursy',
  appleMobileWebAppTitle: 'Nursy',
})

useHead({
  meta: [
    { name: 'application-name', content: 'Nursy' },
    { name: 'apple-mobile-web-app-title', content: 'Nursy' },
  ],
  script: [
    {
      type: 'application/ld+json',
      key: 'schema-website',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Nursy',
        alternateName: 'Nursy App',
        url: 'https://nursy.be',
        inLanguage: ['fr-BE', 'nl-BE'],
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
