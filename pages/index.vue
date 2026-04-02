<script setup lang="ts">
const { t, locale } = useI18n()

// ── SEO Meta réactif par langue ────────────────────────────────────────────
const seoData = computed(() => {
  const isFr = locale.value === 'fr'
  return {
    title: isFr
      ? 'Nursy — Remplacement infirmier à domicile Belgique | Vérification INAMI'
      : 'Nursy — Thuisverpleging vervanging België | RIZIV verificatie',
    description: isFr
      ? 'NURSY est la plateforme modulaire de remplacement infirmier à domicile en Belgique. Partagez votre tournée patient par patient, naviguez avec Waze intégré et retrouvez la sérénité professionnelle. Vérification INAMI garantie.'
      : 'NURSY is het modulaire vervangingsplatform voor thuisverpleegkundigen in België. Deel uw ronde patiënt per patiënt, navigeer met geïntegreerde Waze en vind de professionele sereniteit terug. RIZIV verificatie gegarandeerd.',
    keywords: isFr
      ? 'remplacement infirmier domicile Belgique, vérification INAMI, panier de soins infirmier, modularité remplacement, tournée infirmier indépendante, partage de patients sécurisé, navigation tournée Waze, Katz automatique INAMI, sérénité infirmière'
      : 'thuisverpleging vervanging België, RIZIV verificatie, zorgmand verpleegkundige, modulariteit vervanging, zelfstandige verpleegkundige ronde, patiënten veilig delen, navigatie ronde Waze, automatische Katz RIZIV, sereniteit verpleegkundige',
    ogImageAlt: isFr
      ? 'NURSY — Application pour infirmiers à domicile en Belgique'
      : 'NURSY — App voor thuisverpleegkundigen in België',
  }
})

useSeoMeta({
  title: () => seoData.value.title,
  ogTitle: () => seoData.value.title,
  description: () => seoData.value.description,
  ogDescription: () => seoData.value.description,
  keywords: () => seoData.value.keywords,
  ogType: 'website',
  ogSiteName: 'NURSY',
  ogImage: 'https://nursy.be/og-image.png',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogImageAlt: () => seoData.value.ogImageAlt,
  twitterCard: 'summary_large_image',
  twitterSite: '@NursyApp',
  twitterTitle: () => seoData.value.title,
  twitterDescription: () => seoData.value.description,
  twitterImage: 'https://nursy.be/og-image.png',
})

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
          name: 'NURSY',
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
              ? 'Marché des remplaçants, Vérification INAMI, Calcul honoraires Katz, Tournées infirmières intelligentes, Messagerie RGPD/HDS'
              : 'Vervangingsmarkt, RIZIV verificatie, Katz honoraria berekening, Slimme verpleegkundige rondes, GDPR/HDS berichten',
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
    <FeaturesSection />
    <SecuritySection />
    <FaqSection />
    <PricingSection />
    <CtaSection />
  </main>
</template>
