// Test pour voir ce que Next.js charge réellement
// Ce script simule ce que Next.js fait au démarrage

console.log('🔍 Test de chargement des variables d\'environnement\n');

// Next.js charge automatiquement .env.local
// Mais pour ce test, on va vérifier directement
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');

if (!fs.existsSync(envPath)) {
  console.error('❌ .env.local n\'existe pas');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const lines = envContent.split('\n');

console.log('📄 Contenu du fichier .env.local:\n');

lines.forEach((line, index) => {
  if (line.includes('STRIPE') || line.includes('SITE_URL')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      const value = valueParts.join('=');
      
      console.log(`Ligne ${index + 1}: ${key.trim()}`);
      console.log(`  Valeur: "${value}"`);
      console.log(`  Longueur: ${value.length} caractères`);
      console.log(`  Commence par sk_/pk_: ${value.startsWith('sk_') || value.startsWith('pk_')}`);
      console.log(`  Contient "VOTRE": ${value.includes('VOTRE')}`);
      console.log('');
    }
  }
});

// Vérifier si les variables sont dans process.env (chargées par Next.js)
console.log('\n🔍 Variables dans process.env (chargées par le système):\n');
console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? `✅ "${process.env.STRIPE_SECRET_KEY.substring(0, 20)}..."` : '❌ Non définie');
console.log('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:', process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? `✅ "${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.substring(0, 20)}..."` : '❌ Non définie');
console.log('NEXT_PUBLIC_SITE_URL:', process.env.NEXT_PUBLIC_SITE_URL ? `✅ "${process.env.NEXT_PUBLIC_SITE_URL}"` : '❌ Non définie');

