import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

function isValidHttpUrl(value) {
  if (!value || typeof value !== 'string') return false
  try {
    const parsed = new URL(value)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

const FALLBACK_SUPABASE = {
  functions: {
    invoke: async () => ({
      data: null,
      error: new Error('[Supabase] Credenciais inválidas ou não configuradas.'),
    }),
  },
}

let client = FALLBACK_SUPABASE

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('[Supabase] Variáveis de ambiente não configuradas. A usar fallback local.')
} else if (!isValidHttpUrl(SUPABASE_URL)) {
  console.warn('[Supabase] VITE_SUPABASE_URL inválida. A usar fallback local.')
} else {
  try {
    client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  } catch (error) {
    console.warn('[Supabase] Falha ao criar cliente. A usar fallback local.', error)
    client = FALLBACK_SUPABASE
  }
}

export const supabase = client
