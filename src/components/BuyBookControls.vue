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
                @click="$emit('buy', value)" 
            >
                <i class="las la-shopping-cart" style="font-size: 24px;"></i>
            </b-button>
        </b-input-group-append>
    </b-input-group>
</template>

<script>
    export default {
        data() {
            return {
                value: 1,
            };
        },
    };
</script>
