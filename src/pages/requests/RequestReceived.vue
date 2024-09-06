<script setup>
import RequestItem from '@/components/requests/RequestItem.vue'
import { useRequestsStore } from '@/stores/requests'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'

const requestsStore = useRequestsStore()
const { getRequests, hasRequests } = storeToRefs(requestsStore)

const isLoading = ref(false)
const error = ref(null)

onMounted(async () => {
  await loadData()
})

const loadData = async () => {
  isLoading.value = true
  try {
    await requestsStore.loadRequests()
  } catch (error) {
    error.value = error.message || 'Something went wrong!'
  }
  isLoading.value = false
}

const handleError = () => {
  error.value = null
}
</script>

<template>
  <div>
    <BaseDialog :show="!!error" title="An error occured!" @close="handleError = null">
      <p>{{ error }}</p></BaseDialog
    >
    <section>
      <BaseCard>
        <header>
          <h2>Request Received</h2>
        </header>
        <div v-if="isLoading">
          <BaseSpinner />
        </div>
        <ul v-else-if="hasRequests && !isLoading">
          <RequestItem
            v-for="request in getRequests"
            :key="request.id"
            :email="request.userEmail"
            :message="request.message"
          />
        </ul>
        <h3 v-else>You haven't received any requests yet!</h3>
      </BaseCard>
    </section>
  </div>
</template>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
