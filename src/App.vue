<script setup>
import TheNavbar from './components/organisms/TheNavbar.vue'
import HeroSection from './components/organisms/HeroSection.vue'
import FeaturesSection from './components/organisms/FeaturesSection.vue'
import SecuritySection from './components/organisms/SecuritySection.vue'
import CtaSection from './components/organisms/CtaSection.vue'
import TheFooter from './components/organisms/TheFooter.vue'
</script>

<template>
  <div class="min-h-screen bg-surface">
    <TheNavbar />
    <main>
      <HeroSection />
      <FeaturesSection />
      <SecuritySection />
      <CtaSection />
    </main>
    <TheFooter />
  </div>
</template>
