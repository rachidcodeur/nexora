# 📦 Guide de Publication sur GitHub - Nexora

## ✅ **Préparation du Projet**

Le projet a été allégé avec un `.gitignore` complet qui exclut :
- ✅ `node_modules/` - Dépendances (sera installé avec `npm install`)
- ✅ `.next/` - Build Next.js
- ✅ `out/` - Export statique
- ✅ `deploy-package/` - Package de déploiement
- ✅ `public_html/` - Export HTML statique
- ✅ Fichiers temporaires et logs

## 🚀 **Instructions pour Publier sur GitHub**

### **Étape 1 : Initialiser Git (si pas déjà fait)**

```bash
# Depuis le dossier du projet
cd /Users/Apple/Desktop/Projets\ Cursor/Nexora

# Initialiser Git
git init

# Vérifier que .gitignore est bien présent
ls -la | grep gitignore
```

### **Étape 2 : Ajouter les Fichiers**

```bash
# Ajouter tous les fichiers (le .gitignore exclura automatiquement les fichiers non nécessaires)
git add .

# Vérifier les fichiers ajoutés
git status
```

### **Étape 3 : Premier Commit**

```bash
# Créer le premier commit
git commit -m "Initial commit: Site Nexora - Sites web assistés par l'IA"
```

### **Étape 4 : Créer le Repository sur GitHub**

1. **Aller sur GitHub** : https://github.com
2. **Cliquer** sur le bouton "+" en haut à droite
3. **Sélectionner** "New repository"
4. **Remplir les informations** :
   - **Repository name** : `nexora` (ou un autre nom)
   - **Description** : `Site web Nexora - Sites web assistés par l'IA, beaux, rapides et accessibles à tous`
   - **Visibilité** : Public ou Private (selon votre choix)
   - **NE PAS** cocher "Initialize with README" (on a déjà un README)
   - **NE PAS** ajouter .gitignore ou license (on les a déjà)

### **Étape 5 : Connecter le Repository Local à GitHub**

```bash
# Remplacer YOUR-USERNAME par votre nom d'utilisateur GitHub
# Remplacer nexora par le nom de votre repository si différent

git remote add origin https://github.com/YOUR-USERNAME/nexora.git

# Vérifier la connexion
git remote -v
```

### **Étape 6 : Pousser vers GitHub**

```bash
# Renommer la branche principale en main (si nécessaire)
git branch -M main

# Pousser vers GitHub
git push -u origin main
```

### **Étape 7 : Vérifier sur GitHub**

1. **Aller** sur https://github.com/YOUR-USERNAME/nexora
2. **Vérifier** que tous les fichiers sont présents
3. **Vérifier** que `node_modules/`, `.next/`, etc. sont bien absents

## 📋 **Fichiers à Exclure (déjà dans .gitignore)**

Les fichiers suivants **NE SERONT PAS** ajoutés à GitHub (c'est normal) :
- ❌ `node_modules/` - Sera réinstallé avec `npm install`
- ❌ `.next/` - Sera regénéré avec `npm run build`
- ❌ `out/` - Export statique
- ❌ `deploy-package/` - Package de déploiement
- ❌ `public_html/` - Export HTML statique
- ❌ `*.log` - Fichiers de logs
- ❌ `.DS_Store` - Fichiers système Mac

## 🔄 **Commandes Git Utiles**

### **Voir l'état du repository**
```bash
git status
```

### **Voir les différences**
```bash
git diff
```

### **Voir l'historique**
```bash
git log
```

### **Ajouter des modifications et pousser**
```bash
# Ajouter les modifications
git add .

# Créer un commit
git commit -m "Description des modifications"

# Pousser vers GitHub
git push
```

### **Créer une nouvelle branche**
```bash
git checkout -b feature/nom-de-la-fonctionnalite
```

## 📝 **Structure Recommandée du Repository**

```
nexora/
├── .gitignore              ✅ Exclut les fichiers lourds
├── README.md               ✅ Documentation principale
├── package.json            ✅ Dépendances
├── next.config.js          ✅ Configuration Next.js
├── tailwind.config.js      ✅ Configuration Tailwind
├── tsconfig.json           ✅ Configuration TypeScript
├── app/                    ✅ Code source des pages
├── components/             ✅ Composants React
├── lib/                    ✅ Utilitaires
├── public/                 ✅ Assets statiques (images, etc.)
└── GUIDE-*.md              ✅ Guides de déploiement
```

## 🎯 **Après la Publication**

### **Pour Cloner le Projet**
```bash
git clone https://github.com/YOUR-USERNAME/nexora.git
cd nexora
npm install
npm run dev
```

### **Pour Contribuer**
Les contributeurs pourront :
1. Fork le repository
2. Cloner leur fork
3. Créer une branche pour leur fonctionnalité
4. Pousser leurs modifications
5. Créer une Pull Request

## 🔐 **Sécurité**

⚠️ **Important** : Vérifiez que `lib/config.ts` ne contient pas de données sensibles :
- ✅ Les informations publiques (email, site web) sont OK
- ❌ Ne pas commiter de clés API, tokens secrets, etc.

Si vous avez des données sensibles, utilisez des variables d'environnement (`.env.local`) qui sont déjà dans `.gitignore`.

## 📊 **Taille Estimée du Repository**

Sans les fichiers exclus :
- **Code source** : ~2-5 MB
- **Images** : ~500 KB (6 images WebP)
- **Documentation** : ~50 KB
- **Total** : ~3-6 MB (très léger !)

## ✅ **Checklist Avant de Pousser**

- [ ] `.gitignore` est présent et correct
- [ ] `README.md` est à jour
- [ ] `package.json` contient toutes les dépendances
- [ ] Aucun fichier sensible dans le code
- [ ] Les tests passent (`npm run lint`)
- [ ] Le build fonctionne (`npm run build`)
- [ ] Les images sont dans `public/`
- [ ] La configuration est dans `lib/config.ts`

## 🎉 **C'est Prêt !**

Votre projet Nexora est maintenant prêt à être publié sur GitHub ! 🚀

---

**Besoin d'aide ?** Vérifiez que toutes les étapes ci-dessus sont suivies. Si vous rencontrez des erreurs, consultez la documentation Git ou GitHub.
