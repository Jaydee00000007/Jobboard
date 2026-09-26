<template>
  <div class="homepage">
    <Header class="header" />
    <Main />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '../components/Header.vue'
import Main from '../components/Main.vue'
import Footer from '../components/Footer.vue'
</script>

<style>
body {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  box-sizing: border-box;
}

.homepage {
  min-height: 100dvh;
  background-color: #071a29;
}

.blur {
  background-color: rgba(255, 255, 255, 0.048);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0);
  box-shadow: 0 4px 30px rgba(19, 17, 17, 0.1);
  border-radius: 12px;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}
</style>
