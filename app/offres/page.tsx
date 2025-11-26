'use client'

import { CheckCircle, Star, Clock, Zap, Shield, Users, ShoppingCart, Code, ArrowRight, Bot, MessageCircle } from 'lucide-react'
import Button from '@/components/Button'
import PaymentButton from '@/components/PaymentButton'
import Card from '@/components/Card'
import Animation, { StaggerAnimation } from '@/components/Animations'

export default function OffersPage() {
  const offers = [
    {
      id: 'one-page',
      name: 'One Page',
      price: '249 €',
      originalPrice: null,
      description: 'Landing, événement, freelance débutant',
      pitch: 'Une page unique, claire et efficace pour lancer votre présence en ligne et capter vos premiers clients.',
      icon: <Zap className="w-8 h-8 text-brand" />,
      delivery: 'Express (2-3 jours)',
      image: '/site-one-page.webp',
      features: [
        '1 page responsive optimisée',
        'Sections essentielles (Hero, Services, À propos, Contact)',
        '1 formulaire de contact',
        '1 ancrage menu',
        'SEO de base (meta-titres/descriptions, plan de site)',
        'Maintenance 15 jours d\'ajustements mineurs',
        'Support technique inclus'
      ],
      included: [
        'Design moderne light & dark',
        'Optimisation mobile',
        'Hébergement 1 an offert',
        'Certificat SSL',
        'Formation de base'
      ],
      popular: false,
      cta: 'Commander One Page'
    },
    {
      id: 'vitrine',
      name: 'Site Vitrine 5 pages',
      price: '499 €',
      originalPrice: '249 €',
      description: 'TPE/PME, artisans, professionnels',
      pitch: 'La base solide pour votre activité : structure claire, design poli et SEO propre pour être trouvé.',
      icon: <Users className="w-8 h-8 text-brand" />,
      delivery: '4 jours',
      image: '/site-vitrine.webp',
      features: [
        '5 pages complètes (Accueil, Services, À propos, Réalisations, Contact)',
        'Design moderne et professionnel',
        'SEO avancé (structure Hn, métadonnées, maillage interne)',
        '2 formulaires (contact + devis simplifié)',
        'Galerie photos/vidéos',
        'Intégration réseaux sociaux',
        'Maintenance 15 jours d\'ajustements'
      ],
      included: [
        'Design light & dark mode',
        'Optimisation performance',
        'Hébergement 1 an offert',
        'Certificat SSL',
        'Formation complète',
        'Support prioritaire'
      ],
      popular: true,
      cta: 'Commander Site Vitrine'
    },
    {
      id: 'ecommerce',
      name: 'E-commerce 20 produits',
      price: '799 €',
      originalPrice: '450 €',
      description: 'Petites boutiques, créateurs, drop-shipping initial',
      pitch: 'Démarrez vos ventes en ligne avec un catalogue prêt, paiements sécurisés et e-mails automatisés.',
      icon: <ShoppingCart className="w-8 h-8 text-brand" />,
      delivery: '1 semaine',
      image: '/e-commerce.webp',
      features: [
        'Catalogue jusqu\'à 20 produits',
        'Panier et commandes fonctionnels',
        'Modes de paiement sécurisés (Stripe, PayPal)',
        'E-mails de commande automatisés',
        'Fiches produit complètes',
        'Gestion des stocks',
        'SEO e-commerce optimisé'
      ],
      included: [
        'Design e-commerce professionnel',
        'Optimisation conversion',
        'Hébergement 1 an offert',
        'Certificat SSL',
        'Formation e-commerce',
        'Support prioritaire',
        'Analytics intégrés'
      ],
      popular: false,
      cta: 'Commander E-commerce'
    }
  ]

  const customOffer = {
    name: 'Application web sur mesure',
    price: 'Sur devis',
    description: 'Tableau de bord, mini-SaaS, extranet client',
    pitch: 'Du prototype au produit : nous créons des applications web adaptées à votre métier.',
    icon: <Code className="w-8 h-8 text-brand" />,
    delivery: 'Variable selon complexité',
    features: [
      'Développement sur mesure',
      'Interface utilisateur personnalisée',
      'Base de données sécurisée',
      'API et intégrations',
      'Tests et déploiement',
      'Formation utilisateurs',
      'Maintenance continue'
    ],
    examples: [
      'Tableau de bord analytics',
      'Mini-SaaS B2B',
      'Extranet client',
      'Application mobile web',
      'Système de gestion interne'
    ]
  }

  const options = [
    {
      name: 'Pages supplémentaires',
      price: '25 € / page',
      description: 'Ajoutez des pages à votre site vitrine'
    },
    {
      name: 'Pack +20 produits',
      price: '50 €',
      description: 'Étendez votre catalogue e-commerce'
    },
    {
      name: 'Pack +50 produits',
      price: '100 €',
      description: 'Catalogue e-commerce étendu'
    },
    {
      name: 'Pack +100 produits',
      price: '150 €',
      description: 'Grand catalogue e-commerce'
    },
        {
          name: 'Création de logo',
          price: '50 €',
          description: 'Logo simple et moderne'
        },
        {
          name: 'Formation de prise en main',
          price: '20 € / h',
          description: 'Formation personnalisée à l\'utilisation'
        },
    {
      name: 'Maintenance mensuelle',
      price: '60 € / mois',
      description: 'Mises à jour et support continu'
    },
    {
      name: 'Rédaction assistée IA',
      price: '15 € / page',
      description: 'Contenus optimisés SEO'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section hero bg-gradient-to-br from-bg via-bg to-surface-2">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold">
              Des offres <span className="text-brand">simples</span>, transparentes et évolutives
            </h1>
            <p className="text-xl text-text-2 max-w-2xl mx-auto leading-relaxed">
              Choisissez un pack adapté à vos besoins. Besoin de plus ? 
              Nous proposons des options et des devis personnalisés.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="badge">
                <Clock className="w-4 h-4" />
                Livraison rapide garantie
              </div>
              <div className="badge">
                <Shield className="w-4 h-4" />
                Qualité contrôlée par un expert
              </div>
              <div className="badge">
                <Star className="w-4 h-4" />
                Support humain inclus
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Offers - Damier Layout */}
      <section className="section">
        <div className="container">
          <StaggerAnimation stagger={0.2} className="space-y-24">
            {offers.map((offer, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Image */}
                <div className={`relative group ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <Animation animation="fadeInLeft" delay={0.2}>
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-surface-2 to-surface flex justify-center">
                      <img 
                        src={offer.image} 
                        alt={`Exemple de ${offer.name}`}
                        className="w-[1000px] h-[496px] object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      
                      {/* Badge Recommandé */}
                      {offer.popular && (
                        <div className="absolute top-4 left-4">
                          <div className="badge bg-brand text-black">
                            <Star className="w-4 h-4" />
                            Recommandé
                          </div>
                        </div>
                      )}

                      {/* Badge Réduction */}
                      {offer.originalPrice && (
                        <div className="absolute top-4 right-4">
                          <div className="bg-danger text-white px-3 py-1 rounded-full text-sm font-semibold">
                            -{Math.round((1 - parseInt(offer.price) / parseInt(offer.originalPrice)) * 100)}%
                          </div>
                        </div>
                      )}

                      {/* Overlay avec icône */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 bg-brand/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          {offer.icon}
                        </div>
                      </div>
                    </div>
                  </Animation>
                </div>

                {/* Contenu */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <Animation animation="fadeInRight" delay={0.4}>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-3xl font-bold">{offer.name}</h3>
                        <p className="text-muted">{offer.description}</p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-4xl font-bold text-brand">{offer.price}</div>
                        {offer.originalPrice && (
                          <div className="text-xl text-muted line-through">{offer.originalPrice}</div>
                        )}
                        <div className="flex items-center gap-2 text-sm text-muted">
                          <Clock className="w-4 h-4" />
                          {offer.delivery}
                        </div>
                      </div>

                      <p className="text-lg text-text-2 leading-relaxed">{offer.pitch}</p>
                    </div>
                  </Animation>

                  <Animation animation="fadeInRight" delay={0.6}>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-brand">Inclus dans le pack :</h4>
                        <ul className="space-y-2">
                          {offer.features.slice(0, 4).map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start space-x-2">
                              <CheckCircle className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-brand">Bonus inclus :</h4>
                        <ul className="space-y-2">
                          {offer.included.slice(0, 4).map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-brand rounded-full"></div>
                              <span className="text-sm text-muted">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Animation>

                  <Animation animation="fadeInRight" delay={0.8}>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <PaymentButton
                        offerId={offer.id}
                        offerName={offer.name}
                        price={offer.price}
                        size="lg"
                        className="group"
                      />
                      <Button href={`/contact?offer=${offer.id}`} variant="secondary" size="lg">
                        Plus d'infos
                      </Button>
                    </div>
                  </Animation>
                </div>
              </div>
            ))}
          </StaggerAnimation>
        </div>
      </section>

      {/* Custom Offer */}
      <section className="section bg-surface">
        <div className="container">
          <Card className="p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-center mb-6">
                {customOffer.icon}
              </div>
              <h2 className="text-3xl font-bold mb-4">{customOffer.name}</h2>
              <div className="text-2xl font-bold text-brand mb-4">{customOffer.price}</div>
              <p className="text-lg text-text-2 mb-6">{customOffer.description}</p>
              <p className="text-text-2 mb-8 italic">{customOffer.pitch}</p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-semibold mb-4">Fonctionnalités :</h3>
                  <ul className="space-y-2 text-left">
                    {customOffer.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-brand flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Exemples :</h3>
                  <ul className="space-y-2 text-left">
                    {customOffer.examples.map((example, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-brand rounded-full"></div>
                        <span className="text-sm">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Button href="/contact?offer=custom" variant="primary" size="lg">
                Demander un devis personnalisé
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Options */}
      <section className="section">
        <div className="container">
              <div className="text-center mb-16">
                <h2 className="text-[19px] font-bold mb-4">Options & Sur-mesure</h2>
            <p className="text-xl text-text-2 max-w-2xl mx-auto">
              Personnalisez votre pack ou ajoutez des fonctionnalités selon vos besoins
            </p>
          </div>

          <StaggerAnimation stagger={0.1} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {options.map((option, index) => (
              <Animation key={index} animation="fadeInUp" delay={index * 0.1}>
                <Card className="p-6 text-center h-full flex flex-col justify-between" hover>
                  <div>
                    <h3 className="text-[23px] font-semibold mb-2">{option.name}</h3>
                    <div className="text-2xl font-bold text-brand mb-2">{option.price}</div>
                  </div>
                  <p className="text-[16px] text-muted">{option.description}</p>
                </Card>
              </Animation>
            ))}
          </StaggerAnimation>

          <div className="text-center mt-12">
            <p className="text-muted mb-4">Besoin d'une option non listée ?</p>
            <Button href="/contact" variant="secondary">
              Contactez-nous pour un devis
            </Button>
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="section bg-gradient-to-br from-surface-2 to-bg relative overflow-hidden">
        {/* Glass Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand/5 to-accent/5"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand/3 to-transparent"></div>
        
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto text-center py-12">
            <Animation animation="fadeInUp" delay={0.2}>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
                Transparence & Qualité
              </h2>
            </Animation>
            
            <Animation animation="fadeInUp" delay={0.4}>
              <div className="glass-card p-12 rounded-3xl mb-12 max-w-4xl mx-auto">
                <p className="text-xl text-text-2 leading-relaxed mb-8">
                  Chez Nexora, nous utilisons l'IA pour accélérer la production.
                  <strong className="text-brand"> Chaque livrable est vérifié</strong> par un expert humain pour garantir qualité, accessibilité et conformité.
                </p>
                
                <div className="grid md:grid-cols-3 gap-8 mb-10">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-brand/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bot className="w-8 h-8 text-brand" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-white">IA pour l'efficacité</h3>
                    <p className="text-sm text-text-2">Accélération des processus de création</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-brand/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-brand" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-white">Validation humaine</h3>
                    <p className="text-sm text-text-2">Contrôle qualité par nos experts</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-brand/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="w-8 h-8 text-brand" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-white">Support personnalisé</h3>
                    <p className="text-sm text-text-2">Accompagnement tout au long du projet</p>
                  </div>
                </div>
              </div>
            </Animation>
            
            <Animation animation="fadeInUp" delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" variant="primary" size="lg" className="group">
                  <span className="group-hover:scale-105 transition-transform duration-200">
                    Découvrir notre processus
                  </span>
                </Button>
                <Button href="/realisations" variant="secondary" size="lg" className="group">
                  <span className="group-hover:scale-105 transition-transform duration-200">
                    Voir nos réalisations
                  </span>
                </Button>
              </div>
            </Animation>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-geometric-bg" style={{ paddingTop: '56px', paddingBottom: '56px' }}>
        <div className="container relative z-10 px-8">
          <div className="cta-card p-12 text-center rounded-2xl max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Prêt à lancer votre projet ?
            </h2>
            <p className="text-xl text-text-2 mb-8 max-w-2xl mx-auto">
              Rejoignez plus de 120 clients satisfaits qui ont choisi Nexora 
              pour leur présence en ligne.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="primary" size="lg">
                Démarrer mon projet
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button href="/realisations" variant="secondary" size="lg">
                Voir nos réalisations
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
