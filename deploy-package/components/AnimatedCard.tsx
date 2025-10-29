'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import Card from './Card'

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  glow?: boolean
  hover?: boolean
  id?: string
  animation?: 'float' | 'pulse' | 'tilt' | 'magnetic'
}

export default function AnimatedCard({ 
  children, 
  className = '', 
  glow = false, 
  hover = false,
  id,
  animation = 'float'
}: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    const card = cardRef.current

    switch (animation) {
      case 'float':
        floatAnimation(card)
        break
      case 'pulse':
        pulseAnimation(card)
        break
      case 'tilt':
        tiltAnimation(card)
        break
      case 'magnetic':
        magneticAnimation(card)
        break
    }
  }, [animation])

  return (
    <Card 
      ref={cardRef}
      id={id}
      className={`gsap-optimize ${className}`}
      glow={glow}
      hover={hover}
    >
      {children}
    </Card>
  )
}

// Animation de flottement
function floatAnimation(element: HTMLElement) {
  gsap.to(element, {
    y: -10,
    duration: 2,
    ease: 'power2.inOut',
    yoyo: true,
    repeat: -1
  })
}

// Animation de pulsation
function pulseAnimation(element: HTMLElement) {
  gsap.to(element, {
    scale: 1.05,
    duration: 1.5,
    ease: 'power2.inOut',
    yoyo: true,
    repeat: -1
  })
}

// Animation de basculement au hover
function tiltAnimation(element: HTMLElement) {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) / rect.width
    const deltaY = (e.clientY - centerY) / rect.height
    
    gsap.to(element, {
      rotationY: deltaX * 10,
      rotationX: -deltaY * 10,
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  const handleMouseLeave = () => {
    gsap.to(element, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.5,
      ease: 'power2.out'
    })
  }

  element.addEventListener('mousemove', handleMouseMove)
  element.addEventListener('mouseleave', handleMouseLeave)

  return () => {
    element.removeEventListener('mousemove', handleMouseMove)
    element.removeEventListener('mouseleave', handleMouseLeave)
  }
}

// Animation magnétique
function magneticAnimation(element: HTMLElement) {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * 0.1
    const deltaY = (e.clientY - centerY) * 0.1
    
    gsap.to(element, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'power2.out'
    })
  }

  element.addEventListener('mousemove', handleMouseMove)
  element.addEventListener('mouseleave', handleMouseLeave)

  return () => {
    element.removeEventListener('mousemove', handleMouseMove)
    element.removeEventListener('mouseleave', handleMouseLeave)
  }
}
