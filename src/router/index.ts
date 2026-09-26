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
  { path: '/', name: 'home', component: HomeView, meta: { guestOnly: true } },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/faq', name: 'faq', component: FaqView },
  { path: '/jobs', name: 'jobs', component: JobView },
  { path: '/companies', name: 'companies', component: CompaniesView },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  { path: '/contact', name: 'contact', component: ContactView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }

    return savedPosition || { top: 0 }
  },
})

router.beforeEach((to) => {
  const store = useJobhuntStore()

  if (to.meta.requiresAuth && !store.isAuthenticated) {
    return {
      name: 'home',
      query: { redirect: to.fullPath },
    }
  }

  if (to.meta.guestOnly && store.isAuthenticated) {
    return { name: 'dashboard' }
  }

  return true
})

export default router
