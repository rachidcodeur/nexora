// Script pour vérifier les variables d'environnement
// Utilisation: node check-env.js

const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');

if (!fs.existsSync(envPath)) {
  console.error('❌ Fichier .env.local introuvable');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const lines = envContent.split('\n');

const requiredVars = {
  'STRIPE_SECRET_KEY': false,
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY': false,
  'NEXT_PUBLIC_SITE_URL': false,
  'NEXT_PUBLIC_SUPABASE_URL': false,
  'SUPABASE_SERVICE_ROLE_KEY': false,
};

lines.forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const [key] = trimmed.split('=');
    if (key && requiredVars.hasOwnProperty(key.trim())) {
      const value = trimmed.split('=').slice(1).join('=');
      // Accepter les clés test (sk_test_, pk_test_) et live (sk_live_, pk_live_)
      if (value && 
          !value.includes('VOTRE_') && 
          !value.includes('VOTRE_CLE') &&
          (value.startsWith('sk_test_') || value.startsWith('sk_live_') || 
           value.startsWith('pk_test_') || value.startsWith('pk_live_') ||
           value.startsWith('http://') || value.startsWith('https://'))) {
        requiredVars[key.trim()] = true;
      }
    }
  }
});

console.log('\n📋 Vérification des variables d\'environnement:\n');
let allGood = true;

Object.entries(requiredVars).forEach(([key, isSet]) => {
  const status = isSet ? '✅' : '❌';
  console.log(`${status} ${key}`);
  if (!isSet) allGood = false;
});

if (!allGood) {
  console.log('\n⚠️  Certaines variables ne sont pas définies ou contiennent des placeholders.');
  console.log('💡 Remplacez les valeurs "VOTRE_CLE_..." par vos vraies clés Stripe.');
  console.log('💡 Puis redémarrez le serveur avec: npm run dev\n');
  process.exit(1);
} else {
  console.log('\n✅ Toutes les variables sont correctement configurées!');
  console.log('💡 N\'oubliez pas de redémarrer le serveur si vous venez de modifier .env.local\n');
}

