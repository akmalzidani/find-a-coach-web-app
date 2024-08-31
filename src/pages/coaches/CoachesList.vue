<script setup>
import { RouterLink } from 'vue-router'
import { useCoachesStore } from '@/stores/coaches'
import CoachItem from '@/components/coaches/CoachItem.vue'

const coachesStore = useCoachesStore()
const { coaches, hasCoaches } = coachesStore
</script>

<template>
  <section>Filter</section>
  <section>
    <div class="controls">
      <button>Refresh</button>
      <RouterLink to="/register">Register as Coach</RouterLink>
    </div>
    <ul v-if="hasCoaches">
      <CoachItem
        v-for="coach in coaches"
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
