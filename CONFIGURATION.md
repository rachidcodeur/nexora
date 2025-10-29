# 🔧 Configuration Nexora - Hébergement Mutualisé

## 📋 Configuration Sans Variables d'Environnement

Le projet Nexora est configuré pour fonctionner **sans variables d'environnement**, parfait pour l'hébergement mutualisé !

### 🎯 Configuration Centralisée

Toutes les configurations sont centralisées dans le fichier `lib/config.ts` :

```typescript
// lib/config.ts
export const config = {
  // Informations de l'entreprise
  company: {
    name: 'Nexora',
    email: 'contact@nexora.fr',
    phone: '+33 1 23 45 67 89',
    website: 'https://nexora.fr'
  },
  
  // Google Analytics (à personnaliser)
  analytics: {
    googleAnalyticsId: 'G-XXXXXXXXXX', // ⚠️ À REMPLACER
    googleSearchConsole: 'your-google-verification-code' // ⚠️ À REMPLACER
  }
}
```

## 🔧 Personnalisation Requise

### 1. **Google Analytics** 📊
Dans `lib/config.ts`, remplacez :
```typescript
googleAnalyticsId: 'G-XXXXXXXXXX' // Par votre ID Google Analytics
```

### 2. **Google Search Console** 🔍
Dans `lib/config.ts`, remplacez :
```typescript
googleSearchConsole: 'your-google-verification-code' // Par votre code de vérification
```

### 3. **Informations de Contact** 📞
Modifiez dans `lib/config.ts` :
```typescript
company: {
  name: 'Votre Nom d\'Entreprise',
  email: 'votre@email.com',
  phone: '+33 X XX XX XX XX',
  website: 'https://votre-site.com'
}
```

### 4. **Images Requises** 🖼️
Ajoutez dans le dossier `public/` :
- `og-image.jpg` (1200x630px) - Image Open Graph
- `logo.png` - Logo de l'entreprise
- `icon-192.png` (192x192px) - Icône PWA
- `icon-512.png` (512x512px) - Icône PWA

## 🚀 Déploiement

### 1. **Build de Production**
```bash
npm run build:production
```

### 2. **Test Local**
```bash
npm start
```

### 3. **Upload sur Hébergement**
- Uploadez le dossier `.next` et `public`
- Uploadez `package.json` et `next.config.js`
- Configurez votre serveur pour pointer vers le dossier de build

## 📊 Fonctionnalités Incluses

### ✅ **SEO Optimisé**
- Métadonnées complètes
- Sitemap.xml automatique
- Robots.txt configuré
- Données structurées Schema.org
- Open Graph et Twitter Cards

### ✅ **Performance**
- Images WebP/AVIF
- Service Worker pour le cache
- Lazy loading
- Compression gzip/brotli
- Fonts optimisées

### ✅ **Sécurité**
- En-têtes de sécurité
- Protection XSS/CSRF
- HTTPS obligatoire

### ✅ **Analytics**
- Google Analytics 4 intégré
- Google Search Console
- Performance monitoring

## 🎯 Avantages de cette Configuration

### ✅ **Hébergement Mutualisé**
- Aucune variable d'environnement requise
- Configuration directement dans le code
- Facile à déployer sur n'importe quel hébergeur

### ✅ **Maintenance Simple**
- Un seul fichier à modifier (`lib/config.ts`)
- Toutes les configurations centralisées
- Pas de gestion d'environnements complexes

### ✅ **Performance Optimale**
- Build optimisé pour la production
- Cache configuré
- Images optimisées

## 📝 Checklist de Déploiement

- [ ] Modifier `lib/config.ts` avec vos informations
- [ ] Ajouter les images dans `public/`
- [ ] Configurer Google Analytics
- [ ] Configurer Google Search Console
- [ ] Tester le build : `npm run build:production`
- [ ] Tester localement : `npm start`
- [ ] Uploader sur votre hébergement
- [ ] Vérifier le site en ligne

## 🆘 Support

Pour toute question :
- Email : contact@nexora.fr
- Documentation : Voir `README-PRODUCTION.md`

---

**Nexora est prêt pour l'hébergement mutualisé !** 🚀✨
