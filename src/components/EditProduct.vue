<template>
    <div>
        <p class="font-bold">Ändra Produkt</p>
        <label for="name">Namn: </label>
        <input v-model="editedProductName" type="text" id="name">
        <br>
        <label for="descript">Beskrivning: </label>
        <input v-model="editedProductDesctipt" type="text" id="descript">
        <br>
        <label for="price">Pris: </label>
        <input v-model="editedProductPrice" type="number" id="price">
        <br>
        <label for="quantity">Antal: </label>
        <input v-model="editedProductQuantity" type="number" id="quantity">
        <br>
        <label for="category">Produktkategori: </label>
        <select id="category" :value="editedProductCategory" @input="updateSelectedCategory">
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
        <br>
        <button @click="editProduct">Spara</button>
        <button @click="$emit('cancelEdit')">Avbryt</button>
    </div>
</template>
  
<script>
export default {
    props: {
        product: Object,
        categories: Array
    },
    data() {
        return {
            editedProductName: this.product.name,
            editedProductDesctipt: this.product.description,
            editedProductPrice: this.product.price,
            editedProductQuantity: this.product.quantity,
            editedProductCategory: this.product.category_id,
            selectedCategory: null,
            catId: null
        }
    },
    methods: {
        // Sätter värde för salectedCategory om en annan kategori har valts
        updateSelectedCategory(event) {
            this.selectedCategory = event.target.value;
        },
        editProduct() {

            // Sätter värde för catId beroende på om kategorin har ändrats eller inte
            if (this.selectedCategory !== null) {
                this.catId = this.selectedCategory;
            } else {
                this.catId = this.editedProductCategory;
            }

            // Skickar event med värden till föräldrakomponent
            this.$emit('productEdited', {
                id: this.product.id,
                category_id: this.catId,
                name: this.editedProductName,
                description: this.editedProductDesctipt,
                price: this.editedProductPrice,
                quantity: this.editedProductQuantity
            });
        }
    }
}
</script>