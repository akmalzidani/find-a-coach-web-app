<script setup>
import CoachForm from '@/components/coaches/CoachForm.vue'
import { useCoachesStore } from '@/stores/coaches'
import { useRouter } from 'vue-router'

const router = useRouter()

const coachStore = useCoachesStore()
const { registerCoach } = coachStore
const saveData = (formData) => {
  registerCoach(formData)
  router.replace('/coaches')
}
</script>

<template>
  <section>
    <BaseCard>
      <h2>Register as a coach now!</h2>
      <CoachForm @save-data="saveData" />
    </BaseCard>
  </section>
</template>
