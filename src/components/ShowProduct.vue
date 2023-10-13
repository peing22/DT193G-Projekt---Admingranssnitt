<template>
    <div class="py-2 border-solid border-b border-white/20 last:border-none">
        <div class=" flex items-center justify-between flex-wrap">
            <p class="text-sm md:text-base">{{ product.name }}</p>
            <div>
                <button @click="$emit('editProduct', product)" class="me-1">Ändra<i
                        class="fa-solid fa-pen-to-square ps-1 md:ps-2"></i></button>
                        <button @click="confirmDelete" class="bg-red-500/20 hover:bg-red-500/40">Radera<i
                        class="fa-regular fa-trash-can ps-1 md:ps-2"></i></button>
            </div>
        </div>
        <div v-if="showConfirmation" class="py-2">
            <p class="pb-3">Är du säker på att du vill radera produkten?</p>
            <button @click="deleteProduct" class="bg-red-500/20 hover:bg-red-500/40">Radera<i class="fa-regular fa-trash-can ps-1 md:ps-2"></i></button>
            <button @click="cancelDelete" class="ms-1">Avbryt</button>
        </div>
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