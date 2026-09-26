<template>
  <form @submit.prevent="handleSubmit" class="register" novalidate>
    <h3>Register</h3>
    <h2>Create an account</h2>
    <p>It takes two minutes. Cancel anytime.</p>

    <div class="info">
      <label for="register-name">Full name</label>
      <input
        id="register-name"
        v-model.trim="name"
        type="text"
        placeholder="Full name"
        autocomplete="name"
        :aria-invalid="Boolean(errors.name)"
        :aria-describedby="errors.name ? 'register-name-error' : undefined"
        @blur="validateName"
      />
      <small v-if="errors.name" id="register-name-error" class="error">{{ errors.name }}</small>

      <label for="register-email">Email address</label>
      <input
        id="register-email"
        v-model.trim="email"
        type="email"
        placeholder="you@email.com"
        autocomplete="email"
        :aria-invalid="Boolean(errors.email)"
        :aria-describedby="errors.email ? 'register-email-error' : undefined"
        @blur="validateEmail"
      />
      <small v-if="errors.email" id="register-email-error" class="error">{{ errors.email }}</small>

      <label for="register-password">Password</label>
      <input
        id="register-password"
        v-model="password"
        type="password"
        placeholder="Create a password"
        autocomplete="new-password"
        :aria-invalid="Boolean(errors.password)"
        :aria-describedby="errors.password ? 'register-password-error' : undefined"
        @blur="validatePassword"
      />
      <small v-if="errors.password" id="register-password-error" class="error">{{ errors.password }}</small>

      <label for="register-user-type">I am a</label>
      <select id="register-user-type" v-model="userType">
        <option value="jobseeker">Job Seeker</option>
        <option value="employer">Employer</option>
      </select>

      <p v-if="submitError" class="error" role="alert">{{ submitError }}</p>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Creating account…' : 'Create account' }}
      </button>

      <div class="btom">
        <p class="log">
          Already have an account?
          <a href="#" @click.prevent="emit('switch')">Log in</a>
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

const name = ref('')
const email = ref('')
const password = ref('')
const userType = ref('jobseeker')
const errors = reactive({
  name: '',
  email: '',
  password: '',
})

function validateName() {
  errors.name = name.value.length >= 2 ? '' : 'Please enter your full name.'
  return !errors.name
}

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
  if (password.value.length < 8) {
    errors.password = 'Password must be at least 8 characters.'
  } else {
    errors.password = ''
  }
  return !errors.password
}

function handleSubmit() {
  const valid = validateName() && validateEmail() && validatePassword()
  if (!valid) return

  emit('submit', {
    name: name.value,
    email: email.value,
    password: password.value,
    userType: userType.value,
  })
}
</script>

<style scoped>
.register {
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
  .register { width: 100%; box-sizing: border-box; padding: 40px 24px; }
  h2 { font-size: 36px; }
}
</style>