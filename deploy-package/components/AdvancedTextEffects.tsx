'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

interface AdvancedTextEffectsProps {
  children: string
  effect?: 'matrix' | 'neon' | 'liquid' | 'magnetic' | 'hologram'
  delay?: number
  duration?: number
  className?: string
}

export default function AdvancedTextEffects({
  children,
  effect = 'matrix',
  delay = 0,
  duration = 2,
  className = '',
}: AdvancedTextEffectsProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const element = textRef.current
    const text = children

    // Diviser le texte en caractères
    const chars = text.split('').map((char, i) => {
      const span = document.createElement('span')
      span.textContent = char === ' ' ? '\u00A0' : char
      span.style.display = 'inline-block'
      span.style.position = 'relative'
      return span
    })

    element.innerHTML = ''
    chars.forEach(span => element.appendChild(span))

    switch (effect) {
      case 'matrix':
        matrixEffect(chars, delay, duration)
        break
      case 'neon':
        neonEffect(chars, delay, duration)
        break
      case 'liquid':
        liquidEffect(chars, delay, duration)
        break
      case 'magnetic':
        magneticEffect(chars, delay, duration)
        break
      case 'hologram':
        hologramEffect(chars, delay, duration)
        break
    }
  }, [children, effect, delay, duration])

  const matrixEffect = (chars: HTMLSpanElement[], delay: number, duration: number) => {
    chars.forEach((char, i) => {
      gsap.set(char, { opacity: 0, y: 50, rotationX: 90 })
      gsap.to(char, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        delay: delay + i * 0.05,
        ease: 'back.out(1.7)',
      })
    })
  }

  const neonEffect = (chars: HTMLSpanElement[], delay: number, duration: number) => {
    chars.forEach((char, i) => {
      gsap.set(char, { 
        opacity: 0, 
        textShadow: '0 0 10px #17E668, 0 0 20px #17E668, 0 0 30px #17E668',
        filter: 'blur(10px)'
      })
      gsap.to(char, {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1,
        delay: delay + i * 0.1,
        ease: 'power2.out',
      })
    })
  }

  const liquidEffect = (chars: HTMLSpanElement[], delay: number, duration: number) => {
    chars.forEach((char, i) => {
      gsap.set(char, { 
        opacity: 0, 
        scaleY: 0,
        transformOrigin: 'center bottom'
      })
      gsap.to(char, {
        opacity: 1,
        scaleY: 1,
        duration: 0.6,
        delay: delay + i * 0.08,
        ease: 'elastic.out(1, 0.3)',
      })
    })
  }

  const magneticEffect = (chars: HTMLSpanElement[], delay: number, duration: number) => {
    chars.forEach((char, i) => {
      gsap.set(char, { 
        opacity: 0, 
        x: gsap.utils.random(-100, 100),
        y: gsap.utils.random(-100, 100),
        scale: 0
      })
      gsap.to(char, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 1.2,
        delay: delay + i * 0.1,
        ease: 'power3.out',
      })
    })
  }

  const hologramEffect = (chars: HTMLSpanElement[], delay: number, duration: number) => {
    chars.forEach((char, i) => {
      gsap.set(char, { 
        opacity: 0,
        filter: 'hue-rotate(0deg) saturate(0%)',
        textShadow: '0 0 5px #17E668'
      })
      gsap.to(char, {
        opacity: 1,
        filter: 'hue-rotate(360deg) saturate(100%)',
        duration: 1.5,
        delay: delay + i * 0.05,
        ease: 'power2.out',
      })
    })
  }

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  )
}

interface GlitchTextProps {
  children: string
  intensity?: number
  duration?: number
  className?: string
}

export function GlitchText({ 
  children, 
  intensity = 0.1, 
  duration = 0.1,
  className = '' 
}: GlitchTextProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const element = textRef.current
    const originalText = children

    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?'
    
    const glitchInterval = setInterval(() => {
      if (Math.random() < intensity) {
        const chars = element.textContent?.split('') || []
        const glitched = chars.map(char => 
          Math.random() < intensity ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
        ).join('')
        element.textContent = glitched
        
        setTimeout(() => {
          element.textContent = originalText
        }, duration * 1000)
      }
    }, 50)

    return () => clearInterval(glitchInterval)
  }, [children, intensity, duration])

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  )
}
