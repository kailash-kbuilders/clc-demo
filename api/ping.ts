/**
 * Daily keep-alive for the free Supabase plan.
 * A free Supabase project is paused after 7 days with no database activity, so
 * this tiny function touches the database once a day (see "crons" in vercel.json).
 */
const SUPABASE_URL = 'https://knvesnzqfiydyxhxabnj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtudmVzbnpxZml5ZHl4aHhhYm5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI0MzM4MywiZXhwIjoyMTA3OTc5MzgzfQ.u2MqGQfMsj867jHHLiNReZTrvFRPqQfiKjANdueTEwA'

export default async function handler(_req: any, res: any) {
  try {
    const r = await fetch(SUPABASE_URL + '/rest/v1/site_content?select=id&id=eq.1', {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: 'Bearer ' + SUPABASE_ANON_KEY,
      },
    })
    res.status(200).json({ ok: r.ok })
  } catch (e) {
    res.status(500).json({ ok: false })
  }
}
