<template>
  <form @submit.prevent="handleSubmit" class="sign" novalidate>
    <h3>Sign in</h3>
    <h2>Welcome back</h2>
    <p>Pick up from where you stopped</p>

    <div class="info">
      <label for="login-email">Email address</label>
      <input
        id="login-email"
        v-model.trim="email"
        type="email"
        placeholder="you@email.com"
        autocomplete="email"
        :aria-invalid="Boolean(errors.email)"
        :aria-describedby="errors.email ? 'login-email-error' : undefined"
        @blur="validateEmail"
      />
      <small v-if="errors.email" id="login-email-error" class="error">{{ errors.email }}</small>

      <label for="login-password">Password</label>
      <input
        id="login-password"
        v-model="password"
        type="password"
        placeholder="Enter your password"
        autocomplete="current-password"
        :aria-invalid="Boolean(errors.password)"
        :aria-describedby="errors.password ? 'login-password-error' : undefined"
        @blur="validatePassword"
      />
      <small v-if="errors.password" id="login-password-error" class="error">{{ errors.password }}</small>

      <p v-if="submitError" class="error" role="alert">{{ submitError }}</p>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Signing in…' : 'Sign in' }}
      </button>

      <button type="button" disabled aria-disabled="true">
        Continue with Google (coming soon)
      </button>

      <div class="btom">
        <p class="log">
          Don't have an account?
          <a href="#" @click.prevent="emit('switch')">Sign up</a>
        </p>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

defineProps({
  loading: { type: Boolean, default: false },
  submitError: { type: String, default: '' },
})

const emit = defineEmits(['switch', 'submit'])

const email = ref('')
const password = ref('')
const errors = reactive({
  email: '',
  password: '',
})

function validateEmail() {
  if (!email.value) {
    errors.email = 'Email address is required.'
  } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    errors.email = 'Enter a valid email address.'
  } else {
    errors.email = ''
  }
  return !errors.email
}

function validatePassword() {
  errors.password = password.value ? '' : 'Password is required.'
  return !errors.password
}

function handleSubmit() {
  const valid = validateEmail() && validatePassword()
  if (!valid) return

  emit('submit', {
    email: email.value,
    password: password.value,
  })
}
</script>

<style scoped>
.sign {
  padding: 60px 50px;
  background-color: #0aa6d1;
  border-radius: 18px;
  box-shadow: 0 2px 4px #10c2f3b2;
  width: 60%;
  height: auto;
  min-height: 100%;
}
.info { display: flex; flex-direction: column; gap: 10px; }
label { color: #d2efff; font-family: "Lato", sans-serif; font-weight: 900; font-size: 15px; }
input, select {
  background-color: transparent;
  color: #071a29;
  padding: 10px;
  border-radius: 15px;
  border: none;
  border-bottom: 0.5px solid #d2efff;
  font-family: "Lato", sans-serif;
  font-size: 14px;
  font-weight: 500;
}
input:focus, select:focus { outline: 2px solid #071a29; outline-offset: 2px; }
button {
  padding: 10px;
  border-radius: 25px;
  border: none;
  background-color: #071a29;
  color: #fff;
  font-family: "Lato", sans-serif;
  font-size: 17px;
  font-weight: 900;
  cursor: pointer;
}
button:disabled { opacity: 0.6; cursor: not-allowed; }
h2 { color: #d2efff; font-family: "Lato", sans-serif; font-weight: 900; font-size: 50px; }
h3 { color: #d2efff; font-family: "Lato", sans-serif; font-weight: 900; font-size: 30px; }
p { color: rgba(238, 238, 238, 0.815); }
.error { color: #7a0b0b; font-size: 13px; margin: 0; }
.btom { display: flex; justify-content: center; align-items: center; gap: 5px; font-family: "Lato", sans-serif; font-size: 15px; font-weight: 700; }
.log a { text-decoration: none; color: #071a29; }
@media (max-width: 700px) {
  .sign { width: 100%; box-sizing: border-box; padding: 40px 24px; }
  h2 { font-size: 36px; }
}
</style>