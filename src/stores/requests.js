import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRequestsStore = defineStore('requests', () => {
  const requests = ref([])

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

  return { requests, addRequest }
})
