<template>
  <div class="Aboutpage">
    <HeaderB class="header" />
    <section class="part-about">
      <div class="sub-head">
        <h3>About Job Hunt</h3>
      </div>
      <div class="head">
        <h1>Built by people who've sat on both sides of the hiring table.</h1>
      </div>
      <div class="text-body">
        <p>
          We started Roleboard after one too many applications vanished into dead job posts. Every
          listing here is verified, every company is real, and every update reaches you — that's the
          whole idea.
        </p>
      </div>
    </section>
    <section class="partB-about">
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
    <section class="partC-about">
      <div class="board area1">
        <div class="verified board-plate">
          <span></span>
          <h4>Verified listings only</h4>
          <p>
            Every vacancy is confirmed with the hiring company before it goes live. No scraped
            posts, no dead links, no expired roles.
          </p>
        </div>
        <div class="transparent board-plate">
          <span></span>
          <h4>Transparent, always</h4>
          <p>
            Salary ranges, application status, and response times are visible up front — for
            candidates and employers alike.
          </p>
        </div>
        <div class="speed board-plate">
          <span></span>
          <h4>Built for speed</h4>
          <p>
            From application to first response in under 48 hours, on average. We chase the silence
            so you don't have to.
          </p>
        </div>
      </div>
      <div class="area2">
        <div class="area2-a">
          <h3>Why we built this</h3>
          <p>
            Job boards had stopped working for the people who actually needed them — buried under
            recycled listings and postings that led nowhere. We rebuilt the board around one rule:
            if it's not real and current, it doesn't go up. <br />
            <br />
            Today, Roleboard connects thousands of job seekers with hiring teams across design,
            engineering, marketing, and beyond — with every listing checked before it's published.
          </p>
        </div>
        <div class="area2-b">
          <div class="verified-job">
            <span class="first">Product Designer</span>
            <span class="second">Verified today</span>
          </div>
          <div class="verified-job">
            <span class="first">Backend Engineer</span>
            <span class="second">Verified today</span>
          </div>
          <div class="verified-job">
            <span class="first">Marketing Lead</span>
            <span class="second">Verified yesterday</span>
          </div>
        </div>
      </div>
    </section>
    <section class="partD-about contact">
      <div class="secA">
        <div class="contact-top">
          <h2>Get in touch</h2>
          <p>
            Questions about a listing, your account, or partnering with us? We usually reply within
            a day.
          </p>
        </div>
        <div class="sub-contact">
          <div class="c-one iconhome">
            <div class="ico">
              <font-awesome-icon :icon="['fas', 'envelope']" />
            </div>
            <div class="c-detail">
              <span>Email</span>
              <h4>hello@roleboard.com</h4>
            </div>
          </div>
          <div class="c-two iconhome">
            <div class="ico"><font-awesome-icon :icon="['fas', 'phone']" /></div>
            <div class="c-detail">
              <span>Phone</span>
              <h4>+234 801 234 5678</h4>
            </div>
          </div>
          <div class="c-three iconhome">
            <div class="ico">
              <font-awesome-icon :icon="['fas', 'location-dot']" />
            </div>
            <div class="c-detail">
              <span>Office</span>
              <h4>14 Adeola Odeku St, Victoria Island, Lagos</h4>
            </div>
          </div>
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
      </div>
      <div class="secB">
        <form>
          <div class="top">
            <div class="left">
              <label for="fullname">Full name</label>
              <input placeholder="Your name" />
            </div>
            <div class="right">
              <label for="email">Email address</label>
              <input placeholder="you@email.com" />
            </div>
          </div>
          <div class="subjectp">
            <label for="subject">Subject</label>
            <input placeholder="What's this about?" />
          </div>
          <div class="messagep">
            <label for="message">Message</label>
            <textarea placeholder="Tell us more..."></textarea>
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
    Footer,
  },
}
</script>

