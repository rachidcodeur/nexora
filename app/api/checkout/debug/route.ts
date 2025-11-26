import { NextResponse } from 'next/server'

// Route de diagnostic pour vérifier la configuration
export async function GET() {
  const checks = {
    stripe: {
      secretKey: !!process.env.STRIPE_SECRET_KEY,
      publishableKey: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      webhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
    },
    supabase: {
      url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      anonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      serviceRoleKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    },
    site: {
      siteUrl: !!process.env.NEXT_PUBLIC_SITE_URL,
    },
  }

  const allGood = 
    checks.stripe.secretKey &&
    checks.stripe.publishableKey &&
    checks.supabase.url &&
    checks.supabase.serviceRoleKey

  return NextResponse.json({
    status: allGood ? 'OK' : 'ERROR',
    checks,
    message: allGood
      ? 'Toutes les variables d\'environnement sont configurées'
      : 'Certaines variables d\'environnement sont manquantes. Vérifiez votre .env.local',
  })
}

