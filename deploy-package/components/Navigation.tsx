'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Button from './Button'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
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
    <nav className="nav fixed top-0 left-0 right-0 z-50 border-b border-border">
      <div className="container h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-brand">
          Nexora
        </Link>

        {/* Desktop Navigation - Centered */}
        <div className="hidden md:flex items-center space-x-8">
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

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button href="/contact" variant="primary">
            Demander un devis
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-white hover:text-brand transition-colors duration-200"
            aria-label="Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="md:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] mobile-menu-glass shadow-2xl z-50 transform transition-transform duration-300 ease-out">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <span className="text-lg font-semibold text-white">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-white hover:text-brand transition-colors duration-200 rounded-lg hover:bg-white/10"
                  aria-label="Fermer le menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Navigation Links */}
              <div className="flex-1 px-6 py-8 space-y-6">
                {navItems.map((item) => (
                  item.href === '/#faq' ? (
                    <button
                      key={item.href}
                      onClick={handleFAQClick}
                      className="block w-full text-left text-white hover:text-brand focus:text-brand active:text-brand transition-colors duration-200 font-medium py-3 text-lg rounded-lg hover:bg-white/5 px-3"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block w-full text-left text-white hover:text-brand focus:text-brand active:text-brand transition-colors duration-200 font-medium py-3 text-lg rounded-lg hover:bg-white/5 px-3"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
                ))}
              </div>
              
              {/* CTA Button */}
              <div className="p-6 border-t border-white/10">
                <Button href="/contact" variant="primary" className="w-full text-center">
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
