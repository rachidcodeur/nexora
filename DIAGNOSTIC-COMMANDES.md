# 🔍 Diagnostic - Commandes qui n'apparaissent pas

## Problème
Après un paiement test, la commande n'apparaît pas dans "Mon Compte".

## ✅ Vérifications à faire

### 1. Vérifier que la table existe dans Supabase

1. Allez dans votre **Supabase Dashboard** → **Table Editor**
2. Vérifiez que la table `nexora_orders` existe
3. Si elle n'existe pas, exécutez le script SQL dans `supabase/schema.sql`

### 2. Vérifier le webhook Stripe

#### En développement local :

Le webhook doit être actif via Stripe CLI :

```bash
# Dans un terminal séparé, lancez :
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

**Important** : Ce terminal doit rester ouvert pendant vos tests.

#### Vérifier les logs du webhook :

Après un paiement, regardez :
- Les logs dans le terminal Stripe CLI
- Les logs du serveur Next.js (terminal où `npm run dev` tourne)

Vous devriez voir :
```
📥 [WEBHOOK] Événement reçu: checkout.session.completed
✅ [WEBHOOK] checkout.session.completed pour session: cs_...
📦 [WEBHOOK] Création de la commande: ...
✅ [WEBHOOK] Commande créée avec succès: ...
```

### 3. Vérifier les logs de la page compte

Ouvrez la console du navigateur (F12) sur la page `/compte` et cherchez :
```
🔍 [COMPTE] Récupération des commandes pour user: ...
✅ [COMPTE] Commandes récupérées: X
```

### 4. Vérifier les politiques RLS

Dans Supabase Dashboard → **Authentication** → **Policies** :

Vérifiez que la politique `nexora_users_can_view_own_orders` existe et est activée pour la table `nexora_orders`.

### 5. Test manuel dans Supabase

1. Allez dans **Supabase Dashboard** → **SQL Editor**
2. Exécutez cette requête (remplacez `VOTRE_USER_ID` par votre ID utilisateur) :

```sql
SELECT * FROM nexora_orders 
WHERE user_id = 'VOTRE_USER_ID'
ORDER BY created_at DESC;
```

Si vous voyez des commandes ici mais pas sur la page, c'est un problème de RLS ou de requête côté client.

### 6. Vérifier les métadonnées Stripe

Dans votre [Stripe Dashboard](https://dashboard.stripe.com/payments) :
1. Trouvez votre paiement test
2. Vérifiez la section "Metadata"
3. Vous devriez voir :
   - `userId`
   - `offerId`
   - `offerName`

Si ces métadonnées sont manquantes, le webhook ne pourra pas créer la commande.

## 🛠️ Solutions

### Solution 1 : Webhook non configuré en local

Si vous testez en local, vous **devez** avoir Stripe CLI qui tourne :

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

### Solution 2 : Table non créée

Exécutez le script SQL `supabase/schema.sql` dans votre dashboard Supabase.

### Solution 3 : Webhook non configuré en production

En production, configurez le webhook dans Stripe Dashboard avec l'URL :
```
https://votredomaine.com/api/webhooks/stripe
```

### Solution 4 : Rafraîchir manuellement

Sur la page `/compte`, cliquez sur le bouton **"Actualiser"** pour forcer le rechargement des commandes.

## 📊 Logs à vérifier

### Logs du serveur Next.js
Cherchez les messages `[WEBHOOK]` et `[CHECKOUT]` pour voir ce qui se passe.

### Logs Stripe CLI
Si vous utilisez Stripe CLI, vous verrez tous les événements Stripe en temps réel.

### Console du navigateur
Ouvrez F12 → Console et cherchez les messages `[COMPTE]`.

## 🧪 Test rapide

1. Faites un paiement test
2. Regardez les logs du serveur (cherchez `[WEBHOOK]`)
3. Attendez 2-3 secondes
4. Cliquez sur "Actualiser" dans `/compte`
5. Vérifiez la console du navigateur (F12)

Si après ces étapes la commande n'apparaît toujours pas, vérifiez les logs pour identifier l'erreur exacte.

