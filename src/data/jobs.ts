import type { Job } from '../types/job'
import { jobs as rawJobs } from './jobs.js'

export const jobs = rawJobs as Job[]
