'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

interface CustomCursorProps {
  enabled?: boolean
  size?: number
  color?: string
  trail?: boolean
  magnetic?: boolean
}

export default function CustomCursor({
  enabled = true,
  size = 20,
  color = '#17E668',
  trail = true,
  magnetic = true
}: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!enabled || !cursorRef.current) return

    const cursor = cursorRef.current
    const trailElements = trailRefs.current

    // Configuration initiale
    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      opacity: 0
    })

    trailElements.forEach((trail, index) => {
      gsap.set(trail, {
        xPercent: -50,
        yPercent: -50,
        opacity: 0,
        scale: 1 - (index * 0.1)
      })
    })

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    // Animation du curseur principal
    const updateCursor = () => {
      const diffX = mouseX - cursorX
      const diffY = mouseY - cursorY

      cursorX += diffX * 0.1
      cursorY += diffY * 0.1

      gsap.set(cursor, {
        x: cursorX,
        y: cursorY
      })

      // Animation des trails
      trailElements.forEach((trail, index) => {
        const trailX = cursorX - (diffX * (index + 1) * 0.1)
        const trailY = cursorY - (diffY * (index + 1) * 0.1)
        
        gsap.set(trail, {
          x: trailX,
          y: trailY
        })
      })

      requestAnimationFrame(updateCursor)
    }

    // Gestionnaires d'événements
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const handleMouseEnter = () => {
      gsap.to(cursor, { opacity: 1, duration: 0.3 })
      trailElements.forEach((trail, index) => {
        gsap.to(trail, { 
          opacity: 0.3 - (index * 0.05), 
          duration: 0.3,
          delay: index * 0.05
        })
      })
    }

    const handleMouseLeave = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.3 })
      trailElements.forEach(trail => {
        gsap.to(trail, { opacity: 0, duration: 0.3 })
      })
    }

    // Effet magnétique sur les éléments interactifs
    const handleMouseOver = (e: MouseEvent) => {
      if (!magnetic) return
      
      const target = e.target as HTMLElement
      if (target.matches('a, button, [data-magnetic]')) {
        gsap.to(cursor, {
          scale: 2,
          duration: 0.3,
          ease: 'power2.out'
        })
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      if (!magnetic) return
      
      const target = e.target as HTMLElement
      if (target.matches('a, button, [data-magnetic]')) {
        gsap.to(cursor, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        })
      }
    }

    // Ajouter les événements
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    // Démarrer l'animation
    updateCursor()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [enabled, magnetic])

  if (!enabled) return null

  return (
    <>
      {/* Curseur principal */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          borderRadius: '50%',
          willChange: 'transform'
        }}
      />

      {/* Trails */}
      {trail && (
        <>
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              ref={el => {
                if (el) trailRefs.current[index] = el
              }}
              className="fixed pointer-events-none z-40 mix-blend-difference"
              style={{
                width: size * (1 - index * 0.2),
                height: size * (1 - index * 0.2),
                backgroundColor: color,
                borderRadius: '50%',
                willChange: 'transform'
              }}
            />
          ))}
        </>
      )}
    </>
  )
}

// Composant pour les effets de curseur sur des éléments spécifiques
export function CursorEffect({
  children,
  effect = 'scale',
  scale = 1.2,
  className = ''
}: {
  children: React.ReactNode
  effect?: 'scale' | 'glow' | 'rotate'
  scale?: number
  className?: string
}) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const element = elementRef.current

    const handleMouseEnter = () => {
      switch (effect) {
        case 'scale':
          gsap.to(element, {
            scale,
            duration: 0.3,
            ease: 'power2.out'
          })
          break
        case 'glow':
          gsap.to(element, {
            boxShadow: '0 0 20px rgba(23, 230, 104, 0.5)',
            duration: 0.3,
            ease: 'power2.out'
          })
          break
        case 'rotate':
          gsap.to(element, {
            rotation: 5,
            duration: 0.3,
            ease: 'power2.out'
          })
          break
      }
    }

    const handleMouseLeave = () => {
      switch (effect) {
        case 'scale':
          gsap.to(element, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          })
          break
        case 'glow':
          gsap.to(element, {
            boxShadow: 'none',
            duration: 0.3,
            ease: 'power2.out'
          })
          break
        case 'rotate':
          gsap.to(element, {
            rotation: 0,
            duration: 0.3,
            ease: 'power2.out'
          })
          break
      }
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [effect, scale])

  return (
    <div ref={elementRef} className={className} data-magnetic>
      {children}
    </div>
  )
}
