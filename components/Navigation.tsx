'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Button from './Button'
import { useAuth } from '@/lib/auth'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  // Bloquer le scroll quand le menu est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    // Cleanup
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const navItems = [
    { href: '/offres', label: 'Offres' },
    { href: '/#faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
  ]

  const handleFAQClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsOpen(false)
    
    // Si on est déjà sur la page d'accueil, faire défiler vers la FAQ
    if (window.location.pathname === '/') {
      const faqSection = document.getElementById('faq')
      if (faqSection) {
        faqSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    } else {
      // Sinon, naviguer vers la page d'accueil et défiler vers la FAQ
      router.push('/')
      
      // Attendre que la page soit chargée avant de défiler
      const scrollToFAQ = () => {
        const faqSection = document.getElementById('faq')
        if (faqSection) {
          faqSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        } else {
          // Si la section n'est pas encore chargée, réessayer après un délai
          setTimeout(scrollToFAQ, 100)
        }
      }
      
      // Démarrer le défilement après un délai pour laisser le temps à la page de se charger
      setTimeout(scrollToFAQ, 300)
    }
  }

  return (
    <nav className="nav fixed top-0 left-0 right-0 z-[10000] border-b border-border">
      <div className="container h-full">
        <div className="h-full grid grid-cols-3 items-center">
          {/* Logo - Left */}
          <div className="flex justify-start">
            <Link href="/" className="text-2xl font-bold text-brand">
              Nexora
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center space-x-8">
            {navItems.map((item) => (
              item.href === '/#faq' ? (
                <button
                  key={item.href}
                  onClick={handleFAQClick}
                  className="!text-white hover:!text-brand focus:!text-brand active:!text-brand transition-colors duration-200 font-medium"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="!text-white hover:!text-brand focus:!text-brand active:!text-brand transition-colors duration-200 font-medium"
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>

          {/* CTA Button & Auth - Right */}
          <div className="hidden md:flex items-center justify-end space-x-4">
            {user ? (
              <Button href="/connexion" variant="secondary" onClick={async () => {
                const { signOut } = await import('@/lib/auth')
                await signOut()
              }}>
                Déconnexion
              </Button>
            ) : (
              <Button href="/connexion" variant="secondary">
                Connexion
              </Button>
            )}
            <Button href="/contact" variant="primary">
              Demander un devis
            </Button>
          </div>

          {/* Mobile Menu Button - Right aligned in grid */}
          <div className="md:hidden flex items-center justify-end space-x-4 pointer-events-auto col-start-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-brand hover:text-brand/80 transition-colors duration-200"
              style={{ pointerEvents: 'auto' }}
              aria-label="Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="md:hidden fixed inset-0 z-[10001] mobile-menu-backdrop"
            style={{ 
              backgroundColor: '#10151f', 
              zIndex: 9998,
              opacity: 1,
              backdropFilter: 'none',
              WebkitBackdropFilter: 'none'
            }}
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Panel */}
          <div 
            className="md:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] transform transition-transform duration-300 ease-out mobile-menu-force-opaque mobile-menu-panel z-[10002]"
            style={{ 
              backgroundColor: '#10151f', 
              background: '#10151f',
              zIndex: 10002,
              opacity: 1,
              backdropFilter: 'none',
              WebkitBackdropFilter: 'none',
              boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.8), -2px 0 10px rgba(0, 0, 0, 0.6)',
              WebkitBoxShadow: '-4px 0 20px rgba(0, 0, 0, 0.8), -2px 0 10px rgba(0, 0, 0, 0.6)'
            }}
          >
            <div className="flex flex-col h-full mobile-menu-container mobile-menu-force-opaque" style={{ backgroundColor: '#10151f', background: '#10151f', opacity: 1 }}>
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10 mobile-menu-header mobile-menu-force-opaque" style={{ backgroundColor: '#10151f', background: '#10151f', opacity: 1 }}>
                <span className="text-lg font-semibold text-white">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-white hover:text-brand transition-colors duration-200 rounded-lg mobile-menu-close-btn"
                  style={{ backgroundColor: '#10151f', opacity: 1 }}
                  aria-label="Fermer le menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Navigation Links */}
              <div className="flex-1 px-6 py-8 space-y-2 mobile-menu-links mobile-menu-force-opaque" style={{ backgroundColor: '#10151f', background: '#10151f', opacity: 1 }}>
                {navItems.map((item) => (
                  item.href === '/#faq' ? (
                    <button
                      key={item.href}
                      onClick={handleFAQClick}
                      className="mobile-menu-link"
                      style={{ 
                        backgroundColor: '#10151f',
                        background: '#10151f',
                        opacity: 1,
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        color: 'white',
                        padding: '12px',
                        borderRadius: '8px',
                        fontWeight: 500,
                        fontSize: '18px',
                        border: 'none',
                        cursor: 'pointer',
                        borderBottom: '1px solid rgba(255,255,255,0.08)',
                        backdropFilter: 'none',
                        WebkitBackdropFilter: 'none'
                      }}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="mobile-menu-link"
                      style={{ 
                        backgroundColor: '#10151f',
                        background: '#10151f',
                        opacity: 1,
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        color: 'white',
                        padding: '12px',
                        borderRadius: '8px',
                        fontWeight: 500,
                        fontSize: '18px',
                        textDecoration: 'none',
                        borderBottom: '1px solid rgba(255,255,255,0.08)',
                        backdropFilter: 'none',
                        WebkitBackdropFilter: 'none'
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
                ))}
              </div>
              
              {/* CTA Button */}
              <div className="p-6 border-t border-white/10 mobile-menu-cta-container mobile-menu-force-opaque space-y-3" style={{ backgroundColor: '#10151f', background: '#10151f', opacity: 1 }}>
                {user ? (
                  <button
                    onClick={async () => {
                      setIsOpen(false)
                      const { signOut } = await import('@/lib/auth')
                      await signOut()
                    }}
                    className="block w-full text-center py-3 px-4 bg-surface-2 hover:bg-surface rounded-lg transition-colors"
                  >
                    Déconnexion
                  </button>
                ) : (
                  <Link
                    href="/connexion"
                    className="block w-full text-center py-3 px-4 bg-surface-2 hover:bg-surface rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Connexion
                  </Link>
                )}
                <Button 
                  href="/contact" 
                  variant="primary" 
                  className="w-full text-center mobile-menu-cta-button"
                >
                  Demander un devis
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  )
}
