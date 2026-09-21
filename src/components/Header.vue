<template>
    <header class="blur">
        <nav>
            <div class="logo">
                <img src="../images/logo.png" alt="Logo" />
                <h4>Job Hunt</h4>
            </div>
            <ul class="nav-link">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About us</a></li>
                <li><a href="/jobs">Find jobs</a></li>
                <li><a href="/faq">FAQ</a></li>
            </ul>
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
            gap: 5px;
            padding: 0px 40px;
            background-color: #071a29;
            margin: 0px;
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
            gap: 10px;
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
            gap: 70px;
            transition: 0px, 50px;
        }

        .nav-link a, li{
            text-decoration: none;
            list-style: none;
            color: #d2efff;
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
</style>
