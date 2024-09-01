<script setup>
import { useCoachesStore } from '@/stores/coaches'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({ id: { type: String, required: true } })

const route = useRoute()

const coachesStore = useCoachesStore()
const { getCoaches } = coachesStore

const selectedCoach = computed(() => getCoaches.find((coach) => coach.id === props.id))

const data = computed(() => ({
  fullName: `${selectedCoach.value.firstName} ${selectedCoach.value.lastName}`,
  contactLink: `${route.path}/${props.id}/contact`,
  areas: selectedCoach.value.areas,
  rate: selectedCoach.value.hourlyRate,
  description: selectedCoach.value.description
}))
</script>

<template>
  <section>
    <BaseCard>
      <h2>{{ data.fullName }}</h2>
      <h3>${{ data.rate }}/hour</h3>
    </BaseCard>
  </section>
  <section>
    <BaseCard>
      <header>
        <h2>Intersted? Reach out now!</h2>
        <BaseButton isLink :to="data.contactLink">Contact</BaseButton>
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
</template>
