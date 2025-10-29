'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

interface AdvancedTextAnimationProps {
  children: string
  animation?: 'splitWords' | 'splitChars' | 'morphing' | 'wave' | 'bounce' | 'glitch'
  delay?: number
  duration?: number
  className?: string
}

export default function AdvancedTextAnimation({
  children,
  animation = 'splitWords',
  delay = 0,
  duration = 1,
  className = ''
}: AdvancedTextAnimationProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const element = textRef.current
    element.innerHTML = children

    switch (animation) {
      case 'splitWords':
        splitWordsAnimation(element, delay, duration)
        break
      case 'splitChars':
        splitCharsAnimation(element, delay, duration)
        break
      case 'morphing':
        morphingAnimation(element, delay, duration)
        break
      case 'wave':
        waveAnimation(element, delay, duration)
        break
      case 'bounce':
        bounceAnimation(element, delay, duration)
        break
      case 'glitch':
        glitchAnimation(element, delay, duration)
        break
    }
  }, [children, animation, delay, duration])

  return (
    <div ref={textRef} className={`gsap-optimize ${className}`}>
      {children}
    </div>
  )
}

// Animation de division en mots
function splitWordsAnimation(element: HTMLElement, delay: number, duration: number) {
  const words = element.textContent?.split(' ') || []
  element.innerHTML = ''

  words.forEach((word, index) => {
    const span = document.createElement('span')
    span.textContent = word + ' '
    span.style.display = 'inline-block'
    span.style.opacity = '0'
    span.style.transform = 'translateY(50px)'
    element.appendChild(span)

    gsap.to(span, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: delay + (index * 0.1),
      ease: 'power2.out'
    })
  })
}

// Animation de division en caractères
function splitCharsAnimation(element: HTMLElement, delay: number, duration: number) {
  const chars = element.textContent?.split('') || []
  element.innerHTML = ''

  chars.forEach((char, index) => {
    const span = document.createElement('span')
    span.textContent = char === ' ' ? '\u00A0' : char
    span.style.display = 'inline-block'
    span.style.opacity = '0'
    span.style.transform = 'translateY(30px) rotateX(90deg)'
    element.appendChild(span)

    gsap.to(span, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 0.4,
      delay: delay + (index * 0.05),
      ease: 'back.out(1.7)'
    })
  })
}

// Animation de morphing
function morphingAnimation(element: HTMLElement, delay: number, duration: number) {
  gsap.set(element, { opacity: 0, scale: 0.5, rotation: 180 })
  
  gsap.to(element, {
    opacity: 1,
    scale: 1,
    rotation: 0,
    duration,
    delay,
    ease: 'elastic.out(1, 0.3)'
  })
}

// Animation de vague
function waveAnimation(element: HTMLElement, delay: number, duration: number) {
  const chars = element.textContent?.split('') || []
  element.innerHTML = ''

  chars.forEach((char, index) => {
    const span = document.createElement('span')
    span.textContent = char === ' ' ? '\u00A0' : char
    span.style.display = 'inline-block'
    span.style.opacity = '0'
    span.style.transform = 'translateY(20px)'
    element.appendChild(span)

    gsap.to(span, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      delay: delay + (index * 0.05),
      ease: 'power2.out'
    })

    // Animation de vague continue
    gsap.to(span, {
      y: -10,
      duration: 0.5,
      delay: delay + (index * 0.05) + 0.5,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
      repeatDelay: 2
    })
  })
}

// Animation de rebond
function bounceAnimation(element: HTMLElement, delay: number, duration: number) {
  gsap.set(element, { opacity: 0, y: -100 })
  
  gsap.to(element, {
    opacity: 1,
    y: 0,
    duration,
    delay,
    ease: 'bounce.out'
  })
}

// Animation de glitch avancée
function glitchAnimation(element: HTMLElement, delay: number, duration: number) {
  const originalText = element.textContent || ''
  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?'
  
  gsap.set(element, { opacity: 1 })

  // Animation de glitch multiple
  gsap.to(element, {
    duration: 0.1,
    delay,
    repeat: 8,
    yoyo: true,
    ease: 'power2.inOut',
    onUpdate: function() {
      const chars = originalText.split('')
      const glitched = chars.map(char => 
        Math.random() < 0.15 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
      ).join('')
      element.textContent = glitched
    },
    onComplete: function() {
      element.textContent = originalText
      
      // Effet de distorsion finale
      gsap.to(element, {
        skewX: 5,
        duration: 0.1,
        yoyo: true,
        repeat: 3,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.set(element, { skewX: 0 })
        }
      })
    }
  })
}

// Composant pour les animations de texte en boucle
export function LoopingTextAnimation({
  texts,
  interval = 3000,
  className = ''
}: {
  texts: string[]
  interval?: number
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const currentIndex = useRef(0)

  useEffect(() => {
    if (!containerRef.current || texts.length === 0) return

    const container = containerRef.current
    const textElement = container.querySelector('.text-content') as HTMLElement
    
    if (!textElement) return

    const animateText = () => {
      const currentText = texts[currentIndex.current]
      const nextIndex = (currentIndex.current + 1) % texts.length
      const nextText = texts[nextIndex]

      // Animation de sortie
      gsap.to(textElement, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          textElement.textContent = nextText
          currentIndex.current = nextIndex
          
          // Animation d'entrée
          gsap.fromTo(textElement, 
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: 'power2.out'
            }
          )
        }
      })
    }

    // Initialiser avec le premier texte
    textElement.textContent = texts[0]
    gsap.set(textElement, { opacity: 1, y: 0 })

    // Démarrer l'animation en boucle
    const intervalId = setInterval(animateText, interval)

    return () => {
      clearInterval(intervalId)
    }
  }, [texts, interval])

  return (
    <div ref={containerRef} className={className}>
      <span className="text-content"></span>
    </div>
  )
}
