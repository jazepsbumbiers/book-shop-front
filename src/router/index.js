import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/pages/Home';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/top-10',
        name: 'Top 10',
        component: () => import(/* webpackChunkName: "top-10" */ '@/pages/Top10'),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
