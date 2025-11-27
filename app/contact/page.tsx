'use client'
import dynamic from 'next/dynamic'

import { useState } from 'react'
import { MessageCircle, Clock, CheckCircle, AlertCircle, Send } from 'lucide-react'
import Button from '@/components/Button'
import Card from '@/components/Card'

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
    consent: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitError, setSubmitError] = useState<string>('')
  const [showSuccessToast, setShowSuccessToast] = useState(false)

  const projectTypes = [
    { value: 'one-page', label: 'Site One Page (249€)' },
    { value: 'vitrine', label: 'Site Vitrine 5 pages (499€)' },
    { value: 'ecommerce', label: 'E-commerce 20 produits (799€)' },
    { value: 'custom', label: 'Application web sur mesure' },
    { value: 'other', label: 'Autre projet' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setSubmitError('')

    try {
      // Convertir les valeurs en labels textuels
      const projectTypeLabel = projectTypes.find(pt => pt.value === formData.projectType)?.label || formData.projectType

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          projectType: projectTypeLabel,
          budget: null,
          meta: {
            userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
            page: '/contact',
          },
        }),
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({} as any))
        throw new Error(err?.error || 'Échec de l’envoi')
      }

      setSubmitStatus('success')
      setShowSuccessToast(true)
      // Masquer le toast automatique après 5s
      setTimeout(() => setShowSuccessToast(false), 5000)
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        message: '',
        consent: false
      })
    } catch (error: any) {
      setSubmitStatus('error')
      setSubmitError(error?.message || 'Erreur inconnue')
    } finally {
      setIsSubmitting(false)
    }
  }



  return (
    <div className="min-h-screen" suppressHydrationWarning>
      {/* Hero Section */}
      <section className="section hero bg-gradient-to-br from-bg via-bg to-surface-2 pb-8 md:pb-12">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold" suppressHydrationWarning>
              Un <span className="text-brand">projet</span> ? Parlons-en
            </h1>
            <p className="text-xl text-text-2 max-w-2xl mx-auto leading-relaxed" suppressHydrationWarning>
              Remplissez le formulaire ou contactez-nous directement. 
              Nous répondons sous 24-48h ouvrées.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="badge">
                <Clock className="w-4 h-4" />
                Réponse sous 24-48h
              </div>
              <div className="badge">
                <CheckCircle className="w-4 h-4" />
                Devis gratuit
              </div>
              <div className="badge">
                <MessageCircle className="w-4 h-4" />
                Support humain
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container pt-5 pb-3 md:pb-4" style={{ paddingTop: '30px' }}>
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <Card className="px-[26px] py-5 md:p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Demandez un devis gratuit</h2>
              
              {/* Message de succès déplacé en toast bas de page */}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-red-800">Erreur lors de l'envoi. {submitError || 'Veuillez réessayer ou nous contacter directement.'}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label htmlFor="name" className="label">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="input"
                      placeholder="Votre nom complet"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="label">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="input"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label htmlFor="phone" className="label">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input"
                      placeholder="+33 1 23 45 67 89"
                    />
                  </div>
                  <div>
                    <label htmlFor="projectType" className="label">
                      Type de projet *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      required
                      className="select"
                    >
                      <option value="">Sélectionnez un type</option>
                      {projectTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="label">
                    Décrivez votre projet *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="textarea"
                    placeholder="Décrivez votre projet, vos objectifs, vos préférences..."
                  />
                  <div className="helper">
                    Plus vous nous donnez de détails, mieux nous pourrons vous conseiller.
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                  <label htmlFor="consent" className="text-sm text-text-2">
                    J'accepte que mes données soient utilisées pour traiter ma demande et je confirme avoir lu la{' '}
                    <a href="/legal#privacy" className="text-brand hover:underline">
                      politique de confidentialité
                    </a>
                    . *
                  </label>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting || !formData.consent}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer ma demande
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>

      {/* Spacing before footer */}
      <div className="py-8"></div>

      {/* Toast de succès en bas de page */}
      {showSuccessToast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[10001]">
          <div className="px-4 py-3 rounded-lg bg-green-500/90 text-[#07120b] shadow-lg backdrop-blur-sm flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Message envoyé avec succès !</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default dynamic(() => Promise.resolve(ContactPage), { ssr: false })
