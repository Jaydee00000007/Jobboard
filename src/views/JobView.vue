<template>
  <div class="jobpage">
    <HeaderB class="header" />

    <main>
      <section class="hero">
        <h3>{{ filteredJobs.length }} VERIFIED VACANCIES LIVE NOW</h3>
        <h2>Find your next role.</h2>
        <JobSearch
          :search="searchQuery"
          :location="locationQuery"
          @update:search="searchQuery = $event"
          @update:location="locationQuery = $event"
          @search="currentPage = 1"
        />
      </section>

      <section class="content">
        <div class="content-inner">
          <nav class="categories" aria-label="Job categories">
            <button
              v-for="category in categories"
              :key="category.name"
              type="button"
              :class="{ active: selectedCategory === category.name }"
              @click="setCategory(category.name)"
            >
              {{ category.name }} <span>{{ category.count }}</span>
            </button>
          </nav>

          <div class="results-layout">
            <JobFilters
              :job-types="selectedJobTypes"
              :experience="selectedExperience"
              :salary-ranges="selectedSalaryRanges"
              @update:job-types="selectedJobTypes = $event"
              @update:experience="selectedExperience = $event"
              @update:salary-ranges="selectedSalaryRanges = $event"
              @clear="resetFilters"
            />

            <section class="results">
              <header class="results-header">
                <p><strong>{{ filteredJobs.length }}</strong> vacancies found</p>
                <label>
                  Sort by
                  <select v-model="sortBy" aria-label="Sort jobs">
                    <option value="newest">Newest</option>
                    <option value="salary">Salary: high to low</option>
                    <option value="relevance">Relevance</option>
                  </select>
                </label>
              </header>

              <div v-if="paginatedJobs.length" class="job-listings">
                <JobCard
                  v-for="job in paginatedJobs"
                  :key="job.id"
                  :job="job"
                  :saved="isSaved(job.id)"
                  @toggle-save="toggleSavedJob"
                  @apply="applyForJob"
                />
              </div>
              <p v-else class="empty-state">No jobs match your current filters.</p>

              <nav class="pagination" aria-label="Job results pagination">
                <button type="button" :disabled="currentPage === 1" @click="prevPage">Previous</button>
                <span>Page {{ currentPage }} of {{ pageCount }}</span>
                <button type="button" :disabled="currentPage === pageCount" @click="nextPage">Next</button>
              </nav>
            </section>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useJobhuntStore } from '../stores/jobhunt.js'
import HeaderB from '../components/HeaderB.vue'
import Footer from '../components/Footer.vue'
import JobCard from '../components/jobs/JobCard.vue'
import JobFilters from '../components/jobs/JobFilters.vue'
import JobSearch from '../components/jobs/JobSearch.vue'
import { jobs } from '../data/jobs.js'

const store = useJobhuntStore()

const searchQuery = ref('')
const locationQuery = ref('')
const selectedCategory = ref('')
const selectedJobTypes = ref([])
const selectedExperience = ref('')
const selectedSalaryRanges = ref([])
const sortBy = ref('newest')
const currentPage = ref(1)
const pageSize = 5

const categories = computed(() => {
  const counts = jobs.reduce((result, job) => {
    result[job.category] = (result[job.category] || 0) + 1
    return result
  }, {})

  return [
    { name: '', label: 'All categories', count: filteredJobs.value.length },
    ...Object.entries(counts).map(([name, count]) => ({ name, label: name, count })),
  ]
})

const filteredJobs = computed(() => {
  const search = searchQuery.value.toLowerCase().trim()
  const location = locationQuery.value.toLowerCase().trim()

  return jobs
    .filter((job) => {
      const matchesSearch = !search || [job.title, job.company, job.category]
        .some((field) => field.toLowerCase().includes(search))
      const matchesLocation = !location || job.location.toLowerCase().includes(location)
      const matchesCategory = !selectedCategory.value ||
        job.category.toLowerCase() === selectedCategory.value.toLowerCase()
      const matchesType = !selectedJobTypes.value.length ||
        selectedJobTypes.value.includes(job.type)
      const matchesExperience = !selectedExperience.value ||
        job.level === selectedExperience.value
      const matchesSalary = !selectedSalaryRanges.value.length ||
        selectedSalaryRanges.value.includes(job.salaryRank)

      return matchesSearch && matchesLocation && matchesCategory &&
        matchesType && matchesExperience && matchesSalary
    })
    .sort((a, b) => {
      if (sortBy.value === 'salary') return b.salaryRank.localeCompare(a.salaryRank)
      if (sortBy.value === 'newest') return a.id - b.id
      return 0
    })
})

const pageCount = computed(() => Math.max(1, Math.ceil(filteredJobs.value.length / pageSize)))
const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredJobs.value.slice(start, start + pageSize)
})

watch(filteredJobs, () => {
  if (currentPage.value > pageCount.value) currentPage.value = pageCount.value
})

function isSaved(jobId) {
  return store.isJobSaved(jobId)
}

function toggleSavedJob(job) {
  store.toggleSavedJob(job)
}

function applyForJob(job) {
  store.applyForJob(job)
}

function resetFilters() {
  searchQuery.value = ''
  locationQuery.value = ''
  selectedCategory.value = ''
  selectedJobTypes.value = []
  selectedExperience.value = ''
  selectedSalaryRanges.value = []
  sortBy.value = 'newest'
  currentPage.value = 1
}

function setCategory(category) {
  selectedCategory.value = category
  currentPage.value = 1
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value -= 1
}

function nextPage() {
  if (currentPage.value < pageCount.value) currentPage.value += 1
}
</script>

<style scoped>
.jobpage { min-height: 100dvh; background: #071a29; }
.header { position: fixed; inset: 0 0 auto; width: 100%; z-index: 1000; }
.hero { padding: 120px 8%; min-height: 290px; box-sizing: border-box; }
.hero h3 { color: orange; font-size: 12px; font-weight: 400; }
.hero h2 { color: #fff; font-size: 38px; margin: 14px 0 24px; }
.content { background: #fff; padding: 30px 6%; }
.content-inner { max-width: 1250px; margin: 0 auto; }
.categories { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 30px; }
.categories button {
  border: 0; background: #d2efff; color: #071a29; padding: 10px 14px;
  border-radius: 18px; cursor: pointer;
}
.categories button.active { background: #071a29; color: #fff; }
.results-layout { display: grid; grid-template-columns: 220px minmax(0, 1fr); gap: 40px; }
.results-header { display: flex; justify-content: space-between; align-items: center; gap: 20px; }
.results-header select { padding: 8px 12px; border: 1px solid #071a29; border-radius: 6px; }
.empty-state { padding: 40px 0; text-align: center; }
.pagination { display: flex; justify-content: center; align-items: center; gap: 16px; padding: 20px 0; }
.pagination button {
  border: 0; background: #071a29; color: #fff; padding: 10px 16px; border-radius: 8px; cursor: pointer;
}
.pagination button:disabled { opacity: .4; cursor: not-allowed; }
@media (max-width: 900px) {
  .hero { padding-inline: 5%; }
  .results-layout { grid-template-columns: 1fr; }
}
</style>