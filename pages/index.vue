<script setup lang="ts">
const { t, locale } = useI18n()

// ── SEO Meta réactif par langue ────────────────────────────────────────────
const seoData = computed(() => {
  const isFr = locale.value === 'fr'
  return {
    title: isFr
      ? 'Nursy - Application de remplacement pour les infirmières à domicile'
      : 'Nursy - Vervangingsapp voor thuisverpleegkundigen',
    description: isFr
      ? 'Plateforme de remplacement modulaire pour infirmiers. Déléguez vos tournées sereinement, boostez votre activité et retrouvez un équilibre entre vie pro et perso.'
      : 'Dé plek voor modulaire vervanging van verpleegkundigen. Delegeer uw ronde in alle rust, groei op eigen tempo en vind de ideale balans tussen werk en privé.',
    keywords: isFr
      ? 'remplacement infirmier, remplacement infirmier Belgique, groupe, groupement, équipe, application soins à domicile, remplacement infirmier à domicile Belgique, logiciel soins à domicile, calcul échelle de Katz automatique, panier de soins infirmier, planning infirmier indépendant, déductible fiscalement, modularité remplacement infirmier'
      : 'vervanging verpleegkundige, vervanging verpleegkundige België, groep, groepering, team, thuiszorg app, thuisverpleging vervanging België, software thuiszorg, automatische Katz-schaal berekening, zorgmand verpleegkundige, planning zelfstandige verpleegkundige, fiscaal aftrekbaar, modulaire vervanging verpleegkundige',
    ogTitle: isFr
      ? 'Nursy - Application de remplacement pour les infirmières à domicile'
      : 'Nursy - Vervangingsapp voor thuisverpleegkundigen',
    ogDescription: isFr
      ? 'Plateforme de remplacement modulaire pour infirmiers. Déléguez vos tournées sereinement, boostez votre activité et retrouvez un équilibre entre vie pro et perso.'
      : 'Dé plek voor modulaire vervanging van verpleegkundigen. Delegeer uw ronde in alle rust, groei op eigen tempo en vind de ideale balans tussen werk en privé.',
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
  ogLocale: () => locale.value === 'fr' ? 'fr_BE' : 'nl_BE',
  ogLocaleAlternate: () => [locale.value === 'fr' ? 'nl_BE' : 'fr_BE'],
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
          url: 'https://nursy.be',
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
              name: t('faq.q3.question'),
              acceptedAnswer: { '@type': 'Answer', text: t('faq.q3.answer') },
            },
            {
              '@type': 'Question',
              name: t('faq.q4.question'),
              acceptedAnswer: { '@type': 'Answer', text: t('faq.q4.answer') },
            },
            {
              '@type': 'Question',
              name: t('faq.q2.question'),
              acceptedAnswer: { '@type': 'Answer', text: t('faq.q2.answer') },
            },
            {
              '@type': 'Question',
              name: t('faq.q1.question'),
              acceptedAnswer: { '@type': 'Answer', text: t('faq.q1.answer') },
            },
          ],
        }),
      },
      {
        type: 'application/ld+json',
        key: 'schema-organization',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Nursy',
          url: 'https://nursy.be',
          logo: {
            '@type': 'ImageObject',
            url: 'https://nursy.be/og-image.png',  
          },
          sameAs: [
            'https://www.instagram.com/nursy',
            'https://www.tiktok.com/@nursy',
          ],
        }),
      },
      {
        type: 'application/ld+json',
        key: 'schema-website',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Nursy',
          url: 'https://nursy.be',
        }),
      },
    ],
  })),
)
</script>

<template>
  <main id="main-content">
    <!-- Above the fold : chargé immédiatement -->
    <HeroSection />
    <!-- Below the fold : code-split, chargés à la demande -->
    <LazyProfilesSection />
    <LazyModularitySection />
    <LazyReplacementSection />
    <LazyFeaturesSection />
    <LazySecuritySection />
    <LazyPricingSection />
    <LazyFaqSection />
    <LazyCtaSection />
  </main>
</template>
