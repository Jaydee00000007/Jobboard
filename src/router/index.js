import { createRouter, createWebHistory } from 'vue-router'
import { useJobhuntStore } from '../stores/jobhunt'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import FaqView from '../views/FaqView.vue'
import JobView from '../views/JobView.vue'
import CompaniesView from '../views/CompaniesView.vue'
import DashboardView from '../views/DashboardView.vue'
import ContactView from '../views/ContactView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/faq', name: 'faq', component: FaqView },
  { path: '/jobs', name: 'jobs', component: JobView },
  { path: '/companies', name: 'companies', component: CompaniesView },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  { path: '/contact', name: 'contact', component: ContactView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return savedPosition || { top: 0 }
  }
})

router.beforeEach((to) => {
  if (!to.meta.requiresAuth) {
    return true
  }

  const jobhuntStore = useJobhuntStore()

  if (!jobhuntStore.isAuthenticated) {
    return {
      name: 'home',
      query: { redirect: to.fullPath }
    }
  }

  return true
})

export default router
