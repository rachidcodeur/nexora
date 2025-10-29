'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface TextAnimationProps {
  children: React.ReactNode
  animation?: 'typewriter' | 'reveal' | 'slideUp' | 'fadeInWords' | 'glitch'
  delay?: number
  duration?: number
  className?: string
}

export default function TextAnimation({ 
  children, 
  animation = 'reveal', 
  delay = 0, 
  duration = 1,
  className = ''
}: TextAnimationProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const element = textRef.current

    const textContent = typeof children === 'string' ? children : element.textContent || ''
    
    switch (animation) {
      case 'typewriter':
        typewriterEffect(element, textContent, delay, duration)
        break
      case 'reveal':
        revealEffect(element, textContent, delay, duration)
        break
      case 'slideUp':
        slideUpEffect(element, textContent, delay, duration)
        break
      case 'fadeInWords':
        fadeInWordsEffect(element, textContent, delay, duration)
        break
      case 'glitch':
        glitchEffect(element, textContent, delay, duration)
        break
    }
  }, [children, animation, delay, duration])

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  )
}

// Effet machine à écrire
function typewriterEffect(element: HTMLElement, text: string, delay: number, duration: number) {
  element.innerHTML = ''
  const chars = text.split('')
  
  gsap.set(element, { opacity: 1 })
  
  chars.forEach((char, index) => {
    const span = document.createElement('span')
    span.textContent = char === ' ' ? '\u00A0' : char
    span.style.opacity = '0'
    element.appendChild(span)
    
    gsap.to(span, {
      opacity: 1,
      duration: 0.05,
      delay: delay + (index * 0.05),
      ease: 'none'
    })
  })
}

// Effet de révélation
function revealEffect(element: HTMLElement, text: string, delay: number, duration: number) {
  element.innerHTML = text
  gsap.set(element, { 
    opacity: 1,
    clipPath: 'inset(0 100% 0 0)'
  })
  
  gsap.to(element, {
    clipPath: 'inset(0 0% 0 0)',
    duration,
    delay,
    ease: 'power2.out'
  })
}

// Effet slide up
function slideUpEffect(element: HTMLElement, text: string, delay: number, duration: number) {
  element.innerHTML = text
  gsap.set(element, { 
    opacity: 0,
    y: 50
  })
  
  gsap.to(element, {
    opacity: 1,
    y: 0,
    duration,
    delay,
    ease: 'power2.out'
  })
}

// Effet fade in mots
function fadeInWordsEffect(element: HTMLElement, text: string, delay: number, duration: number) {
  const words = text.split(' ')
  element.innerHTML = ''
  
  words.forEach((word, index) => {
    const span = document.createElement('span')
    span.textContent = word + ' '
    span.style.opacity = '0'
    span.style.display = 'inline-block'
    element.appendChild(span)
    
    gsap.to(span, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      delay: delay + (index * 0.1),
      ease: 'power2.out'
    })
  })
}

// Effet glitch
function glitchEffect(element: HTMLElement, text: string, delay: number, duration: number) {
  element.innerHTML = text
  gsap.set(element, { opacity: 1 })
  
  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?'
  
  gsap.to(element, {
    duration: 0.1,
    delay: delay,
    repeat: 5,
    yoyo: true,
    ease: 'power2.inOut',
    onUpdate: function() {
      const chars = element.textContent?.split('') || []
      const glitched = chars.map(char => 
        Math.random() < 0.1 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
      ).join('')
      element.textContent = glitched
    },
    onComplete: function() {
      element.textContent = text
    }
  })
}

// Composant pour les animations de chiffres
export function CounterAnimation({ 
  end, 
  duration = 2, 
  delay = 0,
  className = ''
}: { 
  end: number
  duration?: number
  delay?: number
  className?: string
}) {
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!counterRef.current) return

    const element = counterRef.current

        // Animation du compteur avec ScrollTrigger
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse', // Se déclenche à l'entrée et se reverse à la sortie
            onEnter: () => {
              // Reset du compteur à 0 et relancer l'animation complète
              gsap.set(element, { textContent: 0 })
              tl.restart()
            },
            onLeave: () => {
              // Reset du compteur à 0 à la sortie pour la prochaine entrée
              gsap.set(element, { textContent: 0 })
            },
            onEnterBack: () => {
              // Reset du compteur à 0 et relancer l'animation complète quand on revient
              gsap.set(element, { textContent: 0 })
              tl.restart()
            }
          }
        })

    // Calculer la durée et le pas en fonction de la valeur finale
    const minDuration = 3 // Durée minimale de 3 secondes
    const maxDuration = 4 // Durée maximale de 4 secondes
    const calculatedDuration = Math.max(minDuration, Math.min(maxDuration, end * 0.1))
    
    // Calculer le pas pour les grands nombres
    const step = end > 100 ? Math.ceil(end / 100) : 1
    
    // Fonction pour créer l'animation du compteur
    const createCounterAnimation = () => {
      return gsap.fromTo(element, 
        { textContent: 0 },
        {
          textContent: end,
          duration: calculatedDuration,
          delay,
          ease: 'power2.out',
          snap: { textContent: step },
          onUpdate: function() {
            if (element) {
              const currentValue = Number(element.textContent)
              const roundedValue = Math.ceil(currentValue / step) * step
              element.textContent = Math.min(roundedValue, end).toString()
            }
          }
        }
      )
    }
    
    // Ajouter l'animation à la timeline
    tl.add(createCounterAnimation())

    return () => {
      tl.kill()
    }
  }, [end, duration, delay])

  return <span ref={counterRef} className={className}>0</span>
}
