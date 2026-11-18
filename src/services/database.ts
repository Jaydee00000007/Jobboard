import type { Job } from '../types/job'
import type { Application, ApplicationStatus, SavedJob, UserProfile } from '../types/store'
import { getAuthSession } from './auth'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, '')
const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY

interface DbJob {
  id: number
  initials: string
  title: string
  company: string
  location: string
  country: string
  eligible_countries: string[]
  remote_scope: 'Worldwide' | 'Regional' | 'Country-specific' | 'Not applicable'
  employment_type: Job['type']
  experience_level: Job['experienceLevel']
  work_mode: Job['workMode']
  category: string
  salary_text: string
  salary_rank: Job['salaryRank']
  description?: string
  application_url?: string | null
  source_url?: string | null
  posted_at: string
}

interface ProfileRow {
  full_name: string
  email: string
  role: string
  location: string
  phone_number: string
  skills: string[]
  about: string
  birth_date: string | null
  linkedin_url: string
  resume_name: string
}

interface SavedJobRow {
  job_id: number
  created_at: string
  job: DbJob | null
}

interface ApplicationRow {
  job_id: number
  status: ApplicationStatus
  applied_at: string
  job: DbJob | null
}

function headers() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('Supabase configuration is missing. Set the VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY variables.')
  }
  const token = getAuthSession()?.accessToken
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${token || SUPABASE_KEY}`,
    'Content-Type': 'application/json',
  }
}

async function request<T>(
  path: string,
  init: { method?: string; headers?: Record<string, string>; body?: string } = {},
): Promise<T> {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: { ...headers(), ...(init.headers || {}) },
  })
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || error.details || error.hint || 'Supabase database request failed.')
  }
  if (response.status === 204) return undefined as T
  return response.json() as Promise<T>
}

function mapJob(row: DbJob): Job {
  return {
    id: Number(row.id),
    initials: row.initials || row.company.slice(0, 2).toUpperCase(),
    title: row.title,
    company: row.company,
    location: row.location,
    country: row.country,
    eligibleCountries: row.eligible_countries || [],
    remoteScope: row.remote_scope,
    type: row.employment_type,
    experienceLevel: row.experience_level,
    workMode: row.work_mode,
    category: row.category,
    salaryText: row.salary_text || '',
    salaryRank: row.salary_rank || 'medium',
    posted: row.posted_at ? new Date(row.posted_at).toLocaleDateString() : '',
    description: row.description || '',
    applicationUrl: row.application_url || '',
    sourceUrl: row.source_url || '',
  }
}

export async function fetchPublishedJobs(): Promise<Job[]> {
  const rows = await request<DbJob[]>('jobs?select=*&is_active=eq.true&order=posted_at.desc')
  return rows.map(mapJob)
}

export async function fetchUserRecords(): Promise<{
  profile: ProfileRow | null
  saved: SavedJob[]
  applications: Application[]
}> {
  const session = getAuthSession()
  if (!session?.userId || !session.accessToken) {
    return { profile: null, saved: [], applications: [] }
  }

  const [profileRows, savedRows, applicationRows] = await Promise.all([
    request<ProfileRow[]>('profiles?select=*&limit=1'),
    request<SavedJobRow[]>('saved_jobs?select=job_id,created_at,job:jobs(*)&order=created_at.desc'),
    request<ApplicationRow[]>('applications?select=job_id,status,applied_at,job:jobs(*)&order=applied_at.desc'),
  ])

  const saved = savedRows
    .filter((row) => row.job)
    .map((row) => {
      const job = mapJob(row.job as DbJob)
      return {
        id: job.id,
        initials: job.initials,
        title: job.title,
        location: `${job.company} · ${job.location}`,
        pay: job.salaryText,
        saved: true,
      }
    })

  const applications = applicationRows
    .filter((row) => row.job)
    .map((row) => {
      const job = mapJob(row.job as DbJob)
      return {
        jobId: job.id,
        role: job.title,
        company: job.company,
        status: row.status,
        date: row.applied_at ? new Date(row.applied_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : '',
      }
    })

  return { profile: profileRows[0] || null, saved, applications }
}

export async function saveProfile(profile: UserProfile) {
  const userId = getAuthSession()?.userId
  if (!userId) throw new Error('Sign in before saving your profile.')
  await request('profiles?on_conflict=id', {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify({
      id: userId,
      full_name: profile.name,
      email: profile.email,
      role: profile.role,
      location: profile.location,
      phone_number: profile.phoneNumber,
      skills: profile.skill.split(',').map((skill) => skill.trim()).filter(Boolean),
      about: profile.about,
      birth_date: profile.birthDate || null,
      linkedin_url: profile.linkedinUrl,
      resume_name: profile.resumeName,
      updated_at: new Date().toISOString(),
    }),
  })
}

export async function persistSavedJob(jobId: number, shouldSave: boolean) {
  const userId = getAuthSession()?.userId
  if (!userId) throw new Error('Sign in to save jobs.')
  if (shouldSave) {
    await request('saved_jobs', {
      method: 'POST',
      headers: { Prefer: 'resolution=ignore-duplicates,return=minimal' },
      body: JSON.stringify({ user_id: userId, job_id: jobId }),
    })
  } else {
    await request(`saved_jobs?job_id=eq.${jobId}&user_id=eq.${userId}`, { method: 'DELETE' })
  }
}

export async function persistApplication(jobId: number, status: ApplicationStatus = 'Applied') {
  const userId = getAuthSession()?.userId
  if (!userId) throw new Error('Sign in to apply for jobs.')
  await request('applications?on_conflict=user_id,job_id', {
    method: 'POST',
    headers: { Prefer: 'resolution=ignore-duplicates,return=minimal' },
    body: JSON.stringify({ user_id: userId, job_id: jobId, status }),
  })
}

export async function persistApplicationStatus(jobId: number, status: ApplicationStatus) {
  const userId = getAuthSession()?.userId
  if (!userId) throw new Error('Sign in to update applications.')
  await request(`applications?job_id=eq.${jobId}&user_id=eq.${userId}`, {
    method: 'PATCH',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify({ status, updated_at: new Date().toISOString() }),
  })
}
