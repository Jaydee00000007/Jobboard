<template>
  <section class="company-search">
    <input
      v-model="modelSearch"
      type="text"
      placeholder="Search by company name or industry"
      aria-label="Search companies"
      @input="$emit('update:search', modelSearch)"
    />
    <div class="location-wrap">
      <input
        v-model="modelLocation"
        type="text"
        placeholder="Location e.g. Lagos"
        aria-label="Search companies by location"
        @input="$emit('update:location', modelLocation)"
      />
      <button type="button" class="search" @click="$emit('search')">Search</button>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  search: { type: String, default: '' },
  location: { type: String, default: '' },
})

defineEmits(['update:search', 'update:location', 'search'])

const modelSearch = ref(props.search)
const modelLocation = ref(props.location)

watch(
  () => props.search,
  (value) => {
    modelSearch.value = value
  },
)
watch(
  () => props.location,
  (value) => {
    modelLocation.value = value
  },
)
</script>

<style scoped>
.company-search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: min(850px, 100%);
  min-height: 50px;
  padding: 10px 20px;
  background: #fff;
  border-radius: 15px;
  box-sizing: border-box;
}
.company-search > input,
.location-wrap input {
  min-width: 0;
  height: 42px;
  border: 0;
  padding: 0 16px;
  font-size: 15px;
}
.company-search > input {
  flex: 1;
}
.location-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  border-left: 1px solid #071a29;
}
.location-wrap input {
  flex: 1;
}
.company-search input:focus {
  outline: none;
}
.company-search input:focus-visible,
.search:focus-visible {
  outline: 2px solid #36d2ff;
  outline-offset: 2px;
}
.search {
  background: orange;
  border: none;
  border-radius: 6px;
  padding: 10px 16px;
  font-weight: 700;
  cursor: pointer;
}
@media (max-width: 700px) {
  .company-search {
    flex-direction: column;
    align-items: stretch;
    padding: 12px;
    gap: 8px;
  }
  .location-wrap {
    border-left: 0;
    border-top: 1px solid #071a29;
    padding-top: 8px;
    width: 100%;
  }
  .company-search > input,
  .location-wrap input {
    width: 100%;
  }
  .search {
    width: 100%;
  }
}
</style>
