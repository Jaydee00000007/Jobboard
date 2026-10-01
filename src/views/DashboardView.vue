<template>
  <div class="dashboard">
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
              <h4>{{ profileInitials }}</h4>
              <div class="profile-name">
                <p>{{ userProfile.name }}</p>
                <span class="job-status">{{ userProfile.role }}</span>
              </div>
              <div class="signout">
                <button type="button" class="sign-out-btn" @click="signOut">Sign out</button>
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
                <h3>Welcome back, {{ userProfile.name.split(' ')[0] }}</h3>
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
                        <th colspan="3">Recent applications</th>
                        <th>
                          <button
                            type="button"
                            class="view-all-link"
                            @click="setActiveTab('applications')"
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
                        <td scope="row" data-label="Role">{{ application.role }}</td>
                        <td data-label="Company">{{ application.company }}</td>
                        <td data-label="Status">{{ application.status }}</td>
                        <td data-label="Applied">{{ application.date }}</td>
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
                    <tbody v-if="notifications.length">
                      <tr v-for="notification in paginatedNotifications" :key="notification.id">
                        <td class="notiv" scope="row">
                          <div class="status-icon">
                            <svg
                              v-if="notification.type === 'success'"
                              xmlns="http://www.w3.org/2000/svg"
                              height="18px"
                              viewBox="0 -960 960 960"
                              width="18px"
                              fill="#75FB4C"
                            >
                              <path
                                d="M382-232.35 146.35-468l64.89-64.89L382-362.13l366.76-366.76L813.65-664 382-232.35Z"
                              />
                            </svg>
                            <svg
                              v-else
                              xmlns="http://www.w3.org/2000/svg"
                              height="18px"
                              viewBox="0 -960 960 960"
                              width="18px"
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
                    <tbody v-else>
                      <tr>
                        <td colspan="2" class="empty-notifications">
                          <div class="empty-notifications-state" role="status">
                            <span class="empty-notifications-icon" aria-hidden="true">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="22"
                                height="22"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.8"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              >
                                <rect x="3" y="5" width="18" height="14" rx="2" />
                                <path d="m3 7 9 6 9-6" />
                              </svg>
                            </span>
                            <span>No messages available.</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <nav
                    v-if="notificationPageCount > 1"
                    class="dashboard-pagination notification-pagination"
                    aria-label="Notification pages"
                  >
                    <button
                      type="button"
                      :disabled="currentNotificationPage === 1"
                      @click="previousNotificationsPage"
                    >
                      Previous
                    </button>
                    <span>Page {{ currentNotificationPage }} of {{ notificationPageCount }}</span>
                    <button
                      type="button"
                      :disabled="currentNotificationPage === notificationPageCount"
                      @click="nextNotificationsPage"
                    >
                      Next
                    </button>
                  </nav>
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
              <p>{{ applications.length }} applications sent.</p>
            </div>
            <div class="app-content">
              <ul class="application-filters" aria-label="Filter applications">
                <li v-for="filter in applicationFilters" :key="filter.id">
                  <button
                    class="application-filter"
                    :class="{ active: activeApplicationFilter === filter.id }"
                    type="button"
                    :aria-pressed="activeApplicationFilter === filter.id"
                    @click="toggleApplicationFilter(filter.id)"
                  >
                    {{ filter.label }} <span class="filter-count">{{ filter.count }}</span>
                  </button>
                </li>
              </ul>
              <div class="applications-table-wrap">
                <table class="applications-table">
                  <thead>
                    <tr>
                      <th scope="col">Role</th>
                      <th scope="col">Company</th>
                      <th scope="col">Status</th>
                      <th scope="col">Applied</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="application in paginatedApplications"
                      :key="application.role + application.company"
                    >
                      <td scope="row">{{ application.role }}</td>
                      <td>{{ application.company }}</td>
                      <td>
                        <span
                          class="application-status"
                          :class="`status-${application.status.toLowerCase().replaceAll(' ', '-')}`"
                        >
                          {{ application.status }}
                        </span>
                      </td>
                      <td class="application-date">{{ application.date }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <nav
                v-if="applicationPageCount > 1"
                class="dashboard-pagination"
                aria-label="Application results pages"
              >
                <button
                  type="button"
                  :disabled="currentApplicationPage === 1"
                  @click="previousApplicationsPage"
                >
                  Previous
                </button>
                <span>Page {{ currentApplicationPage }} of {{ applicationPageCount }}</span>
                <button
                  type="button"
                  :disabled="currentApplicationPage === applicationPageCount"
                  @click="nextApplicationsPage"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>

          <div
            v-else-if="activeTab === 'savedjobs'"
            class="tab-pane fade show active savedjob-section"
          >
            <div class="savedjobs-head">
              <h3>Saved jobs</h3>
              <p>{{ savedJobs.length }} roles saved for later.</p>
            </div>
            <div v-if="savedJobs.length" class="savedjobs-content">
              <div v-for="job in paginatedSavedJobs" :key="job.id" class="savedjob-tiles">
                <div class="company-initials">{{ job.initials }}</div>
                <div class="job-title">{{ job.title }}</div>
                <div class="job-location">{{ job.location }}</div>
                <div class="job-pay">{{ job.pay }}</div>
                <button type="button" class="save-toggle" @click="handleSavedJobRemove(job.id)">
                  Remove
                </button>
              </div>
            </div>
            <nav
              v-if="savedJobPageCount > 1"
              class="dashboard-pagination"
              aria-label="Saved job results pages"
            >
              <button
                type="button"
                :disabled="currentSavedJobsPage === 1"
                @click="previousSavedJobsPage"
              >
                Previous
              </button>
              <span>Page {{ currentSavedJobsPage }} of {{ savedJobPageCount }}</span>
              <button
                type="button"
                :disabled="currentSavedJobsPage === savedJobPageCount"
                @click="nextSavedJobsPage"
              >
                Next
              </button>
            </nav>
            <p v-if="!savedJobs.length" class="savedjobs-empty">No saved jobs yet.</p>
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
                    <div class="reply-section">
                      <textarea
                        class="reply-input"
                        v-model="selectedMessage.reply"
                        type="text"
                        placeholder="Type your reply..."
                      >
                      </textarea>
                      <button type="button" class="reply-btn" @click="replyToMessage">Reply</button>
                    </div>
                    <p v-if="replyStatus" class="reply-status">{{ replyStatus }}</p>
                  </div>
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
              <div class="profile-read-view">
                <div class="profile-summary">
                  <div class="profile-ini">{{ profileInitials }}</div>
                  <div class="profile-summary-copy">
                    <h4>{{ userProfile.name || 'Your name' }}</h4>
                    <p>{{ userProfile.role || 'Add your target role' }}</p>
                  </div>
                  <button type="button" class="profile-edit-button" @click="startProfileEdit">
                    Edit profile
                  </button>
                </div>

                <dl class="profile-details">
                  <div class="profile-detail-item">
                    <dt>Email</dt>
                    <dd>{{ userProfile.email || 'Not added yet' }}</dd>
                  </div>
                  <div class="profile-detail-item">
                    <dt>Location</dt>
                    <dd>{{ userProfile.location || 'Not added yet' }}</dd>
                  </div>
                  <div class="profile-detail-item">
                    <dt>Phone</dt>
                    <dd>{{ userProfile.phoneNumber || 'Not added yet' }}</dd>
                  </div>
                  <div class="profile-detail-item">
                    <dt>Date of birth</dt>
                    <dd>{{ userProfile.birthDate || 'Not added yet' }}</dd>
                  </div>
                  <div class="profile-detail-item">
                    <dt>LinkedIn</dt>
                    <dd>
                      <a
                        v-if="userProfile.linkedinUrl"
                        :href="userProfile.linkedinUrl"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {{ userProfile.linkedinUrl }}
                      </a>
                      <span v-else>Not added yet</span>
                    </dd>
                  </div>
                  <div class="profile-detail-item">
                    <dt>Resume</dt>
                    <dd>{{ userProfile.resumeName || 'No resume selected' }}</dd>
                  </div>
                  <div class="profile-detail-item profile-about-item">
                    <dt>About</dt>
                    <dd>{{ userProfile.about || 'Add a short introduction about yourself.' }}</dd>
                  </div>
                </dl>

                <section class="profile-skills" aria-labelledby="profile-skills-title">
                  <h4 id="profile-skills-title">Skills</h4>
                  <ul v-if="selectedSkills.length">
                    <li v-for="skill in selectedSkills" :key="skill.id">{{ skill.name }}</li>
                  </ul>
                  <p v-else>No skills added yet.</p>
                </section>
              </div>

              <dialog
                ref="profileEditDialog"
                class="profile-edit-dialog"
                aria-labelledby="profile-edit-title"
                @cancel.prevent="cancelProfileEdit"
                @close="resetProfileEditDraft"
              >
                <form
                  class="profile-edit-form"
                  @submit.prevent="saveProfile"
                  @keydown.esc.prevent="cancelProfileEdit"
                >
                  <div class="profile-form-heading">
                    <div>
                      <h4 id="profile-edit-title">Edit profile</h4>
                      <p>Update the details shown to employers.</p>
                    </div>
                    <button type="button" class="profile-cancel-button" @click="cancelProfileEdit">
                      Cancel
                    </button>
                  </div>

                  <div class="profile-form-grid">
                    <label class="profile-field">
                      <span>Full name</span>
                      <input
                        v-model.trim="profileDraft.name"
                        type="text"
                        autocomplete="name"
                        required
                      />
                    </label>
                    <label class="profile-field">
                      <span>Email</span>
                      <input
                        :value="userProfile.email"
                        type="email"
                        autocomplete="email"
                        readonly
                      />
                    </label>
                    <div class="profile-field-group">
                      <label class="profile-field">
                        <span>Target role</span>
                        <input
                          v-model.trim="profileDraft.role"
                          type="text"
                          autocomplete="organization-title"
                        />
                      </label>
                      <div class="profile-suggestions" aria-label="Suggested target roles">
                        <button
                          v-for="role in roleSuggestions"
                          :key="role"
                          type="button"
                          class="profile-suggestion"
                          :class="{ selected: profileDraft.role === role }"
                          @click="profileDraft.role = role"
                        >
                          {{ role }}
                        </button>
                      </div>
                    </div>
                    <label class="profile-field">
                      <span>Location</span>
                      <input
                        v-model.trim="profileDraft.location"
                        type="text"
                        autocomplete="address-level2"
                      />
                    </label>
                    <label class="profile-field">
                      <span>Phone</span>
                      <input
                        v-model.trim="profileDraft.phoneNumber"
                        type="tel"
                        autocomplete="tel"
                      />
                    </label>
                    <label class="profile-field">
                      <span>Date of birth</span>
                      <input v-model="profileDraft.birthDate" type="date" />
                    </label>
                    <label class="profile-field profile-field-wide">
                      <span>LinkedIn profile URL</span>
                      <input
                        v-model.trim="profileDraft.linkedinUrl"
                        type="url"
                        autocomplete="url"
                        placeholder="https://www.linkedin.com/in/your-name"
                      />
                    </label>
                    <label class="profile-field profile-field-wide">
                      <span>About</span>
                      <textarea
                        v-model.trim="profileDraft.about"
                        rows="4"
                        maxlength="600"
                      ></textarea>
                    </label>
                    <div class="profile-field-group profile-field-wide">
                      <label class="profile-field">
                        <span>Skills, separated by commas</span>
                        <input
                          v-model="profileSkillsDraft"
                          type="text"
                          placeholder="Product design, Figma, Research"
                        />
                      </label>
                      <div class="profile-suggestions" aria-label="Suggested skills">
                        <button
                          v-for="skill in profileSkillSuggestions"
                          :key="skill"
                          type="button"
                          class="profile-suggestion"
                          :class="{ selected: selectedProfileSkillNames.has(skill.toLowerCase()) }"
                          @click="toggleProfileSkillSuggestion(skill)"
                        >
                          {{ skill }}
                        </button>
                      </div>
                    </div>
                    <label class="profile-field profile-field-wide">
                      <span>Resume</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        @change="handleResumeFileChange"
                      />
                      <small>{{ profileDraft.resumeName || 'No resume selected' }}</small>
                    </label>
                  </div>

                  <div class="profile-form-actions">
                    <button type="submit" class="profile-save-button">Save profile</button>
                  </div>
                </form>
              </dialog>
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
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import HeaderB from '../components/HeaderB.vue'
import { jobs } from '../data/jobs'
import { useJobhuntStore } from '../stores/jobhunt'
import type { UserProfile } from '../types/store'

const store = useJobhuntStore()
const router = useRouter()

type DashboardTab = 'overview' | 'applications' | 'savedjobs' | 'messages' | 'profile' | 'settings'

const mainTabs: { id: DashboardTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'applications', label: 'Applications' },
  { id: 'savedjobs', label: 'Saved jobs' },
  { id: 'messages', label: 'Messages' },
  { id: 'profile', label: 'Profile' },
  { id: 'settings', label: 'Settings' },
]