<style>
.Aboutpage {
  min-height: 100dvh;
  background-color: #071a29;
}

.blur {
  background-color: rgba(255, 255, 255, 0.048);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0);
  box-shadow: 0 4px 30px rgba(19, 17, 17, 0.1);
  border-radius: 12px;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.part-about {
  background: linear-gradient(135deg, rgba(44, 62, 80, 0.4), rgba(253, 116, 108, 0.4));
  background-color: #d2efff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 120px 50px 40px;
  box-sizing: border-box;

  .sub-head h3 {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 10px;
    margin: 0;
    padding: 0;
    font-weight: 350;
    font-size: 18px;
    margin-top: 0;
    text-transform: uppercase;
  }
  .head h1 {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 10px;
    font-weight: Bolder;
    font-size: 40px;
    text-wrap: wrap;
    width: min(750px, 100%);
    margin: 0;
  }
  .text-body p {
    display: flex;
    justify-content: start;
    align-items: center;
    font-weight: 400;
    font-size: 18px;
    text-wrap: wrap;
    width: min(750px, 100%);
    margin: 0;
    padding-bottom: 50px;
  }
}

.partB-about {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #071a29;
  padding: 0;
  padding-bottom: 10px;

  ul {
    display: flex;
    justify-content: space-around;
    align-items: start;
    flex-wrap: wrap;
    gap: 24px 60px;
    width: 100%;
    padding: 20px 24px;
    list-style: none;
    color: #d2efff;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 13px;

    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: start;
      gap: 5px;

      h3 {
        font-size: 30px;
        font-weight: bolder;
      }
      span {
        font-size: 20px;
        font-weight: lighter;
      }
    }
  }
}

.partC-about {
  background-color: #f0faff;
  padding-bottom: 150px;

  .board {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 24px;
    align-items: center;
    padding: 80px 50px;

    .board-plate {
      display: flex;
      flex-direction: column;
      justify-content: start;
      background-color: #d2efff;
      border: 1px solid #071a290e;
      border-radius: 25px;
      flex: 1 1 300px;
      width: min(100%, 500px);
      max-width: 500px;
      min-width: 0;
      height: auto;
      min-height: 250px;
      box-sizing: border-box;
      padding: 30px;
      padding-top: 15px;

      span {
      }
      h4 {
        font-size: 20px;
        font-weight: bolder;
      }
      p {
        font-size: 20px;
        font-weight: light;
        text-wrap: wrap;
        margin: 0px;
      }
    }
  }

  .area2 {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 32px;
    padding: 0 50px;

    .area2-a {
      display: flex;
      flex-direction: column;
      gap: 0px;
      flex: 1 1 320px;
      min-width: 0;

      h3 {
        font-size: 35px;
        font-weight: 550;
        margin: 0;
      }
      p {
        font-size: 18px;
        font-weight: 400;
        margin: 0;
        text-wrap: wrap;
        width: 100%;
        max-width: 600px;
      }
    }
    .area2-b {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #d2efff;
      gap: 10px;
      padding: 50px;
      flex: 1 1 320px;
      width: auto;
      min-width: 0;
      box-sizing: border-box;
      border-radius: 15px;

      .verified-job {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #f0faff;
        width: 100%;
        box-sizing: border-box;
        flex-wrap: wrap;
        gap: 12px;
        padding: 20px;
        border: 0px solid #071a2928;
        border-radius: 20px;

        span {
          min-width: 0;
          text-wrap: wrap;
        }

        .second {
          font-weight: lighter;
        }
      }
    }
  }
}

