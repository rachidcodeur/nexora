import Stripe from 'stripe'

// Ne pas lancer d'erreur au chargement, on vérifiera dans les routes API
let stripeInstance: Stripe | null = null

if (process.env.STRIPE_SECRET_KEY) {
  try {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-12-18.acacia',
    })
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de Stripe:', error)
  }
} else {
  console.warn('⚠️ STRIPE_SECRET_KEY n\'est pas définie dans .env.local')
}

export const stripe = stripeInstance as Stripe

// Mapping des offres avec leurs prix en centimes
export const OFFER_PRICES: Record<string, number> = {
  'one-page': 24900, // 249€
  'vitrine': 49900, // 499€
  'ecommerce': 79900, // 799€
}

export const OFFER_NAMES: Record<string, string> = {
  'one-page': 'Site One Page',
  'vitrine': 'Site Vitrine 5 pages',
  'ecommerce': 'E-commerce 20 produits',
}

