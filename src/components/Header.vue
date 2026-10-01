<template>
  <header class="blur">
    <nav aria-label="Primary navigation">
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
          <li><RouterLink to="/">Home</RouterLink></li>
          <li><RouterLink to="/about">About us</RouterLink></li>
          <li><RouterLink to="/jobs">Find jobs</RouterLink></li>
          <li><RouterLink to="/faq">FAQ</RouterLink></li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const menuOpen = ref(false)
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  box-sizing: border-box;
  padding: 0 40px;
  background-color: #071a29;
  margin: 0;
  width: 100%;
  min-height: 60px;
  box-shadow: 0 4px 30px #071a29;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  min-height: 37px;
  width: 150px;
  background-color: #d2efff;
  border-radius: 40px;
  color: #071a29;
  text-decoration: none;
}

.logo img {
  width: 40px;
  height: auto;
}

.logo span {
  font-family: 'Lato', sans-serif;
  font-weight: 900;
  font-size: 15px;
}

.nav-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 70px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.nav-link a {
  text-decoration: none;
  color: #d2efff;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  font-size: 13px;
}

.nav-link a:hover,
.nav-link a.router-link-active {
  color: #36d2ff;
}

.nav-link a:focus-visible,
.logo:focus-visible {
  outline: 2px solid #36d2ff;
  outline-offset: 4px;
}

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
  nav {
    padding: 0 16px;
  }
  .menu-toggle {
    display: block;
  }
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
    box-shadow: 0 12px 24px rgba(7, 26, 41, 0.22);
  }
  .nav-content.open {
    display: flex;
  }
  .nav-link {
    flex-direction: column;
    align-items: stretch;
    gap: 0;
  }
  .nav-link li {
    width: 100%;
  }
  .nav-link a {
    display: block;
    padding: 12px 8px;
  }
  .nav-actions {
    justify-content: stretch;
  }
  .nav-actions button {
    flex: 1;
  }
}

@media (max-width: 700px) {
  nav {
    padding: 0 16px;
  }

  .logo {
    width: auto;
    padding: 0 12px;
  }
}
</style>
