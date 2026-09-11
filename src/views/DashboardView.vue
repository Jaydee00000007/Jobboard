<template>
  <div class="homepage">
    <HeaderB class="header" />
    <div class="sectionA">
      <div class="d-flex align-items-start">
        <div class="navbar">
          <div
            class="nav flex-column nav-pills me-3 navbarplate"
            role="tablist"
            aria-orientation="vertical"
          >
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
                <div class="name-in">
                  <h3>{{ profileInitials }}</h3>
                </div>
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
                          <button
                            type="button"
                            class="view-all-link"
                            @click="setActiveTab('messages')"
                          >
                            View all
                          </button>
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
                          <button
                            type="button"
                            class="mark-all-link"
                            @click="markAllNotificationsRead"
                          >
                            {{ allNotificationsRead ? 'All read' : 'Mark all read' }}
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="notification in notifications" :key="notification.id">
                        <td class="notiv" scope="row">
                          <div class="status-icon">
                            <svg
                              v-if="notification.type === 'success'"
                              xmlns="http://www.w3.org/2000/svg"
                              height="24px"
                              viewBox="0 -960 960 960"
                              width="24px"
                              fill="#75FB4C"
                            >
                              <path
                                d="M382-232.35 146.35-468l64.89-64.89L382-362.13l366.76-366.76L813.65-664 382-232.35Z"
                              />
                            </svg>
                            <svg
                              v-else
                              xmlns="http://www.w3.org/2000/svg"
                              height="24px"
                              viewBox="0 -960 960 960"
                              width="24px"
                              fill="#F19E39"
                            >
                              <path
                                d="M480-431.63 162.87-629.72v386.85H521.2v91H162.87q-37.78 0-64.39-26.61t-26.61-64.39v-474.26q0-37.78 26.61-64.39t64.39-26.61h634.26q37.78 0 64.39 26.61t26.61 64.39v285.5h-91v-198.09L480-431.63Zm0-87.17 317.13-198.33H162.87L480-518.8ZM763.59-30.91l-59.11-59.35 60.61-61.61H601.2v-84.78h163.89l-61.61-61.61 60.11-59.35 163.34 163.35L763.59-30.91ZM162.87-629.72V-189v-242.63 2.52-288.02 87.41Z"
                              />
                            </svg>
                          </div>
                          <div class="noti-message">
                            <p>{{ notification.message }}</p>
                            <span>{{ notification.time }}</span>
                          </div>
                        </td>
                        <td>
                          <button
                            type="button"
                            class="mark-read-btn"
                            @click="toggleNotificationRead(notification.id)"
                          >
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

          <div
            v-else-if="activeTab === 'applications'"
            class="tab-pane fade show active app-section"
          >
            <div class="app-head">
              <h3>Applications</h3>
              <p>{{ applications.length }} applications sent across 4 stages.</p>
            </div>
            <div class="app-content">
              <ul class="nav nav-pills mb-3" role="tablist">
                <li
                  v-for="filter in applicationFilters"
                  :key="filter.id"
                  class="nav-item"
                  role="presentation"
                >
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
                    <tr
                      v-for="application in filteredApplications"
                      :key="application.role + application.company"
                    >
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

          <div
            v-else-if="activeTab === 'savedjobs'"
            class="tab-pane fade show active savedjob-section"
          >
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
                <button
                  type="button"
                  class="save-toggle"
                  :class="{ saved: job.saved }"
                  @click="handleSavedJobToggle(job.id)"
                >
                  {{ job.saved ? 'Saved' : 'Save' }}
                </button>
              </div>
            </div>
          </div>

          <div
            v-else-if="activeTab === 'messages'"
            class="tab-pane fade show active message-section"
          >
            <div class="messagesection-head">
              <h3>Messages</h3>
              <p>{{ unreadMessageCount }} unread conversations.</p>
            </div>
            <div class="messagesection-content">
              <div class="d-flex align-items-start message-layout">
                <div
                  class="nav flex-column nav-pills me-3 message-btn"
                  role="tablist"
                  aria-orientation="vertical"
                >
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

          <div
            v-else-if="activeTab === 'profile'"
            class="tab-pane fade show active profile-section"
          >
            <div class="profile-head">
              <h3>Profile</h3>
              <p>How employers see you.</p>
            </div>
            <div class="profile-content">
              <div class="part1">
                <div class="profile-ini">AO</div>
                <div class="profile-detail">
                  <h4>{{ userProfile.name }}</h4>
                  <span class="updated-specialization"
                    >Product and visual designer · <span>{{ userProfile.location }}</span></span
                  >
                </div>
              </div>
              <div class="part2" id="specialization">
                <ul>
                  <li
                    v-for="skill in skills"
                    :key="skill.id"
                    :class="{ selected: skill.selected }"
                    @click="toggleSkill(skill.id)"
                  >
                    {{ skill.name }}
                  </li>
                </ul>
              </div>
              <div class="part3">
                <Fileupload />
              </div>
            </div>
          </div>

          <div
            v-else-if="activeTab === 'settings'"
            class="tab-pane fade show active settings-section"
          >
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
                      <input
                        v-model="settings.emailNotifications"
                        type="checkbox"
                        @change="handleSettingsUpdate"
                      />
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
                      <input
                        v-model="settings.profileVisibility"
                        type="checkbox"
                        @change="handleSettingsUpdate"
                      />
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
                      <input
                        v-model="settings.twoFactorAuth"
                        type="checkbox"
                        @change="handleSettingsUpdate"
                      />
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
    Footer,
  },
  data() {
    return {
      mainTabs: [
        { id: 'overview', label: 'Overview' },
        { id: 'applications', label: 'Applications' },
        { id: 'savedjobs', label: 'Saved jobs' },
        { id: 'messages', label: 'Messages' },
        { id: 'profile', label: 'Profile' },
        { id: 'settings', label: 'Settings' },
      ],
      jobhuntStore: null,
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
      'userProfile',
    ]),
    profileInitials() {
      return this.userProfile.initials || 'AO'
    },
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
    },
  },
}
</script>

