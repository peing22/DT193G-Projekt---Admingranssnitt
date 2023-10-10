<template>
    <p class="font-bold">Sök produkt</p>
    <form @submit.prevent="searchProduct()">
        <label for="search">Ange produktnamn: </label>
        <input type="text" v-model="searchInput" id="search">
        <input type="submit" value="Sök">
        <p class="font-bold text-red-700">{{ errorMessage }}</p>
    </form>
</template>

<script>
import config from '../config'

export default {
    props: {
        token: String
    },
    data() {
        return {
            searchInput: "",
            errorMessage: ""
        }
    },
    emits: ['searchedProductArray'],
    methods: {
        async searchProduct() {

            // Gör fetch-anrop och hämtar produkt(er) vars produksnamn stämmer överens med angivet sökvärde
            if (this.searchInput.trim() !== "") {
                const resp = await fetch(config.apiUrl + "api/product/search/name/" + this.searchInput, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json",
                        "Authorization": "Bearer " + this.token
                    }
                });
                const data = await resp.json();

                // Om respons är OK
                if (resp.ok) {

                    // Skickar event med anrop och data till föräldrakomponent 
                    this.$emit('searchedProductArray', data);

                    // Tömmer element
                    this.searchInput = "";
                    this.errorMessage = "";
                }
            // Skickar felmeddelande
            } else {
                this.errorMessage = "Ett namn måste anges";
            }
        }
    }
}
</script>