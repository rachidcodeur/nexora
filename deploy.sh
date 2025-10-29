#!/bin/bash

# 🚀 Script de déploiement Nexora
echo "🚀 Déploiement de Nexora en production..."

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

# Vérification des fichiers critiques
echo "📁 Vérification des fichiers critiques..."

# Vérifier que les images existent
if [ ! -f "public/og-image.jpg" ]; then
    echo "⚠️  Attention: public/og-image.jpg manquant"
fi

if [ ! -f "public/logo.png" ]; then
    echo "⚠️  Attention: public/logo.png manquant"
fi

if [ ! -f "public/icon-192.png" ]; then
    echo "⚠️  Attention: public/icon-192.png manquant"
fi

if [ ! -f "public/icon-512.png" ]; then
    echo "⚠️  Attention: public/icon-512.png manquant"
fi

# Vérifier le fichier .env.local
if [ ! -f ".env.local" ]; then
    echo "⚠️  Attention: .env.local manquant - copiez env.example vers .env.local"
fi

echo "✅ Build terminé avec succès!"
echo ""
echo "📊 Statistiques du build:"
echo "   - Taille totale: $(du -sh .next | cut -f1)"
echo "   - Pages générées: $(find .next/server/app -name "*.html" | wc -l)"
echo ""
echo "🚀 Prêt pour le déploiement!"
echo ""
echo "📋 Prochaines étapes:"
echo "   1. Configurer les variables d'environnement (.env.local)"
echo "   2. Ajouter les images manquantes dans /public/"
echo "   3. Déployer sur Vercel/Netlify/AWS/etc."
echo "   4. Configurer Google Analytics"
echo "   5. Soumettre le sitemap à Google Search Console"
echo ""
echo "🎉 Nexora est prêt pour la production!"
