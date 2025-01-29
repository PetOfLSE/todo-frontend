export const routes = [
  {
    path: '/register',
    component: () => import('../page/RegisterPage.vue')
  },
  {
    path: '/',
    component: () => import('../page/HomePage.vue')
  }
]