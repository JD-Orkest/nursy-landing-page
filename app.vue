<script setup>
// Attribut lang dynamique sur <html> selon la locale active (fr / nl)
const { locale } = useI18n()
useHead(computed(() => ({
  htmlAttrs: { lang: locale.value },
})))
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
