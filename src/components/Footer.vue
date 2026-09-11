<template>
    <div class="footer">
        <div class="logo">
            <img src="../images/logo.png" alt="Logo" />
        </div>
        <div class="footer-sec1">
            <div class="footers">
                <div class="footerst">
                    <ul>
                        <li><RouterLink to="/jobs">Browse jobs</RouterLink></li>
                        <li><RouterLink to="/about">Job categories</RouterLink></li>
                        <li><RouterLink to="/contact">Post vacancy</RouterLink></li>
                    </ul>
                </div>
                <div class="footerst">
                    <ul>
                        <li><RouterLink to="/jobs">Browse jobs</RouterLink></li>
                        <li><RouterLink to="/companies">Companies</RouterLink></li>
                        <li><RouterLink to="/contact">Verified</RouterLink></li>
                    </ul>
                </div>
                <div class="footerst">
                    <ul>
                        <li><RouterLink to="/faq">FAQ</RouterLink></li>
                        <li><RouterLink to="/about">About us</RouterLink></li>
                        <li><RouterLink to="/contact">Contact us</RouterLink></li>
                    </ul>
                </div>
            </div>
            <div class="lets-talk">
                <p>Get a question?<span>Let's Talk</span></p>
            </div>
        </div>
        <hr>
        <div class="footer-sec2">
            <div class="footerlist">
                <ul>
                    <li><a href="#">Cookies policy</a></li>
                    <li><a href="#">Legal terms</a></li>
                    <li><a href="#">Privacy policy</a></li>
                </ul>
            </div>
            <div class="footerlist">
                <ul>
                    <li><a href="#">Cookies policy</a></li>
                    <li><a href="#">Legal terms</a></li>
                    <li><a href="#">Privacy policy</a></li>
                </ul>
            </div>
            <div class="footerlist">
                <ul>
                    <li><a href="#">Cookies policy</a></li>
                    <li><a href="#">Legal terms</a></li>
                    <li><a href="#">Privacy policy</a></li>
                </ul>
            </div>
        </div>
        <p class="copy">© 2024 Job Board. All rights reserved.</p>

    </div>
</template>

<script>
    export default {
        
    }
</script>

<style  scoped>

    .footer{
        background-color: #d2efff;
        color: #071a29;
        padding: 10px;
        gap: 5px;
    }

    a, li{
        text-decoration: none;
        color: #071a29;
        list-style: none;
    }

    .logo img{
            width: 80px;
            height: auto;
            margin-left: 250px;
        }

        .footers,
        .footer-sec1{
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 5px;
            padding: 0px 10px;
            margin: 0px;
            width: 100%;
        }

        .footer-sec1{
            width: auto;
            padding: 0px 5px;
        }

        .footer-sec2,
        .footerlist ul{
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 15px;
            padding: 0px 10px;
            text-align: center;
            margin: 0px;
            width: 100%;
        }

        hr{
            border: 1px solid #071a29;
            margin: 10px 0;
        }

        .lets-talk span{
            color: #071a29;
            width: 600px;
            font-family: "Lato", sans-serif;
            text-wrap: nowrap;
            font-weight: 900;
            font-style: normal;
            font-size: 60px;
            padding: 0px;
        }

        .copy{
            text-align: center;
        }

        .footerst,
        .footerlist{
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;
            padding: 0px 10px;
            margin: 0px;
            width: 100%;
        }

        .footerst ul,
        .footerlist ul{
            gap: 20px;
        }
</style>