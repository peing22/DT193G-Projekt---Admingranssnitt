<template>
    <div v-for="product in products" :key="product.id">
        <img :src="getProductImageUrl(product.image)" :alt="product.name">
        <p class="font-bold">{{ product.name }}</p>
        <p v-if="product.description !== null">{{ product.description }}</p>
        <p v-if="product.price !== null">Pris: {{ product.price }} kr</p>
        <label for="quantity">Antal: </label>
        <input type="number" id="quantity" v-model="product.quantity" @change="updateQuantity(product)">
        <br>
    </div>
</template>
    
<script>
import { useAuthStore } from '../stores/auth'
import config from '../config'

export default {
    props: {
        products: Array
    },
    data() {
        return {
            // Lagrar token
            token: useAuthStore().$state.token,
            message: ""
        }
    },
    methods: {
        getProductImageUrl(imagePath) {

            // Returnerar sökvägen till bilden om imagePath inte är null
            if (imagePath !== null) {
                return config.apiUrl + imagePath;

            // Returnerar en standardbild
            } else {
                return config.apiUrl + "uploads/default.jpg";
            }
        },
        async updateQuantity(product) {

            // Gör fetch-anrop och skickar med uppdaterat värde för quantity
            const resp = await fetch(config.apiUrl + "api/productquantity/" + product.id, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + this.token
                },
                body: JSON.stringify({ quantity: product.quantity })
            });
            const data = await resp.json();
        }
    }
};
</script>