<style>
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100%;
  overflow-x: hidden;
  background: #071a29;
  font-family: Inter, 'Segoe UI', Arial, sans-serif;
  color: #0f172a;
}

body {
  min-height: 100vh;
}

.homepage {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(20, 134, 195, 0.18), transparent 30%),
    linear-gradient(180deg, #071a29 0%, #0a1f2d 100%);
}

.blur {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.18);
  border-radius: 16px;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.sectionA {
  display: block;
  background: linear-gradient(180deg, #f8fbff 0%, #f2f7fb 100%);
  margin-top: -80px;
  min-height: calc(100vh - 80px);
  padding-top: 90px;
}

.sectionA .d-flex {
  display: flex;
  gap: 1.25rem;
  width: 100%;
  align-items: flex-start;
}

.sectionA .navbar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  position: sticky;
  top: 61px;
  width: 240px;
  min-width: 240px;
  height: calc(100vh - 110px);
  gap: 10px;
  padding: 18px 14px 18px 14px;
  margin: 0;
  background: linear-gradient(180deg, #01101c 0%, #071d2c 100%);
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 12px 0 28px rgba(2, 11, 19, 0.12);
}

.sectionA .navbar .navbarplate {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
  width: 100%;
  padding: 8px 6px;
}

.sectionA .navbar button {
  color: rgba(236, 244, 255, 0.88);
  height: 44px;
  width: 100%;
  text-align: left;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  padding: 0 14px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.sectionA .navbar button:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.08);
}

.sectionA .navbar button.active {
  background: linear-gradient(135deg, #1486c3 0%, #0f6b9d 100%);
  box-shadow: 0 10px 20px rgba(20, 134, 195, 0.28);
}

.sectionA .page-content {
  flex: 1;
  min-width: 0;
  width: auto;
  background: transparent;
  height: 100%;
  padding: 22px 24px 40px;
}

.overview-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(7, 26, 41, 0.12);
  padding: 12px 20px 18px;
  margin-bottom: 18px;
}

.overview-header h2 {
  margin: 0;
  font-size: clamp(1.5rem, 2vw, 2rem);
  color: #0b1f2b;
}

.overview-header .name-in {
  background: linear-gradient(135deg, #ffc857 0%, #ff9f1c 100%);
  padding:1px 4px;
  height: 56px;
  margin: 0;
  border-radius: 50px;
  text-align: center;
  font-weight: 700;
  box-shadow: 0 10px 24px rgba(255, 159, 28, 0.28);
  min-width: 54px;
  color: #101828;
}

.overview-content {
  padding: 0 6px;
}

.partA {
  margin-bottom: 18px;
}

.partA h3 {
  margin: 0 0 6px;
  font-size: 1.8rem;
  color: #071a29;
}

.partA p {
  margin: 0;
  color: rgba(15, 23, 42, 0.72);
}

.overview-content .partB {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.overview-content .partB .profile-tile {
  flex: 1 1 22%;
  min-width: 150px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  padding: 18px 16px;
  border-radius: 18px;
  font-size: 12px;
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.04);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(242, 247, 251, 0.95) 100%);
}

.overview-content .partB .profile-tile p {
  margin: 0 0 10px;
  color: rgba(15, 23, 42, 0.72);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.overview-content .partB .profile-tile h2 {
  margin: 0 0 8px;
  font-size: clamp(1.4rem, 2vw, 2rem);
  color: #071a29;
}

.profile-tile span {
  color: #127a5d;
  font-weight: 700;
}

.overview-content .partC {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 20px;
}

.overview-content .partC > div {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 18px;
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.04);
  overflow: hidden;
}

