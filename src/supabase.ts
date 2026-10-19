import { createClient } from '@supabase/supabase-js'

/**
 * Supabase backend for CLC Barmer.
 *
 * The URL and the publishable (anon) key are meant to be public - they are
 * shipped in every Supabase web app. Your data is protected by the database
 * rules instead: the site content is world-readable, but only the admin
 * password can change it.
 *
 * You can override these with Vercel environment variables
 * (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY) if you ever move projects.
 */
const env: Record<string, string | undefined> =
  (import.meta as { env?: Record<string, string> }).env || {}

const SUPABASE_URL = env.VITE_SUPABASE_URL || 'https://knvesnzqfiydyxhxabnj.supabase.co'
const SUPABASE_ANON_KEY =
  env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtudmVzbnpxZml5ZHl4aHhhYm5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI0MDMzODMsImV4cCI6MjEwNzk3OTM4M30.u2MqGQfMsj867jHHLiNReZTrvFRPqQfiKjANdueTEwA'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
})

export const isBackendConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)
