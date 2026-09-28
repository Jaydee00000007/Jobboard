<template>
  <header class="site-header">
    <nav aria-label="Dashboard navigation">
      <RouterLink class="logo" to="/" aria-label="Job Hunt home">
        <img src="../images/logo.svg" alt="" />
        <span>Job Hunt</span>
      </RouterLink>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="primary-menu"
        aria-label="Toggle navigation"
        @click="menuOpen = !menuOpen"
      >
        <span></span><span></span><span></span>
      </button>

      <div id="primary-menu" class="nav-content" :class="{ open: menuOpen }">
        <ul class="nav-link">
          <li><RouterLink to="/jobs" @click="closeMenu">Find jobs</RouterLink></li>
          <li><RouterLink :to="{ path: '/jobs', hash: '#categorieslink' }" @click="closeMenu">Categories</RouterLink></li>
          <li><RouterLink to="/companies" @click="closeMenu">Companies</RouterLink></li>
          <li><RouterLink to="/about" @click="closeMenu">About us</RouterLink></li>
          <li><RouterLink to="/faq" @click="closeMenu">FAQ</RouterLink></li>
        </ul>

        <div class="nav-actions">
          <button type="button" class="sign-out" @click="signOut">Sign out</button>
          <button type="button" class="dashboard" @click="goDashboard">Dashboard</button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useJobhuntStore } from '../stores/jobhunt'

const router = useRouter()
const store = useJobhuntStore()
const menuOpen = ref(false)

function closeMenu() {
  menuOpen.value = false
}

function signOut() {
  closeMenu()
  store.signOut()
  router.replace({ name: 'home' })
}

function goDashboard() {
  closeMenu()
  router.push({ name: 'dashboard' })
}
</script>

<style scoped>
.site-header {
  position: relative;
  z-index: 1000;
  background: rgba(7, 26, 41, 0.96);
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 24px rgba(7, 26, 41, 0.22);
}

nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  min-height: 64px;
  padding: 0 24px;
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
  width: auto;
  min-height: 38px;
  padding: 0 12px 0 8px;
  border-radius: 999px;
  background: #d2efff;
  color: #071a29;
  text-decoration: none;
  font-weight: 900;
  font-size: 14px;
}

.logo img { width: 38px; height: 38px; }

.nav-content {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 24px;
  flex: 1;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: clamp(18px, 3vw, 42px);
  margin: 0;
  padding: 0;
  list-style: none;
}

.nav-link a {
  color: #d2efff;
  text-decoration: none;
  font-size: 13px;
  font-weight: 700;
}

.nav-link a:hover,
.nav-link a.router-link-active { color: #36d2ff; }

.nav-link a:focus-visible,
.logo:focus-visible,
.sign-out:focus-visible,
.dashboard:focus-visible,
.menu-toggle:focus-visible {
  outline: 2px solid #36d2ff;
  outline-offset: 3px;
}

.nav-actions { display: flex; align-items: center; gap: 10px; }

.sign-out,
.dashboard {
  min-height: 36px;
  border-radius: 8px;
  padding: 0 13px;
  border: 1px solid transparent;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.sign-out { background: transparent; color: #d2efff; border-color: rgba(210,239,255,.28); }
.dashboard { background: orange; color: #071a29; }

.menu-toggle {
  display: none;
  border: 0;
  background: transparent;
  padding: 8px;
  cursor: pointer;
}

.menu-toggle span {
  display: block;
  width: 24px;
  height: 2px;
  margin: 5px 0;
  background: #d2efff;
}

@media (max-width: 900px) {
  nav { padding: 0 16px; }
  .menu-toggle { display: block; }
  .nav-content {
    display: none;
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    padding: 18px 16px 20px;
    flex-direction: column;
    align-items: stretch;
    background: #071a29;
    box-shadow: 0 12px 24px rgba(7,26,41,.22);
  }
  .nav-content.open { display: flex; }
  .nav-link { flex-direction: column; align-items: stretch; gap: 0; }
  .nav-link li { width: 100%; }
  .nav-link a { display: block; padding: 12px 8px; }
  .nav-actions { justify-content: stretch; }
  .nav-actions button { flex: 1; }
}
</style>
