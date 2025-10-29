# 🚀 Déploiement Nexora - Hébergement Mutualisé

## 📁 Fichiers à uploader

Uploadez TOUS les fichiers du dossier `deploy-package` sur votre hébergement :

- `.next/` - Dossier de build Next.js
- `public/` - Images et assets statiques
- `app/` - Pages et layouts
- `components/` - Composants React
- `lib/` - Configuration centralisée
- `package.json` - Dépendances
- `next.config.js` - Configuration Next.js

## ⚙️ Configuration Serveur

### Apache (.htaccess)
```apache
RewriteEngine On
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
```

### Nginx
```nginx
location / {
    proxy_pass http://localhost:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

## 🚀 Démarrage

1. Uploadez tous les fichiers
2. Installez Node.js sur votre serveur
3. Exécutez : `npm install`
4. Démarrez : `npm start`
5. Configurez votre serveur web pour proxy vers le port 3000

## 🔧 Configuration

Modifiez `lib/config.ts` avec vos informations :
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
