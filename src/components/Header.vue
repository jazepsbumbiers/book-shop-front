<template>
    <div>
        <Navbar
            v-bind="{...$props}"
        />
    </div>
</template>

<script>
    import Navbar from '@/components/Header/Navbar';

    export default {
        components: {
            Navbar,
        },
        props: {
            searchAllowed: {
                type: Boolean,
                default: true,
            },
        },
    };
</script>
