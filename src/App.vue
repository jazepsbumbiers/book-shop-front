<template>
    <div>
        <Header
            :search-allowed="searchAllowed"
        />

        <router-view
            ref="router"
            @items-loaded="(items) => this.setSearchAbility(items)"
        />
    </div>
</template>

<script>
    import Header from '@/components/Header';

    export default {
        components: {
            Header,
        },
        data() {
            return {
                searchAllowed: false,
            };
        },
        methods: {
            setSearchAbility(items) {
                this.searchAllowed = Boolean(items.length);
            },
        },
    };
</script>
