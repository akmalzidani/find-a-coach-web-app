<script setup>
import { useCoachesStore } from '@/stores/coaches'
import CoachItem from '@/components/coaches/CoachItem.vue'

const coachesStore = useCoachesStore()
const { coaches, hasCoaches } = coachesStore
</script>

<template>
  <BaseCard>
    <section>Filter</section>
    <section>
      <div class="controls">
        <BaseButton mode="outline">Refresh</BaseButton>
        <BaseButton isLink to="/register">Register as Coach</BaseButton>
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
