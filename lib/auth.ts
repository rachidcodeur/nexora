'use client'

import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import type { User } from '@supabase/supabase-js'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    // Récupérer l'utilisateur actuel
    supabase.auth.getUser()
      .then(({ data: { user }, error }) => {
        if (!mounted) return
        if (error) {
          console.error('Erreur lors de la récupération de l\'utilisateur:', error)
        }
        setUser(user ?? null)
        setLoading(false)
      })
      .catch((error) => {
        if (!mounted) return
        console.error('Erreur lors de la récupération de l\'utilisateur:', error)
        setUser(null)
        setLoading(false)
      })

    // Écouter les changements d'authentification
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return
      console.log('🔄 [useAuth] Événement d\'authentification:', event, session?.user?.id)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  return { user, loading }
}

export async function signOut() {
  await supabase.auth.signOut()
  window.location.href = '/'
}