.contact {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 40px;
  color: #d2efff;
  padding: 40px 50px;
  margin: 0;
  box-sizing: border-box;

  .secA {
    display: flex;
    flex-direction: column;
    gap: 30px;

    .contact-top {
      display: flex;
      flex-direction: column;
      gap: 20px;
      h2 {
        font-size: 35px;
        font-weight: 550;
        margin: 0;
      }
      p {
        font-size: 18px;
        font-weight: 300;
        margin: 0;
        text-wrap: wrap;
        width: 100%;
        max-width: 550px;
      }
    }

    .sub-contact {
      display: flex;
      flex-direction: column;
      gap: 0px;
      padding: 0;
      margin: 0;

      .iconhome {
        display: flex;
        flex-direction: row;
        gap: 15px;
        padding: 0;
        margin: 0;

        .ico {
          border: 1px solid #d2efff;
          border-radius: 50%;
          height: 40px;
          width: 40px;
          flex: 0 0 40px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
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
          color: #d2efff;
          text-decoration: none;
        }
      }
    }
  }

  .secB {
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 1 1 360px;
    width: auto;
    min-width: 0;

    form {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .top {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 20px;

        .left,
        .right {
          display: flex;
          flex-direction: column;
          gap: 5px;
          flex: 1 1 200px;
          min-width: 0;
        }
      }

      .subjectp,
      .messagep {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }

      input,
      textarea {
        box-sizing: border-box;
        padding: 10px;
        border-radius: 5px;
        border: none;
        width: 100%;
      }

      button {
        padding: 10px;
        border-radius: 5px;
        border: none;
        background-color: orange;
        color: #d2efff;
        cursor: pointer;
        width: 150px;
      }
    }
  }
}

@media (max-width: 900px) {
  .Aboutpage .part-about {
    padding: 100px 24px 36px;
  }

  .Aboutpage .partB-about ul {
    gap: 24px 32px;
    padding-inline: 24px;
  }

  .Aboutpage .partC-about .board {
    padding: 56px 24px;
  }

  .Aboutpage .partC-about .area2 {
    padding-inline: 24px;
  }

  .Aboutpage .partD-about.contact {
    padding: 40px 24px;
  }
}

@media (max-width: 600px) {
  .Aboutpage .part-about {
    padding: 92px 18px 28px;
  }

  .Aboutpage .part-about .head h1 {
    font-size: 34px;
  }

  .Aboutpage .part-about .text-body p {
    font-size: 16px;
    padding-bottom: 28px;
  }

  .Aboutpage .partB-about ul {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px 12px;
    margin: 0;
    padding: 20px 18px;
  }

  .Aboutpage .partB-about li h3 {
    margin: 0;
    font-size: 24px;
  }

  .Aboutpage .partB-about li span {
    font-size: 14px;
  }

  .Aboutpage .partC-about .board {
    padding: 40px 18px;
  }

  .Aboutpage .partC-about .board-plate {
    flex-basis: 100%;
    min-height: 0;
    padding: 24px;
  }

  .Aboutpage .partC-about .board-plate h4 {
    font-size: 18px;
  }

  .Aboutpage .partC-about .board-plate p {
    font-size: 16px;
  }

  .Aboutpage .partC-about .area2 {
    padding-inline: 18px;
  }

  .Aboutpage .partC-about .area2-a h3 {
    font-size: 28px;
  }

  .Aboutpage .partC-about .area2-b {
    padding: 18px;
  }

  .Aboutpage .partC-about .verified-job {
    padding: 14px;
  }

  .Aboutpage .partD-about.contact {
    padding: 32px 18px;
  }

  .Aboutpage .partD-about .contact-top h2 {
    font-size: 28px;
  }

  .Aboutpage .partD-about .contact-top p {
    font-size: 16px;
  }

  .Aboutpage .partD-about .secB .top {
    display: flex;
    flex-direction: column;
    padding-top: none;    
  }

   .Aboutpage .partD-about .secB .messagep {
   height: 100%;
  }

  .secB{
    form{
      display: flex;
      flex-direction: column;
      gap: 0;

      .top{
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        gap: 0px;
        padding: 0px;
      }
      .messagep{
        textarea{
          height: 100px;
        }
      }
      }
  }
}
</style>
