import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCoachesStore = defineStore('coaches', () => {
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
  const getCoaches = computed(() => coaches.value)
  const hasCoaches = computed(() => getCoaches.value.length > 0)
  const isCoach = computed(() => (id) => getCoaches.value.some((coach) => coach.id === id))

  function registerCoach(data) {
    const coachData = {
      id: 'c3',
      firstName: data.first,
      lastName: data.last,
      areas: data.areas,
      description: data.desc,
      hourlyRate: data.rate
    }
    coaches.value.push(coachData)
  }

  return { coaches, getCoaches, hasCoaches, registerCoach, isCoach }
})
