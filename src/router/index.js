import { createRouter, createWebHistory } from 'vue-router'
// import CoachDetail from '@/pages/coaches/CoachDetail.vue'
// import CoachRegistration from '@/pages/coaches/CoachRegistration.vue'
// import CoachesList from '@/pages/coaches/CoachesList.vue'
// import ContactCoach from '@/pages/requests/ContactCoach.vue'
// import RequestReceived from '@/pages/requests/RequestReceived.vue'
import UserAuth from '@/pages/auth/UserAuth.vue'

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
      component: () => import('../pages/coaches/CoachRegistration.vue')
    },
    {
      path: '/requests',
      name: 'requests',
      component: () => import('../pages/requests/RequestReceived.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      component: UserAuth
    },
    {
      path: '/:notFound(.*)',
      component: () => import('../pages/NotFound.vue')
    }
  ]
})

export default router
