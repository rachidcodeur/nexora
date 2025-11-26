import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Use Edge runtime to avoid Node fetch issues in some environments
export const runtime = 'edge'

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  })
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function POST(req: Request) {
  try {
    const data = await req.json()

    // Basic validation
    const {
      name,
      email,
      phone,
      projectType,
      budget,
      message,
      consent,
      meta,
    } = data || {}

    if (!name || !email || !projectType || !message || !consent) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400, headers: corsHeaders }
      )
    }

    // Insert into Supabase
    // Nouvelle table: nexora_contacts_submissions
    let insertError: any | null = null
    let inserted: any = null

    // Try snake_case columns (notre schéma conseillé)
    {
      const { error, data } = await supabase
        .from('nexora_contacts_submissions')
        .insert([
          {
            name,
            email,
            phone: phone || null,
            project_type: projectType,
            budget: budget || null,
            message,
            consent: !!consent,
            meta: meta || null,
          },
        ])
        .select('id')

      insertError = error
      inserted = data?.[0]
    }

    // If columns mismatch (e.g., existing camelCase columns), try a fallback mapping
    if (insertError && /column|does not exist|unknown/.test(String(insertError?.message || ''))) {
      const { error, data } = await supabase
        .from('nexora_contacts_submissions')
        .insert([
          {
            name,
            email,
            phone: phone || null,
            projectType,
            budget: budget || null,
            message,
            consent: !!consent,
            meta: meta || null,
          },
        ])
        .select('id')

      insertError = error
      inserted = data?.[0]
    }

    if (!insertError) {
      // Appeler la Edge Function pour envoyer l'email (ne pas bloquer si ça échoue)
      sendContactEmail({
        name,
        email,
        phone: phone || null,
        project_type: projectType,
        budget: budget || null,
        message,
        consent: !!consent,
        meta: meta || null,
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.error('Erreur lors de l\'appel de la Edge Function:', err)
      })

      return NextResponse.json({ ok: true, id: inserted?.id }, { status: 201, headers: corsHeaders })
    }

    // Log l'erreur du SDK pour diagnostic
    // eslint-disable-next-line no-console
    console.error('Supabase SDK insert error:', insertError)

    // Fallback: direct REST call (bypass SDK/undici issues)
    // Utiliser service_role côté serveur pour contourner RLS si nécessaire
    try {
      const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ltylxkpzujydcrccsyol.supabase.co') + '/rest/v1/nexora_contacts_submissions'
      // Essayer d'abord avec anon, puis service_role si disponible (côté serveur uniquement)
      const apiKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0eWx4a3B6dWp5ZGNyY2NzeW9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyMjQ1NDEsImV4cCI6MjA3MzgwMDU0MX0.HrjEkbBHSsqvju3Ze3urq_D961DT9TIINEJb76pXCs8'

      // eslint-disable-next-line no-console
      console.log('Trying REST fallback:', url)

      const restRes = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: apiKey,
          Authorization: `Bearer ${apiKey}`,
          Prefer: 'return=representation',
        },
        body: JSON.stringify([
          {
            name,
            email,
            phone: phone || null,
            project_type: projectType,
            budget: budget || null,
            message,
            consent: !!consent,
            meta: meta || null,
          },
        ]),
      })

      if (!restRes.ok) {
        const errTxt = await restRes.text()
        // eslint-disable-next-line no-console
        console.error('Supabase REST insert failed:', restRes.status, errTxt)
        return NextResponse.json({ error: `Supabase REST: ${restRes.status} ${errTxt}` }, { status: 500, headers: corsHeaders })
      }

      const json = await restRes.json().catch(() => null as any)
      
      // Appeler la Edge Function pour envoyer l'email (ne pas bloquer si ça échoue)
      sendContactEmail({
        name,
        email,
        phone: phone || null,
        project_type: projectType,
        budget: budget || null,
        message,
        consent: !!consent,
        meta: meta || null,
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.error('Erreur lors de l\'appel de la Edge Function:', err)
      })
      
      return NextResponse.json({ ok: true, id: json?.[0]?.id }, { status: 201, headers: corsHeaders })
    } catch (restErr: any) {
      // eslint-disable-next-line no-console
      console.error('Supabase REST unexpected error:', restErr)
      return NextResponse.json({ error: String(restErr?.message || restErr) }, { status: 500, headers: corsHeaders })
    }
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.error('API /contact unexpected error:', e)
    return NextResponse.json({ error: e?.message || 'Unexpected error' }, { status: 500, headers: corsHeaders })
  }
}

// Fonction helper pour appeler la Edge Function Supabase
async function sendContactEmail(record: {
  name: string
  email: string
  phone: string | null
  project_type: string
  budget: string | null
  message: string
  consent: boolean
  meta: any
}) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ltylxkpzujydcrccsyol.supabase.co'
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    
    if (!serviceRoleKey) {
      // eslint-disable-next-line no-console
      console.warn('SUPABASE_SERVICE_ROLE_KEY non définie, impossible d\'envoyer l\'email')
      return
    }

    const response = await fetch(`${supabaseUrl}/functions/v1/nexora_send_contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${serviceRoleKey}`,
      },
      body: JSON.stringify({ record }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Edge Function error: ${response.status} ${errorText}`)
    }

    const result = await response.json()
    // eslint-disable-next-line no-console
    console.log('✅ Email envoyé via Edge Function:', result)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('❌ Erreur lors de l\'appel de la Edge Function:', error)
    // Ne pas throw pour ne pas bloquer la réponse de l'API
  }
}

