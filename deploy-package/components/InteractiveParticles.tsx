'use client'

import React, { useEffect, useRef, useCallback } from 'react'
import { gsap } from '@/lib/gsap'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  life: number
  maxLife: number
}

interface InteractiveParticlesProps {
  count?: number
  color?: string
  minSize?: number
  maxSize?: number
  speed?: number
  interactive?: boolean
  className?: string
}

export default function InteractiveParticles({
  count = 100,
  color = 'rgba(23, 230, 104, 0.6)',
  minSize = 1,
  maxSize = 4,
  speed = 0.5,
  interactive = true,
  className = '',
}: InteractiveParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const mouse = useRef({ x: 0, y: 0 })
  const animationFrameId = useRef<number | null>(null)

  const createParticle = useCallback((x: number, y: number): Particle => {
    const angle = Math.random() * Math.PI * 2
    const velocity = (Math.random() * speed + 0.1) * 0.5
    return {
      x,
      y,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity,
      size: Math.random() * (maxSize - minSize) + minSize,
      color: color,
      life: 0,
      maxLife: Math.random() * 200 + 100,
    }
  }, [color, minSize, maxSize, speed])

  const updateParticles = useCallback((width: number, height: number) => {
    particles.current = particles.current
      .map(particle => {
        // Mise à jour de la position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life++

        // Interaction avec la souris
        if (interactive) {
          const dx = mouse.current.x - particle.x
          const dy = mouse.current.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            const force = (100 - distance) / 100
            particle.vx += (dx / distance) * force * 0.01
            particle.vy += (dy / distance) * force * 0.01
          }
        }

        // Rebond sur les bords
        if (particle.x < 0 || particle.x > width) particle.vx *= -1
        if (particle.y < 0 || particle.y > height) particle.vy *= -1

        // Limitation de la vitesse
        const maxVelocity = 2
        const velocity = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy)
        if (velocity > maxVelocity) {
          particle.vx = (particle.vx / velocity) * maxVelocity
          particle.vy = (particle.vy / velocity) * maxVelocity
        }

        // Friction
        particle.vx *= 0.99
        particle.vy *= 0.99

        // Garder dans les limites
        particle.x = Math.max(0, Math.min(width, particle.x))
        particle.y = Math.max(0, Math.min(height, particle.y))

        return particle
      })
      .filter(particle => particle.life < particle.maxLife)

    // Ajouter de nouvelles particules
    if (particles.current.length < count && Math.random() < 0.1) {
      particles.current.push(createParticle(
        Math.random() * width,
        Math.random() * height
      ))
    }
  }, [count, createParticle, interactive])

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    
    particles.current.forEach(particle => {
      const alpha = 1 - (particle.life / particle.maxLife)
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.fillStyle = particle.color
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    })

    // Dessiner les connexions
    if (interactive) {
      particles.current.forEach((particle, i) => {
        particles.current.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 80) {
            const alpha = (80 - distance) / 80 * 0.3
            ctx.save()
            ctx.globalAlpha = alpha
            ctx.strokeStyle = color
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
            ctx.restore()
          }
        })
      })
    }
  }, [color, interactive])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    updateParticles(canvas.width, canvas.height)
    drawParticles(ctx)

    animationFrameId.current = requestAnimationFrame(animate)
  }, [updateParticles, drawParticles])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || typeof window === 'undefined') return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseLeave = () => {
      mouse.current = { x: -1000, y: -1000 }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    // Initialiser les particules
    particles.current = Array.from({ length: count }, () => 
      createParticle(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      )
    )

    animationFrameId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [count, createParticle, animate])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  )
}
