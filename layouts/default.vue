<script setup>
// useLocaleHead injecte automatiquement les <link rel="alternate" hreflang="...">
// et les balises lang/dir sur <html> pour le SEO bilingue
const head = useLocaleHead({ addSeoAttributes: true })
useHead(head)
</script>

<template>
  <div class="min-h-screen bg-surface">
    <TheNavbar />
    <slot />
    <TheFooter />
  </div>
</template>
