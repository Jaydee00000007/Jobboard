<template>
  <div class="companypage">
    <HeaderB class="header" />

    <main>
      <section class="hero">
        <h3>{{ filteredCompanies.length }} companies hiring now</h3>
        <h2>Meet the teams hiring on Roleboard.</h2>
        <CompanySearch
          :search="searchQuery"
          :location="locationQuery"
          @update:search="searchQuery = $event"
          @update:location="locationQuery = $event"
          @search="currentPage = 1"
        />
      </section>

      <section class="content">
        <div class="content-inner">
          <nav class="categories" aria-label="Company industries">
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
            <section class="results">
              <header class="results-header">
                <p>
                  <strong>{{ filteredCompanies.length }}</strong> companies found
                </p>
                <label>
                  Sort by
                  <select v-model="sortBy" aria-label="Sort companies">
                    <option value="roles">Most open roles</option>
                    <option value="alphabet">Name A - Z</option>
                  </select>
                </label>
              </header>

              <div v-if="paginatedCompanies.length" class="company-listings">
                <CompanyCard
                  v-for="company in paginatedCompanies"
                  :key="company.id"
                  :company="company"
                />
              </div>
              <p v-else class="empty-state">No companies match your current filters.</p>

              <nav class="pagination" aria-label="Company results pagination">
                <button type="button" :disabled="currentPage === 1" @click="prevPage">
                  Previous
                </button>
                <span>Page {{ currentPage }} of {{ pageCount }}</span>
                <button type="button" :disabled="currentPage === pageCount" @click="nextPage">
                  Next
                </button>
              </nav>
            </section>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import HeaderB from '../components/HeaderB.vue'
import Footer from '../components/Footer.vue'
import CompanyCard from '../components/companies/CompanyDirectoryCard.vue'
import CompanySearch from '../components/companies/CompanySearch.vue'
import { companies } from '../data/companies'

const searchQuery = ref('')
const locationQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref<'roles' | 'alphabet'>('roles')
const currentPage = ref(1)
const pageSize = 6

const categories = computed(() => {
  const counts = new Map<string, number>()
  for (const company of companies) {
    counts.set(company.industry, (counts.get(company.industry) || 0) + 1)
  }

  return [
    { name: '', label: 'All industries', count: companies.length },
    ...Array.from(counts, ([name, count]) => ({ name, label: name, count })),
  ]
})

const filteredCompanies = computed(() => {
  const search = searchQuery.value.toLowerCase().trim()
  const location = locationQuery.value.toLowerCase().trim()

  return companies
    .filter((company) => {
      const matchesSearch =
        !search ||
        company.name.toLowerCase().includes(search) ||
        company.industry.toLowerCase().includes(search)
      const matchesLocation = !location || company.location.toLowerCase().includes(location)
      const matchesCategory = !selectedCategory.value || company.industry === selectedCategory.value

      return matchesSearch && matchesLocation && matchesCategory
    })
    .sort((first, second) => {
      if (sortBy.value === 'alphabet') return first.name.localeCompare(second.name)
      return second.openRoles - first.openRoles || first.name.localeCompare(second.name)
    })
})

const pageCount = computed(() => Math.max(1, Math.ceil(filteredCompanies.value.length / pageSize)))
const paginatedCompanies = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredCompanies.value.slice(start, start + pageSize)
})

watch([searchQuery, locationQuery, selectedCategory, sortBy], () => {
  currentPage.value = 1
})

watch(filteredCompanies, () => {
  if (currentPage.value > pageCount.value) currentPage.value = pageCount.value
})

function setCategory(category: string) {
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
.companypage {
  min-height: 100dvh;
  background: #071a29;
}
.header {
  position: fixed;
  inset: 0 0 auto;
  width: 100%;
  z-index: 1000;
}
.hero {
  padding: 120px 8%;
  min-height: 290px;
  box-sizing: border-box;
}
.hero h3 {
  color: orange;
  font-size: 12px;
  font-weight: 400;
}
.hero h2 {
  color: #fff;
  font-size: 38px;
  margin: 14px 0 24px;
}
.content {
  background: #fff;
  padding: 30px 6%;
}
.content-inner {
  max-width: 1250px;
  margin: 0 auto;
}
.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
}
.categories button {
  border: 0;
  background: #d2efff;
  color: #071a29;
  padding: 10px 14px;
  border-radius: 18px;
  cursor: pointer;
}
.categories button.active {
  background: #071a29;
  color: #fff;
}
.results-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
}
.company-listings {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}
.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}
.results-header select {
  padding: 8px 12px;
  border: 1px solid #071a29;
  border-radius: 6px;
}
.empty-state {
  padding: 40px 0;
  text-align: center;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 20px 0;
}
.pagination button {
  border: 0;
  background: #071a29;
  color: #fff;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
}
.pagination button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
@media (max-width: 900px) {
  .hero {
    padding-inline: 5%;
  }
  .company-listings {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 600px) {
  .company-listings {
    grid-template-columns: 1fr;
  }
}
</style>
