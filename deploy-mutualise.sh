#!/bin/bash

# 🚀 Script de déploiement pour hébergement mutualisé - Nexora
echo "🚀 Déploiement Nexora pour hébergement mutualisé..."

# Vérification des prérequis
echo "📋 Vérification des prérequis..."

# Vérifier que Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    exit 1
fi

# Vérifier que npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé"
    exit 1
fi

echo "✅ Prérequis vérifiés"

# Installation des dépendances
echo "📦 Installation des dépendances..."
npm ci --production=false

# Vérification TypeScript
echo "🔍 Vérification TypeScript..."
npm run type-check

if [ $? -ne 0 ]; then
    echo "❌ Erreurs TypeScript détectées"
    exit 1
fi

# Linting
echo "🧹 Linting du code..."
npm run lint

if [ $? -ne 0 ]; then
    echo "❌ Erreurs de linting détectées"
    exit 1
fi

# Build de production
echo "🏗️ Build de production..."
npm run build:production

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du build"
    exit 1
fi

# Création du package de déploiement
echo "📦 Création du package de déploiement..."
mkdir -p deploy-package

# Copier les fichiers nécessaires
cp -r .next deploy-package/
cp -r public deploy-package/
cp package.json deploy-package/
cp next.config.js deploy-package/
cp -r lib deploy-package/
cp -r components deploy-package/
cp -r app deploy-package/

# Créer un package.json simplifié pour la production
cat > deploy-package/package.json << EOF
{
  "name": "nexora-production",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "next start -p 3000"
  },
  "dependencies": {
    "next": "^14.2.33",
    "react": "^18",
    "react-dom": "^18"
  }
}
EOF

# Créer un fichier de configuration pour l'hébergement
cat > deploy-package/README-DEPLOY.md << EOF
# 🚀 Déploiement Nexora - Hébergement Mutualisé

## 📁 Fichiers à uploader

Uploadez TOUS les fichiers du dossier \`deploy-package\` sur votre hébergement :

- \`.next/\` - Dossier de build Next.js
- \`public/\` - Images et assets statiques
- \`app/\` - Pages et layouts
- \`components/\` - Composants React
- \`lib/\` - Configuration centralisée
- \`package.json\` - Dépendances
- \`next.config.js\` - Configuration Next.js

## ⚙️ Configuration Serveur

### Apache (.htaccess)
\`\`\`apache
RewriteEngine On
RewriteRule ^(.*)$ http://localhost:3000/\$1 [P,L]
\`\`\`

### Nginx
\`\`\`nginx
location / {
    proxy_pass http://localhost:3000;
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
}
\`\`\`

## 🚀 Démarrage

1. Uploadez tous les fichiers
2. Installez Node.js sur votre serveur
3. Exécutez : \`npm install\`
4. Démarrez : \`npm start\`
5. Configurez votre serveur web pour proxy vers le port 3000

## 🔧 Configuration

Modifiez \`lib/config.ts\` avec vos informations :
- Nom de l'entreprise
- Email de contact
- Téléphone
- Site web
- Google Analytics ID

## 📊 Vérification

- ✅ Site accessible
- ✅ Images chargées
- ✅ Analytics fonctionnel
- ✅ SEO optimisé

---

**Nexora est prêt pour l'hébergement mutualisé !** 🎉
EOF

echo "✅ Package de déploiement créé dans 'deploy-package/'"
echo ""
echo "📊 Statistiques du build:"
echo "   - Taille totale: $(du -sh .next | cut -f1)"
echo "   - Pages générées: $(find .next/server/app -name "*.html" | wc -l)"
echo "   - Package de déploiement: $(du -sh deploy-package | cut -f1)"
echo ""
echo "🚀 Prêt pour l'upload sur votre hébergement mutualisé !"
echo ""
echo "📋 Prochaines étapes:"
echo "   1. Modifier lib/config.ts avec vos informations"
echo "   2. Ajouter les images dans public/"
echo "   3. Uploader le contenu de deploy-package/"
echo "   4. Configurer votre serveur web"
echo "   5. Démarrer l'application"
echo ""
echo "📖 Voir deploy-package/README-DEPLOY.md pour les instructions détaillées"
echo ""
echo "🎉 Nexora est prêt pour l'hébergement mutualisé !"
