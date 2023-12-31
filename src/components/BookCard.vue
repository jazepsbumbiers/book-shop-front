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
                <h6 class="font-weight-bold">{{ copiesSoldInPeriodText }}:</h6>
                {{ book.copies_sold_in_period }}
            </div>

            <div v-if="$route.name === 'Home'">
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
                    :book-id="book.id"
                />
            </div>

            <div>
                <small class="text-muted d-block">Date published: {{ book.date_published }}</small>
            </div>
        </b-card-text>

        <b-modal
            :id="`show-book-${book.id}-summary-modal`"
            title="Summary"
            hide-footer
            centered
        >
            <small class="text-muted d-block">Book: {{ book.name }}</small> <hr>
            <p class="text-justify">{{ book.summary }}</p>
        </b-modal>
    </b-card>
</template>

<script>
    import BuyBookControls from '@/components/BuyBookControls';

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
        computed: {
            copiesSoldInPeriodText() {
                const timePeriod = this.$route.name === 'Home' ? 'this month' : 'total';

                return `Copies sold (${timePeriod})`;
            },
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

    .card-text > div:last-child {
        margin-top: 1rem !important;
    }
</style>
