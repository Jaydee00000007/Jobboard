import { createRouter, createWebHistory } from 'vue-router'
import { useJobhuntStore } from '../stores/jobhunt'
const HomeView = () => import('../views/HomeView.vue')
const AboutView = () => import('../views/AboutView.vue')
const FaqView = () => import('../views/FaqView.vue')
const JobView = () => import('../views/JobView.vue')
const CompaniesView = () => import('../views/CompaniesView.vue')
const DashboardView = () => import('../views/DashboardView.vue')
const ContactView = () => import('../views/ContactView.vue')

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
