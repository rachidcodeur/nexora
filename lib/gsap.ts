import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Configuration GSAP pour de meilleures performances
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
  
  // Configuration globale
  gsap.config({
    nullTargetWarn: false
  })
  
  // Configuration ScrollTrigger
  ScrollTrigger.config({
    ignoreMobileResize: true,
    syncInterval: 1
  })
  
  // Optimisation des performances
  gsap.set('.gsap-optimize', {
    willChange: 'transform, opacity'
  })
}

export { gsap, ScrollTrigger }
