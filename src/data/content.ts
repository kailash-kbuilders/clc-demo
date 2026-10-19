import { supabase } from '../supabase'
import type { Pair } from '../i18n/LangContext'
import { MATERIAL, MEGATEST_DEFAULT, RESULTS, TESTSERIES_DEFAULT } from './site'

export type ResultItem = { img: string; name: Pair; detail: Pair }
export type PosterBlock = { poster: string; title: Pair; description: Pair }
export type MaterialItem = { title: Pair; sub: Pair; file: string }

export type SiteContent = {
  megatest: PosterBlock
  testseries: PosterBlock
  results: ResultItem[]
  materials: MaterialItem[]
}

/** What the site shows when the database has nothing saved yet. */
export const defaultContent: SiteContent = {
  megatest: MEGATEST_DEFAULT,
  testseries: TESTSERIES_DEFAULT,
  results: RESULTS.map((r) => ({ img: r.img, name: r.name, detail: r.detail })),
  materials: MATERIAL.map((m) => ({ title: m.t, sub: m.k, file: m.file })),
}

const TABLE = 'site_content'
const BUCKET = 'media'

function merge(d: Partial<SiteContent> | null | undefined): SiteContent {
  return {
    megatest: d?.megatest ?? defaultContent.megatest,
    testseries: d?.testseries ?? defaultContent.testseries,
    results: d?.results ?? defaultContent.results,
    materials: d?.materials ?? defaultContent.materials,
  }
}

export async function fetchContent(): Promise<SiteContent> {
  const { data, error } = await supabase.from(TABLE).select('data').eq('id', 1).maybeSingle()
  if (error || !data) return defaultContent
  return merge(data.data as Partial<SiteContent>)
}

/** Live updates - whatever the admin saves appears on every phone immediately. */
export function subscribeContent(onData: (c: SiteContent) => void): () => void {
  let alive = true

  fetchContent()
    .then((c) => {
      if (alive) onData(c)
    })
    .catch(() => {})

  // unique topic per subscription - React StrictMode mounts effects twice
  const topic = 'clc-site-' + Math.random().toString(36).slice(2)
  const channel = supabase
    .channel(topic)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: TABLE },
      (payload: { new?: { data?: Partial<SiteContent> } }) => {
        if (alive) onData(merge(payload.new?.data))
      },
    )
    .subscribe()

  return () => {
    alive = false
    supabase.removeChannel(channel)
  }
}

/** The password is checked inside the database - never in the browser code. */
export async function checkPassword(pass: string): Promise<boolean> {
  const { data, error } = await supabase.rpc('admin_check', { pass })
  if (error) throw new Error(error.message)
  return Boolean(data)
}

export async function saveContent(pass: string, patch: Partial<SiteContent>): Promise<void> {
  const { error } = await supabase.rpc('admin_save', { pass, patch })
  if (error) throw new Error(error.message)
}

export async function uploadFile(folder: string, file: File): Promise<string> {
  const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, '-')
  const path = `${folder}/${Date.now()}-${safe}`
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '31536000',
    upsert: false,
  })
  if (error) throw new Error(error.message)
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}
