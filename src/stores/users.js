import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', () => {
  const userId = ref('c3')

  const getUserId = computed(() => userId.value)

  return { userId, getUserId }
})
