import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useJobhuntStore } from '../src/stores/jobhunt'
import { jobs } from '../src/data/jobs'

describe('jobhunt store', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('starts with the expected dashboard state', () => {
    const store = useJobhuntStore()

    expect(store.isAuthenticated).toBe(false)
    expect(store.applications).toHaveLength(5)
    expect(store.savedJobsCount).toBe(4)
    expect(store.unreadMessageCount).toBe(2)
  })

  it('filters applications by status', () => {
    const store = useJobhuntStore()

    store.toggleApplicationFilter('interview')
    expect(store.filteredApplications).toHaveLength(1)
    expect(store.filteredApplications[0].status).toBe('Interview')

    store.toggleApplicationFilter('offer')
    expect(store.filteredApplications).toHaveLength(1)
    expect(store.filteredApplications[0].company).toBe('Novara')
  })

  it('saves and unsaves a job', () => {
    const store = useJobhuntStore()
    const job = jobs.find((entry) => !store.isJobSaved(entry.id))!

    expect(store.isJobSaved(job.id)).toBe(false)

    store.toggleSavedJob(job)
    expect(store.isJobSaved(job.id)).toBe(true)
    expect(store.savedJobsCount).toBe(5)

    store.toggleSavedJob(job.id)
    expect(store.isJobSaved(job.id)).toBe(false)
    expect(store.savedJobsCount).toBe(4)
  })

  it('applies for a job and creates a notification', () => {
    const store = useJobhuntStore()
    const job = jobs[0]

    store.applyForJob(job)

    expect(store.applications[0]).toMatchObject({
      role: job.title,
      company: job.company,
      status: 'Under review',
    })
    expect(store.notifications[0].message).toContain(job.title)
  })

  it('updates the user profile when signing in', () => {
    const store = useJobhuntStore()

    store.signIn({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    })

    expect(store.isAuthenticated).toBe(true)
    expect(store.userProfile.name).toBe('John Doe')
    expect(store.userProfile.email).toBe('john@example.com')
    expect(store.userProfile.initials).toBe('JD')
  })

  it('marks all notifications as read', () => {
    const store = useJobhuntStore()

    expect(store.allNotificationsRead).toBe(false)

    store.markAllNotificationsRead()

    expect(store.allNotificationsRead).toBe(true)
  })
})
