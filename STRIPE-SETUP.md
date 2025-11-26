# Configuration Stripe - Guide Complet

Ce guide vous explique comment configurer le système de paiement Stripe pour Nexora.

## 📋 Prérequis

1. Un compte Stripe (créer sur [stripe.com](https://stripe.com))
2. Accès à votre dashboard Supabase
3. Les clés API Stripe (déjà configurées dans `.env.local`)

## 🔑 Variables d'environnement

Assurez-vous d'avoir ces variables dans votre `.env.local` :

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_... (ou sk_live_... en production)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... (ou pk_live_... en production)
STRIPE_WEBHOOK_SECRET=whsec_... (obtenu après création du webhook)

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci... (nécessaire pour les webhooks)

# Site URL (pour les redirections Stripe)
NEXT_PUBLIC_SITE_URL=http://localhost:3000 (dev) ou https://votredomaine.com (prod)
```

## 🗄️ Configuration de la base de données

### 1. Créer la table dans Supabase

Exécutez le script SQL dans votre dashboard Supabase :

1. Allez dans **SQL Editor** dans votre dashboard Supabase
2. Créez une nouvelle requête
3. Copiez-collez le contenu de `supabase/schema.sql`
4. Exécutez la requête

La table `nexora_orders` sera créée avec :
- Toutes les colonnes nécessaires
- Les index pour les performances
- Les politiques RLS (Row Level Security) pour la sécurité

### 2. Vérifier les politiques RLS

Les utilisateurs ne peuvent voir que leurs propres commandes grâce aux politiques RLS configurées.

## 🔗 Configuration du Webhook Stripe

### En développement local

1. Installez Stripe CLI :
   ```bash
   brew install stripe/stripe-cli/stripe
   # ou pour Windows/Linux : https://stripe.com/docs/stripe-cli
   ```

2. Connectez-vous à Stripe :
   ```bash
   stripe login
   ```

3. Démarrez le tunnel webhook :
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

4. Copiez le `webhook signing secret` (commence par `whsec_...`) et ajoutez-le à `.env.local` :
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

### En production

1. Allez dans votre [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Cliquez sur **"Add endpoint"**
3. Entrez l'URL de votre endpoint :
   ```
   https://votredomaine.com/api/webhooks/stripe
   ```
4. Sélectionnez les événements à écouter :
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`
5. Copiez le **Signing secret** et ajoutez-le à vos variables d'environnement de production

## 🧪 Tester le système

### 1. Tester l'authentification

1. Allez sur `/offres`
2. Cliquez sur "Payer" sur une offre
3. Vous devriez être redirigé vers la modal de connexion
4. Créez un compte ou connectez-vous

### 2. Tester le paiement

1. Utilisez les cartes de test Stripe :
   - **Carte réussie** : `4242 4242 4242 4242`
   - **Carte refusée** : `4000 0000 0000 0002`
   - Date d'expiration : n'importe quelle date future
   - CVC : n'importe quel 3 chiffres

2. Après le paiement, vous serez redirigé vers `/compte?success=true`

3. Vérifiez que la commande apparaît dans votre compte

### 3. Tester le remboursement

1. Allez sur `/compte`
2. Cliquez sur "Remboursement" sur une commande
3. Confirmez le remboursement
4. Vérifiez que le statut passe à "Remboursée"

## 📁 Structure des fichiers créés

```
app/
├── api/
│   ├── checkout/route.ts          # Création des sessions Stripe Checkout
│   ├── webhooks/stripe/route.ts   # Webhook pour les événements Stripe
│   ├── refund/route.ts            # Gestion des remboursements
│   └── invoice/route.ts           # Téléchargement des factures
├── compte/
│   └── page.tsx                   # Page de compte utilisateur
└── offres/
    ├── layout.tsx                 # Metadata pour la page offres
    └── page.tsx                   # Page des offres (modifiée)

components/
├── AuthModal.tsx                  # Modal d'authentification
└── PaymentButton.tsx               # Bouton de paiement

lib/
├── auth.ts                         # Hook d'authentification
└── stripe.ts                       # Configuration Stripe

supabase/
└── schema.sql                      # Schéma de base de données
```

## 🔒 Sécurité

- Les clés secrètes Stripe ne sont jamais exposées côté client
- Les webhooks sont vérifiés avec la signature Stripe
- Les utilisateurs ne peuvent accéder qu'à leurs propres commandes (RLS)
- Les remboursements nécessitent une confirmation explicite

## 🐛 Dépannage

### Le webhook ne fonctionne pas

1. Vérifiez que `STRIPE_WEBHOOK_SECRET` est correct
2. Vérifiez que l'URL du webhook est correcte
3. Consultez les logs Stripe dans le dashboard
4. Vérifiez les logs de votre application

### Les commandes ne s'affichent pas

1. Vérifiez que la table `nexora_orders` existe dans Supabase
2. Vérifiez que les politiques RLS sont activées
3. Vérifiez que l'utilisateur est bien connecté
4. Consultez la console du navigateur pour les erreurs

### Le paiement échoue

1. Vérifiez que `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` est correct
2. Vérifiez que `STRIPE_SECRET_KEY` est correct
3. Vérifiez que vous utilisez les bonnes clés (test vs production)
4. Consultez les logs Stripe dans le dashboard

## 📚 Ressources

- [Documentation Stripe](https://stripe.com/docs)
- [Stripe Checkout](https://stripe.com/docs/payments/checkout)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
- [Supabase RLS](https://supabase.com/docs/guides/auth/row-level-security)

