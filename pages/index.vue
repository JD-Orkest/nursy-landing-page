<script setup lang="ts">
const { t, locale } = useI18n()

// ── SEO Meta réactif par langue ────────────────────────────────────────────
const seoData = computed(() => {
  const isFr = locale.value === 'fr'
  return {
    title: isFr
      ? 'NURSY — Remplacement infirmier à domicile Belgique | Vérification INAMI'
      : 'NURSY — Thuisverpleging vervanging België | RIZIV verificatie',
    description: isFr
      ? 'Trouvez ou proposez un remplacement infirmier à domicile en Belgique. Évitez le burn-out, partagez vos patients en toute sécurité. Vérification INAMI, alternative sécurisée à WhatsApp pour soins à domicile.'
      : 'Vind of bied thuisverpleging vervanging in België. Voorkom burn-out verpleegkundige, deel patiënten veilig. RIZIV verificatie, veilig alternatief voor WhatsApp, dringend vervanging zoeken.',
    keywords: isFr
      ? 'remplacement infirmier domicile Belgique, vérification INAMI, tournée infirmier indépendante, éviter burn-out infirmier, partage de patients, alternative sécurisée WhatsApp infirmière, soins à domicile Belgique, trouver remplaçante urgence'
      : 'thuisverpleging vervanging België, RIZIV verificatie, zelfstandige verpleegkundige ronde, burn-out voorkomen, patiënten delen, veilig alternatief voor WhatsApp, thuiszorg België, dringend vervanging zoeken',
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
  ogImage: 'https://nursy.app/og-image.png',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogImageAlt: () => seoData.value.ogImageAlt,
  twitterCard: 'summary_large_image',
  twitterSite: '@NursyApp',
  twitterTitle: () => seoData.value.title,
  twitterDescription: () => seoData.value.description,
  twitterImage: 'https://nursy.app/og-image.png',
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
    <FeaturesSection />
    <SecuritySection />
    <FaqSection />
    <CtaSection />
  </main>
</template>
