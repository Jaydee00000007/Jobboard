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
      <section class="partD contact">
          <div class="secA">
              <div class="contact-top">
                    <h2>Get in touch</h2>
                    <p>Questions about a listing, your account, or partnering with us? We usually reply within a day.</p>
              </div>
              <div class="sub-contact">
                  <div class="c-one">
                        <div class="ico"></div>
                        <div class="c-detail">
                            <span>Email</span>
                            <h4>hello@roleboard.com</h4>
                        </div>
                  </div>
                  <div class="c-two">
                        <div class="ico"></div>
                        <div class="c-detail">
                            <span>Phone</span>
                            <h4>+234 801 234 5678</h4>
                        </div>
                  </div>
                  <div class="c-three">
                        <div class="ico"></div>
                        <div class="c-detail">
                            <span>Office</span>
                            <h4>14 Adeola Odeku St, Victoria Island, Lagos</h4>
                        </div>
                  </div>
                  <div class="c-four">
                        <div class="ico1"></div>
                        <div class="ico1"></div>
                        <div class="ico1"></div>
                  </div> 
              </div>
          </div>
          <div class="secB">
                <form>
                    <div class="top">
                        <div class="left">
                            <label for="fullname">Full name</label>
                            <input placeholder="Your name">
                        </div>
                        <div class="right">
                            <label for="email">Email address</label>
                            <input placeholder="you@email.com">
                        </div>
                    </div>
                    <div class="subjectp">
                        <label for="subject">Subject</label>
                        <input placeholder="What's this about?">
                    </div>
                    <div class="messagep">
                        <label for="message">Message</label>
                        <textarea placeholder="What's this about?"></textarea>
                    </div>
                    <button>Send message</button>
                </form>
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

  .Aboutpage {
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
        gap: 380px;
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
          align-items: center;
          background-color: #d2efff;
          gap: 10px;
          padding: 50px;
          width:30%;
          border-radius: 15px;

          .verified-job{
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #f0faff;
            width: 90%;
            padding: 20px;
            border: 0px solid #071a2928;
            border-radius: 20px;

            span{
              text-wrap: nowrap;
            }

            .second{
              font-weight: lighter;
            }
          }

        }
    }
}

.contact{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #d2efff;
  padding: 0px 190px;
  padding-bottom: 60px;
  padding-top: 60px;
  margin: 0;

  .secA{
    display: flex;
    flex-direction: column;
    gap: 30px;

    .contact-top{
      display: flex;
      flex-direction: column;
      gap: 20px;
      h2{
        font-size: 35px;
        font-weight: 550;
        margin: 0;
      }
      p{
            font-size: 20px;
            font-weight: 300;
            margin: 0;
            text-wrap: wrap;
            width: 600px;
        }
    }

    .sub-contact{
      display: flex;
      flex-direction: column;
      gap: 0px;
      padding:0;
      margin: 0;

      .c-one{
      display: flex;
      flex-direction: row;
      gap: 0px;
      padding:0;
      margin: 0;
      }
    }
  }
}
</style>