.overview-content .partC table {
  width: 100%;
  border: none;
  background: transparent;
  border-collapse: collapse;
}

.overview-content .partC thead th {
  font-size: 0.74rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(15, 23, 42, 0.62);
  padding: 14px 16px 10px;
  background: rgba(15, 23, 42, 0.02);
}

.overview-content .partC tbody td {
  padding: 14px 16px;
  border-top: 1px solid rgba(15, 23, 42, 0.06);
  color: #0f172a;
  font-size: 0.94rem;
}

.overview-content .partC .notiv {
  display: flex;
  gap: 14px;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
}

.status-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: rgba(20, 134, 195, 0.08);
}

.t1 {
  width: 100%;
  min-width: 100%;
}

.t1 a,
.t2 a {
  text-decoration: none;
  color: orange;
}

.nav-footer .name-i {
  display: flex;
  flex-direction: row;
  padding: 0 5px;
  gap: 10px;
  align-items: center;
}

.nav-footer h4 {
  height: 42px;
  width: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 1rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ffc857 0%, #ff9f1c 100%);
  color: #01101c;
  margin: 0;
  box-shadow: 0 10px 18px rgba(255, 159, 28, 0.28);
}

.nav-footer .profile-name {
  display: flex;
  flex-direction: column;
}

.nav-footer .profile-name p {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: #d2efff;
}

.nav-footer .profile-name span {
  margin: 0;
  font-weight: 300;
  color: #d2efff;
}

.app-section {
  display: flex;
  flex-direction: column;
  padding: 10px 30px;
}

.app-section .nav .nav-item .nav-link {
  color: #01101c;
  border-radius: 999px;
  padding: 8px 14px;
}

.app-section .nav .nav-item .nav-link.active {
  background: linear-gradient(135deg, #01101c 0%, #0c2236 100%);
  color: #d2efff;
  box-shadow: 0 12px 22px rgba(5, 25, 34, 0.18);
}

.app-section table {
  border: 1px solid rgba(7, 26, 41, 0.08);
  background: rgba(255, 255, 255, 0.7);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.04);
}

.view-all-link,
.mark-all-link,
.mark-read-btn,
.reply-btn,
.save-toggle {
  border: none;
  background: none;
  color: #1486c3;
  font-weight: 700;
  padding: 0;
  cursor: pointer;
}

.mark-read-btn,
.reply-btn,
.save-toggle {
  border: 1px solid rgba(20, 134, 195, 0.28);
  border-radius: 999px;
  padding: 7px 14px;
  background: linear-gradient(180deg, #f9fcff 0%, #eef7ff 100%);
  margin-top: 8px;
  transition: all 0.2s ease;
}

.mark-read-btn:hover,
.reply-btn:hover,
.save-toggle:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 16px rgba(20, 134, 195, 0.12);
}

.save-toggle.saved {
  background: linear-gradient(135deg, #1486c3 0%, #0c6da2 100%);
  color: #ffffff;
}

.message-layout {
  display: flex;
  gap: 18px;
  width: 100%;
  flex-wrap: wrap;
}

.message-preview {
  flex: 1;
  min-width: 0;
  background: linear-gradient(180deg, #f9fcff 0%, #edf6ff 100%);
  border: 1px solid rgba(20, 134, 195, 0.12);
  border-radius: 18px;
  padding: 22px;
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.04);
}

.message-preview h4 {
  margin: 0 0 8px;
}

.message-subject {
  color: #1486c3;
  font-weight: 700;
  margin: 0 0 12px;
}

.message-body {
  color: rgba(15, 23, 42, 0.8);
  line-height: 1.6;
}

.message-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
  color: rgba(15, 23, 42, 0.7);
}

.reply-status {
  margin-top: 12px;
  color: #127a5d;
  font-weight: 700;
}

.part2 li {
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease,
    box-shadow 0.2s ease;
}

.part2 li.selected {
  background: linear-gradient(135deg, #1486c3 0%, #0f6b9d 100%);
  color: #ffffff;
  box-shadow: 0 10px 20px rgba(20, 134, 195, 0.2);
  transform: translateY(-2px);
}

.positive {
  color: #1486c3;
}

.neutral {
  color: #6b7280;
}

.savedjob-section {
  padding: 10px 30px;
}

.savedjobs-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}

.savedjob-tiles {
  width: calc(50% - 10px);
  min-width: 240px;
  border: 1px solid rgba(7, 26, 41, 0.08);
  padding: 18px 18px 16px;
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(242, 247, 251, 0.96) 100%);
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.04);
}

