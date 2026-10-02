<template>
  <div class="footer">
    <div class="footer-sec1">
      <div class="footers">
        <div class="footerst">
            <div class="logo">
              <img src="../images/logo.svg" alt="Job Hunt logo" />
            </div>
        </div>
        <div class="footerst">
          <ul>
            <li><RouterLink to="/jobs">Browse jobs</RouterLink></li>
            <li><RouterLink to="/companies">Companies</RouterLink></li>
            <li><RouterLink to="/contact">Company Verification</RouterLink></li>
          </ul>
        </div>
        <div class="footerst">
          <ul>
            <li><RouterLink to="/contact">Post vacancy</RouterLink></li>
            <li><RouterLink to="/faq">FAQ</RouterLink></li>
            <li><RouterLink to="/about">About us</RouterLink></li>
          </ul>
        </div>
      </div>
      <div class="lets-talk">
        <p>Get a question?<span class="talk"><RouterLink :to="{ path: '/jobs', hash: '#categorieslink' }">Let's talk</RouterLink></span></p>
      </div>
    </div>
    <hr />
    <div class="footer-sec2">
      <div class="footerlist">
        <div class="c-four sociallink">
            <div class="ico1">
              <a href="#" target="_blank">
                <font-awesome-icon :icon="['fab', 'facebook-f']" />
              </a>
            </div>
            <div class="ico1">
              <a href="#" target="_blank">
                <font-awesome-icon :icon="['fab', 'twitter']" />
              </a>
            </div>
            <div class="ico1">
              <a href="#" target="_blank">
                <font-awesome-icon :icon="['fab', 'linkedin-in']" />
              </a>
            </div>
        </div>
      </div>
      <div class="footerlist">
        <p class="copy">© 2024 Job Board. All rights reserved.</p>
      </div>
      <div class="footerlist">
        <ul>
          <li><a href="#">Cookies policy</a></li>
          <li><a href="#">Legal terms</a></li>
          <li><a href="#">Privacy policy</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.footer,
.footer * {
  box-sizing: border-box;
}

.footer {
  background-color: #d2efff;
  color: #071a29;
  padding: 10px;
  gap: 5px;
  width: 100%;
  min-width: 0;
}

.sociallink {
        display: flex;
        flex-direction: row;
        gap: 35px;
        padding: 0;
        margin: 0;

        .ico1 {
          height: 40px;
          width: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .ico1 a {
          color:  #071a29;
          text-decoration: none;
        }
      }

a,
li {
  text-decoration: none;
  color: #071a29;
  list-style: none;
}

.logo img {
  width: 120px;
  height: auto;
}


.footers,
.footer-sec1 {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
  padding: 0 10px;
  margin: 0;
  width: 100%;
}

.footer-sec1 {
  width: 100%;
  padding: 0 5px;
  padding-right: 230px;
}

.footer-sec2,
.footerlist ul {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  text-align: center;
  margin: 0;
  width: 100%;
}

hr {
  border: 1px solid #071a29;
  margin: 10px 0;
}

.lets-talk span {
  display: block;
  color: #071a29;
  font-family: 'Lato', sans-serif;
  font-weight: 900;
  font-size: clamp(2rem, 5vw, 3.75rem);
  line-height: 1;
  padding: 0;
  text-wrap: nowrap;
}

.copy {
  text-align: center;
}

.footerst,
.footerlist {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 0px 10px;
  margin: 0px;
  width: 100%;
}

.footerst ul,
.footerlist ul {
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
    align-items: center;
    min-width: 0;
  }

  .footerlist ul {
    flex-wrap: wrap;
    text-align: left;
  }

  .footer{
    display: none;
  }
}
</style>
