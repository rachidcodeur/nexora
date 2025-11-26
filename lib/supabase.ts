import { createClient } from '@supabase/supabase-js'

// Prefer environment variables on VPS; fall back to provided values if missing
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ltylxkpzujydcrccsyol.supabase.co'
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0eWx4a3B6dWp5ZGNyY2NzeW9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyMjQ1NDEsImV4cCI6MjA3MzgwMDU0MX0.HrjEkbBHSsqvju3Ze3urq_D961DT9TIINEJb76pXCs8'

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // Soft fail: we'll throw at usage time if undefined
  // eslint-disable-next-line no-console
  console.warn('Supabase URL or anon key is not set. Falling back to defaults if any.')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)


