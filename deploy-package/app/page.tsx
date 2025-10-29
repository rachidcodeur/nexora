import Link from 'next/link'
import { Clock, Palette, Bot, MessageCircle, CheckCircle, Star, ArrowRight } from 'lucide-react'
import Button from '@/components/Button'
import Card from '@/components/Card'
import Accordion from '@/components/Accordion'
import Animation, { StaggerAnimation } from '@/components/Animations'
import TextAnimation, { CounterAnimation } from '@/components/TextAnimation'
import AnimatedCard from '@/components/AnimatedCard'
import ParticleBackground, { ConnectedParticles } from '@/components/ParticleBackground'
// import InteractiveParticles from '@/components/InteractiveParticles'
// import AdvancedTextEffects, { GlitchText } from '@/components/AdvancedTextEffects'
// import MorphingAnimation, { LiquidMorphing } from '@/components/MorphingAnimation'
// import ParallaxScroll, { ParallaxBackground } from '@/components/ParallaxScroll'

export default function Home() {
  const stats = [
    { number: '10+', label: 'ans d\'expérience en création de sites web performants' },
    { number: '300+', label: 'clients satisfaits et accompagnés avec succès' },
    { number: '16+', label: 'technologies modernes maîtrisées par notre équipe' },
    { number: '100%', label: 'de clients recommandent Nexora' },
  ]

  const offers = [
    {
      name: 'One Page',
      price: '99 €',
      description: 'Landing, événement, freelance débutant',
      features: ['1 page responsive', 'Sections essentielles', '1 formulaire', 'SEO de base'],
      delivery: 'Express (2-3 jours)',
      popular: false,
      href: '/offres#one-page'
    },
    {
      name: 'Site Vitrine 5 pages',
      price: '199 €',
      description: 'TPE/PME, artisans, professionnels',
      features: ['5 pages complètes', 'Design moderne', 'SEO avancé', 'Maintenance 15 jours'],
      delivery: '4 jours',
      popular: true,
      href: '/offres#vitrine'
    },
    {
      name: 'E-commerce 20 produits',
      price: '350 €',
      description: 'Petites boutiques, créateurs',
      features: ['20 produits', 'Paiements sécurisés', 'Gestion commandes', 'E-mails automatisés'],
      delivery: '1 semaine',
      popular: false,
      href: '/offres#ecommerce'
    }
  ]

  const process = [
    {
      step: '1',
      title: 'Décrivez',
      description: 'Expliquez votre besoin, vos objectifs et le type de site souhaité. Nous analysons vos attentes pour concevoir une solution adaptée.'
    },
    {
      step: '2',
      title: 'Proposition',
      description: 'Notre équipe vous envoie une proposition tarifaire personnalisée selon la complexité et les fonctionnalités demandées.'
    },
    {
      step: '3',
      title: 'Payez',
      description: 'Procédez au paiement sécurisé par carte bancaire. La validation est instantanée pour lancer la production.'
    },
    {
      step: '4',
      title: 'Livraison',
      description: 'Votre site est livré dans le délai convenu selon la formule choisie, accompagné d\'un guide d\'utilisation complet.'
    }
  ]

  const portfolio = [
    {
      title: 'Mariage Parfait',
      sector: 'Événementiel',
      type: 'Application web',
      image: '/mariage-parfait.webp',
      stack: 'Next.js, Tailwind, IA',
      url: 'https://mariage-parfait.net/'
    },
    {
      title: 'Loomeo',
      sector: 'Technologie',
      type: 'Site Vitrine',
      image: '/loomeo.webp',
      stack: 'Shopify, IA, Stripe',
      url: 'https://loomeo.io/'
    },
    {
      title: 'Fred Kross',
      sector: 'Musique',
      type: 'E-commerce',
      image: '/fred-kross.jpg',
      stack: 'WordPress, IA, SEO',
      url: 'https://www.fredkross.com/'
    }
  ]

  const faq = [
    {
      question: 'Vos sites sont-ils 100% faits par l\'IA ?',
      answer: 'Non. L\'IA accélère certaines étapes (idées, maquettes, contenus). Un expert valide, corrige et optimise chaque livrable pour garantir la qualité et la conformité.'
    },
    {
      question: 'Puis-je demander des modifications ?',
      answer: 'Oui, des ajustements mineurs sont inclus pendant 15 jours après livraison. Pour des modifications majeures, nous proposons des options sur devis.'
    },
    {
      question: 'Les délais sont-ils garantis ?',
      answer: 'Oui, nos délais sont garantis à compter de la réception du brief et des contenus complets. Nous communiquons en temps réel sur l\'avancement.'
    },
    {
      question: 'Puis-je migrer mon site plus tard ?',
      answer: 'Absolument. Nous fournissons les accès et fichiers selon la stack choisie. Vous restez propriétaire de votre site et de ses données.'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section hero pt-32 bg-gradient-to-br from-bg via-surface-2 to-surface relative overflow-hidden">
        <ParticleBackground count={30} />
        <ConnectedParticles count={20} />
        
        {/* Parallax Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-brand/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-accent/10 rounded-full blur-lg animate-pulse delay-1000"></div>
          <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-brand/5 rounded-full blur-2xl animate-pulse delay-2000"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Animation animation="fadeInUp" delay={0.2}>
              <h1 className="text-5xl md:text-6xl font-bold">
                <TextAnimation animation="reveal" delay={0.5}>
                  Créez votre site pro,{' '}
                </TextAnimation>
                <TextAnimation animation="glitch" delay={1.2}>
                  <span className="text-brand-force">
                    assisté par l'IA
                  </span>
                </TextAnimation>
              </h1>
            </Animation>

            <Animation animation="fadeInUp" delay={0.8}>
              <p className="text-xl text-text-2 max-w-2xl mx-auto leading-relaxed">
                Avec Nexora, obtenez un site moderne en quelques jours. L'IA nous fait gagner du temps,
                notre équipe se concentre sur la qualité.
              </p>
            </Animation>

            <Animation animation="fadeInUp" delay={1.2}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/offres" variant="primary" size="lg" className="group relative overflow-hidden">
                  <span className="relative z-10">Voir nos offres</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-brand to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-brand to-accent opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
                </Button>
                <Button href="/contact" variant="secondary" size="lg" className="group">
                  <span className="group-hover:scale-105 transition-transform duration-200">Demander un devis</span>
                </Button>
              </div>
            </Animation>

            {/* Badges with Advanced Animations */}
            <StaggerAnimation stagger={0.1} className="flex flex-wrap justify-center gap-4 pt-8">
              <div className="badge group hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-brand/25 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-brand/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Clock className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
                <span className="relative z-10">Livraisons rapides</span>
              </div>
              <div className="badge group hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-brand/25 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-brand/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Palette className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
                <span className="relative z-10">Design moderne</span>
              </div>
              <div className="badge group hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-brand/25 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-brand/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Bot className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
                <span className="relative z-10">Conçu avec l'IA</span>
              </div>
              <div className="badge group hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-brand/25 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-brand/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <MessageCircle className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
                <span className="relative z-10">Support humain</span>
              </div>
            </StaggerAnimation>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section bg-gradient-to-r from-surface to-surface-2">
        <div className="container">
          <StaggerAnimation stagger={0.2} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-4">
            {stats.map((stat, index) => (
              <div key={index} className="glass-card p-6 text-center rounded-2xl group hover:scale-105 transition-all duration-500">
                <div className="relative mb-4">
                  <div className="text-5xl md:text-6xl font-black text-brand mb-2 relative">
                    <span className="absolute inset-0 text-brand/20 blur-sm group-hover:blur-none transition-all duration-500">
                      {stat.number.includes('+') || stat.number.includes('%') ? (
                        <CounterAnimation
                          end={parseInt(stat.number.replace(/[+%]/g, ''))}
                          duration={3}
                          delay={index * 0.4}
                        />
                      ) : (
                        stat.number
                      )}
                      {stat.number.includes('+') && '+'}
                      {stat.number.includes('%') && '%'}
                    </span>
                    <span className="relative z-10 bg-gradient-to-r from-brand via-accent to-brand bg-clip-text text-transparent">
                      {stat.number.includes('+') || stat.number.includes('%') ? (
                        <CounterAnimation
                          end={parseInt(stat.number.replace(/[+%]/g, ''))}
                          duration={3}
                          delay={index * 0.4}
                        />
                      ) : (
                        stat.number
                      )}
                      {stat.number.includes('+') && '+'}
                      {stat.number.includes('%') && '%'}
                    </span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-brand rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-accent rounded-full animate-pulse delay-1000"></div>
                </div>
                <div className="text-white/90 text-sm font-medium leading-relaxed group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </StaggerAnimation>
        </div>
      </section>

      {/* Offers Section */}
      <section className="section">
        <div className="container">
          <Animation animation="fadeInUp" delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                Des offres simples, transparentes et évolutives
              </h2>
              <p className="text-xl text-text-2 max-w-2xl mx-auto">
                Choisissez un pack adapté à vos besoins. Besoin d'aller plus loin ? 
                Nous proposons des options et du sur-mesure.
              </p>
            </div>
          </Animation>

          <StaggerAnimation stagger={0.2} className="grid md:grid-cols-3 gap-8">
            {offers.map((offer, index) => (
              <AnimatedCard 
                key={index} 
                className={`p-8 relative group ${offer.popular ? 'card--glow' : ''}`}
                hover
                animation={offer.popular ? 'float' : 'float'}
              >
                {offer.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="badge bg-brand text-black relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-brand to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Star className="w-4 h-4 relative z-10 group-hover:rotate-12 group-hover:text-black transition-all duration-300" />
                      <span className="relative z-10 text-brand group-hover:text-black">Recommandé</span>
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-brand transition-colors duration-300">
                    {offer.name}
                  </h3>
                  <div className="text-4xl font-bold text-brand mb-2 group-hover:scale-105 transition-transform duration-300">
                    {offer.price}
                  </div>
                  <p className="text-muted group-hover:text-text transition-colors duration-300">{offer.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {offer.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3 group-hover:translate-x-2 transition-transform duration-300" style={{ transitionDelay: `${featureIndex * 50}ms` }}>
                      <CheckCircle className="w-5 h-5 text-brand flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-sm group-hover:text-text transition-colors duration-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="text-center mb-6">
                  <div className="text-sm text-muted mb-2">Livraison</div>
                  <div className="font-semibold group-hover:text-brand transition-colors duration-300">{offer.delivery}</div>
                </div>

                <Button href={offer.href} variant="primary" className="w-full group/btn relative overflow-hidden">
                  <span className="relative z-10 group-hover/btn:scale-105 transition-transform duration-200">
                    Détails & Commander
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-brand to-accent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-brand to-accent opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300 blur-xl"></div>
                </Button>
              </AnimatedCard>
            ))}
          </StaggerAnimation>
        </div>
      </section>

          {/* Process Section */}
          <section className="section bg-gradient-to-br from-surface-2 to-bg">
            <div className="container">
              <Animation animation="fadeInUp" delay={0.2}>
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold mb-4">Notre processus en 4 étapes</h2>
                  <p className="text-xl text-text-2 max-w-2xl mx-auto">
                    De l'idée à la mise en ligne, nous vous accompagnons à chaque étape
                  </p>
                </div>
              </Animation>

              <div className="relative">
                <StaggerAnimation stagger={0.3} className="grid md:grid-cols-4 gap-8">
                  {process.map((step, index) => (
                    <div key={index} className="text-center relative">
                      <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center text-2xl font-bold text-black mx-auto mb-4 relative z-10 group">
                        {step.step}
                        <div className="absolute inset-0 bg-brand rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 scale-150"></div>
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                      <p className="text-muted">{step.description}</p>
                    </div>
                  ))}
                </StaggerAnimation>

                {/* Flèches animées entre les étapes */}
                <div className="hidden md:block absolute top-8 left-0 right-0 h-0">
                  {/* Flèche 1 -> 2 */}
                  <div className="absolute top-0 left-1/4 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-brand to-transparent process-arrow process-line">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-brand border-t-2 border-b-2 border-t-transparent border-b-transparent process-arrow-head"></div>
                  </div>

                  {/* Flèche 2 -> 3 */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-brand to-transparent process-arrow process-line" style={{ animationDelay: '0.5s' }}>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-brand border-t-2 border-b-2 border-t-transparent border-b-transparent process-arrow-head"></div>
                  </div>

                  {/* Flèche 3 -> 4 */}
                  <div className="absolute top-0 left-3/4 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-brand to-transparent process-arrow process-line" style={{ animationDelay: '1s' }}>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-brand border-t-2 border-b-2 border-t-transparent border-b-transparent process-arrow-head"></div>
                  </div>

                  {/* Particules flottantes */}
                  <div className="absolute top-0 left-1/4 transform -translate-x-1/2 w-24 h-0.5">
                    <div className="absolute top-1/2 left-0 w-1 h-1 bg-brand rounded-full process-particles" style={{ animationDelay: '0s' }}></div>
                    <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-brand rounded-full process-particles" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-brand rounded-full process-particles" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-brand rounded-full process-particles" style={{ animationDelay: '1.5s' }}></div>
                  </div>

                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-0.5">
                    <div className="absolute top-1/2 left-0 w-1 h-1 bg-brand rounded-full process-particles" style={{ animationDelay: '0.2s' }}></div>
                    <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-brand rounded-full process-particles" style={{ animationDelay: '0.7s' }}></div>
                    <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-brand rounded-full process-particles" style={{ animationDelay: '1.2s' }}></div>
                    <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-brand rounded-full process-particles" style={{ animationDelay: '1.7s' }}></div>
                  </div>

                  <div className="absolute top-0 left-3/4 transform -translate-x-1/2 w-24 h-0.5">
                    <div className="absolute top-1/2 left-0 w-1 h-1 bg-brand rounded-full process-particles" style={{ animationDelay: '0.4s' }}></div>
                    <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-brand rounded-full process-particles" style={{ animationDelay: '0.9s' }}></div>
                    <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-brand rounded-full process-particles" style={{ animationDelay: '1.4s' }}></div>
                    <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-brand rounded-full process-particles" style={{ animationDelay: '1.9s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

      {/* Portfolio Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Nos réalisations</h2>
            <p className="text-xl text-text-2 max-w-2xl mx-auto mb-8">
              Découvrez une sélection de projets livrés par Nexora
            </p>
            <Button href="/realisations" variant="secondary">
              Voir toutes nos réalisations
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {portfolio.map((project, index) => (
              <Card key={index} className="overflow-hidden group hover:scale-105 transition-all duration-300" hover>
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="aspect-video bg-surface-2 mb-4 relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </a>
                <div className="p-6">
                  <div className="mb-2">
                    <span className="badge text-xs mb-2 block">{project.type}</span>
                    <h3 className="text-[22px] font-semibold">{project.title}</h3>
                  </div>
                  <p className="text-sm text-muted mb-3">{project.sector}</p>
                  <p className="text-xs text-muted">{project.stack}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section bg-gradient-to-r from-surface to-surface-2" style={{ paddingBottom: '30px' }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Questions fréquentes</h2>
              <p className="text-xl text-text-2">
                Tout ce que vous devez savoir sur nos services
              </p>
            </div>

            <Accordion items={faq} />

            <div className="text-center mt-12">
              <p className="text-muted mb-4">D'autres questions ?</p>
              <Button href="/contact" variant="primary">
                Contactez-nous
              </Button>
            </div>
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
                <Button href="/offres" variant="secondary" size="lg" className="group">
                  <span className="group-hover:scale-105 transition-transform duration-200">
                    Voir nos offres
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
              <Button href="/offres" variant="secondary" size="lg">
                Voir nos offres
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
