<template>
    <form @submit.prevent="handleSubmit" class="register">
        <h3>Register</h3>
        <h2>Create an account</h2>
        <p>It takes two minutes. Cancel anytime.</p>
        <div class="info">
            <label>Full name</label>
            <input v-model="name" type="text" placeholder="Full name" />
            <label>Email address</label>
            <input v-model="email" type="email" placeholder="you@email.com" />
            <label>Password</label>
            <input v-model="password" type="password" placeholder="Create a password" required />
            <label>I am a</label>
            <select v-model="userType">
                <option value="jobseeker">Job Seeker</option>
                <option value="employer">Employer</option>
            </select>
            <button type="submit">Create account</button>
           <div class="btom">
                <p class="log">Already have an account? <a href="#" @click.prevent="emit('switch')">Log in</a></p>
           </div>
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')
const userType = ref('jobseeker')
const emit = defineEmits(['switch'])

function handleSubmit() {
  emit('submit', {
    name: name.value,
    email: email.value,
    password: password.value,
    userType: userType.value
  })
}
</script>

<style scoped>
    .register {
        padding: 20px;
        background-color: #0aa6d1;
        border-radius: 18px;
        box-shadow: 0 2px 4px #10c2f3b2;
        width: 60%;
        height: auto;
        min-height: 100%;
        padding: 60px 50px;
    }

    .info{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .blur{
    background-color: #3db5f571;
    backdrop-filter: blur(10px);
    border: 1px solid #3db5f571;
    box-shadow: 0 4px 30px #3db5f571;
    border-radius: 12px;
    }

    label{
        color: #d2efff;
        font-family: "Lato", sans-serif;
        font-weight: 900;
        font-style: normal;
        font-size: 15px;
    }

    input, select{
        background-color:transparent;
        color: #071a29;
        padding: 10px;
        border-radius: 15px;
        border: none;
        border-bottom: 0.5px solid #d2efff;
        font-family: "Lato", sans-serif;
        font-size: 14px;
        font-weight: 500;

    }

    input:focus, 
    select:focus {
    outline: none;
    box-shadow: none;
    border: none;
    
    }

    button{
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

    h2{
        color: #d2efff;
        font-family: "Lato", sans-serif;
        font-weight: 900;
        font-style: normal;
        font-size: 50px;
    }

    h3{
        color: #d2efff;
        font-family: "Lato", sans-serif;
        font-weight: 900;
        font-style: normal;
        font-size: 30px;
    }

    p{
        color:rgba(238, 238, 238, 0.815)
    }

    .btom{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        font-family: "Lato", sans-serif;
        font-size: 15px;
        font-weight: 700;
    }

    .log a{
        text-decoration: none;
        color: #071a29;
    }
</style>