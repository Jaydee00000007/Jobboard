import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Job } from '../types/job'
import {
  fetchUserRecords,
  persistApplication,
  persistApplicationStatus,
  persistSavedJob,
  saveProfile,
} from '../services/database'
import type {
  Application,
  ApplicationStatus,
  AuthPayload,
  Message,
  Notification,
  SavedJob,
  Settings,
  Skill,
  UserProfile,
} from '../types/store'
import {
  getAuthSession,
  registerAccount,
  saveAuthSession,
  signOutRemote,
  verifyCredentials,
  type AuthSession,
} from '../services/auth'

export const useJobhuntStore = defineStore(
  'jobhunt',
  () => {
    const session = getAuthSession()
    const isAuthenticated = ref(Boolean(session))
    const userProfile = ref<UserProfile>({
      name: session?.name || '',
      initials: session?.name
        ? session.name
            .split(' ')
            .map((part) => part[0])
            .slice(0, 2)
            .join('')
            .toUpperCase()
        : '',
      role: '',
      location: '',
      phoneNumber: '',
      email: session?.email || '',
      skill: '',
      about: '',
      birthDate: '',
      linkedinUrl: '',
      resumeName: '',
    })

    const applications = ref<Application[]>([])
    const savedJobs = ref<SavedJob[]>([])
    const recordsLoading = ref(false)
    const recordsError = ref('')

    const inboxMessages = ref<Message[]>([
      {
        id: 1,
        company: 'Novara',
        preview: 'Offer details attached',
        subject: 'Offer packet is ready',
        body: 'Hi user, we have attached the offer packet and would love to confirm the start date with you before the final handoff.',
        time: '10:20 AM',
        unread: true,
        reply: '',
      },
      {
        id: 2,
        company: 'Finotech',
        preview: 'Interview prep notes',
        subject: 'Interview prep for tomorrow',
        body: 'Your interview is scheduled for 10 AM tomorrow. Please review the product brief and bring your portfolio.',
        time: 'Yesterday',
        unread: true,
        reply: '',
      },
      {
        id: 3,
        company: 'Axilo',
        preview: 'Portfolio feedback',
        subject: 'Feedback on your portfolio',
        body: 'We loved your case study structure. A few tweaks to your process section will make it stronger.',
        time: '2 days ago',
        unread: false,
        reply: '',
      },
    ])

    const notifications = ref<Notification[]>([
      {
        id: 1,
        message: 'Finotech moved your application to the interview stage.',
        time: '2 hours ago',
        type: 'success',
        read: false,
      },
      {
        id: 2,
        message: '3 new roles match your saved search “Product Design, Lagos”.',
        time: '6 hours ago',
        type: 'warning',
        read: false,
      },
      {
        id: 3,
        message: 'Novara sent you a message about your offer details.',
        time: '1 day ago',
        type: 'warning',
        read: true,
      },
    ])

    const settings = ref<Settings>({
      emailNotifications: true,
      profileVisibility: true,
      twoFactorAuth: false,
    })
    const skills = ref<Skill[]>([
      { id: 1, name: 'UX design', selected: true },
      { id: 2, name: 'Branding', selected: true },
      { id: 3, name: 'Packaging', selected: false },
      { id: 4, name: 'Figma', selected: true },
    ])

    const activeTab = ref<
      'overview' | 'applications' | 'savedjobs' | 'messages' | 'profile' | 'settings'
    >('overview')
    const activeApplicationFilter = ref<
      'all' | 'applied' | 'interview' | 'under-review' | 'offer' | 'not-selected'
    >('all')
    const activeMessageId = ref(1)
    const replyStatus = ref('')

    const overviewStats = computed(() => [
      {
        label: 'Applications sent',
        value: applications.value.length,
        change: '↑ 1 this week',
        trendClass: 'positive',
      },
      {
        label: 'Profile views',
        value: '312',
        change: '↑ 12% vs last week',
        trendClass: 'positive',
      },
      {
        label: 'Saved jobs',
        value: savedJobs.value.filter((job) => job.saved).length,
        change: 'No change',
        trendClass: 'neutral',
      },
      {
        label: 'Interview invites',
        value: applications.value.filter((app) => app.status === 'Interview').length,
        change: '↑ 1 new',
        trendClass: 'positive',
      },
    ])

    const recentApplications = computed(() => applications.value.slice(0, 2))
    const applicationFilters = computed(() => [
      { id: 'all', label: 'All', count: applications.value.length },
      {
        id: 'applied',
        label: 'Applied',
        count: applications.value.filter((item) => item.status === 'Applied').length,
      },
      {
        id: 'interview',
        label: 'Interview',
        count: applications.value.filter((item) => item.status === 'Interview').length,
      },
      {
        id: 'under-review',
        label: 'Under review',
        count: applications.value.filter((item) => item.status === 'Under review').length,
      },
      {
        id: 'offer',
        label: 'Offer',
        count: applications.value.filter((item) => item.status === 'Offer').length,
      },
      {
        id: 'not-selected',
        label: 'Not selected',
        count: applications.value.filter((item) => item.status === 'Not selected').length,
      },
    ])

    const filteredApplications = computed(() => {
      const filter = activeApplicationFilter.value

      if (filter === 'all') return applications.value

      const statusMap = {
        applied: 'Applied',
        interview: 'Interview',
        'under-review': 'Under review',
        offer: 'Offer',
        'not-selected': 'Not selected',
      } satisfies Record<
        'applied' | 'interview' | 'under-review' | 'offer' | 'not-selected',
        ApplicationStatus
      >

      return applications.value.filter((item) => item.status === statusMap[filter])
    })

    const selectedMessage = computed(
      () =>
        inboxMessages.value.find((message) => message.id === activeMessageId.value) ||
        inboxMessages.value[0],
    )
    const unreadMessageCount = computed(
      () => inboxMessages.value.filter((message) => message.unread).length,
    )
    const allNotificationsRead = computed(() =>
      notifications.value.every((notification) => notification.read),
    )
    const savedJobsCount = computed(() => savedJobs.value.filter((job) => job.saved).length)

    function setActiveTab(tab: typeof activeTab.value) {
      activeTab.value = tab
      replyStatus.value = ''
    }
    function toggleApplicationFilter(filter: typeof activeApplicationFilter.value) {
      activeApplicationFilter.value = filter
    }

    async function loadUserRecords() {
      if (!isAuthenticated.value) return
      recordsLoading.value = true
      recordsError.value = ''
      try {
        const records = await fetchUserRecords()
        savedJobs.value = records.saved
        applications.value = records.applications
        if (records.profile) {
          const profile = records.profile
          userProfile.value = {
            ...userProfile.value,
            name: profile.full_name || userProfile.value.name,
            email: profile.email || userProfile.value.email,
            role: profile.role || '',
            location: profile.location || '',
            phoneNumber: profile.phone_number || '',
            skill: profile.skills.join(', '),
            about: profile.about || '',
            birthDate: profile.birth_date || '',
            linkedinUrl: profile.linkedin_url || '',
            resumeName: profile.resume_name || '',
          }
          skills.value = profile.skills.map((name, index) => ({ id: index + 1, name, selected: true }))
        }
      } catch (error) {
        recordsError.value = error instanceof Error ? error.message : 'Could not load your account records.'
        console.error('Could not load Jobboard account records:', error)
      } finally {
        recordsLoading.value = false
      }
    }

    function isJobSaved(jobId: number) {
      return savedJobs.value.some((job) => job.id === jobId && job.saved)
    }

    function isJobApplied(jobId: number) {
      return applications.value.some((application) => application.jobId === jobId)
    }

    async function toggleSavedJob(job: Job | number) {
      if (!isAuthenticated.value) return false
      const jobId = typeof job === 'object' ? job.id : job
      const existingJob = savedJobs.value.find((entry) => entry.id === jobId)
      const shouldSave = !existingJob
      try {
        await persistSavedJob(jobId, shouldSave)
        if (shouldSave && typeof job === 'object') {
          savedJobs.value.unshift({
            id: job.id,
            initials: job.initials,
            title: job.title,
            location: `${job.company} · ${job.location}`,
            pay: job.salaryText,
            saved: true,
          })
        } else if (!shouldSave) {
          savedJobs.value = savedJobs.value.filter((entry) => entry.id !== jobId)
        }
        return true
      } catch (error) {
        recordsError.value = error instanceof Error ? error.message : 'Could not update your saved jobs.'
        console.error('Could not update saved job:', error)
        return false
      }
    }

    async function removeSavedJob(jobId: number) {
      try {
        await persistSavedJob(jobId, false)
        savedJobs.value = savedJobs.value.filter((job) => job.id !== jobId)
      } catch (error) {
        recordsError.value = error instanceof Error ? error.message : 'Could not remove this saved job.'
        console.error('Could not remove saved job:', error)
      }
    }

    async function updateApplicationStatus(jobId: number, status: ApplicationStatus) {
      try {
        await persistApplicationStatus(jobId, status)
        const application = applications.value.find((entry) => entry.jobId === jobId)
        if (application) application.status = status
        return true
      } catch (error) {
        recordsError.value = error instanceof Error ? error.message : 'Could not update application status.'
        console.error('Could not update application status:', error)
        return false
      }
    }

    function toggleNotificationRead(id: number) {
      notifications.value = notifications.value.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      )
    }

    function selectMessage(id: number) {
      const message = inboxMessages.value.find((entry) => entry.id === id)
      if (!message) return

      message.unread = false
      activeMessageId.value = id
      replyStatus.value = ''
    }
    function deleteMessage(id: number) {
      const message = inboxMessages.value.find((entry) => entry.id === id)
      if (!message || (message.unread && !message.reply.trim())) return

      inboxMessages.value = inboxMessages.value.filter((entry) => entry.id !== id)
      if (activeMessageId.value === id) {
        const nextMessage = inboxMessages.value[0]
        activeMessageId.value = nextMessage?.id ?? 0
        if (nextMessage) nextMessage.unread = false
      }
      replyStatus.value = ''
    }
    function markAllNotificationsRead() {
      notifications.value = notifications.value.map((notification) => ({
        ...notification,
        read: true,
      }))
    }
    function replyToMessage() {
      const message = selectedMessage.value
      if (!message) return

      replyStatus.value = `Draft reply ready for ${message.company}.`
    }
    function toggleSkill(id: number) {
      skills.value = skills.value.map((skill) =>
        skill.id === id ? { ...skill, selected: !skill.selected } : skill,
      )
    }
    function updateUserProfile(profile: Partial<UserProfile>) {
      const name = profile.name?.trim() ?? userProfile.value.name
      const initials = name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase()
      userProfile.value = { ...userProfile.value, ...profile, name, initials }
      if (isAuthenticated.value) void saveProfile(userProfile.value).catch((error) => console.error('Could not save profile:', error))
    }
    function updateProfileSkills(names: string[]) {
      const uniqueNames = [...new Set(names.map((name) => name.trim()).filter(Boolean))]
      skills.value = uniqueNames.map((name, index) => ({ id: index + 1, name, selected: true }))
      userProfile.value.skill = uniqueNames.join(', ')
    }
    function updateSettings(partialSettings: Partial<Settings>) {
      settings.value = { ...settings.value, ...partialSettings }
    }

    function authenticate(account: AuthSession) {
      const accountEmail = account.email.trim().toLowerCase()
      const sameAccount = userProfile.value.email.trim().toLowerCase() === accountEmail
      const existingProfile = userProfile.value
      const name = sameAccount ? existingProfile.name || account.name || '' : account.name || ''
      const initials = name
        .split(' ')
        .map((part) => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
      const emptyProfile: UserProfile = {
        name: '',
        initials: '',
        role: '',
        location: '',
        phoneNumber: '',
        email: '',
        skill: '',
        about: '',
        birthDate: '',
        linkedinUrl: '',
        resumeName: '',
      }
      userProfile.value = {
        ...(sameAccount ? existingProfile : emptyProfile),
        name,
        initials,
        email: accountEmail,
        skill: sameAccount ? existingProfile.skill : account.skill || '',
      }
      if (!sameAccount) {
        skills.value = [
          { id: 1, name: 'UX design', selected: true },
          { id: 2, name: 'Branding', selected: true },
          { id: 3, name: 'Packaging', selected: false },
          { id: 4, name: 'Figma', selected: true },
        ]
      }
      isAuthenticated.value = true
      saveAuthSession(account)
      void loadUserRecords()
    }

    async function signIn(payload: AuthPayload) {
      const account = await verifyCredentials(payload.email, payload.password)
      if (!account) return false

      authenticate(account)
      notifications.value.unshift({
        id: Date.now(),
        message: `Welcome back, ${userProfile.value.name.split(' ')[0]}. Your dashboard is ready.`,
        time: 'Just now',
        type: 'success',
        read: false,
      })
      return true
    }

    async function signUp(payload: AuthPayload) {
      const registered = await registerAccount(payload)
      if (!registered) return false

      // Supabase may require email confirmation before issuing a session.
      const account = getAuthSession()
      if (!account?.accessToken) return false
      authenticate(account)
      notifications.value.unshift({
        id: Date.now(),
        message: `Account created for ${userProfile.value.name}.`,
        time: 'Just now',
        type: 'success',
        read: false,
      })
      return true
    }

    function signOut() {
      void signOutRemote()
      isAuthenticated.value = false
      applications.value = []
      savedJobs.value = []
      recordsError.value = ''
    }

    async function applyForJob(job: Job) {
      if (!isAuthenticated.value || isJobApplied(job.id)) return false
      try {
        await persistApplication(job.id)
        applications.value.unshift({
          jobId: job.id,
          role: job.title,
          company: job.company,
          status: 'Applied',
          date: 'Just now',
        })
        notifications.value.unshift({
          id: Date.now(),
          message: `Your application to ${job.title} at ${job.company} has been saved to your tracker.`,
          time: 'Just now',
          type: 'success',
          read: false,
        })
        return true
      } catch (error) {
        recordsError.value = error instanceof Error ? error.message : 'Could not record your application.'
        console.error('Could not save application:', error)
        return false
      }
    }

    if (session) void loadUserRecords()

    return {
      activeApplicationFilter,
      activeMessageId,
      activeTab,
      allNotificationsRead,
      applicationFilters,
      applications,
      recordsLoading,
      recordsError,
      loadUserRecords,
      deleteMessage,
      filteredApplications,
      inboxMessages,
      isAuthenticated,
      isJobApplied,
      isJobSaved,
      markAllNotificationsRead,
      notifications,
      overviewStats,
      removeSavedJob,
      recentApplications,
      replyStatus,
      replyToMessage,
      savedJobs,
      savedJobsCount,
      selectMessage,
      selectedMessage,
      settings,
      signIn,
      signUp,
      signOut,
      skills,
      toggleApplicationFilter,
      updateApplicationStatus,
      toggleNotificationRead,
      toggleSavedJob,
      toggleSkill,
      updateProfileSkills,
      updateSettings,
      updateUserProfile,
      unreadMessageCount,
      userProfile,
      applyForJob,
      setActiveTab,
    }
  },
  { persist: { pick: ['userProfile', 'skills'] } },
)
