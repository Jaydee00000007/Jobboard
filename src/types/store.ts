export type ApplicationStatus = 'Interview' | 'Under review' | 'Offer' | 'Not selected'

export interface UserProfile {
  name: string
  initials: string
  role: string
  location: string
  email: string
  skill: string
}

export interface Application {
  role: string
  company: string
  status: ApplicationStatus
  date: string
}

export interface SavedJob {
  id: number
  initials: string
  title: string
  location: string
  pay: string
  saved: boolean
}

export interface Message {
  id: number
  company: string
  preview: string
  subject: string
  body: string
  time: string
  unread: boolean
  reply: string
}

export type NotificationType = 'success' | 'warning'

export interface Notification {
  id: number
  message: string
  time: string
  type: NotificationType
  read: boolean
}

export interface Settings {
  emailNotifications: boolean
  profileVisibility: boolean
  twoFactorAuth: boolean
}

export interface Skill {
  id: number
  name: string
  selected: boolean
}

export interface AuthPayload {
  name?: string
  email: string
  password: string
  userType?: string
}
