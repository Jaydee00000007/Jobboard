import type { Job } from '../types/job'
import type { ApplicationStatus, SavedJob, UserProfile } from '../types/store'
import { getAuthSession } from './auth'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, '')
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY

function headers(prefer?: string) {
  if (!SUPABASE_URL || !SUPABASE_KEY) throw new Error('Supabase configuration is missing.')
  const token = getAuthSession()?.accessToken
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${token || SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    ...(prefer ? { Prefer: prefer } : {}),
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: { ...headers(), ...(init.headers || {}) },
  })
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || error.details || 'Supabase database request failed.')
  }
  if (response.status === 204) return undefined as T
  return response.json() as Promise<T>
}

function mapJob(row: any): Job {
  return {
    id: Number(row.id),
    initials: row.initials || row.company?.slice(0, 2).toUpperCase() || '',
    title: row.title,
    company: row.company,
    location: row.location,
    type: row.employment_type,
    experienceLevel: row.experience_level,
    workMode: row.work_mode,
    category: row.category,
    salaryText: row.salary_text || '',
    salaryRank: row.salary_rank || 'medium',
    posted: row.posted_at ? new Date(row.posted_at).toLocaleDateString() : '',
  }
}

export async function fetchPublishedJobs(): Promise<Job[]> {
  const rows = await request<any[]>('jobs?select=*&is_active=eq.true&order=posted_at.desc')
  return rows.map(mapJob)
}

export async function fetchUserRecords() {
  const [profileRows, savedRows, applicationRows] = await Promise.all([
    request<any[]>('profiles?select=*&limit=1'),
    request<any[]>('saved_jobs?select=job_id,created_at,job:jobs(*)&order=created_at.desc'),
    request<any[]>('applications?select=job_id,status,applied_at,job:jobs(*)&order=applied_at.desc'),
  ])
  return { profile: profileRows[0] || null, saved: savedRows, applications: applicationRows }
}

export async function saveProfile(profile: UserProfile) {
  const userId = getAuthSession()?.userId
  if (!userId) return
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
  if (shouldSave) {
    await request('saved_jobs', {
      method: 'POST',
      headers: { Prefer: 'resolution=ignore-duplicates,return=minimal' },
      body: JSON.stringify({ job_id: jobId }),
    })
  } else {
    await request(`saved_jobs?job_id=eq.${jobId}`, { method: 'DELETE' })
  }
}

export async function persistApplication(jobId: number, status: ApplicationStatus = 'Applied') {
  await request('applications?on_conflict=user_id,job_id', {
    method: 'POST',
    headers: { Prefer: 'resolution=ignore-duplicates,return=minimal' },
    body: JSON.stringify({ job_id: jobId, status }),
  })
}

export async function persistApplicationStatus(jobId: number, status: ApplicationStatus) {
  await request(`applications?job_id=eq.${jobId}`, {
    method: 'PATCH',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify({ status, updated_at: new Date().toISOString() }),
  })
}
