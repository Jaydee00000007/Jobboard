<template>
  <div class="dashboard" :class="{ 'theme-dark': isDarkMode }">
    <HeaderB class="header" />
    <div class="sectionA">
      <button
        v-if="mobileSidebarOpen"
        type="button"
        class="mobile-sidebar-backdrop"
        aria-label="Close dashboard menu"
        @click="closeMobileSidebar"
      ></button>
      <button
        type="button"
        class="mobile-sidebar-toggle"
        :aria-expanded="mobileSidebarOpen"
        aria-controls="dashboard-sidebar"
        @click="mobileSidebarOpen = !mobileSidebarOpen"
      >
        <FontAwesomeIcon :icon="mobileSidebarOpen ? faXmark : faBars" aria-hidden="true" />
        <span>{{ mobileSidebarOpen ? 'Close menu' : 'Menu' }}</span>
      </button>
      <div class="d-flex align-items-start">
        <div id="dashboard-sidebar" class="navbar" :class="{ 'mobile-open': mobileSidebarOpen }">
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
                <button
                  type="button"
                  class="appearance-toggle"
                  :aria-pressed="isDarkMode"
                  @click="toggleAppearance"
                >
                  <FontAwesomeIcon :icon="isDarkMode ? faSun : faMoon" aria-hidden="true" />
                  <span>{{ isDarkMode ? 'Light mode' : 'Dark mode' }}</span>
                </button>
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
                      <td scope="row" data-label="Role">{{ application.role }}</td>
                      <td data-label="Company">{{ application.company }}</td>
                      <td data-label="Status">
                        <span
                          class="application-status"
                          :class="`status-${application.status.toLowerCase().replaceAll(' ', '-')}`"
                        >
                          {{ application.status }}
                        </span>
                      </td>
                      <td class="application-date" data-label="Applied">{{ application.date }}</td>
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
              <div v-if="inboxMessages.length" class="d-flex align-items-start message-layout">
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
                  <header class="message-preview-heading">
                    <div class="message-sender">
                      <span class="message-sender-initials" aria-hidden="true">
                        {{ selectedMessage.company.slice(0, 2).toUpperCase() }}
                      </span>
                      <div>
                        <h4>{{ selectedMessage.company }}</h4>
                        <p class="message-subject">{{ selectedMessage.subject }}</p>
                      </div>
                    </div>
                    <button
                      v-if="!selectedMessage.unread || selectedMessage.reply.trim()"
                      type="button"
                      class="delete-message-btn"
                      @click="handleMessageDelete(selectedMessage.id)"
                    >
                      Delete message
                    </button>
                  </header>
                  <div class="message-body">{{ selectedMessage.body }}</div>
                  <div class="message-meta">
                    <span class="message-time">{{ selectedMessage.time }}</span>
                    <div class="reply-section">
                      <label class="reply-label" :for="`reply-${selectedMessage.id}`"
                        >Your reply</label
                      >
                      <textarea
                        :id="`reply-${selectedMessage.id}`"
                        class="reply-input"
                        v-model="selectedMessage.reply"
                        rows="5"
                        placeholder="Write a reply..."
                      >
                      </textarea>
                      <div class="reply-actions">
                        <p v-if="replyStatus" class="reply-status">{{ replyStatus }}</p>
                        <button type="button" class="reply-btn" @click="replyToMessage">
                          Prepare reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="messages-empty-state" role="status">
                <h4>No messages available.</h4>
                <p>Your inbox is clear.</p>
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
                      <div
                        v-if="matchingRoleSuggestions.length"
                        class="profile-suggestions"
                        aria-label="Suggested target roles"
                      >
                        <button
                          v-for="role in matchingRoleSuggestions"
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
                    <div class="profile-field-group">
                      <label class="profile-field">
                        <span>Country</span>
                        <input
                          v-model.trim="locationCountryDraft"
                          type="text"
                          autocomplete="country-name"
                        />
                      </label>
                      <div
                        v-if="matchingCountrySuggestions.length"
                        class="profile-suggestions"
                        aria-label="Suggested countries"
                      >
                        <button
                          v-for="country in matchingCountrySuggestions"
                          :key="country"
                          type="button"
                          class="profile-suggestion"
                          @click="locationCountryDraft = country"
                        >
                          {{ country }}
                        </button>
                      </div>
                    </div>
                    <div class="profile-field-group">
                      <label class="profile-field">
                        <span>State or region</span>
                        <input
                          v-model.trim="locationRegionDraft"
                          type="text"
                          autocomplete="address-level1"
                        />
                      </label>
                      <div
                        v-if="matchingRegionSuggestions.length"
                        class="profile-suggestions"
                        aria-label="Suggested states or regions"
                      >
                        <button
                          v-for="region in matchingRegionSuggestions"
                          :key="region"
                          type="button"
                          class="profile-suggestion"
                          @click="locationRegionDraft = region"
                        >
                          {{ region }}
                        </button>
                      </div>
                    </div>
                    <label class="profile-field">
                      <span>Country calling code</span>
                      <input
                        v-model.trim="phoneCountryCodeDraft"
                        type="tel"
                        list="profile-phone-country-codes"
                        autocomplete="tel-country-code"
                        placeholder="+234"
                      />
                      <datalist id="profile-phone-country-codes">
                        <option
                          v-for="countryCode in phoneCountryCodes"
                          :key="countryCode.code"
                          :value="countryCode.code"
                          :label="countryCode.country"
                        />
                      </datalist>
                    </label>
                    <label class="profile-field">
                      <span>Phone number</span>
                      <input
                        v-model.trim="phoneNumberDraft"
                        type="tel"
                        autocomplete="tel-national"
                        placeholder="801 234 5678"
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
                      <div
                        v-if="matchingSkillSuggestions.length"
                        class="profile-suggestions"
                        aria-label="Suggested skills"
                      >
                        <button
                          v-for="skill in matchingSkillSuggestions"
                          :key="skill"
                          type="button"
                          class="profile-suggestion"
                          @click="selectProfileSkillSuggestion(skill)"
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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars, faMoon, faSun, faXmark } from '@fortawesome/free-solid-svg-icons'
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
const mobileSidebarOpen = ref(false)
const isDarkMode = ref(localStorage.getItem('jobboard.dashboard.theme') === 'dark')
const profileEditDialog = ref<HTMLDialogElement | null>(null)
const profileDraft = ref<UserProfile>({ ...store.userProfile })
const profileSkillsDraft = ref('')
const locationCountryDraft = ref('')
const locationRegionDraft = ref('')
const phoneCountryCodeDraft = ref('+234')
const phoneNumberDraft = ref('')
const profileSkillSuggestions = [
  'Accessibility',
  'Agile / Scrum',
  'API design',
  'Account management',
  'AWS',
  'Business development',
  'Cloud infrastructure',
  'Content marketing',
  'Cypress',
  'Cybersecurity',
  'CSS',
  'Data analysis',
  'Data visualization',
  'Docker',
  'Excel',
  'UX design',
  'Figma',
  'HTML',
  'Interaction design',
  'JavaScript',
  'Machine learning',
  'Manual testing',
  'Negotiation',
  'Node.js',
  'Power BI',
  'Product design',
  'Quality assurance',
  'Product strategy',
  'Prototyping',
  'Python',
  'React',
  'Recruitment',
  'Research',
  'Sales strategy',
  'Selenium',
  'SEO',
  'Social media marketing',
  'SQL',
  'Tableau',
  'Talent acquisition',
  'Test automation',
  'TypeScript',
  'User research',
  'Usability testing',
  'Visual design',
  'Vue.js',
  'Wireframing',
]
const countrySuggestions = [
  'Australia',
  'Brazil',
  'Cameroon',
  'Canada',
  'China',
  'Egypt',
  'France',
  'Germany',
  'Ghana',
  'India',
  'Ireland',
  'Italy',
  'Japan',
  'Kenya',
  'Netherlands',
  'New Zealand',
  'Nigeria',
  'Pakistan',
  'Philippines',
  'Rwanda',
  'Singapore',
  'South Africa',
  'Spain',
  'Sweden',
  'Switzerland',
  'Tanzania',
  'Uganda',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Zimbabwe',
]
const phoneCountryCodes = [
  { country: 'Australia', code: '+61' },
  { country: 'Brazil', code: '+55' },
  { country: 'Canada', code: '+1' },
  { country: 'China', code: '+86' },
  { country: 'France', code: '+33' },
  { country: 'Germany', code: '+49' },
  { country: 'Ghana', code: '+233' },
  { country: 'India', code: '+91' },
  { country: 'Ireland', code: '+353' },
  { country: 'Japan', code: '+81' },
  { country: 'Kenya', code: '+254' },
  { country: 'Netherlands', code: '+31' },
  { country: 'New Zealand', code: '+64' },
  { country: 'Nigeria', code: '+234' },
  { country: 'Pakistan', code: '+92' },
  { country: 'Philippines', code: '+63' },
  { country: 'Rwanda', code: '+250' },
  { country: 'Singapore', code: '+65' },
  { country: 'South Africa', code: '+27' },
  { country: 'Spain', code: '+34' },
  { country: 'Switzerland', code: '+41' },
  { country: 'Tanzania', code: '+255' },
  { country: 'Uganda', code: '+256' },
  { country: 'United Arab Emirates', code: '+971' },
  { country: 'United Kingdom', code: '+44' },
  { country: 'United States', code: '+1' },
  { country: 'Zimbabwe', code: '+263' },
]
const regionsByCountry: Record<string, string[]> = {
  Australia: [
    'Australian Capital Territory',
    'New South Wales',
    'Northern Territory',
    'Queensland',
    'South Australia',
    'Tasmania',
    'Victoria',
    'Western Australia',
  ],
  Canada: [
    'Alberta',
    'British Columbia',
    'Manitoba',
    'New Brunswick',
    'Newfoundland and Labrador',
    'Northwest Territories',
    'Nova Scotia',
    'Nunavut',
    'Ontario',
    'Prince Edward Island',
    'Quebec',
    'Saskatchewan',
    'Yukon',
  ],
  Ghana: [
    'Ahafo',
    'Ashanti',
    'Bono',
    'Bono East',
    'Central',
    'Eastern',
    'Greater Accra',
    'North East',
    'Northern',
    'Oti',
    'Savannah',
    'Upper East',
    'Upper West',
    'Volta',
    'Western',
    'Western North',
  ],
  Nigeria: [
    'Abia',
    'Adamawa',
    'Akwa Ibom',
    'Anambra',
    'Bauchi',
    'Bayelsa',
    'Benue',
    'Borno',
    'Cross River',
    'Delta',
    'Ebonyi',
    'Edo',
    'Ekiti',
    'Enugu',
    'FCT',
    'Gombe',
    'Imo',
    'Jigawa',
    'Kaduna',
    'Kano',
    'Katsina',
    'Kebbi',
    'Kogi',
    'Kwara',
    'Lagos',
    'Nasarawa',
    'Niger',
    'Ogun',
    'Ondo',
    'Osun',
    'Oyo',
    'Plateau',
    'Rivers',
    'Sokoto',
    'Taraba',
    'Yobe',
    'Zamfara',
  ],
  'South Africa': [
    'Eastern Cape',
    'Free State',
    'Gauteng',
    'KwaZulu-Natal',
    'Limpopo',
    'Mpumalanga',
    'North West',
    'Northern Cape',
    'Western Cape',
  ],
  'United Kingdom': ['England', 'Northern Ireland', 'Scotland', 'Wales'],
  'United States': [
    'Alabama',
    'Alaska',
    'Arizona',
    'California',
    'Colorado',
    'Florida',
    'Georgia',
    'Illinois',
    'Massachusetts',
    'Michigan',
    'New Jersey',
    'New York',
    'North Carolina',
    'Ohio',
    'Pennsylvania',
    'Texas',
    'Virginia',
    'Washington',
  ],
}
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
const roleSuggestions = computed(() => [...new Set(jobs.map((job) => job.title))])
const matchingRoleSuggestions = computed(() => {
  const query = profileDraft.value.role.trim().toLowerCase()
  if (!query) return []

  return roleSuggestions.value
    .filter((role) => role.toLowerCase().includes(query) && role.toLowerCase() !== query)
    .slice(0, 8)
})
const matchingCountrySuggestions = computed(() => {
  const query = locationCountryDraft.value.trim().toLowerCase()
  if (!query) return []

  return countrySuggestions
    .filter((country) => country.toLowerCase().includes(query) && country.toLowerCase() !== query)
    .slice(0, 8)
})
const matchingRegionSuggestions = computed(() => {
  const query = locationRegionDraft.value.trim().toLowerCase()
  const regions = regionsByCountry[locationCountryDraft.value.trim()] || []
  if (!query) return []

  return regions
    .filter((region) => region.toLowerCase().includes(query) && region.toLowerCase() !== query)
    .slice(0, 8)
})
const profileSkillQuery = computed(
  () => profileSkillsDraft.value.split(',').at(-1)?.trim().toLowerCase() || '',
)
const selectedProfileSkillNames = computed(
  () =>
    new Set(
      profileSkillsDraft.value
        .split(',')
        .slice(0, -1)
        .map((name) => name.trim().toLowerCase())
        .filter(Boolean),
    ),
)
const matchingSkillSuggestions = computed(() => {
  const query = profileSkillQuery.value
  if (!query) return []

  return profileSkillSuggestions
    .filter(
      (skill) =>
        skill.toLowerCase().includes(query) &&
        !selectedProfileSkillNames.value.has(skill.toLowerCase()),
    )
    .slice(0, 8)
})
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
  closeMobileSidebar()
}
function closeMobileSidebar() {
  mobileSidebarOpen.value = false
}
function handleSavedJobRemove(jobId: number) {
  store.removeSavedJob(jobId)
}
function handleSettingsUpdate() {
  store.updateSettings(settings.value)
}
function toggleAppearance() {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('jobboard.dashboard.theme', isDarkMode.value ? 'dark' : 'light')
}
function startProfileEdit() {
  profileDraft.value = { ...userProfile.value }
  profileSkillsDraft.value = selectedSkills.value.map((skill) => skill.name).join(', ')
  const locationParts = userProfile.value.location
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
  locationCountryDraft.value = locationParts.length > 1 ? locationParts.pop() || '' : ''
  locationRegionDraft.value = locationParts.join(', ')
  const phoneMatch = userProfile.value.phoneNumber.match(/^(\+\d{1,4})\s*(.*)$/)
  phoneCountryCodeDraft.value = phoneMatch?.[1] || '+234'
  phoneNumberDraft.value = phoneMatch?.[2] || userProfile.value.phoneNumber
  profileEditDialog.value?.showModal()
}
function cancelProfileEdit() {
  profileEditDialog.value?.close()
}
function resetProfileEditDraft() {
  profileDraft.value = { ...userProfile.value }
  profileSkillsDraft.value = selectedSkills.value.map((skill) => skill.name).join(', ')
  const locationParts = userProfile.value.location
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
  locationCountryDraft.value = locationParts.length > 1 ? locationParts.pop() || '' : ''
  locationRegionDraft.value = locationParts.join(', ')
  const phoneMatch = userProfile.value.phoneNumber.match(/^(\+\d{1,4})\s*(.*)$/)
  phoneCountryCodeDraft.value = phoneMatch?.[1] || '+234'
  phoneNumberDraft.value = phoneMatch?.[2] || userProfile.value.phoneNumber
}
function selectProfileSkillSuggestion(skill: string) {
  const nameParts = profileSkillsDraft.value
    .split(',')
    .map((name) => name.trim())
    .filter(Boolean)
  const names = nameParts.slice(0, -1)
  if (!names.some((name) => name.toLowerCase() === skill.toLowerCase())) names.push(skill)

  profileSkillsDraft.value = `${names.join(', ')}, `
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
    location: [locationRegionDraft.value.trim(), locationCountryDraft.value.trim()]
      .filter(Boolean)
      .join(', '),
    phoneNumber: phoneNumberDraft.value.trim()
      ? `${phoneCountryCodeDraft.value.trim()} ${phoneNumberDraft.value.trim()}`.trim()
      : '',
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
function handleMessageDelete(id: number) {
  store.deleteMessage(id)
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

.mobile-sidebar-toggle,
.mobile-sidebar-backdrop {
  display: none;
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
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr);
  width: 100%;
  padding: 0;
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
  min-width: 0;
  flex-direction: column;
  overflow: hidden;
}

.nav-footer .profile-name p {
  margin: 0;
  overflow: hidden;
  font-size: 0.9rem;
  font-weight: 600;
  color: #d2efff;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.nav-footer .profile-name span {
  margin: 0;
  overflow: hidden;
  font-weight: 300;
  color: #d2efff;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.nav-footer {
  width: 100%;
  margin-top: auto;
  padding: 16px 6px 4px;
  border-top: 1px solid rgba(210, 239, 255, 0.14);
}

.nav-footer .signout {
  grid-column: 1 / -1;
}

.nav-footer .sign-out-btn {
  width: 100%;
  min-height: 36px;
  margin: 12px 0 0;
  border: 1px solid rgba(210, 239, 255, 0.2);
  border-radius: 7px;
  text-align: center;
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
  overflow-x: hidden;
  border: 1px solid rgba(7, 26, 41, 0.1);
  border-radius: 10px;
  background: #ffffff;
}

.app-section .applications-table {
  width: 100%;
  min-width: 0;
  table-layout: fixed;
  border: 0;
  border-collapse: collapse;
  background: transparent;
  box-shadow: none;
}

.applications-table th,
.applications-table td {
  padding: 12px 10px;
  text-align: left;
  border-bottom: 1px solid rgba(7, 26, 41, 0.08);
  overflow-wrap: anywhere;
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

.application-status {
  max-width: 100%;
  white-space: normal;
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
  display: flex;
  flex-direction: column;
  gap: 18px;
  border: 1px solid rgba(7, 26, 41, 0.1);
  border-radius: 12px;
  padding: 22px;
  background: #ffffff;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05);
}

.message-preview h4 {
  margin: 0 0 4px;
}

.message-preview-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(7, 26, 41, 0.1);
}

.message-sender {
  display: flex;
  min-width: 0;
  flex: 1;
  align-items: center;
  gap: 12px;
}

.message-sender-initials {
  display: grid;
  flex: 0 0 40px;
  width: 40px;
  height: 40px;
  place-items: center;
  border-radius: 10px;
  background: #e8f5fb;
  color: #075985;
  font-size: 0.8rem;
  font-weight: 800;
}

.message-sender > div {
  min-width: 0;
}

.delete-message-btn {
  flex: 0 0 auto;
  padding: 7px 10px;
  border: 1px solid rgba(162, 53, 44, 0.24);
  border-radius: 6px;
  background: #fff;
  color: #a2352c;
  font: inherit;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
}

.delete-message-btn:hover {
  background: #fcebea;
}

.delete-message-btn:focus-visible {
  outline: 2px solid #a2352c;
  outline-offset: 2px;
}

.messages-empty-state {
  display: grid;
  min-height: 220px;
  align-content: center;
  justify-items: center;
  gap: 6px;
  text-align: center;
  color: rgba(15, 23, 42, 0.72);
}

.messages-empty-state h4,
.messages-empty-state p {
  margin: 0;
}

.messages-empty-state h4 {
  color: #263746;
  font-size: 1rem;
}

.messages-empty-state p {
  color: rgba(15, 23, 42, 0.62);
  font-size: 0.9rem;
}

.message-subject {
  margin: 0;
  color: #526273;
  font-size: 0.9rem;
}

.message-body {
  min-height: 110px;
  padding: 16px;
  border: 1px solid rgba(7, 26, 41, 0.07);
  border-radius: 10px;
  background: #f5f8fa;
  color: rgba(15, 23, 42, 0.82);
  line-height: 1.6;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
}

.message-btn .nav-link {
  margin-top: 10px;
}

.message-meta {
  display: grid;
  gap: 10px;
  color: rgba(15, 23, 42, 0.7);
}

.message-time {
  justify-self: end;
  color: rgba(15, 23, 42, 0.58);
  font-size: 0.76rem;
}

.reply-section {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 8px;
}

.reply-label {
  color: #263746;
  font-size: 0.82rem;
  font-weight: 700;
}

.reply-input {
  width: 100%;
  min-width: 0;
  min-height: 128px;
  max-height: 320px;
  margin: 0;
  padding: 13px 14px;
  border: 1px solid rgba(7, 26, 41, 0.16);
  border-radius: 9px;
  background: #fff;
  color: #0f172a;
  font: inherit;
  line-height: 1.5;
  resize: vertical;
}

.reply-input:focus {
  border-color: #1486c3;
  outline: 2px solid rgba(20, 134, 195, 0.15);
}

.reply-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.reply-section .reply-btn {
  min-height: 40px;
  margin: 0;
  padding: 9px 16px;
  border: 1px solid #071a29;
  border-radius: 6px;
  background: #071a29;
  color: #fff;
}

.reply-section .reply-btn:hover {
  background: #123b56;
}

.reply-status {
  margin: 0;
  color: #127a5d;
  font-size: 0.84rem;
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
  max-height: 104px;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 2px;
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
    position: fixed;
    top: 64px;
    bottom: 0;
    left: 0;
    z-index: 1201;
    width: min(300px, calc(100vw - 48px));
    min-width: 0;
    height: auto;
    max-height: calc(100dvh - 64px);
    padding: 18px 14px max(18px, env(safe-area-inset-bottom));
    border-radius: 0 12px 0 0;
    transform: translateX(-105%);
    transition: transform 0.24s ease;
    overflow-y: auto;
  }

  .sectionA .navbar.mobile-open {
    transform: translateX(0);
  }

  .sectionA .navbar .navbarplate {
    flex-direction: column;
    flex-wrap: nowrap;
  }

  .sectionA .navbar button {
    width: 100%;
    max-width: none;
  }

  .nav-footer {
    margin-top: auto;
  }

  .mobile-sidebar-backdrop {
    position: fixed;
    inset: 64px 0 0;
    z-index: 1200;
    display: block;
    width: 100%;
    border: 0;
    background: rgba(1, 16, 28, 0.52);
  }

  .mobile-sidebar-toggle {
    position: fixed;
    bottom: calc(16px + env(safe-area-inset-bottom));
    left: 16px;
    z-index: 1300;
    display: inline-flex;
    min-height: 46px;
    align-items: center;
    gap: 9px;
    padding: 0 15px;
    border: 1px solid rgba(210, 239, 255, 0.22);
    border-radius: 8px;
    background: #071a29;
    color: #fff;
    font: inherit;
    font-size: 0.9rem;
    font-weight: 700;
    box-shadow: 0 8px 24px rgba(1, 16, 28, 0.26);
  }

  .mobile-sidebar-toggle:focus-visible {
    outline: 2px solid #36d2ff;
    outline-offset: 3px;
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

  .message-preview-heading {
    flex-wrap: wrap;
  }

  .message-preview {
    padding: 16px;
  }

  .reply-actions {
    align-items: flex-start;
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

@media (prefers-reduced-motion: reduce) {
  .sectionA .navbar {
    transition: none;
  }
}

.dashboard.theme-dark .sectionA {
  background: linear-gradient(180deg, #0c1820 0%, #101e29 100%);
}

.dashboard.theme-dark .tab-pane {
  border-color: #29414e;
  background: linear-gradient(180deg, #142936 0%, #11232e 100%);
  color: #e4edf2;
  box-shadow: none;
}

.dashboard.theme-dark .tab-pane h2,
.dashboard.theme-dark .tab-pane h3,
.dashboard.theme-dark .tab-pane h4,
.dashboard.theme-dark .tab-pane h5,
.dashboard.theme-dark .tab-pane th,
.dashboard.theme-dark .tab-pane dt,
.dashboard.theme-dark .tab-pane td:first-child {
  color: #e7eef2;
}

.dashboard.theme-dark .tab-pane p,
.dashboard.theme-dark .tab-pane dd,
.dashboard.theme-dark .tab-pane .message-time,
.dashboard.theme-dark .tab-pane .application-date {
  color: #b7c7d1;
}

.dashboard.theme-dark .profile-tile,
.dashboard.theme-dark .overview-content .partC > div,
.dashboard.theme-dark .savedjob-tiles,
.dashboard.theme-dark .message-preview,
.dashboard.theme-dark .profile-content,
.dashboard.theme-dark .settings-body,
.dashboard.theme-dark .setting-major,
.dashboard.theme-dark .message-btn {
  border-color: #2a4351;
  background: #172d3a;
  color: #e4edf2;
  box-shadow: none;
}

.dashboard.theme-dark .applications-table-wrap,
.dashboard.theme-dark .applications-table tbody tr {
  border-color: #2a4351;
  background: #172d3a;
}

.dashboard.theme-dark .applications-table th {
  background: #203b4a;
}

.dashboard.theme-dark .applications-table td,
.dashboard.theme-dark .applications-table th {
  border-color: #2a4351;
}

.dashboard.theme-dark .message-body {
  border-color: #2a4351;
  background: #10232e;
  color: #dce7ed;
}

.dashboard.theme-dark .reply-input,
.dashboard.theme-dark .profile-field input,
.dashboard.theme-dark .profile-field textarea {
  border-color: #36515f;
  background: #10232e;
  color: #e4edf2;
}

.dashboard.theme-dark .profile-detail-item {
  border-color: #2a4351;
}

.dashboard.theme-dark .profile-suggestion,
.dashboard.theme-dark .application-filter,
.dashboard.theme-dark .dashboard-pagination button {
  border-color: #36515f;
  background: #172d3a;
  color: #dce7ed;
}

.dashboard.theme-dark .profile-suggestion.selected,
.dashboard.theme-dark .application-filter.active {
  background: #1d5068;
  color: #eff8fc;
}

.dashboard.theme-dark .application-filter:hover,
.dashboard.theme-dark .profile-suggestion:hover {
  background: #203b4a;
}

.dashboard.theme-dark .application-status {
  color: #f0f6f8;
}

.dashboard.theme-dark .nav-footer .sign-out-btn,
.dashboard.theme-dark .appearance-toggle {
  border-color: rgba(210, 239, 255, 0.2);
  color: #d2efff;
}

.dashboard.theme-dark .profile-edit-dialog {
  border-color: #2a4351;
  background: #142936;
  color: #e4edf2;
}

.dashboard.theme-dark .profile-field {
  color: #dce7ed;
}

@media (max-width: 768px) {
  .dashboard.theme-dark .app-section .applications-table tbody tr {
    border-color: #2a4351;
    background: #172d3a;
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
