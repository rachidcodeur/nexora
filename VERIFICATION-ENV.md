# 🔍 Vérification des Variables d'Environnement

## Problème détecté

Le diagnostic indique que les variables Stripe ne sont **pas chargées** par le serveur.

## ✅ Solution

### 1. Vérifier votre fichier `.env.local`

Assurez-vous que votre fichier `.env.local` contient bien :

```env
# Stripe (OBLIGATOIRE)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Supabase (déjà configuré ✓)
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

# Site URL (recommandé)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. Redémarrer le serveur

⚠️ **IMPORTANT** : Les variables d'environnement ne sont chargées qu'au **démarrage** du serveur.

1. **Arrêtez** le serveur (Ctrl+C dans le terminal)
2. **Relancez** le serveur :
   ```bash
   npm run dev
   ```

### 3. Vérifier que les variables sont chargées

Ouvrez dans votre navigateur :
```
http://localhost:3000/api/checkout/debug
```

Vous devriez voir :
```json
{
  "status": "OK",
  "checks": {
    "stripe": {
      "secretKey": true,
      "publishableKey": true,
      "webhookSecret": false  // OK si pas encore configuré
    },
    ...
  }
}
```

### 4. Si le problème persiste

1. Vérifiez que le fichier s'appelle exactement `.env.local` (avec le point au début)
2. Vérifiez qu'il est à la **racine** du projet (même niveau que `package.json`)
3. Vérifiez qu'il n'y a pas d'espaces autour du `=` dans les variables
4. Vérifiez qu'il n'y a pas de guillemets autour des valeurs (sauf si nécessaire)

### 5. Format correct

✅ **BON** :
```env
STRIPE_SECRET_KEY=sk_test_51AbCdEf...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51XyZwVu...
```

❌ **MAUVAIS** :
```env
STRIPE_SECRET_KEY = sk_test_...  # Espaces autour du =
STRIPE_SECRET_KEY="sk_test_..."  # Guillemets inutiles
STRIPE_SECRET_KEY sk_test_...     # Pas de =
```

## 🧪 Test rapide

Après avoir redémarré le serveur, testez à nouveau le bouton "Payer". Si l'erreur persiste, consultez :

1. La **console du navigateur** (F12) pour voir les erreurs côté client
2. Le **terminal du serveur** pour voir les erreurs côté serveur
3. La route de diagnostic : `http://localhost:3000/api/checkout/debug`

