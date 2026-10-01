<template>
  <article class="job-card">
    <div class="company-abbr">{{ job.initials }}</div>
    <div class="job-details">
      <h3>{{ job.title }}</h3>
      <p>{{ job.company }} • {{ job.location }}</p>
      <ul>
        <li>{{ job.type }}</li>
        <li>{{ job.experienceLevel }}</li>
        <li>{{ job.category }}</li>
      </ul>
      <p class="salary">{{ job.salaryText }}</p>
    </div>
    <div class="job-actions">
      <button type="button" @click="emit('toggleSave', job)">
        {{ saved ? 'Saved' : 'Save' }}
      </button>
      <button type="button" :disabled="applied" @click="emit('apply', job)">
        {{ applied ? 'Applied' : 'Apply' }}
      </button>
      <span>Posted {{ job.posted }} ago</span>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Job } from '../../types/job'

interface Props {
  job: Job
  saved?: boolean
  applied?: boolean
}

defineProps<Props>()

const emit = defineEmits<{ toggleSave: [job: Job]; apply: [job: Job] }>()
</script>

<style scoped>
.job-card {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 20px;
  align-items: center;
  border: 1px solid #12568a3b;
  border-radius: 15px;
  padding: 14px 20px;
  margin: 20px 0;
}
.company-abbr {
  background: #d2efff;
  font-weight: 800;
  font-size: 26px;
  padding: 10px;
  border-radius: 8px;
}
.job-details h3 {
  margin: 0 0 6px;
}
.job-details p {
  margin: 5px 0;
}
.job-details ul {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0;
}
.job-details li {
  list-style: none;
  background: #d2efff;
  padding: 7px 10px;
  border-radius: 5px;
}
.job-actions {
  display: grid;
  gap: 10px;
  justify-items: end;
}
.job-actions button {
  background: #071a29;
  color: #fff;
  border: 0;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
}
.job-actions button:hover {
  background: #12568a;
}
.job-actions button:disabled {
  background: #127a5d;
  cursor: default;
}
.job-actions span {
  font-size: 13px;
  color: #526273;
}
.job-actions button:focus-visible {
  outline: 2px solid #36d2ff;
  outline-offset: 2px;
}
@media (max-width: 800px) {
  .job-card {
    grid-template-columns: auto 1fr;
    gap: 14px;
    padding: 14px;
  }
  .job-details h3 {
    font-size: 1rem;
  }
  .job-details ul {
    margin: 8px 0;
  }
  .job-actions {
    grid-column: 1 / -1;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
  }
  .job-actions span {
    margin-left: auto;
  }
}
@media (max-width: 480px) {
  .job-card {
    grid-template-columns: 1fr;
  }
  .company-abbr {
    width: fit-content;
  }
  .job-actions span {
    width: 100%;
    margin-left: 0;
  }
}
</style>
