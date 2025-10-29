# 🚀 Guide de Déploiement Nexora - Hébergement Mutualisé

Ce dossier contient votre site Nexora prêt à être uploadé dans le dossier `public_html` de votre hébergement mutualisé.

## 📋 Instructions de Déploiement

### 1. Upload des Fichiers
- Uploadez **TOUT** le contenu de ce dossier `public_html/` dans le dossier `public_html` de votre hébergement
- Assurez-vous que la structure des dossiers est préservée

### 2. Vérification
- Accédez à votre site via `https://nexora-agenceweb.fr`
- Vérifiez que toutes les pages se chargent correctement
- Testez le formulaire de contact

### 3. Configuration DNS (si nécessaire)
- Assurez-vous que votre domaine pointe vers votre hébergement
- Configurez un certificat SSL (Let's Encrypt recommandé)

## 📁 Structure du Site
```
public_html/
├── index.html              # Page d'accueil
├── offres/                 # Page des offres
│   └── index.html
├── contact/                # Page de contact
│   └── index.html
├── images/                 # Images du site
├── .htaccess              # Configuration Apache
├── robots.txt             # SEO
└── sitemap.xml            # Plan du site
```

## ⚡ Optimisations Incluses
- ✅ Compression GZIP
- ✅ Cache des assets statiques
- ✅ Headers de sécurité
- ✅ Redirection des routes SPA
- ✅ Images optimisées (WebP)

## 🎉 Votre site est prêt !

Nexora est maintenant déployé et optimisé pour la production.
