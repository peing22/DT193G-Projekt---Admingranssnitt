<template>
    <p class="font-bold text-green-700" :class="{ 'fade-out': message !== '' }">{{ message }}</p>
    <h3 class="font-bold">Lägg till produkt</h3>
    <form ref="productForm" @submit.prevent="addProduct()">
        <label for="productName">Namn: </label>
        <input v-model="name" type="text" id="productName">
        <br>
        <label for="descript">Beskrivning: </label>
        <input v-model="descript" type="text" id="descript">
        <br>
        <label for="price">Pris: </label>
        <input v-model="price" type="number" id="price">
        <br>
        <label for="quantity">Antal: </label>
        <input v-model="quantity" type="number" id="quantity">
        <br>
        <label for="image">Bild: </label>
        <input @change="imageSelected" type="file" id="image">
        <br>
        <label for="category">Kategori: </label>
        <select id="category" :value="selectedCategory" @input="updateSelectedCategory">
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
        <br>
        <input type="submit" value="Lägg till">
    </form>
    <p class="font-bold text-red-700" :class="{ 'fade-out': errorMessage !== '' }">{{ errorMessage }}</p>
</template>

<script>
import config from '../config'

export default {
    props: {
        categories: Array,
        token: String
    },
    data() {
        return {
            name: "",
            descript: "",
            price: null,
            quantity: null,
            image: null,
            selectedCategory: "",
            message: "",
            errorMessage: ""
        }
    },
    methods: {
        // Sätter värde för image när en bildfil har valts
        imageSelected(event) {
            this.image = event.target.files[0];
        },
        // Sätter värde för salectedCategory när en kategori har valts
        updateSelectedCategory(event) {
            this.selectedCategory = event.target.value;
        },
        async addProduct() {

            // Om namn, antal och produktkategori har angivits
            if (this.name.trim() !== "" && this.quantity !== null && this.selectedCategory.trim() !== "") {

                // Skapar nytt FormData-objekt
                const formData = new FormData();

                // Adderar namn och antal till FormData-objektet
                formData.append("name", this.name);
                formData.append("quantity", this.quantity);

                // Adderar beskrivning till FormData-objektet om descript inte är tom
                if (this.descript !== "") {
                    formData.append("description", this.descript);
                }

                // Adderar bildfil till FormData-objektet om image inte är null
                if (this.image !== null) {
                    formData.append("image", this.image);
                }

                // Adderar pris till FormData-objektet om price inte är null
                if (this.price !== null) {
                    formData.append("price", this.price);
                }

                // Gör fetch-anrop och skickar med FormData-objektet
                const resp = await fetch(config.apiUrl + "api/product/" + this.selectedCategory, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Authorization": "Bearer " + this.token
                    },
                    body: formData
                });

                // Om responsen är OK
                if (resp.ok) {

                    // Skickar meddelande
                    this.message = 'Produkten "' + this.name + '" har lagts till';

                    // Tömmer och återställer formulär
                    this.$refs.productForm.reset();
                    this.name = "";
                    this.descript = "";
                    this.price = null;
                    this.quantity = null;
                    this.image = null;
                    this.selectedCategory = "";

                    // Tar bort meddelande efter 5 sekunder
                    setTimeout(() => { this.message = "" }, 5000);
                }
            // Skickar felmeddelande
            } else {
                this.errorMessage = "Namn, antal och kategori måste anges!";

                // Tar bort meddelande efter 5 sekunder
                setTimeout(() => { this.errorMessage = "" }, 5000);
            }
        }
    }
}
</script>

<style scoped>
.fade-out {
    opacity: 0;
    transition: opacity 2s 3s;
}
</style>