const activeTab = computed(() => store.activeTab as DashboardTab)
const activeApplicationFilter = computed(() => store.activeApplicationFilter)
const currentApplicationPage = ref(1)
const currentSavedJobsPage = ref(1)
const currentNotificationPage = ref(1)
const profileEditDialog = ref<HTMLDialogElement | null>(null)
const profileDraft = ref<UserProfile>({ ...store.userProfile })
const profileSkillsDraft = ref('')
const profileSkillSuggestions = [
  'UX design',
  'Figma',
  'User research',
  'Product strategy',
  'Data analysis',
  'Quality assurance',
  'Cloud infrastructure',
  'Cybersecurity',
]
const applicationsPerPage = 4
const savedJobsPerPage = 4
const notificationsPerPage = 2
const activeMessageId = computed(() => store.activeMessageId)
const replyStatus = computed(() => store.replyStatus)
const applications = computed(() => store.applications)
const savedJobs = computed(() => store.savedJobs.filter((job) => job.saved))
const inboxMessages = computed(() => store.inboxMessages)
const notifications = computed(() => store.notifications)
const settings = computed(() => store.settings)
const skills = computed(() => store.skills)
const selectedSkills = computed(() => skills.value.filter((skill) => skill.selected))
const roleSuggestions = computed(() => [...new Set(jobs.map((job) => job.title))].slice(0, 6))
const selectedProfileSkillNames = computed(
  () => new Set(profileSkillsDraft.value.split(',').map((name) => name.trim().toLowerCase())),
)
const overviewStats = computed(() => store.overviewStats)
const recentApplications = computed(() => store.recentApplications)
const applicationFilters = computed(
  () =>
    store.applicationFilters as Array<{
      id: 'all' | 'applied' | 'interview' | 'under-review' | 'offer' | 'not-selected'
      label: string
      count: number
    }>,
)
const filteredApplications = computed(() => store.filteredApplications)
const applicationPageCount = computed(() =>
  Math.max(1, Math.ceil(filteredApplications.value.length / applicationsPerPage)),
)
const paginatedApplications = computed(() => {
  const start = (currentApplicationPage.value - 1) * applicationsPerPage
  return filteredApplications.value.slice(start, start + applicationsPerPage)
})
const savedJobPageCount = computed(() =>
  Math.max(1, Math.ceil(savedJobs.value.length / savedJobsPerPage)),
)
const paginatedSavedJobs = computed(() => {
  const start = (currentSavedJobsPage.value - 1) * savedJobsPerPage
  return savedJobs.value.slice(start, start + savedJobsPerPage)
})
const notificationPageCount = computed(() =>
  Math.max(1, Math.ceil(notifications.value.length / notificationsPerPage)),
)
const paginatedNotifications = computed(() => {
  const start = (currentNotificationPage.value - 1) * notificationsPerPage
  return notifications.value.slice(start, start + notificationsPerPage)
})
const selectedMessage = computed(() => store.selectedMessage)
const unreadMessageCount = computed(() => store.unreadMessageCount)
const allNotificationsRead = computed(() => store.allNotificationsRead)
const userProfile = computed(() => store.userProfile)
const profileInitials = computed(() => userProfile.value.initials || 'AO')

