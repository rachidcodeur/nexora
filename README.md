# 🚀 Nexora - Sites web propulsés par l'IA

Site web de Nexora, une agence spécialisée dans la création de sites web modernes assistés par l'intelligence artificielle.

## ✨ Fonctionnalités

- **Design moderne** : Interface dark mode avec animations GSAP avancées
- **Responsive** : Optimisé pour tous les appareils (desktop, tablette, mobile)
- **Performance** : Optimisé pour les Core Web Vitals
- **SEO** : Métadonnées complètes, sitemap, robots.txt et données structurées Schema.org
- **Accessibilité** : Conforme aux standards WCAG AA
- **RGPD** : Bannière de cookies et politique de confidentialité
- **Transparence IA** : Mentions claires de l'utilisation de l'IA

## 🛠️ Technologies

- **Framework** : Next.js 14 (App Router)
- **Styling** : Tailwind CSS avec design tokens personnalisés
- **Icons** : Lucide React
- **Animations** : GSAP (fadeInUp, reveal, glitch, pulse, float, typewriter, etc.)
- **TypeScript** : Typage statique complet
- **Optimisation** : Images WebP/AVIF, lazy loading, service workers

## 🚀 Installation

```bash
# Cloner le projet
git clone https://github.com/VOTRE-USERNAME/nexora.git
cd nexora

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build de production
npm run build:production
npm start
```

## 📁 Structure du projet

```
nexora/
├── app/                    # Pages Next.js (App Router)
│   ├── globals.css        # Styles globaux, animations, design tokens
│   ├── layout.tsx         # Layout principal avec métadonnées
│   ├── page.tsx           # Page d'accueil
│   ├── offres/            # Page des offres (checkerboard layout)
│   ├── realisations/      # Page portfolio
│   ├── contact/           # Page de contact
│   ├── legal/             # Mentions légales
│   ├── sitemap.ts         # Sitemap XML dynamique
│   ├── robots.ts          # Robots.txt
│   └── manifest.ts        # PWA manifest
├── components/            # Composants réutilisables
│   ├── Button.tsx         # Boutons avec variants
│   ├── Card.tsx           # Cartes avec effets
│   ├── Navigation.tsx     # Navigation sticky avec menu mobile
│   ├── Footer.tsx         # Footer avec liens
│   ├── Accordion.tsx      # Accordéon FAQ animé
│   ├── CookieBanner.tsx   # Bannière cookies RGPD
│   ├── StructuredData.tsx # Données structurées Schema.org
│   ├── GoogleAnalytics.tsx # Intégration GA4
│   └── ...               # Autres composants d'animation
├── lib/                   # Utilitaires et configuration
│   ├── config.ts          # Configuration centralisée
│   ├── gsap.ts            # Utilitaires GSAP
│   ├── seo.ts             # Fonctions SEO
│   └── utils.ts           # Fonctions utilitaires
└── public/                # Assets statiques
    ├── *.webp             # Images optimisées
    └── sw.js              # Service Worker
```

## 🎨 Design System

### Couleurs
- **Brand** : `#17E668` (vert néon Nexora)
- **Background** : `#0A0D14` (dark mode par défaut)
- **Surface** : `#10151F`, `#1A1F2E`
- **Text** : `#FFFFFF`, `#B8BCC8`
- **Border** : `#263044`

### Typographie
- **Display** : Sora (titles)
- **Body** : Inter (content)

### Animations
- GSAP ScrollTrigger pour les animations au scroll
- Animations de texte (reveal, glitch, typewriter)
- Animations de cartes (float, pulse, scale)
- Compteurs animés pour les statistiques

## 📱 Pages

### Accueil (`/`)
- Hero avec animations de particules
- Section statistiques avec compteurs animés
- Offres en cartes interactives
- Processus en 4 étapes avec flèches animées
- Portfolio de réalisations (3 projets)
- FAQ avec accordéon animé
- Section transparence & qualité
- CTA avec fond géométrique animé

### Offres (`/offres`)
- Layout checkerboard avec images
- 3 packs tarifaires : One Page (99€), Vitrine (199€), E-commerce (350€)
- Options et sur-mesure
- Section transparence
- CTA final

### Réalisations (`/realisations`)
- Portfolio complet avec filtres
- 3 projets principaux : Mariage Parfait, Loomeo, Fred Kross
- Images cliquables vers les sites réels
- Détails et statistiques pour chaque projet

### Contact (`/contact`)
- Formulaire de contact
- Email : contact@nexora-agenceweb.fr
- Design épuré et accessible

## 🔧 Configuration

### Configuration centralisée (`lib/config.ts`)
Toute la configuration est centralisée dans `lib/config.ts` pour faciliter les modifications :
- Informations de l'entreprise
- URLs et domaines
- Réseaux sociaux
- SEO par défaut
- Analytics

### Personnalisation
- Modifier les couleurs dans `tailwind.config.js`
- Ajuster les design tokens dans `app/globals.css`
- Personnaliser les contenus dans `lib/config.ts`
- Modifier les pages dans `app/`

## 📈 SEO & Performance

- **Métadonnées** : Open Graph, Twitter Cards
- **Données structurées** : Schema.org (Organization, Website, LocalBusiness, SoftwareApplication)
- **Sitemap** : Génération automatique via `app/sitemap.ts`
- **Robots.txt** : Configuration via `app/robots.ts`
- **Core Web Vitals** : Optimisé pour LCP, CLS, FID
- **Images** : Format WebP/AVIF, lazy loading
- **Service Worker** : Cache des assets pour PWA

## 🔒 Conformité

- **RGPD** : Bannière de cookies, politique de confidentialité
- **Accessibilité** : Standards WCAG AA, labels ARIA
- **Transparence IA** : Mentions claires de l'utilisation de l'IA
- **Sécurité** : Headers de sécurité configurés

## 🚀 Déploiement

### VPS (Serveur Privé Virtuel)
```bash
# Sur votre VPS, cloner le repository
git clone https://github.com/VOTRE-USERNAME/nexora.git
cd nexora

# Installer les dépendances
npm install

# Build de production
npm run build:production

# Démarrer avec PM2 (recommandé)
npm install -g pm2
pm2 start npm --name "nexora" -- start
pm2 save
pm2 startup
```

### Autres options : Vercel, Netlify
```bash
# Vercel
npm install -g vercel
vercel

# Netlify
npm run build
# Uploader via l'interface Netlify
```

## 📞 Contact

- **Email** : contact@nexora-agenceweb.fr
- **Site web** : https://nexora-agenceweb.fr
- **Réponse** : Sous 24h

## 📄 Licence

© 2024 Nexora. Tous droits réservés.

---

## 🎯 Projets Réalisés

- [Mariage Parfait](https://mariage-parfait.net/) - Application web événementiel
- [Loomeo](https://loomeo.io/) - Site vitrine technologie
- [Fred Kross](https://www.fredkross.com/) - E-commerce musique

**Nexora** - Des sites web assistés par l'IA, beaux, rapides et accessibles à tous. 🚀✨