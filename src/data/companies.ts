import { jobs } from './jobs'
import type { Company } from '../types/company'

interface CompanyAggregate {
  name: string
  initials: string
  industries: Map<string, number>
  locations: Map<string, number>
  openRoles: number
}

const companiesByName = new Map<string, CompanyAggregate>()

function incrementCount(counts: Map<string, number>, value: string) {
  counts.set(value, (counts.get(value) || 0) + 1)
}

function mostCommonValue(counts: Map<string, number>) {
  return (
    Array.from(counts.entries()).sort(
      ([firstValue, firstCount], [secondValue, secondCount]) =>
        secondCount - firstCount || firstValue.localeCompare(secondValue),
    )[0]?.[0] || ''
  )
}

for (const job of jobs) {
  let company = companiesByName.get(job.company)
  if (!company) {
    company = {
      name: job.company,
      initials: job.company
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase(),
      industries: new Map(),
      locations: new Map(),
      openRoles: 0,
    }
    companiesByName.set(job.company, company)
  }

  incrementCount(company.industries, job.category)
  incrementCount(company.locations, job.location)
  company.openRoles += 1
}

export const companies: Company[] = Array.from(companiesByName.values())
  .sort((first, second) => first.name.localeCompare(second.name))
  .map((company, index) => ({
    id: index + 1,
    name: company.name,
    initials: company.initials,
    industry: mostCommonValue(company.industries),
    location: mostCommonValue(company.locations),
    openRoles: company.openRoles,
  }))
