<template>
    <b-navbar
        :sticky="sticky"
        :toggleable="toggleable"
        :type="type"
        :variant="variant"
    >
        <b-navbar-brand href="#" @click.prevent="navigateToHome">
            {{ siteTitle }}
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav v-if="navItems.length">
                <b-nav-item
                    v-for="(item, idx) in navItems"
                    :key="idx"
                    :to="item.path"
                >
                    {{ item.name }}
                </b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <b-nav-form>
                    <Search
                        :search-allowed="searchAllowed"
                        class="mr-3"
                    />
                </b-nav-form>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
    import Search from '@/components/Common/Search';

    export default {
        components: {
            Search,
        },
        props: {
            sticky: {
                type: Boolean,
                default: true,
            },
            toggleable: {
                type: [Boolean, String],
                default: 'lg',
            },
            type: {
                type: String,
                default: 'dark',
            },
            variant: {
                type: String,
                default: 'primary',
            },
            siteTitle: {
                type: String,
                default: 'Book Shop',
            },
            navItems: {
                type: Array,
                default: () => ([
                    {
                        name: 'Home',
                        path: '/',
                    },
                    {
                        name: 'Top 10',
                        path: '/top-10',
                    },
                ]),
            },
            searchAllowed: {
                type: Boolean,
                default: true,
            },
        },
        methods: {
            navigateToHome() {
                if (this.$route.name === 'Home') {
                    return;
                }

                this.$router.push('/');
            },
        },
    };
</script>