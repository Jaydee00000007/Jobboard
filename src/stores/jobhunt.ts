import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Job } from '../types/job'
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
  clearAuthSession,
  getAuthSession,
  registerAccount,
  saveAuthSession,
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

    const applications = ref<Application[]>([
      { role: 'Senior Product Designer', company: 'Finotech', status: 'Interview', date: 'Jul 9' },
      {
        role: 'Brand & Packaging Lead',
        company: 'Bramwell & Co.',
        status: 'Under review',
        date: 'Jul 6',
      },
      { role: 'UX Designer', company: 'Novara', status: 'Offer', date: 'Jun 30' },
      { role: 'Visual Designer', company: 'Axilo Systems', status: 'Not selected', date: 'Jun 22' },
      { role: 'Product Designer', company: 'Paruxx', status: 'Under review', date: 'Jun 30' },
    ])

    const savedJobs = ref<SavedJob[]>([
      {
        id: 1,
        initials: 'DL',
        title: 'Product designer',
        location: 'Delta Labs · Lagos',
        pay: '₦450k - 600k /mo',
        saved: true,
      },
      {
        id: 2,
        initials: 'NV',
        title: 'Brand designer',
        location: 'Novqra · Remote',
        pay: '₦500k - 700k /mo',
        saved: true,
      },
      {
        id: 3,
        initials: 'FT',
        title: 'Packaging designer',
        location: 'Finotech · Lagos',
        pay: '₦400k - 550k /mo',
        saved: true,
      },
      {
        id: 4,
        initials: 'AX',
        title: 'Visual designer',
        location: 'Axilo Systems · Lagos',
        pay: '₦350k - 480k /mo',
        saved: true,
      },
    ])

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

    function isJobSaved(jobId: number) {
      return savedJobs.value.some((job) => job.id === jobId && job.saved)
    }

    function isJobApplied(jobId: number) {
      return applications.value.some((application) => application.jobId === jobId)
    }

    function toggleSavedJob(job: Job | number) {
      const jobId = typeof job === 'object' ? job.id : job
      const existingJob = savedJobs.value.find((entry) => entry.id === jobId)
      if (existingJob) {
        existingJob.saved = !existingJob.saved
        return
      }
      if (typeof job === 'object') {
        savedJobs.value.push({
          id: job.id,
          initials: job.initials,
          title: job.title,
          location: `${job.company} · ${job.location}`,
          pay: job.salaryText,
          saved: true,
        })
      }
    }

    function removeSavedJob(jobId: number) {
      savedJobs.value = savedJobs.value.filter((job) => job.id !== jobId)
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

      const account: AuthSession = {
        name: payload.name || '',
        email: payload.email.trim().toLowerCase(),
        skill: payload.skill,
        userType: payload.userType,
      }
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
      clearAuthSession()
      isAuthenticated.value = false
    }

    function applyForJob(job: Job) {
      if (!isAuthenticated.value || isJobApplied(job.id)) return false

      applications.value.unshift({
        jobId: job.id,
        role: job.title,
        company: job.company,
        status: 'Applied',
        date: 'Just now',
      })
      notifications.value.unshift({
        id: Date.now(),
        message: `You applied to ${job.title} at ${job.company}.`,
        time: 'Just now',
        type: 'success',
        read: false,
      })

      return true
    }

    return {
      activeApplicationFilter,
      activeMessageId,
      activeTab,
      allNotificationsRead,
      applicationFilters,
      applications,
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
