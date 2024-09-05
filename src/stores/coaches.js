import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useUsersStore } from './users'

const baseURL = import.meta.env.VITE_BASE_URL

export const useCoachesStore = defineStore('coaches', () => {
  const usersStore = useUsersStore()
  const { userId } = storeToRefs(usersStore)

  //-------- state
  const coaches = ref([
    {
      id: 'c1',
      firstName: 'Maximilian',
      lastName: 'Schwarzmüller',
      areas: ['frontend', 'backend', 'career'],
      description:
        "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
      hourlyRate: 30
    },
    {
      id: 'c2',
      firstName: 'Julie',
      lastName: 'Jones',
      areas: ['frontend', 'career'],
      description:
        'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
      hourlyRate: 30
    }
  ])

  const activeFilters = ref({
    frontend: true,
    backend: true,
    career: true
  })

  //-------- getters
  const hasCoaches = computed(() => coaches.value.length > 0)

  const isCoach = computed(() => coaches.value.some((coach) => coach.id === userId.value))

  const filteredCoaches = computed(() => {
    return coaches.value.filter(
      (coach) =>
        (activeFilters.value.frontend && coach.areas.includes('frontend')) ||
        (activeFilters.value.backend && coach.areas.includes('backend')) ||
        (activeFilters.value.career && coach.areas.includes('career'))
    )
  })

  //-------- actions
  const setFilters = (updatedFilters) => {
    activeFilters.value = updatedFilters
  }

  const setCoaches = function (data) {
    coaches.value = data
  }

  const loadCoaches = async function () {
    const response = await fetch(`${baseURL}/coaches.json`)
    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch coaches')
      throw error
    }

    const loadedCoaches = []

    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        areas: responseData[key].areas,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate
      }
      loadedCoaches.push(coach)
    }
    setCoaches(loadedCoaches)
    return loadedCoaches
  }
  const registerCoach = async function (data) {
    const id = userId.value
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      areas: data.areas,
      description: data.desc,
      hourlyRate: data.rate
    }

    const response = await fetch(`${baseURL}/coaches/${userId.value}.json`, {
      method: 'PUT',
      body: JSON.stringify(coachData)
    })

    if (!response.ok) {
      const error = new Error('Failed to register coach')
      console.error(error)
    }

    coaches.value.push({ ...coachData, id: id })
  }

  return { coaches, filteredCoaches, hasCoaches, isCoach, registerCoach, loadCoaches, setFilters }
})
