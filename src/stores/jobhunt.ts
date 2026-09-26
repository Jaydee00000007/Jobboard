import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Job } from '../types/job'
import type { Application, ApplicationStatus, AuthPayload, Message, Notification, SavedJob, Settings, Skill, UserProfile } from '../types/store'
export const useJobhuntStore = defineStore('jobhunt', () => {
  const isAuthenticated = ref(false)
  const userProfile = ref<UserProfile>({
    name: 'Adaeze Okonkwo',
    initials: 'AO',
    role: 'Job seeker',
    location: 'Lagos',
    email: 'adaeze@example.com',
    skill: 'Product and visual designer',
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
    { role: 'Product Designer', company: 'Paruxx', status: 'Under review' as ApplicationStatus, date: 'Jun 30' },
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
      body: 'Hi Adaeze, we have attached the offer packet and would love to confirm the start date with you before the final handoff.',
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

  const activeTab = ref<'overview' | 'applications' | 'savedjobs' | 'messages' | 'profile' | 'settings'>('overview')
  const activeApplicationFilter = ref<'all' | 'interview' | 'under-review' | 'offer' | 'not-selected'>('all')
  const activeMessageId = ref(1)
  const replyStatus = ref<string>('')

  const overviewStats = computed(() => [
    {
      label: 'Applications sent',
      value: applications.value.length,
      change: '↑ 1 this week',
      trendClass: 'positive',
    },
    { label: 'Profile views', value: '312', change: '↑ 12% vs last week', trendClass: 'positive' },
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

  const recentApplications = computed(() => applications.value.slice(0, 4))

  const applicationFilters = computed(() => [
    { id: 'all', label: 'All', count: applications.value.length },
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
    if (activeApplicationFilter.value === 'all') {
      return applications.value
    }

    return applications.value.filter((item) => {
      if (activeApplicationFilter.value === 'interview') return item.status === 'Interview'
      if (activeApplicationFilter.value === 'under-review') return item.status === 'Under review'
      if (activeApplicationFilter.value === 'offer') return item.status === 'Offer'
      if (activeApplicationFilter.value === 'not-selected') return item.status === 'Not selected'
      return true
    })
  })

  const selectedMessage = computed(() => {
    return (
      inboxMessages.value.find((message) => message.id === activeMessageId.value) ||
      inboxMessages.value[0]
    )
  })

  const unreadMessageCount = computed(
    () => inboxMessages.value.filter((message) => message.unread).length,
  )
  const allNotificationsRead = computed(() =>
    notifications.value.every((notification) => notification.read),
  )
  const savedJobsCount = computed(() => savedJobs.value.filter((job) => job.saved).length)

  function setActiveTab(tab: 'overview' | 'applications' | 'savedjobs' | 'messages' | 'profile' | 'settings') {
    activeTab.value = tab
    replyStatus.value = ''
  }

  function toggleApplicationFilter(filter: 'all' | 'interview' | 'under-review' | 'offer' | 'not-selected') {
    activeApplicationFilter.value = filter
  }

  function isJobSaved(jobId: number) {
    return savedJobs.value.some((job) => job.id === jobId && job.saved)
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

  function toggleNotificationRead(id: number) {
    notifications.value = notifications.value.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification,
    )
  }

  function selectMessage(id: number) {
    activeMessageId.value = id
  }

  function markAllNotificationsRead() {
    notifications.value = notifications.value.map((notification) => ({
      ...notification,
      read: true,
    }))
  }

  function replyToMessage() {
    replyStatus.value = `Draft reply ready for ${selectedMessage.value.company}.`
  }

  function toggleSkill(id: number) {
    skills.value = skills.value.map((skill) =>
      skill.id === id ? { ...skill, selected: !skill.selected } : skill,
    )
  }

  function updateSettings(partialSettings: Partial<Settings>) {
    settings.value = { ...settings.value, ...partialSettings }
  }

  function signIn(payload: AuthPayload) {
    isAuthenticated.value = true
    userProfile.value = {
      ...userProfile.value,
      ...payload,
      initials: payload.name
        ? payload.name
            .split(' ')
            .map((part) => part[0])
            .slice(0, 2)
            .join('')
            .toUpperCase()
        : userProfile.value.initials,
    }
    notifications.value.unshift({
      id: Date.now(),
      message: `Welcome back, ${payload.name || userProfile.value.name.split(' ')[0]}. Your dashboard is ready.`,
      time: 'Just now',
      type: 'success',
      read: false,
    })
  }

  function signUp(payload: AuthPayload) {
    isAuthenticated.value = true
    userProfile.value = {
      ...userProfile.value,
      ...payload,
      initials: payload.name
        ? payload.name
            .split(' ')
            .map((part) => part[0])
            .slice(0, 2)
            .join('')
            .toUpperCase()
        : userProfile.value.initials,
    }
    notifications.value.unshift({
      id: Date.now(),
      message: `Account created for ${payload.name || userProfile.value.name}.`,
      time: 'Just now',
      type: 'success',
      read: false,
    })
  }

  function applyForJob(job: Job) {
    applications.value.unshift({
      role: job.title,
      company: job.company,
      status: 'Under review',
      date: 'Just now',
    })
    notifications.value.unshift({
      id: Date.now(),
      message: `You applied to ${job.title} at ${job.company}.`,
      time: 'Just now',
      type: 'success',
      read: false,
    })
  }

  return {
    activeApplicationFilter,
    activeMessageId,
    activeTab,
    allNotificationsRead,
    applicationFilters,
    applications,
    filteredApplications,
    inboxMessages,
    isAuthenticated,
    isJobSaved,
    markAllNotificationsRead,
    notifications,
    overviewStats,
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
    skills,
    toggleApplicationFilter,
    toggleNotificationRead,
    toggleSavedJob,
    toggleSkill,
    updateSettings,
    unreadMessageCount,
    userProfile,
    applyForJob,
    setActiveTab,
  }
})
