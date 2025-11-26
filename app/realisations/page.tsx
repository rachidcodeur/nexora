'use client'

import { useState } from 'react'
import { ExternalLink, Calendar, Users, TrendingUp, Filter } from 'lucide-react'
import Button from '@/components/Button'
import Card from '@/components/Card'

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { id: 'all', label: 'Tous' },
    { id: 'vitrine', label: 'Site Vitrine' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'one-page', label: 'One Page' },
    { id: 'app', label: 'Application' }
  ]

  const projects = [
    {
      id: 1,
      title: 'Mariage Parfait',
      sector: 'Événementiel',
      type: 'app',
      description: 'Application web complète pour la gestion d\'événements de mariage avec planning, invités et budget.',
      image: '/mariage-parfait.webp',
      stack: ['Next.js', 'Tailwind', 'IA'],
      results: ['+250% organisation', '+180% satisfaction', '4.9/5 avis'],
      testimonial: 'L\'application a révolutionné notre façon d\'organiser les mariages. Nos clients sont ravis !',
      client: 'Sarah & Marc, Organisateurs',
      date: '2024-01-15',
      liveUrl: 'https://mariage-parfait.net/',
      featured: true
    },
    {
      id: 2,
      title: 'Loomeo',
      sector: 'Technologie',
      type: 'vitrine',
      description: 'Site vitrine moderne pour une startup tech spécialisée dans les solutions IA.',
      image: '/loomeo.webp',
      stack: ['Next.js', 'Tailwind', 'IA', 'Vercel'],
      results: ['+200% leads', '+150% trafic', '95% conversion'],
      testimonial: 'Un site qui reflète parfaitement notre innovation technologique.',
      client: 'Alex Chen, CEO',
      date: '2024-02-20',
      liveUrl: 'https://loomeo.io/',
      featured: true
    },
    {
      id: 3,
      title: 'Fred Kross',
      sector: 'Musique',
      type: 'ecommerce',
      description: 'Boutique en ligne pour un artiste musicien avec vente de CD, vinyles et merchandising.',
      image: '/fred-kross.jpg',
      stack: ['WordPress', 'WooCommerce', 'IA', 'PayPal'],
      results: ['+180% ventes', '+120% fans', '4.8/5 avis'],
      testimonial: 'Ma boutique en ligne a transformé ma relation avec mes fans. Les ventes ont explosé !',
      client: 'Fred Kross, Musicien',
      date: '2024-03-10',
      liveUrl: 'https://www.fredkross.com/',
      featured: false
    },
    {
      id: 4,
      title: 'Salle de Sport FitZone',
      sector: 'Sport',
      type: 'vitrine',
      description: 'Site vitrine dynamique pour une salle de sport avec planning des cours et inscriptions.',
      image: '/api/placeholder/600/400',
      stack: ['React', 'IA', 'Analytics', 'Calendar'],
      results: ['+180% inscriptions', '+250% engagement', '3.2s chargement'],
      testimonial: 'Site moderne qui motive nos membres. Les inscriptions en ligne ont doublé !',
      client: 'Thomas Leroy, Gérant',
      date: '2024-03-10',
      liveUrl: 'https://fitzone-gym.fr',
      featured: false
    },
    {
      id: 5,
      title: 'Boutique Artisanale',
      sector: 'Artisanat',
      type: 'ecommerce',
      description: 'Boutique en ligne pour un artisan créateur de meubles sur mesure.',
      image: '/api/placeholder/600/400',
      stack: ['WooCommerce', 'IA', 'PayPal', 'Instagram'],
      results: ['+160% commandes', '+140% panier moyen', '4.9/5 avis'],
      testimonial: 'Parfait pour présenter mes créations. Les clients adorent la galerie 3D !',
      client: 'Jean-Marc Bois, Artisan',
      date: '2024-02-28',
      liveUrl: 'https://artisan-bois.fr',
      featured: false
    },
    {
      id: 6,
      title: 'Consultant Marketing',
      sector: 'Marketing',
      type: 'one-page',
      description: 'Landing page optimisée pour un consultant en marketing digital.',
      image: '/api/placeholder/600/400',
      stack: ['Next.js', 'IA', 'Forms', 'Analytics'],
      results: ['+400% leads', '+220% conversion', '1.8s chargement'],
      testimonial: 'Landing page parfaite qui convertit. Mes clients me trouvent plus facilement.',
      client: 'Alexandre Moreau, Consultant',
      date: '2024-01-25',
      liveUrl: 'https://alex-moreau-marketing.fr',
      featured: false
    },
    {
      id: 7,
      title: 'Tableau de Bord Analytics',
      sector: 'Tech',
      type: 'app',
      description: 'Application web de tableau de bord pour suivre les performances marketing.',
      image: '/api/placeholder/600/400',
      stack: ['React', 'Node.js', 'IA', 'Charts'],
      results: ['-60% temps analyse', '+90% précision', '100% satisfaction'],
      testimonial: 'Outil révolutionnaire qui nous fait gagner un temps précieux !',
      client: 'Sarah Tech, CMO',
      date: '2024-03-15',
      liveUrl: 'https://analytics-dashboard.com',
      featured: true
    },
    {
      id: 8,
      title: 'Clinique Dentaire',
      sector: 'Santé',
      type: 'vitrine',
      description: 'Site vitrine professionnel pour une clinique dentaire avec prise de rendez-vous.',
      image: '/api/placeholder/600/400',
      stack: ['WordPress', 'IA', 'Booking', 'SEO'],
      results: ['+120% RDV', '+85% confiance', '4.7/5 avis'],
      testimonial: 'Site rassurant qui met en confiance nos patients. Les RDV en ligne ont explosé !',
      client: 'Dr. Claire Santé, Dentiste',
      date: '2024-02-12',
      liveUrl: 'https://clinique-dentaire-sante.fr',
      featured: false
    },
    {
      id: 9,
      title: 'Boutique Bio',
      sector: 'Alimentation',
      type: 'ecommerce',
      description: 'E-commerce pour une boutique de produits bio avec livraison locale.',
      image: '/api/placeholder/600/400',
      stack: ['Shopify', 'IA', 'Local Delivery', 'Reviews'],
      results: ['+190% ventes', '+110% fidélisation', '4.8/5 avis'],
      testimonial: 'Site parfait pour nos produits bio. Les clients adorent la livraison locale !',
      client: 'Emma Bio, Gérante',
      date: '2024-03-05',
      liveUrl: 'https://boutique-bio-nature.fr',
      featured: false
    }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.type === activeFilter)

  const featuredProjects = projects.filter(project => project.featured)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section bg-gradient-to-br from-bg via-bg to-surface-2">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold">
              Nos <span className="text-brand">réalisations</span>
            </h1>
            <p className="text-xl text-text-2 max-w-2xl mx-auto leading-relaxed">
              Découvrez une sélection de projets livrés par Nexora. 
              Filtrez par type et inspirez-vous de nos créations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="badge">
                <Users className="w-4 h-4" />
                120+ clients satisfaits
              </div>
              <div className="badge">
                <TrendingUp className="w-4 h-4" />
                +150% résultats moyens
              </div>
              <div className="badge">
                <Calendar className="w-4 h-4" />
                Livraison rapide
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Projets mis en avant</h2>
            <p className="text-xl text-text-2 max-w-2xl mx-auto">
              Nos créations les plus réussies qui illustrent notre expertise
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {featuredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden" hover>
                <div className="aspect-video bg-surface-2 mb-6"></div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                    <span className="badge">{project.type === 'vitrine' ? 'Site Vitrine' : 
                                           project.type === 'ecommerce' ? 'E-commerce' : 
                                           project.type === 'one-page' ? 'One Page' : 'Application'}</span>
                  </div>
                  
                  <p className="text-text-2 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.map((tech, index) => (
                      <span key={index} className="px-3 py-1 bg-surface-2 text-xs rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {project.results.map((result, index) => (
                      <div key={index} className="text-center">
                        <div className="text-lg font-bold text-brand">{result}</div>
                        <div className="text-xs text-muted">Résultat</div>
                      </div>
                    ))}
                  </div>

                  <blockquote className="border-l-4 border-brand pl-4 mb-6">
                    <p className="text-sm italic text-text-2 mb-2">"{project.testimonial}"</p>
                    <cite className="text-xs text-muted">— {project.client}</cite>
                  </blockquote>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-muted">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(project.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn--secondary btn--sm"
                    >
                      Voir le site
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects with Filters */}
      <section className="section bg-surface">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Toutes nos réalisations</h2>
            <p className="text-xl text-text-2 max-w-2xl mx-auto mb-8">
              Explorez l'ensemble de nos créations par catégorie
            </p>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 text-sm text-muted mb-4">
                <Filter className="w-4 h-4" />
                <span>Filtrer par type :</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeFilter === filter.id
                        ? 'bg-brand text-black'
                        : 'bg-surface-2 text-text hover:bg-surface'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden" hover>
                <div className="aspect-video bg-surface-2 mb-4"></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{project.title}</h3>
                    <span className="badge text-xs">
                      {project.type === 'vitrine' ? 'Site Vitrine' : 
                       project.type === 'ecommerce' ? 'E-commerce' : 
                       project.type === 'one-page' ? 'One Page' : 'Application'}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted mb-3">{project.sector}</p>
                  <p className="text-sm text-text-2 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.stack.slice(0, 3).map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-surface-2 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 3 && (
                      <span className="px-2 py-1 bg-surface-2 text-xs rounded">
                        +{project.stack.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted">
                      {new Date(project.date).toLocaleDateString('fr-FR')}
                    </div>
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn--link btn--sm"
                    >
                      Voir
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted">Aucun projet trouvé pour cette catégorie.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand mb-2">120+</div>
              <div className="text-muted text-sm">Projets livrés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand mb-2">98%</div>
              <div className="text-muted text-sm">Clients satisfaits</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand mb-2">4.8/5</div>
              <div className="text-muted text-sm">Note moyenne</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand mb-2">24h</div>
              <div className="text-muted text-sm">Délai de réponse</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-surface">
        <div className="container">
          <Card className="card--glow p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Prêt à créer votre site ?
            </h2>
            <p className="text-xl text-text-2 mb-8 max-w-2xl mx-auto">
              Rejoignez nos clients satisfaits et donnez vie à votre projet web 
              avec l'aide de l'IA et de nos experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="primary" size="lg">
                Démarrer mon projet
              </Button>
              <Button href="/offres" variant="secondary" size="lg">
                Voir nos offres
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
