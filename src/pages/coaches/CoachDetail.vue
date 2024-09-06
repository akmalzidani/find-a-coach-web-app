<script setup>
import { useCoachesStore } from '@/stores/coaches'
import { storeToRefs } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({ id: { type: String, required: true } })

const route = useRoute()

const coachesStore = useCoachesStore()
const { loadCoaches } = coachesStore
const { coaches } = storeToRefs(coachesStore)

const isLoading = ref()

onMounted(async () => {
  await loadData()
})

const loadData = async () => {
  isLoading.value = true
  await loadCoaches()
  isLoading.value = false
}
const selectedCoach = computed(() => coaches.value.find((coach) => coach.id === props.id))

const data = computed(() => ({
  fullName: `${selectedCoach.value.firstName} ${selectedCoach.value.lastName}`,
  contactLink: `${route.path}/contact`,
  areas: selectedCoach.value.areas,
  rate: selectedCoach.value.hourlyRate,
  description: selectedCoach.value.description
}))

const isContactPage = computed(() => route.path === data.value.contactLink)
</script>

<template>
  <div v-if="isLoading">
    <BaseCard>
      <div>
        <BaseSpinner />
      </div>
    </BaseCard>
  </div>
  <div v-else-if="!selectedCoach">
    <BaseCard>
      <h2>Coach not found</h2>
    </BaseCard>
  </div>
  <div v-else>
    <section>
      <BaseCard>
        <h2>{{ data.fullName }}</h2>
        <h3>${{ data.rate }}/hour</h3>
      </BaseCard>
    </section>
    <section>
      <BaseCard>
        <header>
          <h2>Interested? Reach out now!</h2>
          <BaseButton v-if="!isContactPage" isLink :to="data.contactLink"> Contact </BaseButton>
          <BaseButton v-else @click="() => router.push(data.contactLink)" disabled>
            Contact
          </BaseButton>
        </header>
        <RouterView />
      </BaseCard>
    </section>
    <section>
      <BaseCard>
        <BaseBadge v-for="area in data.areas" :key="area" :type="area" :title="area"> </BaseBadge>
        <p>{{ data.description }}</p>
      </BaseCard>
    </section>
  </div>
</template>
