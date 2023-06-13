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
                <span class="font-weight-bold">Price:</span>
                {{ book.price }}<i class="las la-euro-sign"></i>
            </div>

            <div>
                <span class="font-weight-bold">Copies purchased:</span>
                {{ book.copies_purchased }}
            </div>
            
            <div>
                <b-form-rating
                    :value="book.rating"
                    readonly
                    inline
                    size="lg"
                    no-border
                    color="#ff8800"
                    class="p-0 mt-2"
                    style="background-color: #f8f9fa;"
                />
            </div>
        </b-card-text>

        <b-card-text class="mt-3">
            <small class="text-muted d-block">Date published: {{ book.date_published }}</small>
        </b-card-text>
    </b-card>
</template>

<script>
    export default {
        props: {
            book: {
                type: Object,
                default: () => ({}),
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
    };
</script>