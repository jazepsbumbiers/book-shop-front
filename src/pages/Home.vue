<template>
    <List
        ref="list"
        @items-loaded="(items) => $emit('items-loaded', items)"
    />
</template>

<script>
    import List from '@/components/List';

    export default {
        components: {
            List,
        },
    };
</script>
