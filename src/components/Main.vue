// eslint-disable-next-line vue/multi-word-component-names
<template>
    <div class="main">
        <div class="main1">
            <div class="top">
                <span class="box">.</span>
                <h4>JOB BOARD</h4>
            </div>
            <p class="p1">THE LISTING BOARD BUILT FOR FINDERS, NOT SCROLLERS</p>
            <h1>Every open role worth having, in <span class="one">one place.</span></h1>
            <p class="p2">Job Hunt cuts the noise out of your job search. No
                recycled postings, no dead links - every lsiting here is
                verified, current, and posted by a team thats actually
                hiring. If you're ready to stop searching and start
                appplying, you're in the right place.  
            </p>
            <div class="hiring-update">
                <h5>now hiring</h5>
                <span></span>
            </div>
            <hr>
            <div class="comp-info">
                <div class="comp1">
                    <h4>12,400+</h4>
                    <p>Live openings</p>
                </div>
                <div class="comp2">
                    <h4>860</h4>
                    <p>Hiring Companies</p>
                </div>
                <div class="comp3">
                    <h4>48 hrs</h4>
                    <p>Avg. first response</p>
                </div>
            </div>
        </div>
        <div class="main2">
            <Login v-if="!isForm" @switch="isForm = true" @submit="handleSignIn" class="login" />
            <Form v-else @switch="isForm = false" @submit="handleSignUp" class="form" />
        </div>
    </div>

</template>

<script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import Form from './Form.vue'
    import Login from './Login.vue'
    import { useJobhuntStore } from '../stores/jobhunt.js'

    const isForm = ref(false)
    const router = useRouter()
    const store = useJobhuntStore()

    function handleSignIn(payload) {
        store.signIn(payload)
        router.push('/dashboard')
    }

    function handleSignUp(payload) {
        store.signUp(payload)
        router.push('/dashboard')
    }
</script>

<style  scoped>

     h4{
        color: #d2efff;
        font-family: "Lato", sans-serif;
    }

    .p1{
        color: orange;
        font-family: "Lato", sans-serif;
    }

    .box{
        color: orange;
        width: 300px;
        height: 300px;
        padding: 20px;
        margin: 20px;
        box-sizing: border-box;
    }

    .p2{
        color: #36d2ff;
        font-family: "Lato", sans-serif;
        text-wrap: wrap;
        padding-top: 0px;
        width: 100%;
        gap: 10px;
        font-size: 20px;
    }

    h1{
        color: #fff;
        font-family: "Lato", sans-serif;
        font-weight: 900;
        text-wrap: wrap;
        font-size: 50px;
    }

    .one{
        color: #36d2ff;
    }

    .main{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
        background-color: #071a29;
        gap: 50px;
        padding: 100px 4rem;
        box-sizing: border-box;
        flex-wrap: wrap;
        max-width: 1400px;
        margin: 0 auto;
    }

    .main1{
        display: flex;
        flex-direction: column;
        gap: 10px;
        flex: 1 1 35%;
        min-width: 280px;
        box-sizing: border-box;
    }

    hr{
        border: 1px solid #014355;
        width: 100%;
    }

    .comp-info{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 15px;
    }

    .comp-info h4{
        color: orange;
        font-family: "Lato", sans-serif;
        font-weight: 1000;
    }

    .comp-info p{
        color: #d2efff;
        font-family: "Lato", sans-serif;
        font-size: 12px;
    }

    .main2{
        flex: 1 1 55%;
        min-width: 300px;
        box-sizing: border-box;
    }

    .hiring-update{
        h5{
            color: #ffc936;
            font-family: "Lato", sans-serif;
            font-weight: 500;
            font-size: 15px;
        }
    }
</style>