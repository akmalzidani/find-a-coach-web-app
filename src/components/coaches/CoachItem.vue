<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const props = defineProps({
  id: String,
  firstName: String,
  lastName: String,
  rate: Number,
  areas: Array
})

const fullname = computed(() => `${props.firstName} ${props.lastName}`)
const coachContactLink = computed(() => `${route.path}/${props.id}/contact`)
const coachDetailsLink = computed(() => `${route.path}/${props.id}`)
</script>

<template>
  <li>
    <h3>{{ fullname }}</h3>
    <h4>${{ rate }}/hour</h4>
    <div>
      <BaseBadge v-for="area in areas" :key="area" :type="area" :title="area"></BaseBadge>
    </div>
    <div class="actions">
      <BaseButton mode="outline" isLink :to="coachContactLink">Contact</BaseButton>
      <BaseButton isLink :to="coachDetailsLink">View Details</BaseButton>
    </div>
  </li>
</template>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
