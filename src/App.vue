<template>
    <div>
        <Header />

        <router-view
            ref="router"
        />
    </div>
</template>

<script>
    import Header from '@/components/Header';
    import { mapActions } from 'vuex';

    export default {
        components: {
            Header,
        },
        watch: {
            $route(route) {
                const url = route.name === 'Home'
                    ? '/books'
                    : '/api/books/top-10';
                    
                this.setUrl(url);
            },
        },
        methods: {
            ...mapActions([
                'setUrl',
            ]),
        },
    };
</script>
