<template>
    <b-overlay
        :show="loading"
        rounded="sm"
        spinner-variant="primary"
    >
        <div v-if="items.length" class="d-flex justify-content-center mt-5">
            <h5 class="text-primary font-weight-bold">
                Your books <b-badge variant="primary" class="ml-3 mt-1">{{ items.length }}</b-badge>
            </h5>
        </div>

        <div v-if="!loading && !items.length" class="d-flex justify-content-center mt-5">
            <h5 class="text-danger font-weight-bold">
                No books found...
            </h5>
        </div>

        <b-container class="mb-5">
            <b-row>
                <b-col
                    v-for="(item, idx) in items"
                    :key="idx"
                    xs="6"
                    sm="6"
                    md="4"
                    lg="3"
                    class="d-flex align-items-stretch"
                >
                    <BookCard
                        :book="item"
                    />
                </b-col>
            </b-row>
        </b-container>
    </b-overlay>
</template>

<script>
    import BookCard from '@/components/BookCard';
    import { localAPI } from '../services/api';
    import moment from 'moment';

    export default {
        components: {
            BookCard,
        },
        props: {
            //
        },
        data() {
            return {
                loading: false,
                books: [],
            };
        },
        computed: {
            items() {
                return this.books.map(item => ({
                    ...item,
                    date_published: moment(item.date_published).format('DD.MM.YYYY'),
                    authors: item.authors.map(author => `${author.name} ${author.surname}`).join(', ') || '-',
                }));
            },
        },
        watch: {
            books(items) {
                this.$emit('items-loaded', items);
            },
        },
        created() {
            this.fetchData();
        },
        methods: {
            async fetchData() {
                this.loading = true;

                const response = await localAPI.get(`/books`);

                this.books = response.data;

                this.loading = false;
            },
        },
    };
</script>

<style>
    /* for centering b-overlay */
    .position-absolute {
        position: fixed !important;
    }
</style>