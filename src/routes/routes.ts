const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../page/HomePage.vue')
    }
]

export default routes;