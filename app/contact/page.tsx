'use client'

import { useState } from 'react'
import { Mail, Phone, MessageCircle, Clock, CheckCircle, AlertCircle, Send } from 'lucide-react'
import Button from '@/components/Button'
import Card from '@/components/Card'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: '',
    consent: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const projectTypes = [
    { value: 'one-page', label: 'Site One Page (100€)' },
    { value: 'vitrine', label: 'Site Vitrine 5 pages (199€)' },
    { value: 'ecommerce', label: 'E-commerce 20 produits (350€)' },
    { value: 'custom', label: 'Application web sur mesure' },
    { value: 'other', label: 'Autre projet' }
  ]

  const budgetRanges = [
    { value: '100-200', label: '100€ - 200€' },
    { value: '200-500', label: '200€ - 500€' },
    { value: '500-1000', label: '500€ - 1000€' },
    { value: '1000+', label: 'Plus de 1000€' },
    { value: 'discuss', label: 'À discuter' }
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

    try {
      // Simulation d'envoi - remplacer par votre logique d'envoi
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Ici vous pouvez ajouter l'envoi réel du formulaire
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        budget: '',
        message: '',
        consent: false
      })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6 text-brand" />,
      title: 'E-mail',
      description: 'Réponse sous 24h',
      value: 'contact@nexora-agenceweb.fr',
      href: 'mailto:contact@nexora-agenceweb.fr'
    }
  ]


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section hero bg-gradient-to-br from-bg via-bg to-surface-2">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold">
              Un <span className="text-brand">projet</span> ? Parlons-en
            </h1>
            <p className="text-xl text-text-2 max-w-2xl mx-auto leading-relaxed">
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

      <div className="container py-4">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Demandez votre devis</h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="text-green-800">Message envoyé avec succès ! Nous vous répondrons sous 24-48h.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-red-800">Erreur lors de l'envoi. Veuillez réessayer ou nous contacter directement.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
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

                <div className="grid md:grid-cols-2 gap-6">
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
                  <label htmlFor="budget" className="label">
                    Budget approximatif
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="select"
                  >
                    <option value="">Sélectionnez une fourchette</option>
                    {budgetRanges.map((range) => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
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

          {/* Contact Info & FAQ */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Autres moyens de contact</h2>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.href}
                    className="flex items-center space-x-4 p-4 rounded-lg hover:bg-surface-2 transition-colors"
                  >
                    {method.icon}
                    <div>
                      <h3 className="font-semibold text-white">{method.title}</h3>
                      <p className="text-sm text-white">{method.description}</p>
                      <p className="text-sm text-white">{method.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </Card>


            {/* Transparency Banner */}
            <Card className="p-6 bg-gradient-to-r from-brand/10 to-accent/10">
              <h3 className="font-semibold mb-2">Transparence IA</h3>
              <p className="text-sm text-text-2">
                Nos sites sont conçus <strong>avec l'IA</strong> et finalisés par un expert 
                pour garantir qualité et conformité. Chaque livrable est contrôlé avant publication.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Spacing before footer */}
      <div className="py-8"></div>
    </div>
  )
}
