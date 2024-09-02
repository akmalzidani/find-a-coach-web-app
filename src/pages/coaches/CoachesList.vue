<script setup>
import { useCoachesStore } from '@/stores/coaches'
import CoachItem from '@/components/coaches/CoachItem.vue'
import CoachFilter from '@/components/coaches/CoachFilter.vue'
import { ref, computed } from 'vue'

const coachesStore = useCoachesStore()
const { getCoaches, hasCoaches, isCoach, loadCoaches } = coachesStore

loadCoaches()

const filteredCoaches = computed(() => {
  const coaches = getCoaches
  return coaches.filter(
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
    <section><CoachFilter @change-filter="setFilters" /></section>
    <section>
      <div class="controls">
        <BaseButton mode="outline" @click="loadCoaches">Refresh</BaseButton>
        <BaseButton v-if="!isCoach" isLink to="/register">Register as Coach</BaseButton>
      </div>
      <ul v-if="hasCoaches">
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
