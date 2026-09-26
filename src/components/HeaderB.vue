<template>
    <header>
        <nav>
            <div class="logo">
                <img src="../images/logo.svg" alt="Logo" />
                <h4>Job Hunt</h4>
            </div>
            <ul class="nav-link">
                <li><a href="/jobs">Find jobs</a></li>
                <li><router-link :to="{ path: '/jobs', hash: '#categorieslink' }">Categories</router-link></li>
                <li><a href="/companies">Companies</a></li>
                <li><a href="/about">About us</a></li>
                <li><a href="/faq">FAQ</a></li>
            </ul>

            <div class="navp">
                <a href="/">Sign out</a>
                <div class="notify"><svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="40px" fill="#071a29"><path d="M519.7-236.01q16.28-16.53 16.6-39.8H423.04q.32 23.27 17.09 39.8 16.77 16.52 40.03 16.52t39.54-16.52Zm-234.66-93.14H674.3v-64.59h-40v-112.37q0-60.31-31.42-110.58-31.42-50.27-88.58-62.19v-27.23q0-14.46-9.92-24.38-9.91-9.92-24.45-9.92-14.53 0-24.71 9.92-10.18 9.92-10.18 24.38v27.23q-57 11.92-88.5 60.6t-31.5 108.17v116.37h-40v64.59Zm105.63-64.59v-126.33q0-37.88 25.83-64.91Q442.33-612 479.67-612q37.33 0 63.16 27.02 25.84 27.03 25.84 64.91v126.33h-178ZM480.2-73.3q-84.44 0-158.48-31.96-74.03-31.96-129.27-87.19-55.23-55.24-87.19-129.3Q73.3-395.82 73.3-480.31q0-84.5 31.96-158.58 31.96-74.09 87.17-129t129.28-86.94q74.08-32.03 158.59-32.03t158.61 32.02q74.11 32.02 129 86.91 54.9 54.88 86.92 129.08 32.03 74.2 32.03 158.67 0 84.46-32.03 158.5-32.03 74.03-86.94 129.12t-129.08 87.17Q564.64-73.3 480.2-73.3Zm.13-75.76q138.05 0 234.33-96.51 96.28-96.52 96.28-234.76 0-138.05-96.16-234.33-96.15-96.28-234.86-96.28-137.79 0-234.33 96.16-96.53 96.15-96.53 234.86 0 137.79 96.51 234.33 96.52 96.53 234.76 96.53ZM480-480Z"/></svg></div>
                <router-link :to="{ path: '/dashboard',}"><button class="dashboard">Dashboard</button></router-link>
            </div>
            
        </nav>
    </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
        nav{
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: px;
            padding: 0px 0px;
            background-color: #d2efff;
            width: 100%;
            height: 60px;
            box-shadow: 0 4px 30px #071a29;
        }

        .blur{
            background-color: #061724;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 30px #071a29;
        }

        .logo img{
            width: 40px;
            height: auto;
        }

        .logo{
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0px;
            height: 37px;
            width: 150px;
            background-color: #d2efff;
            border-radius: 40px;
        }

        .logo h4{
            color: #071a29;
            font-family: "Lato", sans-serif;
            font-weight: 900;
            font-style: normal;
            font-size: 15px;
        }

        .nav-link{
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 50px;
        }

        .nav-link a, li{
            text-decoration: none;
            list-style: none;
            color: #061724;
            font-family: "Lato", sans-serif;
            font-weight: 700;
            font-style: normal;
            font-size: 13px;
        }
        nav a:hover{
            color: #36d2ff;
            border-bottom: 2px solid orange;
            transition: 0.4s ease-in-out;
        }
        .dashboard{
            background-color: orange;
            color: #061724;
            height: 35px;
            width: 80px;
            border: none;
            border-radius: 8px;
            text-align: center;
            padding: 5px;
            font-weight: bold;
        }
        .dashboard:hover{
            color: #36d2ff;
            background-color: #061724;
            transition: 0.4s ease-in-out;
        }
        .navp{
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 0px 15px;

            a{
                text-decoration: none;
                color: #071a29;
                font-weight: bold;
                font-size: 13px;
            }
            .notify{
                
            }
        }


</style>
