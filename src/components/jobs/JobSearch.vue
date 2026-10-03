<template>
      <section class="job-search">
          <div class="search-space">
              <div class="job-wrap">
                  <input
                    v-model="modelSearch"
                    type="text"
                    placeholder="Job title or keyword — e.g. Product Designer"
                    aria-label="Search jobs by title or keyword"
                    @input="$emit('update:search', modelSearch)"
                  />
              </div>
              <div class="location-wrap">
                <input
                  v-model="modelLocation"
                  type="text"
                  placeholder="Location e.g. Lagos"
                  aria-label="Search jobs by location"
                  @input="$emit('update:location', modelLocation)"
                />
              </div>
        </div>
          <button type="button" class="search" @click="$emit('search')">Search</button>
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

watch(() => props.search, (value) => { modelSearch.value = value })
watch(() => props.location, (value) => { modelLocation.value = value })
</script>

<style scoped>
.job-search {
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
.job-search > input,
.location-wrap input {
  min-width: 0;
  height: 42px;
  border: 0;
  padding: 0 16px;
  font-size: 15px;
}
.job-search > input { flex: 1; }
.location-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  border-left: 1px solid #071a29;
}
.location-wrap input { flex: 1; }
.job-search input:focus { outline: none; }
.job-search input:focus-visible,
.search:focus-visible { outline: 2px solid #36d2ff; outline-offset: 2px; }
.search {
  background: orange;
  border: none;
  border-radius: 6px;
  padding: 10px 16px;
  font-weight: 700;
  cursor: pointer;
}
@media (max-width: 700px) {
  .job-search { flex-direction: column; align-items: stretch; padding: 12px; gap: 8px; width: 100%}
  .location-wrap {width: 50%; }
  .location-wrap input { width: 100%; height: 30px; font-size: 12px; align-self: start;}
  .search { width: 100%; align-self: center; }
  .job-wrap {
    width: 50%;
  }
  .job-wrap input{
    border: 0px;
    height: 30px;
  }
  .job-wrap input:focus{
    outline: none;
  }
  .location-wrap input:focus{ outline: none;}
  .search-space{
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>