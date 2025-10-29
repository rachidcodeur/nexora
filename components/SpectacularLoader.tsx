'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'

interface SpectacularLoaderProps {
  isLoading: boolean
  onComplete?: () => void
  className?: string
}

export default function SpectacularLoader({ 
  isLoading, 
  onComplete, 
  className = '' 
}: SpectacularLoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Initialisation...')

  const loadingTexts = [
    'Initialisation...',
    'Chargement des particules...',
    'Préparation des animations...',
    'Optimisation des performances...',
    'Finalisation...',
    'Prêt !'
  ]

  useEffect(() => {
    if (!isLoading) return

    let progressInterval: NodeJS.Timeout
    let textInterval: NodeJS.Timeout
    let currentTextIndex = 0

    // Animation de progression
    progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          clearInterval(textInterval)
          setTimeout(() => {
            onComplete?.()
          }, 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    // Animation du texte
    textInterval = setInterval(() => {
      setLoadingText(loadingTexts[currentTextIndex])
      currentTextIndex = (currentTextIndex + 1) % loadingTexts.length
    }, 800)

    // Animation GSAP
    if (loaderRef.current && progressRef.current && textRef.current) {
      gsap.set(loaderRef.current, { opacity: 0, scale: 0.8 })
      gsap.to(loaderRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)'
      })

      gsap.fromTo(progressRef.current, 
        { scaleX: 0 },
        { 
          scaleX: 1, 
          duration: 2, 
          ease: 'power2.out',
          transformOrigin: 'left center'
        }
      )

      gsap.fromTo(textRef.current,
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        }
      )
    }

    return () => {
      clearInterval(progressInterval)
      clearInterval(textInterval)
    }
  }, [isLoading, onComplete])

  if (!isLoading) return null

  return (
    <div 
      ref={loaderRef}
      className={`fixed inset-0 z-[9999] bg-bg flex items-center justify-center ${className}`}
    >
      {/* Particules de fond */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-brand rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 text-center">
        {/* Logo animé */}
        <div className="mb-8">
          <div className="text-6xl font-bold text-brand mb-4 relative">
            <span className="relative z-10">Nexora</span>
            <div className="absolute inset-0 text-brand/20 blur-sm animate-pulse">
              Nexora
            </div>
          </div>
        </div>

        {/* Barre de progression */}
        <div className="w-80 h-2 bg-surface-2 rounded-full overflow-hidden mb-6">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-brand to-accent rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          </div>
        </div>

        {/* Texte de chargement */}
        <div ref={textRef} className="text-text-2 text-lg">
          {loadingText}
        </div>

        {/* Pourcentage */}
        <div className="text-brand text-2xl font-bold mt-4">
          {Math.round(progress)}%
        </div>
      </div>

      {/* Effet de particules en mouvement */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-brand rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `particleMove ${3 + Math.random() * 2}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes particleMove {
          0% { transform: translateX(0) translateY(0) scale(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { 
            transform: translateX(${Math.random() * 200 - 100}px) translateY(${Math.random() * 200 - 100}px) scale(1); 
            opacity: 0; 
          }
        }
      `}</style>
    </div>
  )
}
