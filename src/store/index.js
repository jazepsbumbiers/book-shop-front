import Vue from 'vue';
import Vuex from 'vuex';

import { getRequest } from '../services/api';
import { parseItems } from '../helpers/book';

Vue.use(Vuex);

const state = () => ({
    loading: false,
    items: [],
    initialItems: [],
});

const mutations = {
    setItems (state, items) {
        state.items = parseItems(items);
    },
    setInitialItems (state, items) {
        state.initialItems = parseItems(items);
    },
    setLoading (state, loading) {
        state.loading = loading;
    },
};

const actions = {
    async fetchBooks ({ commit }) {
        commit('setLoading', true);

        const response = await getRequest('/books');
        const books = response?.data ?? [];

        commit('setLoading', false);

        commit('setInitialItems', books);
        commit('setItems', books);
    },
    async searchBooks ({ commit, dispatch }, query) {
        if (!query) {
            dispatch('fetchBooks');
            return;
        }

        commit('setLoading', true);

        const response = await getRequest('/books', {query});
        const books = response?.data ?? [];

        commit('setLoading', false);

        commit('setItems', books);
    },
    async buyBook ({ commit, dispatch }, book) {
        commit('setLoading', true);

        const { bookId, copies } = book;
        
        await getRequest('/books/buy', {bookId, copies});

        commit('setLoading', false);
        
        dispatch('fetchBooks');
    },
};

const getters = {
    getItems: state => state.items,
    getInitialItems: state => state.initialItems,
    getLoading: state => state.loading,
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
});
