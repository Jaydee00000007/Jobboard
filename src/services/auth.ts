import type { AuthPayload } from '../types/store'

export interface AuthSession {
  email: string
  name: string
  skill?: string
  userType?: string
}

const SESSION_KEY = 'jobhunt.session'
const ACCOUNTS_KEY = 'jobhunt.accounts'
const PASSWORD_HASH_ITERATIONS = 120_000

interface RegisteredAccount extends AuthSession {
  passwordHash: string
  passwordSalt: string
}

function readAccounts(): RegisteredAccount[] {
  const raw = localStorage.getItem(ACCOUNTS_KEY)
  if (!raw) return []

  try {
    const accounts: unknown = JSON.parse(raw)
    return Array.isArray(accounts) ? (accounts as RegisteredAccount[]) : []
  } catch {
    localStorage.removeItem(ACCOUNTS_KEY)
    return []
  }
}

function toHex(bytes: Uint8Array) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function fromHex(value: string) {
  return Uint8Array.from(value.match(/.{2}/g) || [], (byte) => Number.parseInt(byte, 16))
}

async function hashPassword(password: string, salt: Uint8Array) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  )
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: PASSWORD_HASH_ITERATIONS, hash: 'SHA-256' },
    key,
    256,
  )
  return toHex(new Uint8Array(bits))
}

export async function registerAccount(payload: AuthPayload): Promise<boolean> {
  const email = payload.email.trim().toLowerCase()
  const accounts = readAccounts()
  if (accounts.some((account) => account.email === email)) return false

  const salt = crypto.getRandomValues(new Uint8Array(16))
  const account: RegisteredAccount = {
    name: payload.name?.trim() || '',
    email,
    skill: payload.skill,
    userType: payload.userType,
    passwordSalt: toHex(salt),
    passwordHash: await hashPassword(payload.password, salt),
  }

  accounts.push(account)
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
  return true
}

export async function verifyCredentials(
  email: string,
  password: string,
): Promise<AuthSession | null> {
  const normalizedEmail = email.trim().toLowerCase()
  const account = readAccounts().find((entry) => entry.email === normalizedEmail)
  if (!account) return null

  const passwordHash = await hashPassword(password, fromHex(account.passwordSalt))
  if (passwordHash !== account.passwordHash) return null

  return {
    name: account.name,
    email: account.email,
    skill: account.skill,
    userType: account.userType,
  }
}

export function getAuthSession(): AuthSession | null {
  const raw = localStorage.getItem(SESSION_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as AuthSession
  } catch {
    localStorage.removeItem(SESSION_KEY)
    return null
  }
}

export function saveAuthSession(session: AuthSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearAuthSession() {
  localStorage.removeItem(SESSION_KEY)
}
