<template>
    <b-input-group>
        <b-form-input
            v-model.trim="query"
            :debounce="750"
            :placeholder="placeholder"
            :disabled="!searchAllowed"
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
    import { localAPI } from '../../services/api';

    export default {
        props: {
            searchAllowed: {
                type: Boolean,
                default: true,
            },
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
            clearSearchDisabled() {
                return Boolean(!this.query.length);
            },
        },
        watch: {
            async query(value) {
                const response = await localAPI.get(`/books?query=${value}`);

                console.log(response.data);
            },
        },
    };
</script>

<style scoped>
    input[type="text"]:disabled, button:disabled {
        cursor: not-allowed;
    }
</style>
