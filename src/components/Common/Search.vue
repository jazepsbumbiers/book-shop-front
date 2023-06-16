<template>
    <b-input-group>
        <b-form-input
            v-model.trim="query"
            :debounce="750"
            :placeholder="placeholder"
            :disabled="searchDisabled"
        />

        <b-input-group-append>
            <b-button
                variant="danger"
                :disabled="clearSearchDisabled"
                @click="query = ''"
            >
                <i class="las la-times"></i>
            </b-button>
        </b-input-group-append>
    </b-input-group>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: {
            placeholder: {
                type: String,
                default: 'Enter book name / author',
            },
        },
        data() {
            return {
                query: '',
            };
        },
        computed: {
            ...mapGetters({
                initialItems: 'getInitialItems',
            }),
            clearSearchDisabled() {
                return Boolean(!this.query.length);
            },
            searchDisabled() {
                return Boolean(!this.initialItems.length);
            },
        },
        watch: {
            query(value) {
                const url = this.$route.name === 'Home'
                    ? '/books'
                    : '/api/books/top-10';

                this.searchBooks({url, query: value});
            },
        },
        methods: {
            ...mapActions([
                'searchBooks',
            ]),
        },
    };
</script>

<style scoped>
    input[type="text"]:disabled, button:disabled {
        cursor: not-allowed;
    }
</style>
