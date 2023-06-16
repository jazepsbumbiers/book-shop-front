<template>
    <b-input-group>
        <b-form-spinbutton 
            v-model="value" 
            min="1" 
            max="100" 
            wrap 
            inline
        />

        <b-input-group-append>
            <b-button 
                variant="success" 
                size="sm"
                @click="requestBuyBook" 
            >
                <i class="las la-shopping-cart" style="font-size: 24px;"></i>
            </b-button>
        </b-input-group-append>
    </b-input-group>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        props: {
            bookId: {
                type: Number,
                required: true,
            },
        },
        data() {
            return {
                value: 1,
            };
        },
        methods: {
            ...mapActions([
                'buyBook',
            ]),
            requestBuyBook() {
                this.buyBook({ bookId: this.bookId, copies: this.value });
                
                this.value = 1;

                this.$bvToast.toast(
                    'Book bought successfully',
                    {
                        title: 'Item bought',
                        variant: 'success',
                        toaster: 'b-toaster-top-right',
                        toastClass: 'mb-2 mr-2',
                        solid: true,
                    }
                );
            },
        },
    };
</script>
