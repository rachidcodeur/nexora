'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface AnimationProps {
  children: React.ReactNode
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'slideInUp' | 'stagger'
  delay?: number
  duration?: number
  className?: string
}

export default function Animation({ 
  children, 
  animation = 'fadeInUp', 
  delay = 0, 
  duration = 1,
  className = ''
}: AnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const element = elementRef.current

    // Configuration initiale
    gsap.set(element, { opacity: 0 })

    let animationConfig: gsap.TweenVars = {
      opacity: 1,
      duration,
      delay,
      ease: 'power2.out'
    }

    // Appliquer l'animation selon le type
    switch (animation) {
      case 'fadeInUp':
        gsap.set(element, { y: 50 })
        animationConfig.y = 0
        break
      case 'fadeInLeft':
        gsap.set(element, { x: -50 })
        animationConfig.x = 0
        break
      case 'fadeInRight':
        gsap.set(element, { x: 50 })
        animationConfig.x = 0
        break
      case 'scaleIn':
        gsap.set(element, { scale: 0.8 })
        animationConfig.scale = 1
        break
      case 'slideInUp':
        gsap.set(element, { y: 100 })
        animationConfig.y = 0
        break
      case 'stagger':
        // Pour les éléments avec stagger, on gère différemment
        gsap.set(element, { y: 30 })
        animationConfig.y = 0
        break
    }

    // Créer l'animation avec ScrollTrigger
    gsap.to(element, {
      ...animationConfig,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [animation, delay, duration])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

// Composant pour les animations en cascade (stagger)
export function StaggerAnimation({ 
  children, 
  stagger = 0.2,
  className = ''
}: { 
  children: React.ReactNode
  stagger?: number
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const elements = containerRef.current.children
    gsap.set(elements, { opacity: 0, y: 50 })

    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [stagger])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}

// Hook pour les animations personnalisées
export function useGSAP() {
  return { gsap, ScrollTrigger }
}
