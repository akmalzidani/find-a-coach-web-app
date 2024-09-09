<script setup>
import TheHeader from '@/components/layout/TheHeader.vue'
import { useAuthStore } from './stores/auth'
import { watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const { autoLogin } = authStore
const { didAutoLogout } = storeToRefs(authStore)

onMounted(() => {
  autoLogin()
})

watch(didAutoLogout, (curValue, oldValue) => {
  if (curValue && curValue !== oldValue) {
    router.replace('/coaches')
  }
})
</script>

<template>
  <TheHeader />
  <RouterView v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </RouterView>
</template>

<style scoped>
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
