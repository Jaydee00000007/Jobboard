<template>
    <div class="footer">
        <div class="logo">
            <img src="../images/logo.svg" alt="Job Hunt logo" />
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

<script setup lang="ts">
</script>

<style scoped>
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
    }

    .footers,
    .footer-sec1{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 24px;
        padding: 0 10px;
        margin: 0;
        width: 100%;
    }

    .footer-sec1{
        width: 100%;
        padding: 0 5px;
    }

    .footer-sec2,
    .footerlist ul{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 15px;
        padding: 0 10px;
        text-align: center;
        margin: 0;
        width: 100%;
    }

    hr{
        border: 1px solid #071a29;
        margin: 10px 0;
    }

    .lets-talk span{
        display: block;
        color: #071a29;
        font-family: "Lato", sans-serif;
        font-weight: 900;
        font-size: clamp(2rem, 5vw, 3.75rem);
        line-height: 1;
        padding: 0;
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
        gap: 12px;
        padding-left: 0;
    }

    .footer a:focus-visible {
        outline: 2px solid #36d2ff;
        outline-offset: 3px;
    }

    @media (max-width: 700px) {
        .footers,
        .footer-sec1,
        .footer-sec2 {
            flex-direction: column;
            align-items: flex-start;
        }

        .footer-sec1,
        .footer-sec2 {
            gap: 18px;
        }

        .footerst,
        .footerlist {
            align-items: flex-start;
        }

        .footerlist ul {
            flex-wrap: wrap;
            text-align: left;
        }
    }
</style>