watch(applicationPageCount, (pageCount) => {
  if (currentApplicationPage.value > pageCount) currentApplicationPage.value = pageCount
})
watch(savedJobPageCount, (pageCount) => {
  if (currentSavedJobsPage.value > pageCount) currentSavedJobsPage.value = pageCount
})
watch(notificationPageCount, (pageCount) => {
  if (currentNotificationPage.value > pageCount) currentNotificationPage.value = pageCount
})

function setActiveTab(tab: DashboardTab) {
  store.setActiveTab(tab)
}
function handleTabSelect(tab: DashboardTab) {
  setActiveTab(tab)
}
function handleSavedJobRemove(jobId: number) {
  store.removeSavedJob(jobId)
}
function handleSettingsUpdate() {
  store.updateSettings(settings.value)
}
function startProfileEdit() {
  profileDraft.value = { ...userProfile.value }
  profileSkillsDraft.value = selectedSkills.value.map((skill) => skill.name).join(', ')
  profileEditDialog.value?.showModal()
}
function cancelProfileEdit() {
  profileEditDialog.value?.close()
}
function resetProfileEditDraft() {
  profileDraft.value = { ...userProfile.value }
  profileSkillsDraft.value = selectedSkills.value.map((skill) => skill.name).join(', ')
}
function toggleProfileSkillSuggestion(skill: string) {
  const names = profileSkillsDraft.value
    .split(',')
    .map((name) => name.trim())
    .filter(Boolean)
  const selectedIndex = names.findIndex((name) => name.toLowerCase() === skill.toLowerCase())

  if (selectedIndex >= 0) names.splice(selectedIndex, 1)
  else names.push(skill)

  profileSkillsDraft.value = names.join(', ')
}
function handleResumeFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) profileDraft.value.resumeName = file.name
}
function saveProfile() {
  const skillNames = profileSkillsDraft.value
    .split(',')
    .map((name) => name.trim())
    .filter(Boolean)
  store.updateUserProfile({
    ...profileDraft.value,
    name: profileDraft.value.name.trim(),
    role: profileDraft.value.role.trim(),
    location: profileDraft.value.location.trim(),
    phoneNumber: profileDraft.value.phoneNumber.trim(),
    about: profileDraft.value.about.trim(),
    linkedinUrl: profileDraft.value.linkedinUrl.trim(),
    skill: skillNames.join(', '),
  })
  store.updateProfileSkills(skillNames)
  profileEditDialog.value?.close()
}
function toggleApplicationFilter(
  filter: 'all' | 'applied' | 'interview' | 'under-review' | 'offer' | 'not-selected',
) {
  currentApplicationPage.value = 1
  store.toggleApplicationFilter(filter)
}
function previousApplicationsPage() {
  if (currentApplicationPage.value > 1) currentApplicationPage.value -= 1
}
function nextApplicationsPage() {
  if (currentApplicationPage.value < applicationPageCount.value) {
    currentApplicationPage.value += 1
  }
}
function previousSavedJobsPage() {
  if (currentSavedJobsPage.value > 1) currentSavedJobsPage.value -= 1
}
function nextSavedJobsPage() {
  if (currentSavedJobsPage.value < savedJobPageCount.value) {
    currentSavedJobsPage.value += 1
  }
}
function previousNotificationsPage() {
  if (currentNotificationPage.value > 1) currentNotificationPage.value -= 1
}
function nextNotificationsPage() {
  if (currentNotificationPage.value < notificationPageCount.value) {
    currentNotificationPage.value += 1
  }
}
function toggleNotificationRead(id: number) {
  store.toggleNotificationRead(id)
}
function markAllNotificationsRead() {
  store.markAllNotificationsRead()
}
function replyToMessage() {
  store.replyToMessage()
}
function selectMessage(id: number) {
  store.selectMessage(id)
}
function signOut() {
  store.signOut()
  router.replace({ name: 'home' })
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
  background: #071a29;
  font-family: Inter, 'Segoe UI', Arial, sans-serif;
  color: #0f172a;
}

