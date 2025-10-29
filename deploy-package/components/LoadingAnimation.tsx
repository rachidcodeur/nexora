'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

interface LoadingAnimationProps {
  type?: 'spinner' | 'dots' | 'pulse' | 'wave' | 'morphing' | 'particles'
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
}

export default function LoadingAnimation({
  type = 'spinner',
  size = 'md',
  color = '#17E668',
  className = ''
}: LoadingAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const elements = container.children

    switch (type) {
      case 'spinner':
        spinnerAnimation(container, color)
        break
      case 'dots':
        dotsAnimation(elements, color)
        break
      case 'pulse':
        pulseAnimation(container, color)
        break
      case 'wave':
        waveAnimation(elements, color)
        break
      case 'morphing':
        morphingAnimation(container, color)
        break
      case 'particles':
        particlesAnimation(container, color)
        break
    }
  }, [type, color])

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div ref={containerRef} className={`gsap-optimize ${className}`}>
      {type === 'spinner' && (
        <div className={`${sizeClasses[size]} border-2 border-gray-200 border-t-transparent rounded-full`} />
      )}
      
      {type === 'dots' && (
        <>
          <div className="w-2 h-2 bg-current rounded-full" />
          <div className="w-2 h-2 bg-current rounded-full" />
          <div className="w-2 h-2 bg-current rounded-full" />
        </>
      )}
      
      {type === 'pulse' && (
        <div className={`${sizeClasses[size]} bg-current rounded-full`} />
      )}
      
      {type === 'wave' && (
        <>
          <div className="w-1 h-4 bg-current rounded-full" />
          <div className="w-1 h-4 bg-current rounded-full" />
          <div className="w-1 h-4 bg-current rounded-full" />
          <div className="w-1 h-4 bg-current rounded-full" />
          <div className="w-1 h-4 bg-current rounded-full" />
        </>
      )}
      
      {type === 'morphing' && (
        <div className={`${sizeClasses[size]} bg-current`} />
      )}
      
      {type === 'particles' && (
        <>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-current rounded-full" />
          ))}
        </>
      )}
    </div>
  )
}

// Animation de spinner
function spinnerAnimation(container: HTMLElement, color: string) {
  const spinner = container.querySelector('div') as HTMLElement
  if (!spinner) return

  gsap.set(spinner, {
    borderTopColor: color,
    borderColor: color + '20'
  })

  gsap.to(spinner, {
    rotation: 360,
    duration: 1,
    ease: 'none',
    repeat: -1
  })
}

// Animation de points
function dotsAnimation(elements: HTMLCollection, color: string) {
  Array.from(elements).forEach((dot, index) => {
    const element = dot as HTMLElement
    gsap.set(element, { backgroundColor: color })
    
    gsap.to(element, {
      scale: 1.5,
      opacity: 0.5,
      duration: 0.6,
      delay: index * 0.2,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1
    })
  })
}

// Animation de pulsation
function pulseAnimation(container: HTMLElement, color: string) {
  const pulse = container.querySelector('div') as HTMLElement
  if (!pulse) return

  gsap.set(pulse, { backgroundColor: color })

  gsap.to(pulse, {
    scale: 1.2,
    opacity: 0.5,
    duration: 0.8,
    ease: 'power2.inOut',
    yoyo: true,
    repeat: -1
  })
}

// Animation de vague
function waveAnimation(elements: HTMLCollection, color: string) {
  Array.from(elements).forEach((bar, index) => {
    const element = bar as HTMLElement
    gsap.set(element, { backgroundColor: color })
    
    gsap.to(element, {
      scaleY: 2,
      duration: 0.4,
      delay: index * 0.1,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1
    })
  })
}

// Animation de morphing
function morphingAnimation(container: HTMLElement, color: string) {
  const shape = container.querySelector('div') as HTMLElement
  if (!shape) return

  gsap.set(shape, { backgroundColor: color })

  const morphSequence = gsap.timeline({ repeat: -1 })
  
  morphSequence
    .to(shape, { borderRadius: '50%', duration: 0.5, ease: 'power2.inOut' })
    .to(shape, { borderRadius: '0%', duration: 0.5, ease: 'power2.inOut' })
    .to(shape, { borderRadius: '20%', duration: 0.5, ease: 'power2.inOut' })
    .to(shape, { borderRadius: '0%', duration: 0.5, ease: 'power2.inOut' })
}

// Animation de particules
function particlesAnimation(container: HTMLElement, color: string) {
  const particles = Array.from(container.children) as HTMLElement[]
  
  particles.forEach((particle, index) => {
    gsap.set(particle, { backgroundColor: color })
    
    gsap.to(particle, {
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      rotation: 360,
      duration: 2 + Math.random() * 2,
      delay: index * 0.1,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1
    })
  })
}

// Composant de loading avec texte
export function LoadingWithText({
  text = 'Chargement...',
  animation = 'dots',
  className = ''
}: {
  text?: string
  animation?: 'spinner' | 'dots' | 'pulse' | 'wave' | 'morphing' | 'particles'
  className?: string
}) {
  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      <LoadingAnimation type={animation} size="lg" />
      <p className="text-sm text-muted animate-pulse">{text}</p>
    </div>
  )
}

// Composant de skeleton loading
export function SkeletonLoader({
  lines = 3,
  className = ''
}: {
  lines?: number
  className?: string
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      {[...Array(lines)].map((_, index) => (
        <div
          key={index}
          className="h-4 bg-surface-2 rounded animate-pulse"
          style={{ width: `${Math.random() * 40 + 60}%` }}
        />
      ))}
    </div>
  )
}
