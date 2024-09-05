import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', () => {
  const userId = ref('c3')

  return { userId }
})