body {
  min-height: 100vh;
}

.dashbord {
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
  padding-top: 80px;
}

.sectionA > .d-flex {
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
  position: relative;
  top: 0;
  width: 240px;
  min-width: 240px;
  height: calc(100vh - 64px);
  height: calc(100dvh - 64px);
  height: 100%;
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
  min-height: calc(100vh - 110px);
  padding: 5px 24px 40px;
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
  padding: 1px 4px;
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

.overview-content .partC2 {
  align-self: start;
}

.overview-content .partC1 {
  align-self: start;
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

.overview-content .partC1 tbody td {
  padding-top: 13px;
  padding-bottom: 13px;
}

.overview-content .partC tbody td.empty-notifications {
  padding: 20px 16px;
  text-align: center;
  background: rgba(20, 134, 105, 0.035);
}

.empty-notifications-state {
  display: flex;
  min-height: 92px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: rgba(15, 23, 42, 0.68);
  font-size: 0.9rem;
  font-weight: 600;
}

.empty-notifications-icon {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border: 1px solid rgba(20, 134, 105, 0.12);
  border-radius: 12px;
  background: rgba(20, 134, 105, 0.08);
  color: #148669;
}

.overview-content .partC .notiv {
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  padding: 10px 14px;
}

.status-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 30px;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  background: rgba(20, 134, 195, 0.08);
}

.status-icon svg {
  width: 18px;
  height: 18px;
}

.noti-message {
  min-width: 0;
}

.noti-message p {
  margin: 0 0 3px;
  font-size: 0.82rem;
  line-height: 1.35;
}

.noti-message span {
  font-size: 0.72rem;
}

.notification-pagination {
  padding: 0 14px 14px;
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
  font-weight: 600;
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
  min-width: 0;
}

.app-head {
  margin-bottom: 22px;
}

.app-head h3 {
  margin: 0;
  color: #071a29;
  font-size: 1.6rem;
}

.app-head p {
  margin: 6px 0 0;
  color: rgba(15, 23, 42, 0.65);
}

.app-content,
.app-section .tab-content {
  min-width: 0;
}

.app-section .application-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0;
  margin: 0 0 18px;
  list-style: none;
}

