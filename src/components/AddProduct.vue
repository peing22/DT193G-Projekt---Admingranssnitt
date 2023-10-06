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
        <input v-on:change="image" type="file" id="image">
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
    data() {
        return {
            token: useAuthStore().$state.token,
            name: "",
            descript: "",
            price: null,
            quantity: null,
            image: null,
            categories: [],
            selectedCategory: "",
            message: ""
        }
    },
    methods: {
        async getCategories() {
            const resp = await fetch(config.apiUrl + "api/category", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + this.token
                }
            });
            const data = await resp.json();
            this.categories = data;
        },
        updateSelectedCategory(event) {
            this.selectedCategory = event.target.value;
        },
        async addProduct() {
            if (this.name.trim() !== "" && this.quantity !== null && this.selectedCategory.trim() !== "") {

                let productBody = {
                    name: this.name,
                    description: this.descript,
                    price: this.price,
                    quantity: this.quantity,
                    image: this.image
                }
                const resp = await fetch(config.apiUrl + "api/product/" + this.selectedCategory, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json",
                        "Authorization": "Bearer " + this.token
                    },
                    body: JSON.stringify(productBody)
                });
                const data = await resp.json();

                // Skickar meddelande om respons är OK
                if (resp.ok) {
                    this.message = "Produkten har lagts till!";

                    // Tömmer inputfält och kategori
                    this.name = "";
                    this.descript = "";
                    this.price = null;
                    this.quantity = null;
                    this.image = null;
                    this.selectedCategory = "";
                }
            } else {
                alert("Namn, antal och produktkategori måste anges!");
            }
        }
    },
    mounted() {
        this.getCategories();
    }
}
</script>