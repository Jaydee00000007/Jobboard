<template>
  <article class="company-card">
    <div class="company-abbr" aria-hidden="true">{{ company.initials }}</div>
    <div class="company-details">
      <h3>{{ company.name }}</h3>
      <p>{{ company.industry }}</p>
      <p class="location">{{ company.location }}</p>
    </div>
    <div class="company-actions">
      <span
        >{{ company.openRoles }} {{ company.openRoles === 1 ? 'open role' : 'open roles' }}</span
      >
      <button class="viewbtn" type="button" @click="openJobs">View jobs</button>
    </div>
    <dialog ref="jobsDialog" class="jobs-dialog" @click="closeOnBackdrop">
      <div class="dialog-content">
        <header class="dialog-header">
          <div>
            <h2>{{ company.name }}</h2>
            <p>
              {{ companyJobs.length }} available {{ companyJobs.length === 1 ? 'role' : 'roles' }}
            </p>
          </div>
          <button type="button" class="close-btn" aria-label="Close jobs" @click="closeJobs">
            Close
          </button>
        </header>
        <ul v-if="companyJobs.length" class="role-list">
          <li v-for="job in companyJobs" :key="job.id" class="role-item">
            <RouterLink :to="{ name: 'jobs', query: { jobId: job.id } }" class="role-link">
              <h3>{{ job.title }}</h3>
              <p>{{ job.category }} · {{ job.location }} · {{ job.type }}</p>
              <p>{{ job.salaryText }}</p>
            </RouterLink>
          </li>
        </ul>
        <p v-else class="empty-roles">There are no current roles listed for this company.</p>
      </div>
    </dialog>
  </article>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { jobs } from '../../data/jobs'
import type { Company } from '../../types/company'

const props = defineProps<{ company: Company }>()
const jobsDialog = ref<HTMLDialogElement | null>(null)
const companyJobs = computed(() => jobs.filter((job) => job.company === props.company.name))

function openJobs() {
  jobsDialog.value?.showModal()
}

function closeJobs() {
  jobsDialog.value?.close()
}

function closeOnBackdrop(event: MouseEvent) {
  if (event.target === jobsDialog.value) closeJobs()
}
</script>

<style scoped>
.company-card {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  gap: 18px;
  align-items: center;
  border: 1px solid #12568a3b;
  border-radius: 8px;
  padding: 18px 20px;
}
.company-abbr {
  display: grid;
  place-items: center;
  width: 48px;
  aspect-ratio: 1;
  border-radius: 8px;
  background: #d2efff;
  color: #071a29;
  font-weight: 800;
}
.company-details h3 {
  margin: 0 0 6px;
}
.company-details p {
  margin: 4px 0;
}
.location {
  color: #526273;
  font-size: 14px;
}
.company-actions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  justify-items: end;
}
.company-actions span {
  color: #526273;
  font-size: 14px;
}
.company-actions button {
  border: 0;
  border-radius: 6px;
  background: #071a29;
  color: #fff;
  padding: 9px 14px;
  font: inherit;
  cursor: pointer;
}
.viewbtn{
    color: orange;
}
.company-actions button:focus-visible {
  outline: 2px solid #36d2ff;
  outline-offset: 2px;
}
.jobs-dialog {
  width: min(560px, calc(100% - 32px));
  max-height: min(80vh, 720px);
  padding: 0;
  border: 0;
  border-radius: 8px;
  color: #071a29;
}
.jobs-dialog::backdrop {
  background: rgb(7 26 41 / 65%);
}
.dialog-content {
  padding: 15px;
}
.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: #95c5e5;
  padding: 16px 10px;
  gap: 20px;
}
.dialog-header h2 {
  margin: 0;
  font-size: 22px;
}
.dialog-header p,
.role-item p {
  margin: 6px 0;
  color: #526273;
}
.close-btn {
  border: 1px solid #c7d1d9;
  border-radius: 6px;
  background: #fff;
  padding: 7px 10px;
  cursor: pointer;
}
.role-list {
  display: grid;
  gap: 12px;
  padding: 0;
  margin: 20px 0 0;
  list-style: none;
}
.role-item {
  border-top: 1px solid #dce3e8;
  padding-top: 12px;
}
.role-item h3 {
  margin: 0;
  font-size: 16px;
}
.role-link {
  display: block;
  color: inherit;
  text-decoration: none;
}
.role-link:hover h3 {
  text-decoration: underline;
}
.role-link:focus-visible {
  outline: 2px solid #12568a;
  outline-offset: 4px;
}
.empty-roles {
  padding-top: 16px;
  color: #526273;
}
@media (max-width: 640px) {
  .company-card {
    grid-template-columns: auto minmax(0, 1fr);
    padding: 14px;
  }
  .company-actions {
    grid-column: 1 / -1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
