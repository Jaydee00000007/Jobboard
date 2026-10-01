<template>
  <div class="companypage">
    <HeaderB class="header" />

    <main>
      <section class="hero">
        <h3>HELP CENTER</h3>
        <h2>Answers, before you need to ask.</h2>
        <FaqSearch :search="searchQuery" @update:search="searchQuery = $event" />
      </section>

      <section class="content">
        <div class="content-inner">
          <nav class="categories" aria-label="FAQ categories">
            <button
              v-for="category in categories"
              :key="category.name"
              type="button"
              :class="{ active: selectedCategory === category.name }"
              @click="setCategory(category.name)"
            >
              {{ category.label }} <span>{{ category.count }}</span>
            </button>
          </nav>

          <div v-if="filteredFaqs.length" class="faq-list">
            <article v-for="item in filteredFaqs" :key="item.id" class="faq-item">
              <div class="faq-header">
                <h4>{{ item.question }}</h4>
                <button type="button" class="faq-toggle" @click="toggleFaq(item.id)">
                  {{ openFaq === item.id ? '−' : '+' }}
                </button>
              </div>

              <div v-show="openFaq === item.id" class="faq-answer">
                <p>{{ item.answer }}</p>
              </div>
            </article>
          </div>
          <p v-else class="empty-state">No FAQs match your current search.</p>
        </div>

        <div class="contact-us">
          <div class="firstpart">
            <h4>Still have questions?</h4>
            <p>Can't find the answer you're looking for? Our team is here to help.</p>
          </div>

          <div class="action">
            <RouterLink class="btn btn-primary" :to="{ path: '/about', hash: '#secBlink' }">
              Contact Us
            </RouterLink>
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
import FaqSearch from '../components/Faq/FaqSearch.vue'

type FaqItem = {
  id: number
  category: string
  question: string
  answer: string
}

const faqItems: FaqItem[] = [
  {
    id: 1,
    category: 'General',
    question: 'What makes Roleboard different from other job boards?',
    answer:
      'Every listing on Roleboard is confirmed directly with the hiring company before it goes live. We do not scrape postings from other sites, so you will not find expired roles or dead application links here.',
  },
  {
    id: 2,
    category: 'General',
    question: 'Is Roleboard free to use?',
    answer:
      'Yes — creating an account, browsing jobs, and applying is completely free for job seekers. Employers can post a limited number of roles for free, with paid plans for higher volume hiring.',
  },
  {
    id: 3,
    category: 'Applications',
    question: 'How do I apply to a role?',
    answer:
      'Open any listing, review the description, and click the apply button. We walk you through the next steps and keep your application status visible on your dashboard.',
  },
  {
    id: 4,
    category: 'Applications',
    question: 'Can I save jobs for later?',
    answer:
      'Yes. Use the save icon on any listing and return to your dashboard at any time to review the positions you bookmarked.',
  },
  {
    id: 5,
    category: 'Employers',
    question: 'How do employers post jobs?',
    answer:
      'Employers can create an account, verify their company profile, and publish roles through the job posting flow on the dashboard.',
  },
  {
    id: 6,
    category: 'Remote',
    question: 'Do you list remote opportunities?',
    answer:
      'Yes — remote and hybrid opportunities are included when they are explicitly open to remote candidates or a regionally flexible setup.',
  },
]

const searchQuery = ref('')
const selectedCategory = ref('')
const openFaq = ref<number | null>(null)

const categories = computed(() => {
  const counts = faqItems.reduce<Record<string, number>>((result, item) => {
    result[item.category] = (result[item.category] || 0) + 1
    return result
  }, {})

  return [
    { name: '', label: 'All categories', count: faqItems.length },
    ...Object.entries(counts).map(([name, count]) => ({ name, label: name, count })),
  ]
})

const filteredFaqs = computed(() => {
  const search = searchQuery.value.trim().toLowerCase()

  return faqItems.filter((item) => {
    const matchesCategory = !selectedCategory.value || item.category === selectedCategory.value
    const matchesSearch =
      !search ||
      [item.question, item.answer, item.category].some((field) =>
        field.toLowerCase().includes(search),
      )

    return matchesCategory && matchesSearch
  })
})

watch([searchQuery, selectedCategory], () => {
  openFaq.value = null
})

function setCategory(category: string) {
  selectedCategory.value = category
  openFaq.value = null
}

function toggleFaq(faqId: number) {
  openFaq.value = openFaq.value === faqId ? null : faqId
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
  background: linear-gradient(135deg, rgba(203, 206, 209, 0.4), rgba(224, 212, 212, 0.4));
  background-color: #d2efff;
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
.faq-list {
  display: grid;
  gap: 18px;
}
.faq-item {
  background: #f5fbff;
  border: 1px solid #d2efff;
  border-radius: 14px;
  padding: 18px 20px;
}
.faq-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.faq-item h4 {
  margin: 0;
  color: #071a29;
}
.faq-toggle {
  border: 0;
  background: transparent;
  color: #071a29;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  padding: 0;
  min-width: 28px;
}
.faq-answer {
  margin-top: 14px;
}
.faq-answer p {
  margin: 0;
  line-height: 1.7;
  color: #0f2438;
}
.contact-us {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  background: #071a29;
  color: #fff;
  border: 1px solid #d2efff;
  border-radius: 20px;
  padding: 30px 20px;
  margin-top: 60px;
  text-align: left;
}
.firstpart {
  flex: 1;
}
.firstpart h4 {
  margin: 0 0 8px;
  font-size: 1.5rem;
}
.firstpart p {
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
}
.action {
  display: flex;
  justify-content: center;
}
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: orange;
  border: none;
  border-radius: 6px;
  padding: 10px 16px;
  color: #fff;
  text-decoration: none;
  font-weight: 700;
}
.btn:hover {
  background: #ffb347;
}
.empty-state {
  padding: 40px 0;
  text-align: center;
}
@media (max-width: 900px) {
  .hero {
    padding-inline: 5%;
  }
  .contact-us {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
