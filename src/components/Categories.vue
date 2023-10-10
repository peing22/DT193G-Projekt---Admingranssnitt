<template>
    <div>
        <p>{{ category.name }}</p>
        <button @click="$emit('editCategory', category)">Ändra</button>
        <button @click="confirmDelete">Radera</button>
        <div v-if="showConfirmation">
            <p>Alla produkter som tillhör denna kategori kommer att försvinna. Vill du verkligen radera produktkategorin?</p>
            <button @click="deleteCategory">Ja</button>
            <button @click="cancelDelete">Nej</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        category: Object
    },
    data() {
        return {
            showConfirmation: false,
        };
    },
    methods: {
        // Visar meddelande och knappar
        confirmDelete() {
            this.showConfirmation = true;
        },
        // Skickar event till föräldrakomponent för att radera vald kategori vid klick på Ja-knapp
        deleteCategory() {
            this.$emit('deleteCategory', this.category);
            this.showConfirmation = false;
        },
        // Stänger meddelande och knappar vid klick på Nej-knapp
        cancelDelete() {
            this.showConfirmation = false;
        }
    }
}
</script>