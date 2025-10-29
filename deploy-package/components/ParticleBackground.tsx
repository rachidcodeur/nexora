'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

interface ParticleBackgroundProps {
  count?: number
  className?: string
}

export default function ParticleBackground({ 
  count = 50, 
  className = '' 
}: ParticleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const particles: HTMLElement[] = []

    // Créer les particules
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div')
      particle.className = 'absolute w-1 h-1 bg-brand/20 rounded-full'
      
      // Position aléatoire
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      
      container.appendChild(particle)
      particles.push(particle)
    }

    // Animer les particules
    particles.forEach((particle, index) => {
      const duration = 3 + Math.random() * 4 // 3-7 secondes
      const delay = Math.random() * 2
      
      gsap.set(particle, {
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
        scale: Math.random() * 0.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.2
      })

      gsap.to(particle, {
        x: `+=${Math.random() * 400 - 200}`,
        y: `+=${Math.random() * 400 - 200}`,
        rotation: 360,
        duration,
        delay,
        ease: 'none',
        repeat: -1,
        yoyo: true
      })

      // Animation de pulsation
      gsap.to(particle, {
        scale: Math.random() * 0.5 + 0.8,
        opacity: Math.random() * 0.3 + 0.1,
        duration: 1 + Math.random() * 2,
        delay: Math.random() * 2,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true
      })
    })

    return () => {
      particles.forEach(particle => particle.remove())
    }
  }, [count])

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: -1 }}
    />
  )
}

// Composant pour les lignes de connexion entre particules
export function ConnectedParticles({ 
  count = 30, 
  className = '' 
}: ParticleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const particles: HTMLElement[] = []
    const lines: HTMLElement[] = []

    // Créer les particules
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div')
      particle.className = 'absolute w-2 h-2 bg-brand/30 rounded-full'
      
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      
      container.appendChild(particle)
      particles.push(particle)
    }

    // Créer les lignes de connexion
    const createLine = (p1: HTMLElement, p2: HTMLElement) => {
      const line = document.createElement('div')
      line.className = 'absolute bg-gradient-to-r from-brand/20 to-transparent h-px'
      container.appendChild(line)
      lines.push(line)

      const updateLine = () => {
        const rect1 = p1.getBoundingClientRect()
        const rect2 = p2.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()
        
        const x1 = rect1.left - containerRect.left + rect1.width / 2
        const y1 = rect1.top - containerRect.top + rect1.height / 2
        const x2 = rect2.left - containerRect.left + rect2.width / 2
        const y2 = rect2.top - containerRect.top + rect2.height / 2
        
        const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI
        
        if (distance < 200) {
          line.style.left = `${x1}px`
          line.style.top = `${y1}px`
          line.style.width = `${distance}px`
          line.style.transform = `rotate(${angle}deg)`
          line.style.opacity = String((200 - distance) / 200 * 0.3)
        } else {
          line.style.opacity = '0'
        }
      }

      gsap.ticker.add(updateLine)
      return updateLine
    }

    // Connecter les particules proches
    const updateFunctions: (() => void)[] = []
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        updateFunctions.push(createLine(particles[i], particles[j]))
      }
    }

    // Animer les particules
    particles.forEach((particle, index) => {
      gsap.to(particle, {
        x: `+=${Math.random() * 100 - 50}`,
        y: `+=${Math.random() * 100 - 50}`,
        duration: 4 + Math.random() * 4,
        delay: Math.random() * 2,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true
      })
    })

    return () => {
      particles.forEach(particle => particle.remove())
      lines.forEach(line => line.remove())
      updateFunctions.forEach(update => gsap.ticker.remove(update))
    }
  }, [count])

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: -1 }}
    />
  )
}
