import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useUsersStore } from './users'

export const useCoachesStore = defineStore('coaches', () => {
  const usersStore = useUsersStore()
  const { getUserId } = usersStore

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

  //-------- getters
  const getCoaches = computed(() => coaches.value)
  const hasCoaches = computed(() => getCoaches.value.length > 0)
  const isCoach = computed(() => getCoaches.value.some((coach) => coach.id === getUserId))

  //-------- actions
  const setCoaches = function (data) {
    coaches.value = data
  }

  const loadCoaches = async function () {
    const response = await fetch(
      `https://find-a-coach-web-app-328d3-default-rtdb.asia-southeast1.firebasedatabase.app/coaches.json`
    )
    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch coaches')
      console.error(error)
    }

    const coaches = []

    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        areas: responseData[key].areas,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate
      }
      coaches.push(coach)
    }

    setCoaches(coaches)
  }
  const registerCoach = async function (data) {
    const userId = getUserId
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      areas: data.areas,
      description: data.desc,
      hourlyRate: data.rate
    }

    const response = await fetch(
      `https://find-a-coach-web-app-328d3-default-rtdb.asia-southeast1.firebasedatabase.app/coaches/${userId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData)
      }
    )

    if (!response.ok) {
      const error = new Error('Failed to register coach')
      console.error(error)
    }

    coaches.value.push({ ...coachData, id: userId })
  }

  return { coaches, getCoaches, hasCoaches, isCoach, registerCoach, loadCoaches }
})
