<template>
  <div class="Aboutpage">
     <HeaderB class="header"/>
      <section class="partA">
          <div class="sub-head">
              <h3>About Job Hunt</h3>
          </div>
          <div class="head">
              <h1>Built by people who've sat on both sides of the hiring table.</h1>
          </div>
          <div class="text-body">
              <p>We started Roleboard after one too many applications vanished into dead job posts. Every listing here is verified, every company is real, and every update reaches you — that's the whole idea.</p>
          </div>
      </section>
      <section class="partB">
              <ul>
                  <li>
                      <h3>12,400+</h3>
                      <span>Live openings</span>
                  </li>
                  <li>
                      <h3>860</h3>
                      <span>Hiring companies</span>
                  </li>
                  <li>
                      <h3>48 hrs</h3>
                      <span>Avg. first response</span>
                  </li>
                  <li>
                      <h3>2019</h3>
                      <span>Founded</span>
                  </li>
                </ul>
      </section>
      <section class="partC">
          <div class="board area1">
              <div class="verified board-plate">
                  <span></span>
                  <h4>Verified listings only</h4>
                  <p>Every vacancy is confirmed with the hiring company before it goes live. No scraped posts, no dead links, no expired roles.</p>
              </div>
              <div class="transparent board-plate">
                  <span></span>
                  <h4>Transparent, always</h4>
                  <p>Salary ranges, application status, and response times are visible up front — for candidates and employers alike.</p>
              </div>
              <div class="speed board-plate">
                  <span></span>
                  <h4>Built for speed</h4>
                  <p>From application to first response in under 48 hours, on average. We chase the silence so you don't have to.</p>
              </div>
          </div>
          <div class="area2">
              <div class="area2-a">
                  <h3>Why we built this</h3>
                  <p>Job boards had stopped working for the people who actually needed them — buried under recycled listings and postings that led nowhere. We rebuilt the board around one rule: if it's not real and current, it doesn't go up. <br> <br> Today, Roleboard connects thousands of job seekers with hiring teams across design, engineering, marketing, and beyond — with every listing checked before it's published.</p>
              </div>
              <div class="area2-b">
                  <div class="verified-job">
                      <span class="first">Product Designer</span>
                      <span class="second">Product Designer</span>
                  </div>
                  <div class="verified-job">
                      <span class="first">Product Designer</span>
                      <span class="second">Product Designer</span>
                  </div>
                  <div class="verified-job">
                      <span class="first">Product Designer</span>
                      <span class="second">Product Designer</span>
                  </div>
              </div>
          </div>
      </section>
      <section class="partD">
          <div class="sub-head">
              <h3>About Job Hunt</h3>
          </div>
          <div class="head">
              <h1>Built by people who've sat on both sides of the hiring table.</h1>
          </div>
          <div class="text-body">
              <p>We started Roleboard after one too many applications vanished into dead job posts. Every listing here is verified, every company is real, and every update reaches you — that's the whole idea.</p>
          </div>
      </section>
      <Footer />
  </div>
</template>

<script>
import HeaderB from '../components/HeaderB.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'AboutView',
  components: {
    HeaderB,
    Footer
  }
}
</script>

<style>
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    box-sizing: border-box;
  }

  .homepage {
    min-height: 100dvh;
    background-color: #071a29;
  }

  .blur{
    background-color: rgba(255, 255, 255, 0.048);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0);
    box-shadow: 0 4px 30px rgba(19, 17, 17, 0.1);
    border-radius: 12px;
}

.header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.partA{
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #d2efff;
  padding-left: 190px;

  .sub-head h3{
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 10px;
    margin: 0;
    padding: 20px 0px 0px 0px;
    font-weight: 350;
    font-size: 20px;
    margin-top: 120px;
    text-transform: uppercase;
  }
  .head h1{
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 10px;
    font-weight: Bolder;
    font-size: 60px;
    text-wrap: wrap;
    width: 1050px;
    margin-top: none;
  }
  .text-body p{
    display: flex;
    justify-content: start;
    align-items: center;
    font-weight: 400;
    font-size: 30px;
    text-wrap: wrap;
    width: 1200px;
    margin-top: none;
    padding-bottom: 50px;
  }
}

.partB{
  background-color: #071a29;
  padding-bottom: 20px;

  ul{
    display: flex;
    justify-content: start;
    align-items: start;
    gap: 200px;
    padding: 0px 190px;
    list-style: none;
    color: #d2efff;
    font-family: "Lato", sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 13px;

    li{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: start;
      gap: 10px;

      h3{
        font-size: 30px;
        font-weight: bolder;
      }
      span{
        font-size: 20px;
        font-weight: lighter;
      }
    }
  }
}

.partC{
    background-color: #f0faff;
    padding-bottom: 150px;

    .board{
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 100px;
      align-items: center;
      padding: 100px 50px;

      .board-plate{
        display: flex;
        flex-direction: column;
        justify-content: start;
        border: 1px solid #071a290e;
        border-radius: 25px;
        width: 500px;
        height: 250px;
        padding: 30px;

        span{

        }
        h4{
          font-size: 20px;
          font-weight: bolder;
          
        }
        p{
          font-size: 20px;
          font-weight: light;
          text-wrap: wrap;
          margin: 0px;
        }
      }
    }

    .area2{
        display: flex;
        flex-direction: row;
        gap: 20px;
        padding-left: 190px;

        .area2-a{
          display: flex;
          flex-direction: column;
          gap: 0px;

          h3{
            font-size: 35px;
            font-weight: 550;
            margin: 0;
          }
          p{
            font-size: 20px;
            font-weight: 400;
            margin: 0;
            text-wrap: wrap;
            width: 750px;
          }
        }
        .area2-b{
          display: flex;
          flex-direction: column;
          justify-content: center;
          background-color: #d2efff;
          gap: 100px;
          padding: 50px;
          width:30%;

          .verified-job{
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #f0faff;
            width: 90%;
            border: 0px solid #071a2928;

            span{
              text-wrap: nowrap;
            }
          }

        }
    }
}
</style>
