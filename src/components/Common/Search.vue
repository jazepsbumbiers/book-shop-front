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
                searchTerm: 'getSearchTerm',
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
                this.setSearchTerm({ query: value });
            },
            // FIXME: this causes double data fetch on page laod
            searchTerm(value) {
                this.query = value;
            },
        },
        methods: {
            ...mapActions([
                'setSearchTerm',
            ]),
        },
    };
</script>

<style scoped>
    input[type="text"]:disabled, button:disabled {
        cursor: not-allowed;
    }
</style>
