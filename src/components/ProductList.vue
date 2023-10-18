<template>
    <div v-for="product in products" :key="product.id"
        class="bg-white/20 rounded-2xl py-3 px-5 w-full max-w-xs md:w-64 break-words">
        <h2 class="text-center font-medium text-base md:text-lg">{{ product.name }}</h2>
        <div class="flex items-center justify-center mb-2">
            <div class="mx-2">
                <label for="quantity">Antal i lager:</label>
                <br>
                <input type="number" id="quantity" v-model="product.quantity" @change="updateQuantity(product)"
                    class="w-28 md:w-32">
            </div>
            <img :src="getProductImageUrl(product.image)" :alt="product.name" class="rounded-lg mt-3 w-10 md:mt-2 md:w-12 mx-2">
        </div>
        <p v-if="product.description" class="mt-2 text-center">{{ product.description }}</p>
        <p v-if="product.price" class="mt-1 pt-1 text-center border-solid border-t border-white/20">Pris: {{ product.price
        }} kr</p>
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
                return "/default.jpg"
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