<template>
  <div class="homepage">
    <HeaderB class="header" />
    <div class="sectionA">
      <div class="d-flex align-items-start">
        <div class="navbar">
          <div class="nav flex-column nav-pills me-3 navbarplate" role="tablist" aria-orientation="vertical">
            <button
              v-for="tab in mainTabs"
              :key="tab.id"
              class="nav-link"
              :class="{ active: activeTab === tab.id }"
              type="button"
              @click="handleTabSelect(tab.id)"
            >
              {{ tab.label }}
            </button>
          </div>
          <div class="nav-footer">
            <div class="name-i">
              <h4>AO</h4>
              <div class="profile-name">
                <p>Adaeze Okonkwo</p>
                <span class="job-status">Job seeker</span>
              </div>
            </div>
          </div>
        </div>

        <div class="tab-content mt-2 page-content">
          <div v-if="activeTab === 'overview'" class="tab-pane fade show active">
            <div class="overview-header">
              <div class="header-1"><h2>Overview</h2></div>
              <div class="notif">
                <div class="name-in"><h3>{{ profileInitials }}</h3></div>
              </div>
            </div>
            <div class="overview-content">
              <div class="partA">
                <h3>Welcome back, Adaeze</h3>
                <p>Here’s what’s happening with your job search right now.</p>
              </div>
              <div class="partB">
                <div v-for="stat in overviewStats" :key="stat.label" class="profile-tile">
                  <p>{{ stat.label }}</p>
                  <h2>{{ stat.value }}</h2>
                  <span :class="stat.trendClass">{{ stat.change }}</span>
                </div>
              </div>
              <div class="partC">
                <div class="partC1">
                  <table class="table t1">
                    <thead>
                      <tr>
                        <th>Recent applications</th>
                        <th></th>
                        <th></th>
                        <th>
                          <button type="button" class="view-all-link" @click="setActiveTab('messages')">View all</button>
                        </th>
                      </tr>
                      <tr>
                        <th scope="col">ROLE</th>
                        <th scope="col">COMPANY</th>
                        <th scope="col">STATUS</th>
                        <th scope="col">APPLIED</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="application in recentApplications" :key="application.role">
                        <td scope="row">{{ application.role }}</td>
                        <td>{{ application.company }}</td>
                        <td>{{ application.status }}</td>
                        <td>{{ application.date }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="partC2">
                  <table class="table t2">
                    <thead>
                      <tr>
                        <th>Notifications</th>
                        <th>
                          <button type="button" class="mark-all-link" @click="markAllNotificationsRead">
                            {{ allNotificationsRead ? 'All read' : 'Mark all read' }}
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="notification in notifications" :key="notification.id">
                        <td class="notiv" scope="row">
                          <div class="status-icon">
                            <svg v-if="notification.type === 'success'" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#75FB4C"><path d="M382-232.35 146.35-468l64.89-64.89L382-362.13l366.76-366.76L813.65-664 382-232.35Z"/></svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F19E39"><path d="M480-431.63 162.87-629.72v386.85H521.2v91H162.87q-37.78 0-64.39-26.61t-26.61-64.39v-474.26q0-37.78 26.61-64.39t64.39-26.61h634.26q37.78 0 64.39 26.61t26.61 64.39v285.5h-91v-198.09L480-431.63Zm0-87.17 317.13-198.33H162.87L480-518.8ZM763.59-30.91l-59.11-59.35 60.61-61.61H601.2v-84.78h163.89l-61.61-61.61 60.11-59.35 163.34 163.35L763.59-30.91ZM162.87-629.72V-189v-242.63 2.52-288.02 87.41Z"/></svg>
                          </div>
                          <div class="noti-message">
                            <p>{{ notification.message }}</p>
                            <span>{{ notification.time }}</span>
                          </div>
                        </td>
                        <td>
                          <button type="button" class="mark-read-btn" @click="toggleNotificationRead(notification.id)">
                            {{ notification.read ? 'Read' : 'Mark read' }}
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="activeTab === 'applications'" class="tab-pane fade show active app-section">
            <div class="app-head">
              <h3>Applications</h3>
              <p>{{ applications.length }} applications sent across 4 stages.</p>
            </div>
            <div class="app-content">
              <ul class="nav nav-pills mb-3" role="tablist">
                <li v-for="filter in applicationFilters" :key="filter.id" class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    :class="{ active: activeApplicationFilter === filter.id }"
                    type="button"
                    @click="toggleApplicationFilter(filter.id)"
                  >
                    {{ filter.label }} <span>{{ filter.count }}</span>
                  </button>
                </li>
              </ul>
              <div class="tab-content">
                <table class="table t-app">
                  <thead>
                    <tr>
                      <th>Recent applications</th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                    <tr>
                      <th scope="col">ROLE</th>
                      <th scope="col">COMPANY</th>
                      <th scope="col">STATUS</th>
                      <th scope="col">APPLIED</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="application in filteredApplications" :key="application.role + application.company">
                      <td scope="row">{{ application.role }}</td>
                      <td>{{ application.company }}</td>
                      <td>{{ application.status }}</td>
                      <td>{{ application.date }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div v-else-if="activeTab === 'savedjobs'" class="tab-pane fade show active savedjob-section">
            <div class="savedjobs-head">
              <h3>Saved jobs</h3>
              <p>{{ savedJobs.filter((job) => job.saved).length }} roles saved for later.</p>
            </div>
            <div class="savedjobs-content">
              <div v-for="job in savedJobs" :key="job.id" class="savedjob-tiles">
                <div class="company-initials">{{ job.initials }}</div>
                <div class="job-title">{{ job.title }}</div>
                <div class="job-location">{{ job.location }}</div>
                <div class="job-pay">{{ job.pay }}</div>
                <button type="button" class="save-toggle" :class="{ saved: job.saved }" @click="handleSavedJobToggle(job.id)">
                  {{ job.saved ? 'Saved' : 'Save' }}
                </button>
              </div>
            </div>
          </div>

          <div v-else-if="activeTab === 'messages'" class="tab-pane fade show active message-section">
            <div class="messagesection-head">
              <h3>Messages</h3>
              <p>{{ unreadMessageCount }} unread conversations.</p>
            </div>
            <div class="messagesection-content">
              <div class="d-flex align-items-start message-layout">
                <div class="nav flex-column nav-pills me-3 message-btn" role="tablist" aria-orientation="vertical">
                  <button
                    v-for="message in inboxMessages"
                    :key="message.id"
                    class="nav-link"
                    :class="{ active: activeMessageId === message.id }"
                    type="button"
                    @click="selectMessage(message.id)"
                  >
                    <div class="message-brief">
                      <h4 class="company-name">{{ message.company }}</h4>
                      <p>{{ message.preview }}</p>
                    </div>
                  </button>
                </div>
                <div class="message-preview">
                  <h4>{{ selectedMessage.company }}</h4>
                  <p class="message-subject">{{ selectedMessage.subject }}</p>
                  <div class="message-body">{{ selectedMessage.body }}</div>
                  <div class="message-meta">
                    <span>{{ selectedMessage.time }}</span>
                    <button type="button" class="reply-btn" @click="replyToMessage">Reply</button>
                  </div>
                  <p v-if="replyStatus" class="reply-status">{{ replyStatus }}</p>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="activeTab === 'profile'" class="tab-pane fade show active profile-section">
            <div class="profile-head">
              <h3>Profile</h3>
              <p>How employers see you.</p>
            </div>
            <div class="profile-content">
              <div class="part1">
                <div class="profile-ini">AO</div>
                <div class="profile-detail">
                  <h4>{{ userProfile.name }}</h4>
                  <span class="updated-specialization">Product and visual designer · <span>{{ userProfile.location }}</span></span>
                </div>
              </div>
              <div class="part2" id="specialization">
                <ul>
                  <li v-for="skill in skills" :key="skill.id" :class="{ selected: skill.selected }" @click="toggleSkill(skill.id)">
                    {{ skill.name }}
                  </li>
                </ul>
              </div>
              <div class="part3">
                <Fileupload />
              </div>
            </div>
          </div>

          <div v-else-if="activeTab === 'settings'" class="tab-pane fade show active settings-section">
            <div class="setting-head">
              <h3>Settings</h3>
              <p>Manage your account and preferences.</p>
              <div class="settings-body">
                <div class="email-notification setting-major">
                  <div class="part1">
                    <h5>Email notifications</h5>
                    <p>New matches and application updates.</p>
                  </div>
                  <div class="part2">
                    <label class="switch">
                      <input v-model="settings.emailNotifications" type="checkbox" @change="handleSettingsUpdate" />
                      <span class="slider round"></span>
                    </label>
                  </div>
                </div>
                <div class="profile-visibility setting-major">
                  <div class="part1">
                    <h5>Profile visibility</h5>
                    <p>Visible to verified companies only.</p>
                  </div>
                  <div class="part2">
                    <label class="switch">
                      <input v-model="settings.profileVisibility" type="checkbox" @change="handleSettingsUpdate" />
                      <span class="slider round"></span>
                    </label>
                  </div>
                </div>
                <div class="authentication setting-major">
                  <div class="part1">
                    <h5>Two-factor authentication</h5>
                    <p>Add an extra layer of security.</p>
                  </div>
                  <div class="part2">
                    <label class="switch">
                      <input v-model="settings.twoFactorAuth" type="checkbox" @change="handleSettingsUpdate" />
                      <span class="slider round"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapState } from 'pinia'
import HeaderB from '../components/HeaderB.vue'
import Footer from '../components/Footer.vue'
import Fileupload from '../components/Fileupload.vue'
import { useJobhuntStore } from '../stores/jobhunt.js'

export default {
  name: 'DashboardView',
  components: {
    HeaderB,
    Fileupload,
    Footer
  },
  data() {
    return {
      mainTabs: [
        { id: 'overview', label: 'Overview' },
        { id: 'applications', label: 'Applications' },
        { id: 'savedjobs', label: 'Saved jobs' },
        { id: 'messages', label: 'Messages' },
        { id: 'profile', label: 'Profile' },
        { id: 'settings', label: 'Settings' }
      ],
      jobhuntStore: null
    }
  },
  created() {
    this.jobhuntStore = useJobhuntStore()
  },
  computed: {
    ...mapState(useJobhuntStore, [
      'activeTab',
      'activeApplicationFilter',
      'activeMessageId',
      'replyStatus',
      'applications',
      'savedJobs',
      'inboxMessages',
      'notifications',
      'settings',
      'skills',
      'overviewStats',
      'recentApplications',
      'applicationFilters',
      'filteredApplications',
      'selectedMessage',
      'unreadMessageCount',
      'allNotificationsRead',
      'userProfile'
    ]),
    profileInitials() {
      return this.userProfile.initials || 'AO'
    }
  },
  methods: {
    handleTabSelect(tab) {
      this.jobhuntStore.setActiveTab(tab)
    },
    handleSavedJobToggle(jobId) {
      this.jobhuntStore.toggleSavedJob(jobId)
    },
    handleSettingsUpdate() {
      this.jobhuntStore.updateSettings(this.settings)
    },
    toggleApplicationFilter(filter) {
      this.jobhuntStore.toggleApplicationFilter(filter)
    },
    toggleNotificationRead(id) {
      this.jobhuntStore.toggleNotificationRead(id)
    },
    markAllNotificationsRead() {
      this.jobhuntStore.markAllNotificationsRead()
    },
    replyToMessage() {
      this.jobhuntStore.replyToMessage()
    },
    toggleSkill(id) {
      this.jobhuntStore.toggleSkill(id)
    },
    updateSettings(partialSettings) {
      this.jobhuntStore.updateSettings(partialSettings)
    },
    selectMessage(id) {
      this.jobhuntStore.selectMessage(id)
    }
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
}

.sectionA{
  display: block;
  background-color: #fff;
  margin-top: 30px;

  height: 100%;

  .navbar{
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    position: sticky;
    height: 100vh;
    width: 15%;
    gap: 10px;
    padding: 10px;
    padding-top: 40px;
    background-color: #01101c;

    .navbarplate{
      display:flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 20px;
      padding: 10px;
      padding-top: 10px;
    }

    button{
      color:aliceblue;
      height: 40px;
      width: 130px;
      text-align: left;
    }

    button.active{
      background-color: #1486c3;
    }
  }

  .page-content{
    background-color: #fff;
    height: 100%;
    width: 100%;
    padding-top: 30px;
  }

}

    .overview-header{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border-bottom: 1px solid #071a29;
      padding: 10px 30px;

      .name-in{
        background-color: orange;
        padding: 10px;
        border-radius: 710px;
        text-align: center;
        font-weight: 500;
        box-shadow: 0px 0px 8px #071a29;
      }
    }
    .overview-content{
      padding: 10px;
      padding-bottom: 0px;
      margin-bottom: 0;

      .partB{
        display:flex;
        justify-content: space-between;
        gap: 3px;

        .profile-tile{
          border: 1px solid #071a293f;
          width: 23%;
          padding: 10px;
          border-radius: 10px;
          font-size: 12px;
          box-shadow: #0c2f4af7;
        }
      }
      .partC{
        display: flex;
        justify-content: space-between;
        padding-top: 20px;

        table{
          border: 1px solid #071a293f;
          background-color: #071a291f;
          border-radius: 12px;
          overflow:hidden;
          box-shadow: 0px 0px 7px #071a291f;


          td{
            padding: 15px, 20px;
          }

          .notiv{
            display: flex;
            gap: 25px;
            width: 100%;
            padding: 10px 20px;
          }
        }

        .t1{
          width: 700px;
          min-width: 100%;

          a{
            text-decoration: none;
            color: orange;
          }
        }
        .t2{
          a{
            text-decoration: none;
            color: orange;
          }
        }
      }
    }

    .profile-tile{
      background-color: #fdfeff;
      span{
        color: green;
        font-weight: bold;
      }
    }

    .nav-footer{
      .name-i{
          display: flex;
          flex-direction: row;
          padding: 0px, 5px;
          gap: 10px;
      }
      h4{
        height: 40px;
        width: 45px;
        text-align: center;
        border-radius: 50%;
        font-size: larger;
        font-weight: bold;
        background-color: orange;
        padding-top: 8px;
      }
      .profile-name{
        display: flex;
        flex-direction: column;
        p{
          font-size: larger;
          font-weight: bolder;
          padding: 0px;
          color: #d2efff;
        }
        span{
          padding: 0px;
          font-weight: light;
          color:#d2efff;
        }
      }
      
    }

    .app-section{
      display: flex;
      padding: 10px 30px;

      .nav .nav-item .nav-link{
        color: #01101c;
      }
      .nav .nav-item .nav-link.active{
        background-color: #01101c;
        color: #d2efff;
      }

      table{
          border: 1px solid #071a293f;
          background-color: #071a291f;
          border-radius: 12px;
          overflow:hidden;
          box-shadow: 0px 0px 7px #071a291f;
      }

    }

    .view-all-link,
    .mark-all-link,
    .mark-read-btn,
    .reply-btn,
    .save-toggle {
      border: none;
      background: none;
      color: #1486c3;
      font-weight: 600;
      padding: 0;
      cursor: pointer;
    }

    .mark-read-btn,
    .reply-btn,
    .save-toggle {
      border: 1px solid #1486c3;
      border-radius: 999px;
      padding: 6px 12px;
      background-color: #f7fbff;
      margin-top: 8px;
    }

    .save-toggle.saved {
      background-color: #1486c3;
      color: #fff;
    }

    .message-layout {
      gap: 20px;
      width: 100%;
    }

    .message-preview {
      flex: 1;
      background: #f7fbff;
      border: 1px solid #d2efff;
      border-radius: 16px;
      padding: 20px;
    }

    .message-subject {
      color: #1486c3;
      font-weight: 600;
    }

    .message-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 16px;
    }

    .reply-status {
      margin-top: 12px;
      color: #1486c3;
      font-weight: 600;
    }

    .part2 li {
      cursor: pointer;
      transition: transform 0.2s ease, background-color 0.2s ease;
    }

    .part2 li.selected {
      background-color: #1486c3;
      color: #fff;
      transform: translateY(-2px);
    }

    .positive {
      color: #1486c3;
    }

    .neutral {
      color: #6b7280;
    }

    .savedjob-section{
      padding: 10px 30px;

      .savedjobs-content{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 20px;
      }
      .savedjob-tiles{
        width: 49%;
        border: 1px solid #01101c22;
        padding: 10px 20px;
        border-radius: 20px;
        box-shadow: 0px 0px 1px;

        .company-initials{
          background-color: #d2efff;
          color:#071a29;
          font-weight: bold;
          font-size: larger;
          width: fit-content;
          padding: 10px;
          border-radius: 10px;
          margin: 5px;
        }

        .job-title{
          font-weight: 500;
        }
      }
    }

    .message-section{
       padding: 10px 30px;
      .messagesection-head{
        p{
          color: green;
        }
      }

       .message-btn{
        border: 1px solid #01101c4b;
        padding: 15px 10px;
        border-radius: 8px;
       }
       .message-btn .nav-link{
          color: #01101c;
          text-align: start;
          height: 70px;
          width: auto;

          h4{
            font-size: medium;
          }

          p{
            font-size: medium;
            text-wrap: nowrap;
          }
       }
       .message-btn .nav-link.active{
          background-color: #01101ccf;
          color: #d2efff;
          text-align: start;
          height: 70px;
       }
       .tab-pane{
        background-color: #d2efff;
        color:#01101c;
        width: 100%;
        height: 100%;
        padding: 20px 10px;
        border-radius: 15px;
       }
       
    }

    .profile-section{
      padding: 10px 30px;

      .profile-content{
        border: 1px solid #01101c22;
        padding: 10px 20px;
        border-radius: 20px;
        box-shadow: 0px 0px 1px;

        .part1{
          display: flex;
          gap: 10px;

          .profile-ini{
            background-color: orange;
            width: 50px;
            height: 50px;
            font-weight: bold;
            font-size: large;
            padding: 10px;
            border-radius: 50%;
            text-align: center;
          }
        }

        .part2{
          ul{
            display: flex;
            flex-direction: row;
            gap: 25px;
            list-style: none;
          }
          li{
            font-weight: light;
            font-size: small;
            padding: 4px 10px; 
            background-color: #d2efff;
            border-radius: 15px;
          }
        }
      }

    }

    .settings-section{
        padding: 10px 30px;

        .settings-body{
          width: 100%;
          border: 1px solid #01101c22;
          padding: 20px;
          padding-bottom: 0px;
          border-radius: 20px;
          box-shadow: 0px 0px 1px;

          .setting-major{
            display: flex;
            justify-content: space-between;
            padding: 5px;
            border-bottom: 1px solid #01101c22;

            h5{
              font-size: medium;
            }

            p{
              font-size: medium;
            }
          }
        }









      .switch {
        position: relative;
        display: inline-block;
        width: 47px;
        height: 20px;
      }

      /* Hide default HTML checkbox */
      .switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      /* The slider */
      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
      }

      .slider:before {
        position: absolute;
        content: "";
        height: 15px;
        width: 15px;
        left: 4px;
        bottom: 3px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
      }

      input:checked + .slider {
        background-color: orange;
      }

      input:focus + .slider {
        box-shadow: 0 0 1px orange;
      }

      input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
      }

      /* Rounded sliders */
      .slider.round {
        border-radius: 34px;
      }

      .slider.round:before {
        border-radius: 50%;
      }
    }

  * {
    box-sizing: border-box;
  }

  body {
    overflow-x: hidden;
  }

  .sectionA {
    padding-top: 90px;
    min-height: calc(100dvh - 80px);
  }

  .sectionA .d-flex {
    display: flex;
    gap: 1rem;
    width: 100%;
  }

  .navbar {
    width: 240px;
    min-width: 240px;
    height: calc(100dvh - 110px);
    position: sticky;
    top: 90px;
  }

  .page-content {
    flex: 1;
    min-width: 0;
    width: auto;
    padding: 20px 24px 40px;
  }

  .overview-content .partB {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 12px;
  }

  .overview-content .partC {
    display: grid;
    grid-template-columns: 1.3fr 1fr;
    gap: 20px;
  }

  .savedjob-tiles {
    width: calc(50% - 10px);
    min-width: 240px;
  }

  .message-layout {
    display: flex;
    flex-wrap: wrap;
  }

  .message-preview {
    flex: 1;
    min-width: 0;
  }

  .profile-section .profile-content .part2 ul,
  .profile-section .profile-content .part1 {
    flex-wrap: wrap;
  }

  @media (max-width: 1100px) {
    .overview-content .partB {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .overview-content .partC {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .sectionA {
      padding-top: 70px;
    }

    .sectionA .d-flex {
      flex-direction: column;
    }

    .navbar {
      position: relative;
      top: 0;
      width: 100%;
      min-width: 100%;
      height: auto;
      border-radius: 0 0 20px 20px;
    }

    .navbar .navbarplate {
      flex-direction: row;
      flex-wrap: wrap;
    }

    .navbar button {
      width: 100%;
      max-width: none;
    }

    .page-content {
      padding: 16px;
    }

    .overview-content .partB {
      grid-template-columns: 1fr;
    }

    .savedjob-tiles {
      width: 100%;
    }

    .message-layout {
      flex-direction: column;
    }

    .settings-section .settings-body .setting-major {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  @media (max-width: 480px) {
    .page-content {
      padding: 12px;
    }

    .overview-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .message-preview,
    .savedjob-tiles,
    .profile-section .profile-content {
      padding: 12px;
    }
  }

</style>