.application-filter {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 38px;
  padding: 7px 12px;
  border: 1px solid rgba(7, 26, 41, 0.12);
  border-radius: 6px;
  background: #ffffff;
  color: #334155;
  font: inherit;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.application-filter:hover {
  border-color: rgba(20, 134, 195, 0.45);
  background: #f3f9fc;
}

.application-filter.active {
  border-color: #1486c3;
  background: #e8f5fb;
  color: #075985;
}

.filter-count {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 21px;
  height: 21px;
  padding: 0 5px;
  border-radius: 999px;
  background: rgba(7, 26, 41, 0.07);
  color: inherit;
  font-size: 0.75rem;
}

.application-filter.active .filter-count {
  background: rgba(20, 134, 195, 0.14);
}

.applications-table-wrap {
  width: 100%;
  overflow-x: auto;
  border: 1px solid rgba(7, 26, 41, 0.1);
  border-radius: 10px;
  background: #ffffff;
}

.app-section .applications-table {
  width: 100%;
  min-width: 600px;
  border: 0;
  border-collapse: collapse;
  background: transparent;
  box-shadow: none;
}

.applications-table th,
.applications-table td {
  padding: 14px 18px;
  text-align: left;
  border-bottom: 1px solid rgba(7, 26, 41, 0.08);
}

.applications-table th {
  background: #f4f8fb;
  color: #526273;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.applications-table td {
  color: #263746;
  font-size: 0.92rem;
}

.applications-table tbody tr:last-child td {
  border-bottom: 0;
}

.applications-table tbody tr:hover {
  background: #f8fbfd;
}

.applications-table td:first-child {
  color: #071a29;
  font-weight: 650;
}

.dashboard-pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 14px;
  color: rgba(15, 23, 42, 0.68);
  font-size: 0.88rem;
}

