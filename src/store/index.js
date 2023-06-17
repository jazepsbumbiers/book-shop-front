import Vue from 'vue';
import Vuex from 'vuex';

import { getRequest, endPoints } from '@/services/api';
import { parseItems } from '@/helpers/book';

Vue.use(Vuex);

const state = () => ({
    loading: false,
    url: '/api/books',
    items: [],
    initialItems: [],
});

const mutations = {
    setLoading (state, loading) {
        state.loading = loading;
    },
    setUrl (state, url) {
        state.url = url;
    },
    setItems (state, items) {
        state.items = parseItems(items);
    },
    setInitialItems (state, items) {
        state.initialItems = parseItems(items);
    },
};

const actions = {
    setUrl ({ commit }, url) {
        commit('setUrl', url);
    },
    async fetchBooks ({ commit, getters }) {
        commit('setLoading', true);

        const response = await getRequest(getters.getUrl);
        const books = response?.data ?? [];

        commit('setLoading', false);

        commit('setInitialItems', books);
        commit('setItems', books);
    },
    async searchBooks ({ commit, dispatch, getters }, query) {
        if (!query) {
            dispatch('fetchBooks', getters.getUrl);
            return;
        }

        commit('setLoading', true);

        const response = await getRequest(getters.getUrl, {query});
        const books = response?.data ?? [];

        commit('setLoading', false);

        commit('setItems', books);
    },
    async buyBook ({ commit, dispatch, getters }, book) {
        commit('setLoading', true);

        const { bookId, copies } = book;
        
        await getRequest(endPoints?.buy ?? '/books/buy', {bookId, copies});

        commit('setLoading', false);
        
        dispatch('fetchBooks', getters.getUrl);
    },
};

const getters = {
    getLoading: state => state.loading,
    getUrl: state => state.url,
    getItems: state => state.items,
    getInitialItems: state => state.initialItems,
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
});
