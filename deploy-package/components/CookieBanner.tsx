'use client'

import { useState, useEffect } from 'react'
import { Cookie, X, Settings } from 'lucide-react'
import Button from './Button'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    functional: false
  })

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowBanner(true)
    } else {
      const savedPreferences = JSON.parse(consent)
      setPreferences(savedPreferences)
    }
  }, [])

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      functional: true
    }
    setPreferences(allAccepted)
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted))
    setShowBanner(false)
    // Ici vous pouvez initialiser Google Analytics ou autres outils
  }

  const acceptSelected = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences))
    setShowBanner(false)
    setShowSettings(false)
    // Ici vous pouvez initialiser les outils selon les préférences
  }

  const rejectAll = () => {
    const onlyEssential = {
      essential: true,
      analytics: false,
      functional: false
    }
    setPreferences(onlyEssential)
    localStorage.setItem('cookie-consent', JSON.stringify(onlyEssential))
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="container max-w-4xl">
        <div className="glass-card p-4 rounded-2xl">
          {!showSettings ? (
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start space-x-3">
                <Cookie className="w-6 h-6 text-brand flex-shrink-0 mt-1" />
                <div className="max-w-lg">
                  <h3 className="font-semibold mb-2">Utilisation des cookies</h3>
                  <p className="text-sm text-text-2">
                    Nous utilisons des cookies pour améliorer votre expérience, analyser notre trafic 
                    et personnaliser le contenu. Vous pouvez choisir quels cookies accepter.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettings(true)}
                  className="w-full sm:w-auto whitespace-nowrap"
                >
                  <Settings className="w-4 h-4" />
                  Personnaliser
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={rejectAll}
                  className="w-full sm:w-auto whitespace-nowrap"
                >
                  Refuser
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={acceptAll}
                  className="w-full sm:w-auto whitespace-nowrap"
                >
                  Accepter tout
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Préférences des cookies</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-1 hover:bg-surface-2 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Cookies essentiels</h4>
                    <p className="text-sm text-muted">Nécessaires au fonctionnement du site</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.essential}
                    disabled
                    className="w-4 h-4 text-brand"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Cookies analytiques</h4>
                    <p className="text-sm text-muted">Mesure d'audience et statistiques</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                    className="w-4 h-4 text-brand"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Cookies fonctionnels</h4>
                    <p className="text-sm text-muted">Préférences et personnalisation</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.functional}
                    onChange={(e) => setPreferences(prev => ({ ...prev, functional: e.target.checked }))}
                    className="w-4 h-4 text-brand"
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={rejectAll}
                  className="w-full sm:w-auto whitespace-nowrap"
                >
                  Refuser tout
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={acceptSelected}
                  className="w-full sm:w-auto whitespace-nowrap"
                >
                  Sauvegarder mes choix
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
