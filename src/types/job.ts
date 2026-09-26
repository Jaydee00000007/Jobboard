export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Freelance'
export type ExperienceLevel = 'Entry level' | 'Mid level' | 'Senior' | 'Lead / Manager'
export type WorkMode = 'Remote' | 'Hybrid' | 'On-site' | 'Remote-friendly'
export type SalaryRank = 'low' | 'medium' | 'high'

export interface Job {
  id: number
  initials: string
  title: string
  company: string
  location: string
  type: JobType
  experienceLevel: ExperienceLevel
  workMode: WorkMode
  category: string
  salaryText: string
  salaryRank: SalaryRank
  posted: string
}