.company-initials {
  background: linear-gradient(135deg, #d2efff 0%, #b9dffd 100%);
  color: #071a29;
  font-weight: 800;
  font-size: 1.05rem;
  width: fit-content;
  padding: 12px 14px;
  border-radius: 12px;
  margin-bottom: 12px;
}

.job-title {
  font-weight: 700;
  color: #071a29;
  margin-bottom: 8px;
}

.job-location,
.job-pay {
  color: rgba(15, 23, 42, 0.7);
  margin-bottom: 8px;
}

.message-section {
  padding: 10px 30px;
}

.messagesection-head p {
  color: #127a5d;
  font-weight: 600;
}

.message-btn {
  border: 1px solid rgba(1, 16, 28, 0.12);
  padding: 14px 10px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.6);
}

.message-btn .nav-link {
  color: #01101c;
  text-align: start;
  height: 78px;
  width: auto;
  border-radius: 12px;
  padding: 10px 12px;
  background: transparent;
}

.message-btn .nav-link h4 {
  font-size: medium;
  margin: 0 0 4px;
}

.message-btn .nav-link p {
  font-size: medium;
  text-wrap: nowrap;
  margin: 0;
}

.message-btn .nav-link.active {
  background: linear-gradient(135deg, #01101c 0%, #0c2236 100%);
  color: #d2efff;
  text-align: start;
  height: 78px;
}

.tab-pane {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(228, 239, 250, 0.9) 100%);
  color: #01101c;
  width: 100%;
  height: 100%;
  padding: 20px 18px;
  border-radius: 18px;
  border: 1px solid rgba(7, 26, 41, 0.06);
  box-shadow: 0 16px 30px rgba(15, 23, 42, 0.03);
}

.profile-section {
  padding: 10px 30px;
}

.profile-section .profile-content {
  border: 1px solid rgba(7, 26, 41, 0.08);
  padding: 18px 20px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.04);
}

.profile-section .profile-content .part1 {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 18px;
}

.profile-section .profile-content .profile-ini {
  background: linear-gradient(135deg, #ffc857 0%, #ff9f1c 100%);
  width: 56px;
  height: 56px;
  font-weight: 800;
  font-size: 1.1rem;
  border-radius: 50%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 22px rgba(255, 159, 28, 0.25);
}

.profile-section .profile-content .profile-detail h4 {
  margin: 0 0 6px;
}

.profile-section .profile-content .updated-specialization {
  color: rgba(15, 23, 42, 0.7);
}

.profile-section .profile-content .part2 ul {
  display: flex;
  flex-direction: row;
  gap: 14px;
  list-style: none;
  flex-wrap: wrap;
  padding-left: 0;
  margin: 18px 0;
}

.profile-section .profile-content .part2 li {
  font-weight: 600;
  font-size: 0.8rem;
  padding: 8px 14px;
  background: linear-gradient(180deg, #edf7ff 0%, #dfeefb 100%);
  border-radius: 999px;
  color: #0f172a;
}

.settings-section {
  padding: 10px 30px;
}

.settings-body {
  width: 100%;
  border: 1px solid rgba(7, 26, 41, 0.08);
  padding: 18px 20px 0;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.04);
}

.setting-major {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid rgba(7, 26, 41, 0.08);
}

.setting-major:last-child {
  border-bottom: none;
}

.setting-major h5 {
  font-size: 1rem;
  margin: 0 0 4px;
}

.setting-major p {
  font-size: 0.92rem;
  margin: 0;
  color: rgba(15, 23, 42, 0.68);
}

.switch {
  position: relative;
  display: inline-block;
  width: 47px;
  height: 22px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #d5dfe8;
  transition: 0.3s ease;
  border-radius: 999px;
}

.slider:before {
  position: absolute;
  content: '';
  height: 16px;
  width: 16px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s ease;
  border-radius: 50%;
}

input:checked + .slider {
  background: linear-gradient(135deg, #ffb74d 0%, #ff9f1c 100%);
}

input:focus + .slider {
  box-shadow: 0 0 0 3px rgba(255, 159, 28, 0.18);
}

input:checked + .slider:before {
  transform: translateX(24px);
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

  .sectionA .navbar {
    position: relative;
    top: 0;
    width: 100%;
    min-width: 100%;
    height: auto;
    border-radius: 0 0 20px 20px;
  }

  .sectionA .navbar .navbarplate {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .sectionA .navbar button {
    width: 100%;
    max-width: none;
  }

  .sectionA .page-content {
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

  .setting-major {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .sectionA .page-content {
    padding: 12px;
  }

  .overview-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .message-preview,
  .savedjob-tiles,
  .profile-section .profile-content {
    padding: 12px;
  }
}
</style>
