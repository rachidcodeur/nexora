import Link from 'next/link'
import { Github, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-surface border-t bg-gradient-to-br from-surface to-surface-2" style={{ borderTopColor: '#263044' }}>
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-brand">Nexora</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Des sites web propulsés par l'IA, beaux, rapides et accessibles à tous.
            </p>
            <div className="flex items-center space-x-2 text-xs text-white/60">
              <span>🤖</span>
              <span>Conçu avec l'IA + expert humain</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/offres" className="text-white hover:text-white transition-colors" style={{ color: 'white' }}>
                  Site One Page
                </Link>
              </li>
              <li>
                <Link href="/offres" className="text-white hover:text-white transition-colors" style={{ color: 'white' }}>
                  Site Vitrine 5 pages
                </Link>
              </li>
              <li>
                <Link href="/offres" className="text-white hover:text-white transition-colors" style={{ color: 'white' }}>
                  E-commerce 20 produits
                </Link>
              </li>
              <li>
                <Link href="/offres" className="text-white hover:text-white transition-colors" style={{ color: 'white' }}>
                  Application web
                </Link>
              </li>
            </ul>
          </div>


          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">Légal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/legal" className="text-white hover:text-white transition-colors" style={{ color: 'white' }}>
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/legal#privacy" className="text-white hover:text-white transition-colors" style={{ color: 'white' }}>
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/legal#cookies" className="text-white hover:text-white transition-colors" style={{ color: 'white' }}>
                  Cookies
                </Link>
              </li>
              <li>
                <Link href="/legal#cgu" className="text-white hover:text-white transition-colors" style={{ color: 'white' }}>
                  CGV
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0" style={{ borderTopColor: '#263044' }}>
          <p className="text-xs text-white/70">
            © 2024 Nexora. Tous droits réservés.
          </p>
          <div className="flex items-center space-x-4">
            <a href="#" className="w-10 h-10 bg-brand rounded-full flex items-center justify-center hover:bg-brand/80 transition-colors">
              <Github className="w-5 h-5 text-black" />
            </a>
            <a href="#" className="w-10 h-10 bg-brand rounded-full flex items-center justify-center hover:bg-brand/80 transition-colors">
              <Twitter className="w-5 h-5 text-black" />
            </a>
            <a href="#" className="w-10 h-10 bg-brand rounded-full flex items-center justify-center hover:bg-brand/80 transition-colors">
              <Linkedin className="w-5 h-5 text-black" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
