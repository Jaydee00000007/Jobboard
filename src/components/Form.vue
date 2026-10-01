<template>
  <form @submit.prevent="handleSubmit" class="register" novalidate>
    <h3>Register</h3>
    <h2>Create an account</h2>
    <p>It takes two minutes. Cancel anytime.</p>

    <div class="info">
      <label for="register-name">Full name</label>
      <input
        id="register-name"
        v-model.trim="registration.name"
        type="text"
        placeholder="Full name"
        autocomplete="name"
        :aria-invalid="Boolean(errors.name)"
        :aria-describedby="errors.name ? 'register-name-error' : undefined"
        @blur="validateName"
      />
      <small v-if="errors.name" id="register-name-error" class="error">{{ errors.name }}</small>

      <label for="register-skill">Skill</label>
      <input
        id="register-skill"
        v-model.trim="registration.skill"
        type="text"
        placeholder="Your primary skills"
        autocomplete="skill"
        :aria-invalid="Boolean(errors.skill)"
        :aria-describedby="errors.skill ? 'register-skill-error' : undefined"
        @keydown.enter.prevent="handleAdd"
      />
      <small v-if="errors.skill" id="register-skill-error" class="error">{{ errors.skill }}</small>
      <ul>
        <li v-for="(skill, index) in registration.skills" :key="index">
          {{ skill }}
          <button type="button" :aria-label="`Remove ${skill}`" @click="removeSkill(index)">
            Remove
          </button>
        </li>
      </ul>

      <label for="register-email">Email address</label>
      <input
        id="register-email"
        v-model.trim="registration.email"
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
        v-model="registration.password"
        type="password"
        placeholder="Create a password"
        autocomplete="new-password"
        :aria-invalid="Boolean(errors.password)"
        :aria-describedby="errors.password ? 'register-password-error' : undefined"
        @blur="validatePassword"
      />
      <small v-if="errors.password" id="register-password-error" class="error">{{
        errors.password
      }}</small>

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
import type { AuthPayload } from '../types/store'

defineProps<{ loading?: boolean; submitError?: string }>()

const emit = defineEmits<{
  switch: []
  submit: [payload: AuthPayload]
}>()

const registration = reactive({
  name: '',
  email: '',
  password: '',
  skill: '',
  skills: [] as string[],
})
const userType = ref('jobseeker')
const errors = reactive({
  name: '',
  email: '',
  password: '',
  skill: '',
})

function validateName() {
  errors.name = registration.name.length >= 2 ? '' : 'Please enter your full name.'
  return !errors.name
}

function validateEmail() {
  if (!registration.email) {
    errors.email = 'Email address is required.'
  } else if (!/^\S+@\S+\.\S+$/.test(registration.email)) {
    errors.email = 'Enter a valid email address.'
  } else {
    errors.email = ''
  }
  return !errors.email
}

function validatePassword() {
  if (registration.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.'
  } else {
    errors.password = ''
  }
  return !errors.password
}

function handleAdd() {
  const skill = registration.skill.trim()
  if (skill && !registration.skills.includes(skill)) {
    registration.skills.push(skill)
  }
  registration.skill = ''
  errors.skill = registration.skills.length ? '' : 'Please add at least one skill.'
}

function removeSkill(index: number) {
  registration.skills.splice(index, 1)
  if (!registration.skills.length) errors.skill = 'Please add at least one skill.'
}

function handleSubmit() {
  handleAdd()
  const validName = validateName()
  const validEmail = validateEmail()
  const validPassword = validatePassword()
  const validSkills = registration.skills.length > 0
  if (!validSkills) errors.skill = 'Please add at least one skill.'
  if (!(validName && validEmail && validPassword && validSkills)) return

  emit('submit', {
    name: registration.name,
    email: registration.email,
    password: registration.password,
    skill: registration.skills.join(', '),
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
.info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
label {
  color: #d2efff;
  font-family: 'Lato', sans-serif;
  font-weight: 900;
  font-size: 15px;
}
input,
select {
  background-color: transparent;
  color: #071a29;
  padding: 10px;
  border-radius: 15px;
  border: none;
  border-bottom: 0.5px solid #d2efff;
  font-family: 'Lato', sans-serif;
  font-size: 14px;
  font-weight: 500;
}
input:focus,
select:focus {
  outline: 2px solid #071a29;
  outline-offset: 2px;
}
button {
  padding: 10px;
  border-radius: 25px;
  border: none;
  background-color: #071a29;
  color: #fff;
  font-family: 'Lato', sans-serif;
  font-size: 17px;
  font-weight: 900;
  cursor: pointer;
}
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
h2 {
  color: #d2efff;
  font-family: 'Lato', sans-serif;
  font-weight: 900;
  font-size: 50px;
}
h3 {
  color: #d2efff;
  font-family: 'Lato', sans-serif;
  font-weight: 900;
  font-size: 30px;
}
p {
  color: rgba(238, 238, 238, 0.815);
}
.error {
  color: #7a0b0b;
  font-size: 13px;
  margin: 0;
}
.btom {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-family: 'Lato', sans-serif;
  font-size: 15px;
  font-weight: 700;
}
.log a {
  text-decoration: none;
  color: #071a29;
}
@media (max-width: 900px) {
  .register {
    width: 100%;
    box-sizing: border-box;
    padding: 40px 24px;
  }
  h2 {
    font-size: 36px;
  }
}
</style>
