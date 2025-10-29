'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'
  distance?: number
  duration?: number
  delay?: number
  className?: string
  trigger?: string
}

export default function ScrollReveal({
  children,
  direction = 'up',
  distance = 50,
  duration = 1,
  delay = 0,
  className = '',
  trigger
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const element = elementRef.current

    // Configuration initiale selon la direction
    const initialProps: gsap.TweenVars = {
      opacity: 0,
      duration,
      delay,
      ease: 'power2.out'
    }

    switch (direction) {
      case 'up':
        initialProps.y = distance
        break
      case 'down':
        initialProps.y = -distance
        break
      case 'left':
        initialProps.x = distance
        break
      case 'right':
        initialProps.x = -distance
        break
      case 'scale':
        initialProps.scale = 0.8
        break
      case 'fade':
        // Pas de transformation, juste l'opacité
        break
    }

    gsap.set(element, initialProps)

    // Animation avec ScrollTrigger
    gsap.to(element, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      duration,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: trigger ? document.querySelector(trigger) : element,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [direction, distance, duration, delay, trigger])

  return (
    <div ref={elementRef} className={`gsap-optimize ${className}`}>
      {children}
    </div>
  )
}

// Composant pour les animations en cascade avec ScrollTrigger
export function StaggeredScrollReveal({
  children,
  stagger = 0.2,
  direction = 'up',
  distance = 30,
  className = ''
}: {
  children: React.ReactNode
  stagger?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const elements = containerRef.current.children
    gsap.set(elements, { opacity: 0 })

    const initialProps: gsap.TweenVars = {}
    switch (direction) {
      case 'up':
        initialProps.y = distance
        break
      case 'down':
        initialProps.y = -distance
        break
      case 'left':
        initialProps.x = distance
        break
      case 'right':
        initialProps.x = -distance
        break
    }

    gsap.set(elements, initialProps)

    gsap.to(elements, {
      opacity: 1,
      x: 0,
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
  }, [stagger, direction, distance])

  return (
    <div ref={containerRef} className={`gsap-optimize ${className}`}>
      {children}
    </div>
  )
}

// Hook pour créer des animations personnalisées
export function useScrollReveal() {
  const createReveal = (element: HTMLElement, options: {
    direction?: 'up' | 'down' | 'left' | 'right' | 'scale'
    distance?: number
    duration?: number
    delay?: number
  } = {}) => {
    const {
      direction = 'up',
      distance = 50,
      duration = 1,
      delay = 0
    } = options

    const initialProps: gsap.TweenVars = { opacity: 0, duration, delay, ease: 'power2.out' }

    switch (direction) {
      case 'up':
        initialProps.y = distance
        break
      case 'down':
        initialProps.y = -distance
        break
      case 'left':
        initialProps.x = distance
        break
      case 'right':
        initialProps.x = -distance
        break
      case 'scale':
        initialProps.scale = 0.8
        break
    }

    gsap.set(element, initialProps)

    return gsap.to(element, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      duration,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })
  }

  return { createReveal, gsap, ScrollTrigger }
}
