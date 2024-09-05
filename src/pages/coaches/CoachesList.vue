<script setup>
import { useCoachesStore } from '@/stores/coaches'
import CoachItem from '@/components/coaches/CoachItem.vue'
import CoachFilter from '@/components/coaches/CoachFilter.vue'
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const coachesStore = useCoachesStore()
const { loadCoaches } = coachesStore
const { hasCoaches, isCoach } = storeToRefs(coachesStore)

const isLoading = ref()

onMounted(async () => {
  isLoading.value = true
  await loadCoaches()
  isLoading.value = false
})

const filteredCoaches = computed(() => {
  return coachesStore.coaches.filter(
    (coach) =>
      (activeFilters.value.frontend && coach.areas.includes('frontend')) ||
      (activeFilters.value.backend && coach.areas.includes('backend')) ||
      (activeFilters.value.career && coach.areas.includes('career'))
  )
})

const activeFilters = ref({
  frontend: true,
  backend: true,
  career: true
})

const setFilters = (updatedFilters) => {
  activeFilters.value = updatedFilters
}
</script>

<template>
  <BaseCard>
    <section v-if="!isLoading">
      <CoachFilter @change-filter="setFilters" />
    </section>
    <section v-else>
      <div>Loading...</div>
    </section>
    <section>
      <div class="controls">
        <BaseButton mode="outline" @click="loadCoaches">Refresh</BaseButton>
        <BaseButton v-if="!isCoach && !isLoading" isLink to="/register"
          >Register as Coach</BaseButton
        >
      </div>
      <ul v-if="hasCoaches && !isLoading">
        <CoachItem
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :first-name="coach.firstName"
          :last-name="coach.lastName"
          :rate="coach.hourlyRate"
          :areas="coach.areas"
        />
      </ul>
      <h3 v-else>No coaches found.</h3>
    </section>
  </BaseCard>
</template>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
