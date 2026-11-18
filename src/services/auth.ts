import type { AuthPayload } from '../types/store'

export interface AuthSession {
  email: string
  name: string
  skill?: string
  userType?: string
  accessToken?: string
  refreshToken?: string
  userId?: string
}

const SESSION_KEY = 'jobhunt.session'
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, '')
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY

function headers(token?: string) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.')
  }
  return { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${token || SUPABASE_ANON_KEY}`, 'Content-Type': 'application/json' }
}

function toSession(data: any): AuthSession {
  return {
    email: data.user?.email || data.email || '',
    name: data.user?.user_metadata?.name || data.user?.user_metadata?.full_name || '',
    skill: data.user?.user_metadata?.skill || '',
    userType: data.user?.user_metadata?.userType || '',
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    userId: data.user?.id,
  }
}

async function request(path: string, body: unknown) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/${path}`, { method: 'POST', headers: headers(), body: JSON.stringify(body) })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.msg || data.message || data.error_description || 'Authentication failed.')
  return data
}

export async function registerAccount(payload: AuthPayload): Promise<boolean> {
  const data = await request('signup', {
    email: payload.email.trim().toLowerCase(),
    password: payload.password,
    data: { name: payload.name?.trim() || '', skill: payload.skill || '', userType: payload.userType || '' },
  })
  if (data.access_token) saveAuthSession(toSession(data))
  return true
}

export async function verifyCredentials(email: string, password: string): Promise<AuthSession | null> {
  return toSession(await request('token?grant_type=password', { email: email.trim().toLowerCase(), password }))
}

export function getAuthSession(): AuthSession | null {
  if (typeof localStorage === 'undefined') return null
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) as AuthSession : null
  } catch {
    localStorage.removeItem(SESSION_KEY)
    return null
  }
}

export function saveAuthSession(session: AuthSession) {
  if (typeof localStorage !== 'undefined') localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearAuthSession() {
  if (typeof localStorage !== 'undefined') localStorage.removeItem(SESSION_KEY)
}

export async function signOutRemote() {
  const session = getAuthSession()
  try {
    if (session?.accessToken && SUPABASE_URL && SUPABASE_ANON_KEY) {
      await fetch(`${SUPABASE_URL}/auth/v1/logout`, { method: 'POST', headers: headers(session.accessToken) })
    }
  } finally {
    clearAuthSession()
  }
}
