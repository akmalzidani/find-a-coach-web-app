import { computed, ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useAuthStore } from './auth'

const baseURL = import.meta.env.VITE_BASE_URL
const authStore = useAuthStore()
const { userId } = storeToRefs(authStore)

export const useRequestsStore = defineStore('requests', () => {
  //-------- state
  const requests = ref([])

  //-------- getters
  const getRequests = computed(() => requests.value.filter((req) => req.coachId === userId.value))
  const hasRequests = computed(() => getRequests.value && getRequests.value.length > 0)

  //-------- actions
  const setRequests = function (data) {
    requests.value = data
  }

  const addRequest = async function (data) {
    const newRequest = {
      userEmail: data.email,
      message: data.message
    }
    const response = await fetch(`${baseURL}/requests/${data.coachId}.json`, {
      method: 'POST',
      body: JSON.stringify(newRequest)
    })

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to send request')
      throw error
    }

    const responseData = await response.json()
    newRequest.id = responseData.name
    newRequest.coachId = data.coachId
    requests.value.push(newRequest)
  }

  const loadRequests = async function () {
    const coachId = userId.value
    const response = await fetch(`${baseURL}/requests/${coachId}.json`)
    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch requests')
      throw error
    }

    const loadedRequests = []

    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message
      }
      loadedRequests.push(request)
    }
    setRequests(loadedRequests)
  }

  return { requests, getRequests, hasRequests, addRequest, loadRequests }
})
