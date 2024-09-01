<script setup>
import RequestItem from '@/components/requests/RequestItem.vue'
import { useRequestsStore } from '@/stores/requests'

const requestsStore = useRequestsStore()
const { getRequests, hasRequests } = requestsStore
</script>

<template>
  <section>
    <BaseCard>
      <header>
        <h2>Request Received</h2>
      </header>
      <ul v-if="hasRequests">
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
