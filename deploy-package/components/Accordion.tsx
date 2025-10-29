'use client'

import { useState, useRef, useEffect } from 'react'
import { Plus, Minus } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'

interface AccordionItem {
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
  className?: string
}

export default function Accordion({ items, className = '' }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])

  const toggleItem = (index: number) => {
    const isCurrentlyOpen = openIndex === index
    const contentElement = contentRefs.current[index]
    const buttonElement = buttonRefs.current[index]

    if (!contentElement || !buttonElement) return

    if (isCurrentlyOpen) {
      // Fermer l'élément
      gsap.to(contentElement, {
        height: 0,
        duration: 0.4,
        ease: 'power2.inOut',
        onComplete: () => {
          setOpenIndex(null)
        }
      })
      
      // Animation du bouton
      gsap.to(buttonElement.querySelector('.icon-container'), {
        rotation: 0,
        scale: 1,
        duration: 0.3,
        ease: 'back.out(1.7)'
      })
    } else {
      // Fermer l'élément précédemment ouvert
      if (openIndex !== null) {
        const prevContent = contentRefs.current[openIndex]
        const prevButton = buttonRefs.current[openIndex]
        if (prevContent && prevButton) {
          gsap.to(prevContent, {
            height: 0,
            duration: 0.3,
            ease: 'power2.inOut'
          })
          gsap.to(prevButton.querySelector('.icon-container'), {
            rotation: 0,
            scale: 1,
            duration: 0.2,
            ease: 'back.out(1.7)'
          })
        }
      }

      // Ouvrir le nouvel élément
      setOpenIndex(index)
      
      // Animation d'ouverture
      gsap.fromTo(contentElement, 
        { height: 0 },
        {
          height: 'auto',
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.1
        }
      )
      
      // Animation du bouton
      gsap.fromTo(buttonElement.querySelector('.icon-container'), 
        { rotation: 0, scale: 1 },
        {
          rotation: 180,
          scale: 1.1,
          duration: 0.4,
          ease: 'back.out(1.7)',
          delay: 0.1
        }
      )
    }
  }

  return (
    <div className={cn('space-y-4', className)}>
      {items.map((item, index) => (
        <div 
          key={index} 
          className="group border border-border rounded-xl overflow-hidden transition-all duration-300"
          style={{ backgroundColor: '#10151f' }}
        >
          <button
            ref={(el) => { buttonRefs.current[index] = el }}
                className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-surface-2/20 transition-all duration-200 group-hover:shadow-sm"
            onClick={() => toggleItem(index)}
            aria-expanded={openIndex === index}
            aria-controls={`accordion-content-${index}`}
          >
            <span className="font-semibold text-text pr-4 group-hover:text-brand transition-colors duration-200">
              {item.question}
            </span>
            <div className="icon-container flex-shrink-0">
              <div className="w-6 h-6 bg-brand rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-brand/25 transition-all duration-300">
                {openIndex === index ? (
                  <Minus className="w-3 h-3 text-black font-bold" />
                ) : (
                  <Plus className="w-3 h-3 text-black font-bold" />
                )}
              </div>
            </div>
          </button>
          <div 
            ref={(el) => { contentRefs.current[index] = el }}
            id={`accordion-content-${index}`}
            className="overflow-hidden"
            style={{ height: 0 }}
          >
            <div className="px-6 py-4">
              <p className="text-text-2 leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
