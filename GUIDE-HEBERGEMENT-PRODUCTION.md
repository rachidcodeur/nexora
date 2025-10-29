# 🚀 Guide Complet - Hébergement en Production Nexora

## ✅ Vérification Pré-Déploiement

### **🔍 Tests Effectués :**
- ✅ **TypeScript** : Aucune erreur de type
- ✅ **Linting** : Warnings mineurs uniquement (images)
- ✅ **Build Production** : Compilation réussie
- ✅ **Package de déploiement** : Créé et vérifié
- ✅ **Images** : Toutes intégrées (6 images)
- ✅ **Configuration** : Domaine et contact mis à jour

### **📊 Statistiques du Build :**
- **Pages générées** : 6 pages statiques
- **Taille totale** : 111M (avec images)
- **Performance** : Optimisée pour la production
- **SEO** : Sitemap et robots.txt inclus

## 🌐 Configuration du Domaine

### **🔗 Informations du Site :**
- **Domaine** : `https://nexora-agenceweb.fr`
- **Email** : `contact@nexora-agenceweb.fr`
- **Contact** : Email uniquement (téléphone supprimé)

### **📁 Structure du Package :**
```
deploy-package/
├── .next/                   # Build Next.js optimisé
├── public/                  # Images et assets
│   ├── e-commerce.webp      ✅
│   ├── site-one-page.webp   ✅
│   ├── site-vitrine.webp    ✅
│   ├── mariage-parfait.webp ✅
│   ├── loomeo.webp          ✅
│   ├── fred-kross.jpg       ✅
│   └── sw.js                # Service Worker
├── app/                     # Pages et layouts
├── components/              # Composants React
├── lib/                     # Configuration centralisée
├── next.config.js           # Configuration Next.js
├── package.json             # Dépendances
└── README-DEPLOY.md         # Instructions détaillées
```

## 🚀 Étapes de Déploiement

### **1. Préparation de l'Hébergement**

#### **📋 Prérequis :**
- **Node.js** : Version 18+ installée sur le serveur
- **npm** : Pour installer les dépendances
- **Accès SSH** : À votre serveur d'hébergement
- **Domaine** : `nexora-agenceweb.fr` configuré

#### **🔧 Configuration Serveur :**
```bash
# Vérifier Node.js
node --version  # Doit être 18+

# Vérifier npm
npm --version   # Doit être 8+
```

### **2. Upload des Fichiers**

#### **📤 Méthode 1 : FTP/SFTP**
1. **Connectez-vous** à votre serveur via FTP/SFTP
2. **Naviguez** vers le dossier racine de votre site
3. **Uploadez** TOUT le contenu de `deploy-package/`
4. **Vérifiez** que la structure est correcte

#### **📤 Méthode 2 : SSH + SCP**
```bash
# Depuis votre machine locale
scp -r deploy-package/* user@votre-serveur:/chemin/vers/site/
```

#### **📤 Méthode 3 : Git (si configuré)**
```bash
# Sur le serveur
git clone https://github.com/votre-repo/nexora.git
cd nexora
# Puis suivre les étapes 3-5
```

### **3. Installation des Dépendances**

#### **📦 Sur le Serveur :**
```bash
# Naviguer vers le dossier du site
cd /chemin/vers/votre/site

# Installer les dépendances
npm install --production

# Vérifier l'installation
npm list
```

### **4. Configuration du Serveur Web**

