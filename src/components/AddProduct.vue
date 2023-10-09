<template>
    <p class="font-bold">Lägg till produkt</p>
    <form @submit.prevent="addProduct()">
        <label for="name">Produktnamn: </label>
        <input v-model="name" type="text" id="name">
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
        <label for="category">Produktkategori: </label>
        <select id="category" :value="selectedCategory" @input="updateSelectedCategory">
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
        <br>
        <input type="submit" value="Lägg till">
    </form>
    <p class="font-bold text-green-700">{{ message }}</p>
</template>

<script>
import { useAuthStore } from '../stores/auth'
import config from '../config'

export default {
    props: {
        categories: Array
    },
    data() {
        return {
            token: useAuthStore().$state.token,
            name: "",
            descript: "",
            price: null,
            quantity: null,
            image: null,
            selectedCategory: "",
            message: ""
        }
    },
    methods: {
        // Sätter värde för image när en bildfil har valts
        imageSelected(event) {
            this.image = event.target.files[0];
        },
        // Sätter värde för salectedCategorie när en kategori har valts
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

                // Om responsen är okej skickas meddelande och formuläret töms
                if (resp.ok) {
                    this.message = "Produkten har lagts till!";
                    this.name = "";
                    this.descript = "";
                    this.price = null;
                    this.quantity = null;
                    this.image = null;
                    this.selectedCategory = "";
                }
            // Skickar felmeddelande
            } else {
                alert("Namn, antal och produktkategori måste anges!");
            }
        }
    }
}
</script>