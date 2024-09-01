<script setup>
import { useCoachesStore } from '@/stores/coaches'
import { computed } from 'vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({ id: { type: String, required: true } })

const route = useRoute()

const coachesStore = useCoachesStore()
const { getCoaches } = coachesStore

const selectedCoach = ref(getCoaches.find((coach) => coach.id === props.id))

const fullName = computed(() => `${selectedCoach.value.firstName} ${selectedCoach.value.lastName}`)
const contactLink = computed(() => `${route.path}/${props.id}/contact`)
const areas = computed(() => selectedCoach.value.areas)
const rate = computed(() => selectedCoach.value.hourlyRate)
const description = computed(() => selectedCoach.value.description)
</script>

<template>
  <section>
    <BaseCard>
      <h2>{{ fullName }}</h2>
      <h3>${{ rate }}/hour</h3>
    </BaseCard>
  </section>
  <section>
    <BaseCard>
      <header>
        <h2>Intersted? Reach out now!</h2>
        <BaseButton isLink :to="contactLink">Contact</BaseButton>
      </header>
      <RouterView />
    </BaseCard>
  </section>
  <section>
    <BaseCard>
      <BaseBadge v-for="area in areas" :key="area" :type="area" :title="area"> </BaseBadge>
      <p>{{ description }}</p>
    </BaseCard>
  </section>
</template>
