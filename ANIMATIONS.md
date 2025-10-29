# 🎬 Guide des Animations GSAP - Nexora

Ce document décrit tous les composants d'animation disponibles dans le projet Nexora.

## 📦 Composants d'Animation

### 1. Animation (Animations.tsx)
Composant de base pour les animations d'éléments.

```tsx
<Animation animation="fadeInUp" delay={0.2} duration={1}>
  <div>Contenu animé</div>
</Animation>
```

**Types d'animation disponibles :**
- `fadeInUp` - Apparition depuis le bas
- `fadeInLeft` - Apparition depuis la gauche
- `fadeInRight` - Apparition depuis la droite
- `scaleIn` - Apparition avec effet de zoom
- `slideInUp` - Glissement depuis le bas
- `stagger` - Animation en cascade

### 2. StaggerAnimation
Animation en cascade pour plusieurs éléments.

```tsx
<StaggerAnimation stagger={0.2} className="grid grid-cols-3 gap-4">
  <div>Élément 1</div>
  <div>Élément 2</div>
  <div>Élément 3</div>
</StaggerAnimation>
```

### 3. TextAnimation
Animations spécialisées pour le texte.

```tsx
<TextAnimation animation="reveal" delay={0.5}>
  Texte animé
</TextAnimation>
```

**Types d'animation de texte :**
- `typewriter` - Effet machine à écrire
- `reveal` - Révélation progressive
- `slideUp` - Glissement vers le haut
- `fadeInWords` - Apparition mot par mot
- `glitch` - Effet de glitch

### 4. AdvancedTextAnimation
Animations de texte avancées.

```tsx
<AdvancedTextAnimation animation="splitWords" delay={0.2}>
  Texte avec animation avancée
</AdvancedTextAnimation>
```

**Types d'animation avancée :**
- `splitWords` - Division en mots
- `splitChars` - Division en caractères
- `morphing` - Morphing de forme
- `wave` - Effet de vague
- `bounce` - Effet de rebond
- `glitch` - Glitch avancé

### 5. CounterAnimation
Animation de compteur pour les chiffres.

```tsx
<CounterAnimation end={120} duration={2} delay={0.5}>
  0
</CounterAnimation>
```

### 6. AnimatedCard
Cartes avec animations spéciales.

```tsx
<AnimatedCard animation="float" glow hover>
  <div>Contenu de la carte</div>
</AnimatedCard>
```

**Types d'animation de carte :**
- `float` - Flottement
- `pulse` - Pulsation
- `tilt` - Basculement au hover
- `magnetic` - Effet magnétique

### 7. ParticleBackground
Arrière-plan avec particules animées.

```tsx
<ParticleBackground count={30} />
<ConnectedParticles count={20} />
```

### 8. ScrollReveal
Animations déclenchées au scroll.

```tsx
<ScrollReveal direction="up" distance={50} duration={1}>
  <div>Contenu révélé au scroll</div>
</ScrollReveal>
```

### 9. CustomCursor
Curseur personnalisé avec effets.

```tsx
<CustomCursor enabled={true} trail={true} magnetic={true} />
```

### 10. LoadingAnimation
Animations de chargement.

```tsx
<LoadingAnimation type="spinner" size="lg" color="#17E668" />
```

**Types de loading :**
- `spinner` - Spinner classique
- `dots` - Points animés
- `pulse` - Pulsation
- `wave` - Vague
- `morphing` - Morphing
- `particles` - Particules

## 🎯 Utilisation dans les Pages

### Page d'Accueil
```tsx
// Hero avec animations de texte
<Animation animation="fadeInUp" delay={0.2}>
  <h1>
    <TextAnimation animation="reveal" delay={0.5}>
      Créez votre site pro,{' '}
    </TextAnimation>
    <TextAnimation animation="glitch" delay={1.2}>
      <span className="text-brand">propulsé par l'IA</span>
    </TextAnimation>
  </h1>
</Animation>

// Statistiques avec compteurs
<CounterAnimation end={120} duration={2} delay={index * 0.2} />

// Cartes avec animations
<AnimatedCard animation="float" hover>
  <div>Contenu de la carte</div>
</AnimatedCard>
```

### Arrière-plan avec Particules
```tsx
<section className="relative overflow-hidden">
  <ParticleBackground count={30} />
  <ConnectedParticles count={20} />
  <div className="relative z-10">
    {/* Contenu */}
  </div>
</section>
```

## ⚙️ Configuration GSAP

Le fichier `lib/gsap.ts` contient la configuration optimisée :

```typescript
import { gsap, ScrollTrigger } from '@/lib/gsap'

// Configuration automatique des plugins
// Optimisation des performances
// Configuration ScrollTrigger
```

## 🎨 Classes CSS Utilitaires

- `.gsap-optimize` - Optimisation des performances
- `.hover-lift` - Effet de levée au hover
- `.card--glow` - Effet de lueur sur les cartes

## 📱 Responsive et Performance

- Toutes les animations respectent `prefers-reduced-motion`
- Optimisation automatique des performances
- Animations adaptées mobile/desktop
- Lazy loading des animations

## 🔧 Personnalisation

### Créer une Animation Personnalisée
```tsx
import { useGSAP } from '@/components/Animations'

function CustomComponent() {
  const { gsap, ScrollTrigger } = useGSAP()
  
  useEffect(() => {
    gsap.to('.my-element', {
      x: 100,
      duration: 1,
      ease: 'power2.out'
    })
  }, [])
  
  return <div className="my-element">Contenu</div>
}
```

### Animation avec ScrollTrigger
```tsx
gsap.to(element, {
  x: 100,
  scrollTrigger: {
    trigger: element,
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse'
  }
})
```

## 🚀 Bonnes Pratiques

1. **Performance** : Utilisez `.gsap-optimize` sur les éléments animés
2. **Accessibilité** : Respectez `prefers-reduced-motion`
3. **Mobile** : Testez sur mobile, certaines animations peuvent être lourdes
4. **Timing** : Utilisez des délais cohérents (0.1s, 0.2s, 0.3s...)
5. **Easing** : Préférez `power2.out` pour des animations naturelles

## 🎭 Exemples d'Effets Avancés

### Effet de Parallaxe
```tsx
gsap.to('.parallax-element', {
  y: -100,
  scrollTrigger: {
    trigger: '.parallax-container',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true
  }
})
```

### Animation de Timeline
```tsx
const tl = gsap.timeline()
tl.to('.element1', { x: 100, duration: 1 })
  .to('.element2', { y: 100, duration: 1 }, '-=0.5')
  .to('.element3', { rotation: 360, duration: 1 })
```

### Effet de Morphing
```tsx
gsap.to('.morph-element', {
  borderRadius: '50%',
  scale: 1.2,
  duration: 0.5,
  ease: 'power2.inOut',
  yoyo: true,
  repeat: -1
})
```

---

**Note** : Toutes les animations sont optimisées pour les performances et l'accessibilité. Testez toujours sur différents appareils et navigateurs.
