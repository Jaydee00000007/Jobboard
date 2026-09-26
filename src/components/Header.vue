<template>
  <header class="blur">
    <nav aria-label="Primary navigation">
      <RouterLink class="logo" to="/" aria-label="Job Hunt home">
        <img src="../images/logo.svg" alt="" />
        <span>Job Hunt</span>
      </RouterLink>

      <ul class="nav-link">
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/about">About us</RouterLink></li>
        <li><RouterLink to="/jobs">Find jobs</RouterLink></li>
        <li><RouterLink to="/faq">FAQ</RouterLink></li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
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
  font-family: "Lato", sans-serif;
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
  font-family: "Lato", sans-serif;
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

@media (max-width: 700px) {
  nav {
    padding: 0 16px;
  }

  .nav-link {
    gap: 18px;
  }

  .nav-link li:nth-child(2),
  .nav-link li:nth-child(4) {
    display: none;
  }

  .logo {
    width: auto;
    padding: 0 12px;
  }
}
</style>
