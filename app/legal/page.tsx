import { Shield, FileText, Cookie, Users, Bot } from 'lucide-react'
import Card from '@/components/Card'

export const metadata = {
  title: 'Mentions Légales - Nexora',
  description: 'Mentions légales, politique de confidentialité, conditions générales de vente et informations sur l\'utilisation de l\'IA chez Nexora.',
}

export default function LegalPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section hero bg-gradient-to-br from-bg via-bg to-surface-2">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold">
              Mentions <span className="text-brand">légales</span>
            </h1>
            <p className="text-xl text-text-2 max-w-2xl mx-auto leading-relaxed">
              Transparence et conformité : toutes les informations légales 
              concernant Nexora et nos services.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Navigation */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Navigation rapide</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="#mentions" className="flex items-center space-x-2 text-brand hover:underline">
                <FileText className="w-4 h-4" />
                <span>Mentions légales</span>
              </a>
              <a href="#privacy" className="flex items-center space-x-2 text-brand hover:underline">
                <Shield className="w-4 h-4" />
                <span>Politique de confidentialité</span>
              </a>
              <a href="#cgu" className="flex items-center space-x-2 text-brand hover:underline">
                <FileText className="w-4 h-4" />
                <span>Conditions générales de vente</span>
              </a>
              <a href="#cookies" className="flex items-center space-x-2 text-brand hover:underline">
                <Cookie className="w-4 h-4" />
                <span>Politique des cookies</span>
              </a>
              <a href="#ai" className="flex items-center space-x-2 text-brand hover:underline">
                <Bot className="w-4 h-4" />
                <span>Utilisation de l'IA</span>
              </a>
            </div>
          </Card>

          {/* Mentions Légales */}
          <Card id="mentions" className="p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-3">
              <FileText className="w-6 h-6 text-brand" />
              <span>Mentions légales</span>
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Éditeur du site</h3>
                <div className="text-sm text-text-2 space-y-2">
                  <p><strong>Raison sociale :</strong> Nexora</p>
                  <p><strong>Forme juridique :</strong> Société par actions simplifiée (SAS)</p>
                  <p><strong>Capital social :</strong> 10 000 €</p>
                  <p><strong>RCS :</strong> Paris B 123 456 789</p>
                  <p><strong>SIRET :</strong> 123 456 789 00012</p>
                  <p><strong>Adresse :</strong> 123 Avenue des Champs-Élysées, 75008 Paris, France</p>
                  <p><strong>Téléphone :</strong> +33 1 23 45 67 89</p>
                  <p><strong>E-mail :</strong> contact@nexora.fr</p>
                  <p><strong>Directeur de la publication :</strong> [Nom du directeur]</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Hébergement</h3>
                <div className="text-sm text-text-2 space-y-2">
                  <p><strong>Hébergeur :</strong> Vercel Inc.</p>
                  <p><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</p>
                  <p><strong>Site web :</strong> https://vercel.com</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Propriété intellectuelle</h3>
                <div className="text-sm text-text-2 space-y-2">
                  <p>
                    L'ensemble du contenu du site nexora.fr (textes, images, vidéos, logos, etc.) 
                    est protégé par le droit d'auteur et appartient à Nexora ou à ses partenaires.
                  </p>
                  <p>
                    Toute reproduction, distribution, modification, adaptation, retransmission ou 
                    publication de ces éléments est strictement interdite sans l'accord exprès 
                    par écrit de Nexora.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Responsabilité</h3>
                <div className="text-sm text-text-2 space-y-2">
                  <p>
                    Nexora s'efforce de fournir des informations exactes et à jour sur le site, 
                    mais ne peut garantir l'exactitude, la précision ou l'exhaustivité des 
                    informations mises à disposition.
                  </p>
                  <p>
                    L'utilisation des informations et contenus disponibles sur l'ensemble du site 
                    se fait sous l'entière responsabilité de l'utilisateur.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Politique de Confidentialité */}
          <Card id="privacy" className="p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-3">
              <Shield className="w-6 h-6 text-brand" />
              <span>Politique de confidentialité</span>
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Collecte des données</h3>
                <div className="text-sm text-text-2 space-y-2">
                  <p>Nous collectons les données suivantes :</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Données d'identification (nom, prénom, e-mail, téléphone)</li>
                    <li>Données de contact (adresse, code postal, ville)</li>
                    <li>Données de navigation (adresse IP, cookies, pages visitées)</li>
                    <li>Données de projet (description, budget, préférences)</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Finalités du traitement</h3>
                <div className="text-sm text-text-2 space-y-2">
                  <p>Vos données sont utilisées pour :</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Traiter vos demandes de devis et commandes</li>
                    <li>Vous fournir nos services de création de sites web</li>
                    <li>Vous contacter concernant votre projet</li>
                    <li>Améliorer nos services et notre site web</li>
                    <li>Respecter nos obligations légales</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Base légale</h3>
                <div className="text-sm text-text-2 space-y-2">
                  <p>Le traitement de vos données repose sur :</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Votre consentement (cookies, newsletter)</li>
                    <li>L'exécution d'un contrat (prestation de services)</li>
                    <li>Notre intérêt légitime (amélioration des services)</li>
                    <li>Le respect d'obligations légales</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Conservation des données</h3>
                <div className="text-sm text-text-2 space-y-2">
                  <p>Vos données sont conservées :</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Données clients : 3 ans après la fin de la relation contractuelle</li>
                    <li>Données de prospection : 3 ans après le dernier contact</li>
                    <li>Données comptables : 10 ans (obligation légale)</li>
                    <li>Cookies : 13 mois maximum</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Vos droits</h3>
                <div className="text-sm text-text-2 space-y-2">
                  <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Droit d'accès à vos données</li>
                    <li>Droit de rectification</li>
                    <li>Droit à l'effacement</li>
                    <li>Droit à la limitation du traitement</li>
                    <li>Droit à la portabilité</li>
                    <li>Droit d'opposition</li>
                    <li>Droit de retrait du consentement</li>
                  </ul>
                  <p className="mt-4">
                    Pour exercer ces droits, contactez-nous à :{' '}
                    <a href="mailto:privacy@nexora.fr" className="text-brand hover:underline">
                      privacy@nexora.fr
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Sécurité</h3>
                <div className="text-sm text-text-2 space-y-2">
                  <p>
                    Nous mettons en œuvre des mesures techniques et organisationnelles appropriées 
                    pour protéger vos données contre la perte, l'utilisation abusive, l'accès non 
                    autorisé, la divulgation, l'altération ou la destruction.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Conditions Générales de Vente */}
          <Card id="cgu" className="p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-3">
              <FileText className="w-6 h-6 text-brand" />
              <span>Conditions générales de vente</span>
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Objet</h3>
                <div className="text-sm text-text-2 space-y-2">
                  <p>
                    Les présentes conditions générales de vente régissent les relations contractuelles 
                    entre Nexora et ses clients concernant la prestation de services de création de sites web.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Prestations</h3>
                <div className="text-sm text-text-2 space-y-2">
                  <p>Nexora propose les services suivants :</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Site One Page (100€) - Livraison express 2-3 jours</li>
                    <li>Site Vitrine 5 pages (199€) - Livraison 4 jours</li>
                    <li>E-commerce 20 produits (350€) - Livraison 1 semaine</li>
                    <li>Applications web sur mesure - Sur devis</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Processus de commande</h3>
                <div className="text-sm text-text-2 space-y-2">
                  <p>Le processus de commande comprend :</p>
                  <ol className="list-decimal list-inside space-y-1 ml-4">
                    <li>Demande de devis via le formulaire de contact</li>
                    <li>Étude de faisabilité et proposition commerciale</li>
                    <li>Validation du devis et signature du contrat</li>
                    <li>Versement d'un acompte de 50%</li>
                    <li>Réalisation de la prestation</li>
                    <li>Livraison et versement du solde</li>
                  </ol>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Délais de livraison</h3>
                <div className="text-sm text-text-2 space-y-2">
                  <p>Les délais de livraison sont :</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Site One Page : 2-3 jours ouvrés après réception du brief complet</li>
                    <li>Site Vitrine : 4 jours ouvrés après réception du brief complet</li>
                    <li>E-commerce : 1 semaine après réception du brief complet</li>
                    <li>Applications sur mesure : selon complexité (devis détaillé)</li>
                  </ul>
                  <p className="mt-2">
                    <strong>Important :</strong> Les délais commencent à courir uniquement après 
                    réception du brief complet et des contenus nécessaires.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Tarifs et paiement</h3>
                <div className="text-sm text-text-2 space-y-2">
                  <p>Les tarifs sont exprimés en euros TTC. Le paiement s'effectue :</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>50% à la commande (acompte)</li>
                    <li>50% à la livraison (solde)</li>
                    <li>Par virement bancaire ou PayPal</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Révisions et modifications</h3>
                <div className="text-sm text-text-2 space-y-2">
                  <p>
                    Des ajustements mineurs sont inclus pendant 15 jours après livraison. 
                    Toute modification majeure sera facturée selon un devis complémentaire.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Propriété intellectuelle</h3>
                <div className="text-sm text-text-2 space-y-2">
                  <p>
                    Le client devient propriétaire du site web livré. Nexora conserve le droit 
                    d'utiliser les éléments techniques génériques pour d'autres projets.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Politique des Cookies */}
          <Card id="cookies" className="p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-3">
              <Cookie className="w-6 h-6 text-brand" />
              <span>Politique des cookies</span>
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Qu'est-ce qu'un cookie ?</h3>
                <div className="text-sm text-text-2 space-y-2">
                  <p>
                    Un cookie est un petit fichier texte déposé sur votre ordinateur lors de la 
                    visite d'un site web. Il permet de reconnaître votre navigateur et de mémoriser 
                    certaines informations vous concernant.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Cookies utilisés</h3>
                <div className="text-sm text-text-2 space-y-2">
                  <p>Nous utilisons les cookies suivants :</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Cookies essentiels :</strong> Navigation, sécurité, préférences</li>
                    <li><strong>Cookies analytiques :</strong> Mesure d'audience (anonymisée)</li>
                    <li><strong>Cookies de fonctionnalité :</strong> Thème clair/sombre, langue</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Gestion des cookies</h3>
                <div className="text-sm text-text-2 space-y-2">
                  <p>
                    Vous pouvez accepter ou refuser les cookies non essentiels via notre bannière 
                    de consentement. Vous pouvez également configurer votre navigateur pour 
                    bloquer les cookies.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Utilisation de l'IA */}
          <Card id="ai" className="p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-3">
              <Bot className="w-6 h-6 text-brand" />
              <span>Utilisation de l'intelligence artificielle</span>
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Transparence IA</h3>
                <div className="text-sm text-text-2 space-y-2">
                  <p>
                    Nexora utilise l'intelligence artificielle pour accélérer certaines étapes 
                    de création de sites web. Cette approche nous permet de proposer des délais 
                    de livraison rapides tout en maintenant une qualité professionnelle.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Étapes assistées par l'IA</h3>
                <div className="text-sm text-text-2 space-y-2">
                  <p>L'IA nous aide dans :</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Génération de maquettes et wireframes</li>
                    <li>Création de contenus de base (textes, descriptions)</li>
                    <li>Optimisation du code et des performances</li>
                    <li>Suggestions de design et d'UX</li>
                    <li>Tests d'accessibilité automatisés</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Contrôle humain</h3>
                <div className="text-sm text-text-2 space-y-2">
                  <p>
                    <strong>Chaque livrable est systématiquement contrôlé et finalisé par un expert humain</strong> 
                    qui vérifie :
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>La qualité et la cohérence du design</li>
                    <li>L'exactitude et la pertinence des contenus</li>
                    <li>La conformité aux standards web</li>
                    <li>L'accessibilité et l'ergonomie</li>
                    <li>La sécurité et les performances</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Avantages de cette approche</h3>
                <div className="text-sm text-text-2 space-y-2">
                  <p>Cette méthode hybride nous permet de :</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Réduire les délais de livraison</li>
                    <li>Maintenir des tarifs compétitifs</li>
                    <li>Garantir une qualité professionnelle</li>
                    <li>Personnaliser chaque projet</li>
                    <li>Respecter les meilleures pratiques</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Engagement qualité</h3>
                <div className="text-sm text-text-2 space-y-2">
                  <p>
                    Nous nous engageons à livrer des sites web de qualité professionnelle, 
                    conformes aux standards actuels et optimisés pour vos objectifs. 
                    L'IA est un outil d'assistance, pas un remplacement de l'expertise humaine.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Contact */}
          <Card className="p-8 bg-gradient-to-r from-brand/10 to-accent/10">
            <h2 className="text-2xl font-bold mb-4">Questions légales ?</h2>
            <p className="text-text-2 mb-6">
              Pour toute question concernant nos mentions légales, notre politique de confidentialité 
              ou l'utilisation de l'IA, n'hésitez pas à nous contacter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="mailto:legal@nexora.fr" 
                className="btn btn--primary"
              >
                legal@nexora.fr
              </a>
              <a 
                href="/contact" 
                className="btn btn--secondary"
              >
                Formulaire de contact
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
