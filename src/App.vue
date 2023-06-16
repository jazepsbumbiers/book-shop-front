<template>
    <div>
        <Header />

        <transition
            mode="out-in"
            enter-active-class="animate__animated animate__fadeInDown"
            leave-active-class="animate__animated animate__fadeOutDown"
        >
            <router-view
                ref="router"
            />
        </transition>
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
