<script setup lang="ts">
const { t, locale } = useI18n()

// ── SEO Meta réactif par langue ────────────────────────────────────────────
const seoData = computed(() => {
  const isFr = locale.value === 'fr'
  return {
    title: isFr
      ? 'Nursy — Remplacement infirmier modulaire & soins à domicile'
      : 'Nursy — Modulaire thuisverpleging vervanging & zorgen aan huis',
    description: isFr
      ? 'La plateforme de remplacement modulaire pour infirmiers indépendants en Belgique. Déléguez vos visites sans perdre le contrôle, avec une sécurité certifiée ISO 27001.'
      : 'Het modulaire vervangingsplatform voor zelfstandige verpleegkundigen in België. Delegeer uw bezoeken zonder controle te verliezen, met ISO 27001-gecertificeerde beveiliging.',
    keywords: isFr
      ? 'remplacement infirmier à domicile Belgique, logiciel soins à domicile, calcul échelle de Katz automatique, panier de soins infirmier, planning infirmier indépendant, déductible fiscalement, modularité remplacement infirmier'
      : 'thuisverpleging vervanging België, software thuiszorg, automatische Katz-schaal berekening, zorgmand verpleegkundige, planning zelfstandige verpleegkundige, fiscaal aftrekbaar, modulaire vervanging verpleegkundige',
    ogTitle: isFr
      ? 'Nursy — Déléguez vos tournées à la carte 🏥'
      : 'Nursy — Delegeer uw rondes op maat 🏥',
    ogDescription: isFr
      ? 'La 1ère plateforme de remplacement modulaire pour infirmiers indépendants en Belgique. Panier de soins, calcul Katz automatique, messagerie RGPD.'
      : 'Het 1e modulaire vervangingsplatform voor zelfstandige verpleegkundigen in België. Zorgmand, automatische Katz-berekening, GDPR-berichten.',
    ogImageAlt: isFr
      ? 'Nursy — Application de remplacement infirmier modulaire en Belgique'
      : 'Nursy — Modulaire vervangingsapp voor thuisverpleegkundigen in België',
    canonical: isFr ? 'https://nursy.be/' : 'https://nursy.be/nl/',
  }
})

useSeoMeta({
  title: () => seoData.value.title,
  ogTitle: () => seoData.value.ogTitle,
  description: () => seoData.value.description,
  ogDescription: () => seoData.value.ogDescription,
  keywords: () => seoData.value.keywords,
  ogType: 'website',
  ogSiteName: 'Nursy',
  ogImage: 'https://nursy.be/og-image.png',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogImageAlt: () => seoData.value.ogImageAlt,
  twitterCard: 'summary_large_image',
  twitterSite: '@NursyApp',
  twitterTitle: () => seoData.value.ogTitle,
  twitterDescription: () => seoData.value.ogDescription,
  twitterImage: 'https://nursy.be/og-image.png',
})

// ── Canonical ──────────────────────────────────────────────────────────────
useHead(computed(() => ({
  link: [{ rel: 'canonical', href: seoData.value.canonical }],
})))

// ── Schema.org JSON-LD ─────────────────────────────────────────────────────
// Sera injecté dans <head> côté serveur → interprété par Google Rich Results.
useHead(
  computed(() => ({
    script: [
      {
        type: 'application/ld+json',
        key: 'schema-software',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'Nursy',
          applicationCategory: 'MedicalApplication',
          operatingSystem: 'iOS, Android',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'EUR',
          },
          description: seoData.value.description,
          areaServed: {
            '@type': 'Country',
            name: 'Belgium',
            sameAs: 'https://www.wikidata.org/wiki/Q31',
          },
          inLanguage: locale.value === 'fr' ? 'fr-BE' : 'nl-BE',
          url: 'https://nursy.app',
          featureList:
            locale.value === 'fr'
              ? 'Remplacement modulaire à domicile, Calcul automatique Katz INAMI, Panier de soins infirmier, Planning infirmier indépendant, Messagerie RGPD, Modèles de tournées réutilisables'
              : 'Modulaire thuisverpleging vervanging, Automatische Katz RIZIV berekening, Zorgmand verpleegkundige, Planning zelfstandige verpleegkundige, GDPR-berichten, Herbruikbare rondesjablonen',
        }),
      },
      {
        type: 'application/ld+json',
        key: 'schema-faq',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: t('faq.q1.question'),
              acceptedAnswer: { '@type': 'Answer', text: t('faq.q1.answer') },
            },
            {
              '@type': 'Question',
              name: t('faq.q2.question'),
              acceptedAnswer: { '@type': 'Answer', text: t('faq.q2.answer') },
            },
            {
              '@type': 'Question',
              name: t('faq.q3.question'),
              acceptedAnswer: { '@type': 'Answer', text: t('faq.q3.answer') },
            },
            {
              '@type': 'Question',
              name: t('faq.q4.question'),
              acceptedAnswer: { '@type': 'Answer', text: t('faq.q4.answer') },
            },
          ],
        }),
      },
    ],
  })),
)
</script>

<template>
  <main id="main-content">
    <HeroSection />
    <ProfilesSection />
    <ModularitySection />
    <ReplacementSection />
    <FeaturesSection />
    <SecuritySection />
    <PricingSection />
    <FaqSection />
    <CtaSection />
  </main>
</template>
