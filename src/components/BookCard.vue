<template>
    <b-card
        :title="book.name"
        :img-src="book.image || require('../assets/no-img.webp')"
        :img-alt="book.name"
        img-top
        :img-height="imgHeight"
        :img-width="imgWidth"
        :bg-variant="bgVariant"
        :tag="tag"
        class="mr-3 mt-5"
    >
        <b-card-text>
            <div>
                <h6 class="font-weight-bold">Authors:</h6>
                <span class="truncated-text">{{ book.authors }}</span> 
            </div>

            <div>
                <h6 class="font-weight-bold">Price:</h6>
                {{ book.price }}<i class="las la-euro-sign"></i> 
            </div>

            <div>
                <h6 class="font-weight-bold">Copies sold (this month):</h6>
                {{ book.copies_sold_in_month }}
            </div>

            <div>
                <h6 class="font-weight-bold">Copies sold (total):</h6>
                {{ book.copies_sold_in_total }}
            </div>
            
            <div>
                <b-form-rating
                    :value="book.rating"
                    readonly
                    inline
                    size="lg"
                    no-border
                    color="#ff8800"
                    class="p-0"
                    style="background-color: #f8f9fa;"
                />
            </div>

            <div style="margin-bottom: 1rem !important;">
                <a
                    href="javascript:void(0);"
                    v-b-modal="`show-book-${book.id}-summary-modal`"
                >
                    Summary
                </a>
            </div>

            <div>
                <BuyBookControls 
                    @buy="copies => buyBook({ bookId: book.id, copies })"
                />
            </div>

            <div>
                <small class="text-muted d-block">Date published: {{ book.date_published }}</small>
            </div>
        </b-card-text>

        <b-modal
            :id="`show-book-${book.id}-summary-modal`"
            :title="`Book <${book.name}> summary`"
            hide-footer
            centered
        >
            <p class="text-justify">{{ book.summary }}</p>
        </b-modal>
    </b-card>
</template>

<script>
    import BuyBookControls from '@/components/BuyBookControls';
    import { mapActions } from 'vuex';

    export default {
        components: {
            BuyBookControls,
        },
        props: {
            book: {
                type: Object,
                required: true,
            },
            imgHeight: {
                type: Number,
                default: 250,
            },
            imgWidth: {
                type: Number,
                default: 250,
            },
            bgVariant: {
                type: String,
                default: 'light',
            },
            tag: {
                type: String,
                default: 'article',
            },
        },
        methods: {
            ...mapActions([
                'buyBook',
            ]),
        },
    };
</script>

<style scoped>
    .card-title {
        text-align: center !important;
        font-size: 1.2rem;
    }

    .truncated-text, .card-title {
        display: block;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
    }

    .truncated-text:hover, .card-title:hover {
        overflow: visible; 
        white-space: normal;
        height: auto;
    }

    .card-body {
        overflow: hidden;
    }

    .card-text > div {
        text-align: center !important;
    }

    .card-text > div:not(:last-child) {
        margin-bottom: 0.5rem !important;
    }
</style>
