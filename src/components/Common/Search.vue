<template>
    <b-input-group>
        <template #append>
            <b-input-group-text @click="clearSearch">
                <i class="las la-times"></i>
            </b-input-group-text>
        </template>

        <b-form-input
            type="text"
            v-model.trim="query"
            debounce="500"
            :placeholder="placeholder"
            :disabled="!searchAllowed"
        />
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
        watch: {
            async query(value) {
                const response = await localAPI.get(`/books?query=${value}`);

                console.log(response.data);
            },
        },
        methods: {
            clearSearch() {
                this.query = '';
            },
        },
    };
</script>