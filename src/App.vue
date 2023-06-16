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
    import { endPoints } from './services/api';
    import { mapActions } from 'vuex';

    export default {
        components: {
            Header,
        },
        watch: {
            $route: {
                handler(route) {
                    const endPoint = route.name === 'Home' ? 'index' : 'top10';
                    const url = endPoints[endPoint] ?? (endPoint === 'index' ? '/books' : '/books/top-10');                    
                    
                    this.setUrl(url);
                },
                immediate: true,
            },
        },
        methods: {
            ...mapActions([
                'setUrl',
            ]),
        },
    };
</script>
