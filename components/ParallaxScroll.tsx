'use client'

import React, { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface ParallaxScrollProps {
  children: React.ReactNode
  speed?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}

export default function ParallaxScroll({
  children,
  speed = 0.5,
  direction = 'up',
  className = '',
}: ParallaxScrollProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    const directionMap = {
      up: { y: speed * 100 },
      down: { y: -speed * 100 },
      left: { x: speed * 100 },
      right: { x: -speed * 100 },
    }

    gsap.fromTo(
      element,
      directionMap[direction],
      {
        ...directionMap[direction],
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    )
  }, [speed, direction])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

interface ParallaxBackgroundProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export function ParallaxBackground({
  children,
  speed = 0.3,
  className = '',
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    gsap.fromTo(
      element,
      { y: speed * 200 },
      {
        y: -speed * 200,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    )
  }, [speed])

  return (
    <div ref={ref} className={`absolute inset-0 ${className}`}>
      {children}
    </div>
  )
}