.dashboard-pagination button {
  min-height: 36px;
  padding: 7px 12px;
  border: 1px solid rgba(7, 26, 41, 0.14);
  border-radius: 6px;
  background: #fff;
  color: #071a29;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}

.dashboard-pagination button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.savedjobs-content .dashboard-pagination {
  grid-column: 1 / -1;
}

.application-status {
  display: inline-flex;
  align-items: center;
  min-height: 25px;
  padding: 4px 9px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
  white-space: nowrap;
}

.status-interview,
.status-offer {
  background: #e7f5ee;
  color: #18734a;
}

.status-applied {
  background: #e5f5fb;
  color: #075985;
}

.status-under-review {
  background: #fff4dc;
  color: #8a5a00;
}

.status-not-selected {
  background: #fcebea;
  color: #a2352c;
}

.application-date {
  white-space: nowrap;
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

.message-btn .nav-link {
  margin-top: 10px;
}

.message-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
  color: rgba(15, 23, 42, 0.7);
}

.reply-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid rgba(20, 134, 195, 0.28);
  border-radius: 10px;
  margin-right: 8px;
  min-width: 120px;
  max-width: 30%;
  min-height: 60px;
  max-height: 150px;
  position: relative;
  resize: vertical;
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
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
  gap: 16px;
}

.savedjob-tiles {
  width: auto;
  min-width: 0;
  border: 1px solid rgba(7, 26, 41, 0.08);
  padding: 14px;
  border-radius: 14px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(242, 247, 251, 0.96) 100%);
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.04);
}

.company-initials {
  background: linear-gradient(135deg, #d2efff 0%, #b9dffd 100%);
  color: #071a29;
  font-weight: 800;
  font-size: 1.05rem;
  width: fit-content;
  padding: 8px 10px;
  border-radius: 8px;
  margin-bottom: 8px;
}

.job-title {
  font-weight: 700;
  color: #071a29;
  margin-bottom: 4px;
}

.job-location,
.job-pay {
  color: rgba(15, 23, 42, 0.7);
  margin-bottom: 4px;
  font-size: 0.9rem;
}

.message-section {
  padding: 10px 30px;
}

.messagesection-head p {
  color: #127a5d;
  font-weight: 600;
}

.message-btn {
  flex: 0 1 340px;
  min-width: 220px;
  border: 1px solid rgba(1, 16, 28, 0.12);
  padding: 14px 10px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.6);
}

