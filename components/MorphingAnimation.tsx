'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

interface MorphingAnimationProps {
  children: React.ReactNode
  morphType?: 'blob' | 'wave' | 'pulse' | 'float' | 'rotate'
  duration?: number
  intensity?: number
  className?: string
}

export default function MorphingAnimation({
  children,
  morphType = 'blob',
  duration = 3,
  intensity = 0.1,
  className = '',
}: MorphingAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    switch (morphType) {
      case 'blob':
        gsap.to(element, {
          borderRadius: '50% 30% 70% 40%',
          duration: duration,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })
        break
      case 'wave':
        gsap.to(element, {
          borderRadius: '0% 100% 0% 100%',
          duration: duration,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })
        break
      case 'pulse':
        gsap.to(element, {
          scale: 1 + intensity,
          duration: duration / 2,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true,
        })
        break
      case 'float':
        gsap.to(element, {
          y: -20 * intensity,
          duration: duration,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })
        break
      case 'rotate':
        gsap.to(element, {
          rotation: 360 * intensity,
          duration: duration,
          ease: 'none',
          repeat: -1,
        })
        break
    }
  }, [morphType, duration, intensity])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

interface LiquidMorphingProps {
  children: React.ReactNode
  className?: string
}

export function LiquidMorphing({ children, className = '' }: LiquidMorphingProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    // Animation de morphing liquide complexe
    gsap.timeline({ repeat: -1 })
      .to(element, {
        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
        duration: 4,
        ease: 'sine.inOut',
      })
      .to(element, {
        borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%',
        duration: 4,
        ease: 'sine.inOut',
      })
      .to(element, {
        borderRadius: '50% 30% 60% 40% / 30% 50% 60% 70%',
        duration: 4,
        ease: 'sine.inOut',
      })
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
