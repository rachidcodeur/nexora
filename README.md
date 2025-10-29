# 🚀 Nexora - Sites web propulsés par l'IA

Site web de Nexora, une agence spécialisée dans la création de sites web modernes avec l'aide de l'intelligence artificielle.

## ✨ Fonctionnalités

- **Design moderne** : Thème clair/sombre avec design tokens personnalisés
- **Responsive** : Optimisé pour tous les appareils
- **Performance** : Optimisé pour les Core Web Vitals
- **SEO** : Métadonnées complètes et données structurées
- **Accessibilité** : Conforme aux standards WCAG
- **RGPD** : Bannière de cookies et politique de confidentialité
- **Transparence IA** : Mentions claires de l'utilisation de l'IA

## 🛠️ Technologies

- **Framework** : Next.js 14 (App Router)
- **Styling** : Tailwind CSS avec design tokens personnalisés
- **Icons** : Lucide React
- **Animations** : Framer Motion
- **TypeScript** : Typage statique complet

## 🚀 Installation

```bash
# Cloner le projet
git clone https://github.com/nexora/nexora-website.git
cd nexora-website

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build de production
npm run build
npm start
```

## 📁 Structure du projet

```
nexora/
├── app/                    # Pages Next.js (App Router)
│   ├── globals.css        # Styles globaux et design tokens
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Page d'accueil
│   ├── offres/            # Page des offres
│   ├── realisations/      # Page portfolio
│   ├── contact/           # Page de contact
│   ├── legal/             # Mentions légales
│   ├── sitemap.ts         # Sitemap XML
│   ├── robots.ts          # Robots.txt
│   └── manifest.ts        # PWA manifest
├── components/            # Composants réutilisables
│   ├── Button.tsx         # Boutons
│   ├── Card.tsx           # Cartes
│   ├── Navigation.tsx     # Navigation
│   ├── Footer.tsx         # Footer
│   ├── ThemeToggle.tsx    # Toggle thème
│   ├── Accordion.tsx      # Accordéon FAQ
│   ├── CookieBanner.tsx   # Bannière cookies
│   └── StructuredData.tsx # Données structurées
├── lib/                   # Utilitaires
│   └── utils.ts           # Fonctions utilitaires
└── public/                # Assets statiques
```

## 🎨 Design System

### Couleurs
- **Brand** : #17E668 (vert néon)
- **Accent** : #4ae3c1 (turquoise)
- **Text** : #0B0F14 (clair) / #E6EAF2 (sombre)
- **Background** : #F6F8FB (clair) / #0B0F14 (sombre)

### Typographie
- **Display** : Sora, Plus Jakarta Sans
- **Body** : Inter, Manrope

### Composants
- Boutons (primary, secondary, ghost, link)
- Cartes avec effets glow
- Navigation sticky
- Accordéon FAQ
- Formulaire de contact
- Bannière de cookies

## 📱 Pages

### Accueil (`/`)
- Hero avec CTA
- Section statistiques
- Offres en cartes
- Processus en 4 étapes
- Portfolio mis en avant
- FAQ
- Bannière transparence IA

### Offres (`/offres`)
- 3 packs tarifaires principaux
- Application sur mesure
- Options et sur-mesure
- Transparence IA

### Réalisations (`/realisations`)
- Portfolio avec filtres
- Projets mis en avant
- Statistiques
- Témoignages clients

### Contact (`/contact`)
- Formulaire de contact
- Méthodes de contact
- FAQ
- Transparence IA

### Mentions légales (`/legal`)
- Mentions légales
- Politique de confidentialité
- CGV
- Politique cookies
- Utilisation IA

## 🔧 Configuration

### Variables d'environnement
Créer un fichier `.env.local` :

```env
NEXT_PUBLIC_SITE_URL=https://nexora.fr
NEXT_PUBLIC_CONTACT_EMAIL=contact@nexora.fr
NEXT_PUBLIC_PHONE=+33123456789
```

### Personnalisation
- Modifier les couleurs dans `tailwind.config.js`
- Ajuster les design tokens dans `app/globals.css`
- Personnaliser les contenus dans les pages

## 📈 SEO & Performance

- **Métadonnées** : Open Graph, Twitter Cards
- **Données structurées** : Schema.org (Organization, Website, FAQ, Product)
- **Sitemap** : Génération automatique
- **Robots.txt** : Configuration optimisée
- **Core Web Vitals** : Optimisé pour LCP, CLS, FID
- **Images** : Optimisation automatique Next.js

## 🔒 Conformité

- **RGPD** : Bannière de cookies, politique de confidentialité
- **Accessibilité** : Standards WCAG AA
- **Transparence IA** : Mentions claires de l'utilisation de l'IA

## 🚀 Déploiement

### Vercel (recommandé)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Uploader le dossier .next
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📞 Support

- **Email** : contact@nexora.fr
- **Téléphone** : +33 1 23 45 67 89
- **WhatsApp** : [Lien WhatsApp]

## 📄 Licence

© 2024 Nexora. Tous droits réservés.

---

**Nexora** - Des sites web propulsés par l'IA, beaux, rapides et accessibles à tous.
