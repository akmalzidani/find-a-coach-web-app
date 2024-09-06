<script setup>
import { useCoachesStore } from '@/stores/coaches'
import CoachItem from '@/components/coaches/CoachItem.vue'
import CoachFilter from '@/components/coaches/CoachFilter.vue'
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const coachesStore = useCoachesStore()
const { loadCoaches, setFilters } = coachesStore
const { filteredCoaches, hasCoaches, isCoach } = storeToRefs(coachesStore)

const isLoading = ref()
const error = ref(null)

onMounted(async () => {
  loadData()
})

const loadData = async (refresh = false) => {
  isLoading.value = true
  try {
    await loadCoaches(refresh)
  } catch (err) {
    error.value = err.message || 'Something went wrong!'
  }
  isLoading.value = false
}

const handleError = () => {
  error.value = null
}
</script>

<template>
  <div>
    <BaseDialog :show="!!error" title="An error occured!" @close="handleError">
      <p>{{ error }}</p>
    </BaseDialog>
    <section>
      <CoachFilter @change-filter="setFilters" />
    </section>
    <section>
      <BaseCard>
        <div class="controls">
          <BaseButton mode="outline" @click="loadData(true)">Refresh</BaseButton>
          <BaseButton v-if="!isCoach && !isLoading" isLink to="/register"
            >Register as Coach</BaseButton
          >
        </div>
        <div v-if="isLoading">
          <BaseSpinner />
        </div>
        <ul v-else-if="hasCoaches && !isLoading">
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
      </BaseCard>
    </section>
  </div>
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