#### **🌐 Apache (.htaccess)**
Créez un fichier `.htaccess` dans le dossier racine :
```apache
RewriteEngine On

# Redirection HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Proxy vers Next.js
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]

# Cache des assets statiques
<FilesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 year"
    Header set Cache-Control "public, immutable"
</FilesMatch>

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

#### **🌐 Nginx**
Configuration dans votre fichier de site :
```nginx
server {
    listen 80;
    listen 443 ssl;
    server_name nexora-agenceweb.fr www.nexora-agenceweb.fr;
    
    # Redirection HTTPS
    if ($scheme != "https") {
        return 301 https://$server_name$request_uri;
    }
    
    # Proxy vers Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Cache des assets statiques
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### **5. Démarrage de l'Application**

#### **🚀 Commandes de Démarrage :**
```bash
# Démarrer l'application
npm start

# Ou en arrière-plan
nohup npm start > app.log 2>&1 &

# Vérifier que l'application fonctionne
curl http://localhost:3000
```

#### **🔄 Process Manager (Recommandé) :**
```bash
# Installer PM2
npm install -g pm2

# Démarrer avec PM2
pm2 start npm --name "nexora" -- start

# Sauvegarder la configuration
pm2 save
pm2 startup

# Vérifier le statut
pm2 status
pm2 logs nexora
```

### **6. Configuration DNS**

#### **🌐 Enregistrements DNS :**
```
Type    Nom                    Valeur
A       nexora-agenceweb.fr    IP_DE_VOTRE_SERVEUR
CNAME   www                    nexora-agenceweb.fr
```

#### **🔒 SSL/HTTPS :**
- **Let's Encrypt** (gratuit) : `certbot --nginx` ou `certbot --apache`
- **Certificat commercial** : Suivre les instructions de votre fournisseur

### **7. Vérifications Post-Déploiement**

#### **✅ Tests à Effectuer :**
1. **Accès au site** : `https://nexora-agenceweb.fr`
2. **Pages principales** :
   - `/` (accueil)
   - `/offres` (offres)
   - `/contact` (contact)
   - `/realisations` (réalisations)
3. **Images** : Vérifier que toutes les images s'affichent
4. **Formulaires** : Tester le formulaire de contact
5. **Performance** : Google PageSpeed Insights
6. **SEO** : Vérifier `/sitemap.xml` et `/robots.txt`

#### **🔍 Outils de Vérification :**
- **Google PageSpeed Insights** : https://pagespeed.web.dev/
- **GTmetrix** : https://gtmetrix.com/
- **Google Search Console** : Ajouter le site
- **Google Analytics** : Configurer le tracking

## 📊 Optimisations Post-Déploiement

### **🔍 Google Search Console :**
1. **Ajouter le site** : `https://nexora-agenceweb.fr`
2. **Vérifier la propriété** : Via fichier HTML ou DNS
3. **Soumettre le sitemap** : `https://nexora-agenceweb.fr/sitemap.xml`
4. **Surveiller les erreurs** : Indexation et performance

### **📈 Google Analytics :**
1. **Créer un compte** : Google Analytics 4
2. **Récupérer l'ID** : Format `G-XXXXXXXXXX`
3. **Modifier** : `lib/config.ts` → `googleAnalyticsId`
4. **Redéployer** : Avec le nouvel ID

### **⚡ Optimisations Performance :**
- **CDN** : Cloudflare (gratuit) pour accélérer le chargement
- **Cache** : Configuration serveur optimisée
- **Images** : Déjà optimisées en WebP
- **Compression** : Gzip/Brotli activé

## 🆘 Dépannage

### **❌ Problèmes Courants :**

#### **Site ne se charge pas :**
```bash
# Vérifier que l'application tourne
pm2 status
# ou
ps aux | grep node

# Vérifier les logs
pm2 logs nexora
# ou
tail -f app.log
```

#### **Erreur 502/503 :**
- Vérifier que le proxy pointe vers `localhost:3000`
- Vérifier que l'application Next.js fonctionne
- Vérifier les logs du serveur web

#### **Images ne s'affichent pas :**
- Vérifier que le dossier `public/` est uploadé
- Vérifier les permissions des fichiers
- Vérifier la configuration du serveur web

#### **Formulaire de contact ne fonctionne pas :**
- Configurer un service d'email (Formspree, Netlify Forms, etc.)
- Vérifier la configuration du formulaire

## 📞 Support

### **🔧 En cas de problème :**
1. **Vérifier les logs** : `pm2 logs nexora`
2. **Redémarrer l'application** : `pm2 restart nexora`
3. **Vérifier la configuration** : Serveur web et DNS
4. **Tester localement** : `npm start` sur le serveur

### **📚 Documentation :**
- **Next.js** : https://nextjs.org/docs
- **PM2** : https://pm2.keymetrics.io/docs/
- **Apache** : https://httpd.apache.org/docs/
- **Nginx** : https://nginx.org/en/docs/

---

## 🎉 Félicitations !

**Nexora est maintenant prêt pour la production !** 🚀

**Résumé des étapes :**
1. ✅ Upload du package de déploiement
2. ✅ Installation des dépendances
3. ✅ Configuration du serveur web
4. ✅ Démarrage de l'application
5. ✅ Configuration DNS et SSL
6. ✅ Vérifications et optimisations

**Votre site est accessible sur : `https://nexora-agenceweb.fr`** 🌐✨
