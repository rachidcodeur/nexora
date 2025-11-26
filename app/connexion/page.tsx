'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { X, Mail, Lock, User } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Button from '@/components/Button'
import Card from '@/components/Card'
import { useAuth } from '@/lib/auth'

export default function ConnexionPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  // Vérifier les paramètres URL pour pré-sélectionner le mode
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlMode = params.get('mode')
    if (urlMode === 'register') {
      setMode('register')
    }
  }, [])

  // Rediriger si déjà connecté
  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      if (mode === 'register') {
        console.log('🔄 [Connexion] Début de l\'inscription')
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: `${firstName} ${lastName}`.trim(),
              first_name: firstName,
              last_name: lastName,
            },
          },
        })

        if (signUpError) {
          console.error('❌ [Connexion] Erreur d\'inscription:', signUpError)
          throw signUpError
        }

        console.log('✅ [Connexion] Inscription réussie:', data.user?.id)

        if (data.user) {
          setMessage('Compte créé avec succès ! Vérifiez votre email pour confirmer votre compte.')
          setTimeout(() => {
            setMode('login')
            setMessage(null)
          }, 3000)
        }
      } else {
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (signInError) {
          console.error('❌ [Connexion] Erreur de connexion:', signInError)
          throw signInError
        }

        console.log('✅ [Connexion] Connexion réussie:', signInData.user?.id)

        setMessage('Connexion réussie !')
        setTimeout(() => {
          router.push('/')
          window.location.href = '/'
        }, 1000)
      }
    } catch (err: any) {
      console.error('❌ [Connexion] Erreur:', err)
      // Afficher un message d'erreur plus clair
      let errorMessage = 'Une erreur est survenue'
      
      if (err.message) {
        errorMessage = err.message
        // Traduire les messages d'erreur courants
        if (err.message.includes('Invalid login credentials')) {
          errorMessage = 'Email ou mot de passe incorrect'
        } else if (err.message.includes('User already registered')) {
          errorMessage = 'Cet email est déjà utilisé. Connectez-vous ou utilisez un autre email.'
        } else if (err.message.includes('Password')) {
          errorMessage = 'Le mot de passe doit contenir au moins 6 caractères'
        } else if (err.message.includes('Email')) {
          errorMessage = 'Email invalide'
        }
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4" style={{ paddingTop: '150px' }}>
      <div className="w-full max-w-2xl">
        <Card className="p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">
              {mode === 'login' ? 'Connexion' : 'Inscription'}
            </h1>
            <p className="text-text-2">
              {mode === 'login'
                ? 'Connectez-vous pour accéder à votre compte'
                : 'Créez un compte pour commencer'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'register' ? (
              <>
                {/* Nom et Prénom côte à côte pour l'inscription */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Prénom</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-2" />
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-surface-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                        placeholder="Votre prénom"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Nom</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-2" />
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-surface-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                        placeholder="Votre nom"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email et Mot de passe côte à côte pour l'inscription */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-2" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-surface-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Mot de passe</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-2" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-surface-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                        placeholder="••••••••"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Connexion : un champ par ligne */}
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-surface-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Mot de passe</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-2" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-surface-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                      placeholder="••••••••"
                      required
                      minLength={6}
                    />
                  </div>
                </div>
              </>
            )}

            {error && (
              <div className="p-4 bg-danger/20 border border-danger/50 rounded-lg text-danger text-sm">
                {error}
              </div>
            )}

            {message && (
              <div className="p-4 bg-brand/20 border border-brand/50 rounded-lg text-brand text-sm">
                {message}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Chargement...' : mode === 'login' ? 'Se connecter' : 'Créer un compte'}
            </Button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-6 text-center text-sm text-text-2">
            {mode === 'login' ? (
              <>
                Pas encore de compte ?{' '}
                <button
                  onClick={() => {
                    setMode('register')
                    setError(null)
                    setMessage(null)
                  }}
                  className="text-brand hover:underline"
                >
                  S'inscrire
                </button>
              </>
            ) : (
              <>
                Déjà un compte ?{' '}
                <button
                  onClick={() => {
                    setMode('login')
                    setError(null)
                    setMessage(null)
                  }}
                  className="text-brand hover:underline"
                >
                  Se connecter
                </button>
              </>
            )}
          </div>

          {/* Back to home */}
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push('/')}
              className="text-sm text-text-2 hover:text-white transition-colors"
            >
              ← Retour à l'accueil
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}

