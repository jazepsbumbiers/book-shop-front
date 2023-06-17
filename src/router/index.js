import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/pages/Home';

import store from '@/store'; 
import { endPoints } from '@/services/api';

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

router.beforeEach((to, from, next) => {
    const endPoint = to.name === 'Home' ? 'index' : 'top10';
    const url = endPoints[endPoint] ?? (endPoint === 'index' ? '/books' : '/books/top-10');  

    store.dispatch('setUrl', url);

    if (store.getters.getSearchTerm) {
        store.dispatch('setSearchTerm', { query: '', refreshItems: false });
    }

    next();
});

export default router;