.message-btn .nav-link {
  color: #01101c;
  text-align: start;
  min-height: 78px;
  height: auto;
  width: 100%;
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
}

.message-btn .nav-link.active {
  background: linear-gradient(135deg, #01101c 0%, #0c2236 100%);
  color: #d2efff;
  text-align: start;
}

.tab-pane {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(228, 239, 250, 0.9) 100%);
  color: #01101c;
  width: 100%;
  min-height: calc(100vh - 160px);
  height: auto;
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
  padding: 24px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.04);
}

.profile-summary {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 20px;
}

.profile-ini {
  display: grid;
  flex: 0 0 52px;
  place-items: center;
  background: linear-gradient(135deg, #ffc857 0%, #ff9f1c 100%);
  width: 52px;
  height: 52px;
  font-weight: 800;
  font-size: 1.1rem;
  border-radius: 50%;
  box-shadow: 0 10px 22px rgba(255, 159, 28, 0.25);
}

.profile-summary-copy {
  min-width: 0;
  flex: 1;
}

.profile-summary-copy h4,
.profile-form-heading h4 {
  margin: 0;
  color: #071a29;
}

.profile-summary-copy p,
.profile-form-heading p {
  margin: 5px 0 0;
  color: rgba(15, 23, 42, 0.65);
}

.profile-edit-button,
.profile-cancel-button,
.profile-save-button {
  min-height: 38px;
  padding: 8px 14px;
  border: 1px solid rgba(20, 134, 195, 0.25);
  border-radius: 6px;
  background: #fff;
  color: #075985;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.profile-save-button {
  border-color: #071a29;
  background: #071a29;
  color: #fff;
}

.profile-edit-button:focus-visible,
.profile-cancel-button:focus-visible,
.profile-save-button:focus-visible,
.profile-field input:focus-visible,
.profile-field textarea:focus-visible {
  outline: 2px solid #1486c3;
  outline-offset: 2px;
}

.profile-details {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 24px;
  margin: 0;
}

.profile-detail-item {
  min-width: 0;
  padding: 13px 0;
  border-bottom: 1px solid rgba(7, 26, 41, 0.08);
}

.profile-detail-item dt {
  color: rgba(15, 23, 42, 0.58);
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
}

.profile-detail-item dd {
  margin: 5px 0 0;
  overflow-wrap: anywhere;
  color: #0f172a;
  line-height: 1.5;
}

.profile-detail-item a {
  color: #075985;
}

.profile-about-item {
  grid-column: 1 / -1;
}

.profile-skills {
  margin-top: 20px;
}

.profile-skills h4 {
  margin: 0;
  color: #071a29;
  font-size: 1rem;
}

.profile-skills ul {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 12px 0 0;
}

.profile-skills li {
  font-weight: 600;
  font-size: 0.8rem;
  padding: 7px 11px;
  background: #e8f5fb;
  border-radius: 6px;
  color: #0f172a;
}

.profile-skills > p {
  margin: 8px 0 0;
  color: rgba(15, 23, 42, 0.62);
}

.profile-edit-dialog {
  width: min(760px, calc(100% - 24px));
  max-width: none;
  max-height: min(90dvh, 820px);
  padding: 0;
  overflow: auto;
  border: 1px solid rgba(7, 26, 41, 0.12);
  border-radius: 12px;
  background: #f9fcff;
  color: #0f172a;
  box-shadow: 0 24px 70px rgba(1, 16, 28, 0.3);
}

.profile-edit-dialog::backdrop {
  background: rgba(1, 16, 28, 0.68);
  backdrop-filter: blur(3px);
}

.profile-edit-form {
  padding: 24px;
}

.profile-form-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}

.profile-form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px 20px;
}

.profile-field {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 7px;
  color: #263746;
  font-size: 0.88rem;
  font-weight: 650;
}

.profile-field-wide {
  grid-column: 1 / -1;
}

.profile-field-group {
  min-width: 0;
}

.profile-suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.profile-suggestion {
  max-width: 100%;
  padding: 5px 9px;
  border: 1px solid rgba(7, 26, 41, 0.12);
  border-radius: 999px;
  background: #fff;
  color: #334155;
  font: inherit;
  font-size: 0.74rem;
  line-height: 1.35;
  overflow-wrap: anywhere;
  text-align: left;
  cursor: pointer;
}

.profile-suggestion.selected {
  border-color: rgba(20, 134, 195, 0.36);
  background: #e8f5fb;
  color: #075985;
}

