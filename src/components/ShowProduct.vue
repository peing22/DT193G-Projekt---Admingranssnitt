<template>
    <p>{{ product.name }}</p>
    <button @click="$emit('editProduct', product)">Ändra</button>
    <button @click="confirmDelete">Radera</button>
    <div v-if="showConfirmation">
        <p>Vill du verkligen radera produkten?</p>
        <button @click="deleteProduct">Ja</button>
        <button @click="cancelDelete">Nej</button>
    </div>
</template>

<script>
export default {
    props: {
        product: Object
    },
    data() {
        return {
            showConfirmation: false
        }
    },
    emits: ['editProduct', 'deleteProduct'],
    methods: {
        // Visar meddelande och knappar
        confirmDelete() {
            this.showConfirmation = true;
        },
        // Skickar event till föräldrakomponent för att radera vald produkt vid klick på Ja-knapp
        deleteProduct() {
            this.$emit('deleteProduct', this.product);
            this.showConfirmation = false;
        },
        // Stänger meddelande och knappar vid klick på Nej-knapp
        cancelDelete() {
            this.showConfirmation = false;
        }
    }
}
</script>