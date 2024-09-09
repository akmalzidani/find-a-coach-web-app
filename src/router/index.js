import UserAuth from '@/pages/auth/UserAuth.vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/coaches'
    },
    {
      path: '/coaches',
      name: 'coaches',
      component: () => import('../pages/coaches/CoachesList.vue')
    },
    {
      path: '/coaches/:id',
      component: () => import('../pages/coaches/CoachDetail.vue'),
      props: true,
      children: [{ path: 'contact', component: () => import('../pages/requests/ContactCoach.vue') }]
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../pages/coaches/CoachRegistration.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/requests',
      name: 'requests',
      component: () => import('../pages/requests/RequestReceived.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/auth',
      name: 'auth',
      component: UserAuth,
      meta: { requiresUnauth: true }
    },
    {
      path: '/:notFound(.*)',
      component: () => import('../pages/NotFound.vue')
    }
  ]
})

router.beforeEach((to, _, next) => {
  const authStore = useAuthStore()
  const { isAuthenticated } = storeToRefs(authStore)
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next('/auth')
  } else if (to.meta.requiresUnauth && isAuthenticated.value) {
    next('/coaches')
  } else {
    next()
  }
})

export default router
