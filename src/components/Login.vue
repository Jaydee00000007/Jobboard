<template>
    <form  @submit.prevent="handleSubmit" class="sign">
        <h3>Sign in</h3>
        <h2>Welcome back</h2>
        <p>Pick up from where you stopped</p>
        <div class="info">
            <label>Email address</label>
            <input v-model="email" type="email" placeholder="you@email.com" />
            <label>Password</label>
            <input v-model="password" type="password" placeholder="Create a password" required />
            <button type="submit">Sign in</button>
            <button type="submit">Continue with Google</button>
           <div class="btom">
                <p class="log">Don't have an account? <a href="#" @click.prevent="emit('switch')">Sign up</a></p>
           </div>
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const emit = defineEmits(['switch'])

function handleSubmit() {
  emit('submit', {
    email: email.value,
    password: password.value
  })
}
</script>

<style scoped>
    .sign {
        padding: 20px;
        background-color: #0aa6d1;
        border-radius: 18px;
        box-shadow: 0 2px 4px #10c2f3b2;
        min-width: 23%;
        min-height: 70%;
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