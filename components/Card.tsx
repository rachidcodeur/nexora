import { ReactNode, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  glow?: boolean
  hover?: boolean
  id?: string
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ 
  children, 
  className = '', 
  glow = false, 
  hover = false,
  id
}, ref) => {
  return (
    <div 
      ref={ref}
      id={id}
      className={cn(
        'card',
        glow && 'card--glow',
        hover && 'hover-lift transition-transform duration-200',
        className
      )}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card'

export default Card
