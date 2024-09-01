import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useRequestsStore = defineStore('requests', () => {
  const requests = ref([])

  const getRequests = computed(() => requests.value)
  const hasRequests = computed(() => getRequests.value && getRequests.value.length > 0)

  function addRequest(data) {
    const newRequest = {
      id: new Date().toISOString(),
      coachId: data.coachId,
      userEmail: data.email,
      message: data.message,
      lastName: data.last,
      areas: data.areas,
      description: data.desc,
      hourlyRate: data.rate
    }

    requests.value.push(newRequest)
  }

  return { requests, getRequests, hasRequests, addRequest }
})
