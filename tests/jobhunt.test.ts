import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useJobhuntStore } from '../src/stores/jobhunt'
import { jobs } from '../src/data/jobs'

vi.mock('../src/services/auth', () => ({
  getAuthSession: () => {
    const raw = localStorage.getItem('jobhunt.session')
    return raw ? JSON.parse(raw) : null
  },
  saveAuthSession: (session: unknown) => {
    localStorage.setItem('jobhunt.session', JSON.stringify(session))
  },
  clearAuthSession: () => localStorage.removeItem('jobhunt.session'),
  signOutRemote: async () => {
    localStorage.removeItem('jobhunt.session')
  },
  registerAccount: async (payload: { name?: string; email: string; password: string; skill?: string }) => {
    const accounts = JSON.parse(localStorage.getItem('test.accounts') || '[]') as Array<Record<string, string>>
    const email = payload.email.trim().toLowerCase()
    if (accounts.some((account) => account.email === email)) throw new Error('Account already exists')
    accounts.push({ email, password: payload.password, name: payload.name || '', skill: payload.skill || '' })
    localStorage.setItem('test.accounts', JSON.stringify(accounts))
    localStorage.setItem('jobhunt.session', JSON.stringify({
      email,
      name: payload.name || '',
      skill: payload.skill || '',
      accessToken: 'test-access-token',
      refreshToken: 'test-refresh-token',
      userId: 'test-user-id',
    }))
    return true
  },
  verifyCredentials: async (email: string, password: string) => {
    const accounts = JSON.parse(localStorage.getItem('test.accounts') || '[]') as Array<Record<string, string>>
    const account = accounts.find((entry) => entry.email === email.trim().toLowerCase() && entry.password === password)
    if (!account) return null
    return {
      email: account.email,
      name: account.name,
      skill: account.skill,
      accessToken: 'test-access-token',
      refreshToken: 'test-refresh-token',
      userId: 'test-user-id',
    }
  },
}))

vi.mock('../src/services/database', () => ({
  fetchUserRecords: async () => ({ profile: null, saved: [], applications: [] }),
  saveProfile: async () => undefined,
  persistSavedJob: async () => undefined,
  persistApplication: async () => undefined,
  persistApplicationStatus: async () => undefined,
}))

const storage = new Map<string, string>()

Object.defineProperty(globalThis, 'localStorage', {
  value: {
    get length() {
      return storage.size
    },
    clear: () => storage.clear(),
    getItem: (key: string) => storage.get(key) ?? null,
    key: (index: number) => Array.from(storage.keys())[index] ?? null,
    removeItem: (key: string) => storage.delete(key),
    setItem: (key: string, value: string) => storage.set(key, value),
  } satisfies Storage,
})

