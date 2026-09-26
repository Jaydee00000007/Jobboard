<template>
  <aside class="filters">
    <div class="filter-header">
      <h4>FILTERS</h4>
      <button type="button" class="clear" @click="$emit('clear')">clear all</button>
    </div>

    <fieldset>
      <legend>Job type</legend>
      <label v-for="type in filterJobTypes" :key="type">
        <input type="checkbox" :value="type" v-model="types" @change="$emit('update:jobTypes', types)" />
        {{ type }}
      </label>
    </fieldset>

    <fieldset>
      <legend>Experience level</legend>
      <label v-for="level in experienceLevels" :key="level">
        <input type="radio" name="experience" :value="level" v-model="experience" @change="$emit('update:experience', experience)" />
        {{ level }}
      </label>
    </fieldset>

    <fieldset>
      <legend>Salary range</legend>
      <label v-for="range in filterSalaryRanges" :key="range.value">
        <input type="checkbox" :value="range.value" v-model="salaries" @change="$emit('update:salaryRanges', salaries)" />
        {{ range.label }}
      </label>
    </fieldset>
  </aside>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  jobTypes: { type: Array, default: () => [] },
  experience: { type: String, default: '' },
  salaryRanges: { type: Array, default: () => [] },
})

defineEmits(['update:jobTypes', 'update:experience', 'update:salaryRanges', 'clear'])

const types = ref([...props.jobTypes])
const experience = ref(props.experience)
const salaries = ref([...props.salaryRanges])

watch(() => props.jobTypes, value => { types.value = [...value] })
watch(() => props.experience, value => { experience.value = value })
watch(() => props.salaryRanges, value => { salaries.value = [...value] })

const filterJobTypes = ['Full-time', 'Part-time', 'Contract', 'Remote']
const experienceLevels = ['Entry level', 'Mid level', 'Senior', 'Lead / Manager']
const filterSalaryRanges = [
  { value: 'low', label: '₦200k - ₦500k' },
  { value: 'medium', label: '₦500k - ₦1m' },
  { value: 'high', label: '₦1m+' },
]
</script>

<style scoped>
.filters { display: flex; flex-direction: column; gap: 18px; }
.filter-header { display: flex; justify-content: space-between; align-items: center; }
.filter-header h4, fieldset legend { margin: 0; font-weight: 800; }
.clear { border: 0; background: none; color: orange; cursor: pointer; }
fieldset { border: 0; padding: 0; margin: 0; display: grid; gap: 10px; }
fieldset label { display: flex; align-items: center; gap: 10px; }
</style>