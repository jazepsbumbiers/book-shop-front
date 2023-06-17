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

    export default {
        components: {
            Header,
        },
    };
</script>