describe('jobhunt store', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('starts with an empty account job tracker', () => {
    const store = useJobhuntStore()

    expect(store.isAuthenticated).toBe(false)
    expect(store.applications).toHaveLength(0)
    expect(store.savedJobsCount).toBe(0)
    expect(store.unreadMessageCount).toBe(2)
  })

  it('marks messages read when opened and deletes only read or replied messages', () => {
    const store = useJobhuntStore()

    store.selectMessage(1)
    expect(store.inboxMessages[0].unread).toBe(false)
    expect(store.unreadMessageCount).toBe(1)

    store.deleteMessage(1)
    expect(store.inboxMessages.map((message) => message.id)).toEqual([2, 3])
    expect(store.selectedMessage?.id).toBe(2)
    expect(store.selectedMessage?.unread).toBe(false)

    store.inboxMessages[0].reply = 'Thanks for the update.'
    store.deleteMessage(2)
    expect(store.inboxMessages.map((message) => message.id)).toEqual([3])
    expect(store.selectedMessage?.id).toBe(3)

    store.deleteMessage(3)
    expect(store.inboxMessages).toHaveLength(0)
    expect(store.selectedMessage).toBeUndefined()
    expect(store.unreadMessageCount).toBe(0)
  })

  it('updates profile details and normalizes the skill list', () => {
    const store = useJobhuntStore()

    store.updateUserProfile({
      name: 'Ada Lovelace',
      location: 'Lagos',
      phoneNumber: '+234 801 234 5678',
      about: 'Product designer',
      birthDate: '1990-12-10',
      linkedinUrl: 'https://www.linkedin.com/in/ada',
      resumeName: 'ada-resume.pdf',
    })
    store.updateProfileSkills([' UX design ', 'TypeScript', 'UX design', ''])

    expect(store.userProfile).toMatchObject({
      name: 'Ada Lovelace',
      initials: 'AL',
      location: 'Lagos',
      phoneNumber: '+234 801 234 5678',
      about: 'Product designer',
      birthDate: '1990-12-10',
      linkedinUrl: 'https://www.linkedin.com/in/ada',
      resumeName: 'ada-resume.pdf',
      skill: 'UX design, TypeScript',
    })
    expect(store.skills.map((skill) => skill.name)).toEqual(['UX design', 'TypeScript'])
  })

  it('preserves editable profile details and skills when the same account signs in again', async () => {
    const store = useJobhuntStore()
    const credentials = {
      name: 'Original Name',
      email: 'profile@example.com',
      password: 'password123',
      skill: 'Product design',
    }

    expect(await store.signUp(credentials)).toBe(true)
    store.updateUserProfile({ name: 'Updated Name', location: 'Lagos', resumeName: 'resume.pdf' })
    store.updateProfileSkills(['Research', 'Accessibility'])

    store.signOut()
    expect(await store.signIn(credentials)).toBe(true)
    expect(store.userProfile).toMatchObject({
      name: 'Updated Name',
      location: 'Lagos',
      resumeName: 'resume.pdf',
      skill: 'Research, Accessibility',
    })
    expect(store.skills.map((skill) => skill.name)).toEqual(['Research', 'Accessibility'])
  })

  it('filters persisted applications by status', async () => {
    const store = useJobhuntStore()
    store.isAuthenticated = true
    const job = jobs[0]

    expect(await store.applyForJob(job)).toBe(true)
    store.toggleApplicationFilter('applied')
    expect(store.filteredApplications).toHaveLength(1)
    expect(store.filteredApplications[0].jobId).toBe(job.id)
  })

  it('saves and unsaves a job for an authenticated account', async () => {
    const store = useJobhuntStore()
    store.isAuthenticated = true
    const job = jobs[0]

    expect(store.isJobSaved(job.id)).toBe(false)
    expect(await store.toggleSavedJob(job)).toBe(true)
    expect(store.isJobSaved(job.id)).toBe(true)
    expect(store.savedJobsCount).toBe(1)

    expect(await store.toggleSavedJob(job.id)).toBe(true)
    expect(store.isJobSaved(job.id)).toBe(false)
    expect(store.savedJobsCount).toBe(0)
  })

  it('removes a saved job and allows it to be saved again', async () => {
    const store = useJobhuntStore()
    store.isAuthenticated = true
    const job = jobs[0]

    await store.toggleSavedJob(job)
    expect(store.savedJobs.some((entry) => entry.id === job.id && entry.saved)).toBe(true)

    await store.removeSavedJob(job.id)
    expect(store.savedJobs.some((entry) => entry.id === job.id)).toBe(false)
    expect(store.isJobSaved(job.id)).toBe(false)
    expect(store.savedJobsCount).toBe(0)

    await store.toggleSavedJob(job)
    expect(store.isJobSaved(job.id)).toBe(true)
  })

  it('does not create a job application when signed out', async () => {
    const store = useJobhuntStore()
    const job = jobs[0]

    expect(store.isJobApplied(job.id)).toBe(false)
    expect(await store.applyForJob(job)).toBe(false)
    expect(store.isJobApplied(job.id)).toBe(false)
  })

  it('reflects a saved application in the dashboard overview state', async () => {
    const store = useJobhuntStore()
    store.isAuthenticated = true
    const job = jobs[1]

    expect(store.recentApplications).toHaveLength(0)
    expect(await store.applyForJob(job)).toBe(true)

    expect(store.applications[0]).toMatchObject({
      jobId: job.id,
      role: job.title,
      company: job.company,
      status: 'Applied',
    })
    expect(store.recentApplications[0].role).toBe(job.title)
    expect(store.overviewStats[0].value).toBe(store.applications.length)
  })

  it('persists application status changes', async () => {
    const store = useJobhuntStore()
    store.isAuthenticated = true
    const job = jobs[2]
    await store.applyForJob(job)

    expect(await store.updateApplicationStatus(job.id, 'Interview')).toBe(true)
    expect(store.applications[0].status).toBe('Interview')
  })

  it('registers an account and signs in with its saved credentials', async () => {
    const store = useJobhuntStore()
    const credentials = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      skill: 'Product design',
    }

    expect(await store.signUp(credentials)).toBe(true)
    expect(localStorage.getItem('test.accounts')).not.toContain(credentials.password)

    store.signOut()
    expect(await store.signIn(credentials)).toBe(true)

    expect(store.isAuthenticated).toBe(true)
    expect(store.userProfile.name).toBe('John Doe')
    expect(store.userProfile.email).toBe('john@example.com')
    expect(store.userProfile.skill).toBe('Product design')
    expect(store.userProfile.initials).toBe('JD')
    expect(store.userProfile).not.toHaveProperty('password')
  })

  it('rejects unknown accounts and incorrect passwords', async () => {
    const store = useJobhuntStore()

    expect(await store.signIn({ email: 'missing@example.com', password: 'password123' })).toBeNull()
    expect(store.isAuthenticated).toBe(false)

    await store.signUp({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    })
    store.signOut()

    await expect(store.signIn({ email: 'john@example.com', password: 'wrongpassword' })).rejects.toThrow()
    expect(store.isAuthenticated).toBe(false)
  })

  it('marks all notifications as read', () => {
    const store = useJobhuntStore()

    expect(store.allNotificationsRead).toBe(false)
    store.markAllNotificationsRead()

    expect(store.allNotificationsRead).toBe(true)
    expect(store.notifications).toHaveLength(3)
    expect(store.notifications.every((notification) => notification.read)).toBe(true)
  })

  it('marks a single notification as read without removing it', () => {
    const store = useJobhuntStore()

    expect(store.notifications[0].read).toBe(false)
    store.toggleNotificationRead(store.notifications[0].id)

    expect(store.notifications).toHaveLength(3)
    expect(store.notifications[0]).toMatchObject({ id: 1, read: true })
  })
})
