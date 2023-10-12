<template>
    <div v-for="product in products" :key="product.id"
        class="bg-white/20 mb-6 md:mb-7 rounded-2xl p-5 max-w-xs break-words text-center">
        <h2 class="text-center">{{ product.name }}</h2>
        <div class="flex items-center justify-center">
            <div class="mx-2">
                <label for="quantity" class="ms-0">Antal i lager:</label>
                <br>
                <input type="number" id="quantity" v-model="product.quantity" @change="updateQuantity(product)"
                    class="w-24 md:w-32 mb-2">
            </div>
            <img :src="getProductImageUrl(product.image)" :alt="product.name" class="rounded-md w-11 md:w-14 mx-2">
        </div>
        <p v-if="product.description" class="text-center">{{ product.description }}</p>
        <p v-if="product.price">Pris: {{ product.price }} kr</p>
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