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
    searchTerm: '',
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
    setSearchTerm (state, query) {
        state.searchTerm = query;
    },
};

const actions = {
    setUrl ({ commit }, url) {
        commit('setUrl', url);
    },
    setSearchTerm ({ commit, dispatch }, { query, refreshItems = true}) {
        commit('setSearchTerm', query);

        if (refreshItems) {
            dispatch('searchBooks');
        }
    },
    async fetchBooks ({ commit, getters }) {
        commit('setLoading', true);

        const response = await getRequest(getters.getUrl);
        const books = response?.data ?? [];

        commit('setLoading', false);

        commit('setInitialItems', books);
        commit('setItems', books);
    },
    async searchBooks ({ commit, dispatch, getters }) {
        if (!getters.getSearchTerm) {
            dispatch('fetchBooks', getters.getUrl);
            return;
        }

        commit('setLoading', true);

        const response = await getRequest(getters.getUrl, {query: getters.getSearchTerm});
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
    getSearchTerm: state => state.searchTerm,
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
});
