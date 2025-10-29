# 🚀 Guide de Déploiement Nexora sur VPS

Guide complet pour déployer votre site Nexora sur un VPS (Serveur Privé Virtuel).

## 📋 Prérequis

- **VPS** avec accès SSH
- **Node.js** v18 ou plus récent
- **npm** installé
- **Git** installé
- **PM2** (gestionnaire de processus) - recommandé
- **Nginx** ou **Apache** comme serveur web reverse proxy

## 🔧 Installation sur le VPS

### 1. Connexion SSH

```bash
ssh user@votre-vps-ip
```

### 2. Installation de Node.js (si nécessaire)

```bash
# Pour Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Vérifier l'installation
node --version
npm --version
```

### 3. Cloner le Repository

```bash
# Créer un dossier pour l'application
mkdir -p ~/www
cd ~/www

# Cloner votre repository GitHub
git clone https://github.com/VOTRE-USERNAME/nexora.git
cd nexora
```

### 4. Installation des Dépendances

```bash
# Installer les dépendances
npm install

# Vérifier qu'il n'y a pas d'erreurs
npm run type-check
```

### 5. Configuration

Modifier `lib/config.ts` avec vos informations si nécessaire :
- Domaine
- Email
- Analytics IDs

### 6. Build de Production

```bash
npm run build:production
```

### 7. Installation de PM2

```bash
# Installer PM2 globalement
npm install -g pm2

# Démarrer l'application
pm2 start npm --name "nexora" -- start

# Vérifier que l'application tourne
pm2 status

# Sauvegarder la configuration pour redémarrage automatique
pm2 save
pm2 startup
```

## 🌐 Configuration Nginx (Reverse Proxy)

### Créer la Configuration Nginx

```bash
sudo nano /etc/nginx/sites-available/nexora
```

### Configuration de Base

```nginx
server {
    listen 80;
    server_name nexora-agenceweb.fr www.nexora-agenceweb.fr;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Activer le Site

```bash
# Créer le lien symbolique
sudo ln -s /etc/nginx/sites-available/nexora /etc/nginx/sites-enabled/

# Tester la configuration
sudo nginx -t

# Redémarrer Nginx
sudo systemctl restart nginx
```

## 🔒 Configuration SSL avec Let's Encrypt

```bash
# Installer Certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Obtenir le certificat SSL
sudo certbot --nginx -d nexora-agenceweb.fr -d www.nexora-agenceweb.fr

# Le renouvellement est automatique avec certbot
```

## 🛠️ Commandes Utiles PM2

```bash
# Voir les logs
pm2 logs nexora

# Redémarrer l'application
pm2 restart nexora

# Arrêter l'application
pm2 stop nexora

# Voir les informations de l'application
pm2 info nexora

# Surveiller les ressources
pm2 monit
```

## 🔄 Mise à Jour du Site

```bash
# Se connecter au VPS
ssh user@votre-vps-ip

# Aller dans le dossier du projet
cd ~/www/nexora

# Récupérer les dernières modifications
git pull

# Installer les nouvelles dépendances (si nécessaire)
npm install

# Rebuild
npm run build:production

# Redémarrer avec PM2
pm2 restart nexora
```

## 📊 Monitoring

### PM2 Monitoring

```bash
# Activer le monitoring PM2 Plus (optionnel)
pm2 link YOUR_SECRET_KEY YOUR_PUBLIC_KEY
```

### Logs

```bash
# Voir les logs en temps réel
pm2 logs nexora

# Voir les logs Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## 🔐 Sécurité

### Firewall (UFW)

```bash
# Autoriser SSH
sudo ufw allow 22/tcp

# Autoriser HTTP et HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Activer le firewall
sudo ufw enable

# Vérifier le statut
sudo ufw status
```

### Mises à Jour Système

```bash
# Mettre à jour le système régulièrement
sudo apt update
sudo apt upgrade -y
```

## 🚨 Dépannage

### L'application ne démarre pas

```bash
# Vérifier les logs PM2
pm2 logs nexora --lines 50

# Vérifier que le port 3000 est libre
sudo netstat -tulpn | grep 3000

# Vérifier les erreurs Node.js
node --version
```

### Nginx ne fonctionne pas

```bash
# Vérifier la configuration
sudo nginx -t

# Vérifier les logs d'erreur
sudo tail -f /var/log/nginx/error.log

# Redémarrer Nginx
sudo systemctl restart nginx
```

### Le site ne répond pas

```bash
# Vérifier que PM2 tourne
pm2 status

# Vérifier que l'application écoute sur le port 3000
curl http://localhost:3000

# Vérifier le reverse proxy Nginx
curl http://nexora-agenceweb.fr
```

## ✅ Checklist de Déploiement

- [ ] Node.js installé (v18+)
- [ ] Repository cloné
- [ ] Dépendances installées (`npm install`)
- [ ] Configuration mise à jour (`lib/config.ts`)
- [ ] Build réussi (`npm run build:production`)
- [ ] PM2 installé et configuré
- [ ] Application démarrée avec PM2
- [ ] Nginx configuré en reverse proxy
- [ ] SSL configuré (Let's Encrypt)
- [ ] Firewall configuré
- [ ] Site accessible via le domaine
- [ ] Monitoring en place

## 📞 Support

En cas de problème, vérifiez :
1. Les logs PM2 : `pm2 logs nexora`
2. Les logs Nginx : `/var/log/nginx/error.log`
3. Le statut PM2 : `pm2 status`
4. La configuration Nginx : `sudo nginx -t`

**Votre site Nexora est maintenant déployé sur votre VPS !** 🎉✨
