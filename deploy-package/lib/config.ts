// Configuration centralisée pour Nexora
// Toutes les valeurs sont intégrées directement dans le code pour l'hébergement mutualisé

export const config = {
  // Informations de l'entreprise
  company: {
    name: 'Nexora',
    email: 'contact@nexora-agenceweb.fr',
    phone: '', // Non affiché sur le site
    address: {
      street: '123 Avenue des Champs-Élysées',
      city: 'Paris',
      postalCode: '75008',
      country: 'FR'
    },
    website: 'https://nexora-agenceweb.fr'
  },

  // Réseaux sociaux
  social: {
    twitter: '@nexora',
    linkedin: 'https://linkedin.com/company/nexora',
    github: 'https://github.com/nexora'
  },

  // Google Analytics (remplacer par votre ID réel)
  analytics: {
    googleAnalyticsId: 'G-XXXXXXXXXX', // Remplacez par votre ID Google Analytics
    googleSearchConsole: 'your-google-verification-code', // Remplacez par votre code de vérification
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code'
  },

  // Configuration SEO
  seo: {
    defaultTitle: 'Nexora - Sites web propulsés par l\'IA',
    defaultDescription: 'Des sites web propulsés par l\'IA, beaux, rapides et accessibles à tous. Création express de sites modernes, e-commerce et applications web. +300 clients satisfaits.',
    keywords: [
      'site web',
      'création site',
      'IA',
      'développement web',
      'site vitrine',
      'e-commerce',
      'one page',
      'application web',
      'développeur web',
      'agence web',
      'création site internet',
      'site professionnel',
      'web design',
      'responsive design',
      'SEO',
      'référencement'
    ]
  },

  // Images et assets
  assets: {
    ogImage: '/og-image.jpg',
    logo: '/logo.png',
    icon192: '/icon-192.png',
    icon512: '/icon-512.png'
  },

  // Configuration des offres
  offers: {
    onePage: {
      name: 'Site One Page',
      price: 99,
      description: 'Site web d\'une page optimisé pour la conversion'
    },
    vitrine: {
      name: 'Site Vitrine 5 pages',
      price: 299,
      description: 'Site web professionnel avec 5 pages'
    },
    ecommerce: {
      name: 'E-commerce 20 produits',
      price: 599,
      description: 'Boutique en ligne avec 20 produits'
    },
    application: {
      name: 'Application web',
      price: 899,
      description: 'Application web sur mesure'
    }
  },

  // Configuration des options
  options: {
    additionalPages: {
      name: 'Pages supplémentaires',
      price: 15,
      unit: 'page'
    },
    aiWriting: {
      name: 'Rédaction assistée IA',
      price: 15,
      unit: 'page'
    },
    maintenance: {
      name: 'Maintenance mensuelle',
      price: 60,
      unit: 'mois'
    },
    logo: {
      name: 'Création de logo',
      price: 50,
      unit: 'logo'
    },
    training: {
      name: 'Formation de prise en main',
      price: 20,
      unit: 'heure'
    }
  }
}

export default config