.profile-suggestion:focus-visible {
  outline: 2px solid #1486c3;
  outline-offset: 2px;
}

.profile-field input,
.profile-field textarea {
  width: 100%;
  min-width: 0;
  padding: 10px 12px;
  border: 1px solid rgba(7, 26, 41, 0.16);
  border-radius: 6px;
  background: #fff;
  color: #0f172a;
  font: inherit;
  font-weight: 400;
}

.profile-field input[readonly] {
  background: #f4f8fb;
  color: rgba(15, 23, 42, 0.65);
}

.profile-field input[type='file'] {
  padding: 8px;
}

.profile-field input[type='file']::file-selector-button {
  margin-right: 10px;
  padding: 6px 9px;
  border: 0;
  border-radius: 4px;
  background: #e8f5fb;
  color: #075985;
  font: inherit;
  cursor: pointer;
}

.profile-field textarea {
  resize: vertical;
}

.profile-field small {
  color: rgba(15, 23, 42, 0.62);
  font-weight: 400;
  overflow-wrap: anywhere;
}

.profile-form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 22px;
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

.nav-footer {
  margin-top: 170px;
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
    padding-top: 80px;
  }

  .sectionA > .d-flex {
    flex-direction: column;
    align-items: stretch;
    padding-left: 0;
  }

  .sectionA .navbar {
    position: relative;
    top: 0;
    left: auto;
    z-index: auto;
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
    width: 100%;
  }

  .profile-section {
    padding: 10px 14px;
  }

  .app-section {
    padding: 10px 14px;
  }

  .overview-content .partB {
    grid-template-columns: 1fr;
  }

  .savedjob-tiles {
    width: 100%;
  }

  .savedjobs-content {
    grid-template-columns: minmax(0, 1fr);
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

  .app-section {
    padding: 8px 10px;
  }

  .app-head {
    margin-bottom: 18px;
  }

  .app-head h3 {
    font-size: 1.4rem;
  }

  .profile-section {
    padding: 8px 10px;
  }

  .profile-edit-dialog {
    width: calc(100% - 24px);
    max-height: calc(100dvh - 24px);
  }

  .profile-edit-form {
    padding: 18px;
  }

  .profile-details,
  .profile-form-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .profile-about-item,
  .profile-field-wide {
    grid-column: auto;
  }

  .profile-form-heading {
    flex-direction: column;
  }

  .profile-cancel-button {
    align-self: flex-start;
  }

  .dashboard-pagination {
    justify-content: space-between;
  }

  .overview-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .overview-content .partC table.t1,
  .overview-content .partC .t1 thead,
  .overview-content .partC .t1 tbody {
    display: block;
    width: 100%;
  }

  .overview-content .partC .t1 thead tr:first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .overview-content .partC .t1 thead tr:first-child th:first-child {
    flex: 1;
  }

  .overview-content .partC .t1 thead tr:first-child th:last-child {
    white-space: nowrap;
  }

  .overview-content .partC .t1 thead tr:nth-child(2) {
    display: none;
  }

  .overview-content .partC .t1 tbody tr {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px 12px;
    padding: 12px 16px;
    border-top: 1px solid rgba(15, 23, 42, 0.06);
  }

  .overview-content .partC .t1 tbody td {
    display: flex;
    min-width: 0;
    flex-direction: column;
    padding: 0;
    border: 0;
    overflow-wrap: anywhere;
    font-size: 0.82rem;
  }

  .overview-content .partC .t1 tbody td::before {
    content: attr(data-label);
    color: rgba(15, 23, 42, 0.58);
    font-size: 0.64rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  .overview-content .partC .t1 tbody td:first-child {
    grid-column: 1 / -1;
    font-size: 0.92rem;
    font-weight: 700;
  }

  .message-preview,
  .savedjob-tiles,
  .profile-section .profile-content {
    padding: 12px;
  }
}
</style>

<style>
.sign-out-btn {
  margin-top: 8px;
  padding: 5px 10px;
  border: 1px solid rgba(210, 239, 255, 0.25);
  border-radius: 999px;
  background: transparent;
  color: #d2efff;
  font: inherit;
  font-size: 0.75rem;
  cursor: pointer;
}
.sign-out-btn:hover {
  background: rgba(255, 255, 255, 0.08);
}
.sign-out-btn:focus-visible {
  outline: 2px solid #36d2ff;
  outline-offset: 2px;
}
</style>
