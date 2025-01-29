import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access');
  if(to.path !== '/login' && !token){
    next('/login');
  }else{
    next();
  }
});

export default router;