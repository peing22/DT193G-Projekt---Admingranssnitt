<template>
    <h3>Sök produkt</h3>
    <form @submit.prevent="searchProduct()">
        <label for="search">Namn:</label>
        <br>
        <input type="text" v-model="searchInput" id="search" class="w-full">
        <br>
        <input type="submit" value="Sök" class="w-full mt-3 mb-2">
    </form>
    <p class="text-center font-bold text-red-500 mt-1" :class="{ 'fade-out': errorMessage !== '' }">{{ errorMessage }}</p>
    <p class="text-center font-bold text-orange-500 mt-1" :class="{ 'fade-out': warningMessage !== '' }">{{ warningMessage
    }}</p>
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
            warningMessage: "",
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

                    // Om data är en tom array
                    if (data.length === 0) {

                        // Skickar meddelande
                        this.warningMessage = 'Det finns ingen produkt med namnet "' + this.searchInput + '"';

                        // Tar bort meddelande efter 5 sekunder
                        setTimeout(() => { this.warningMessage = "" }, 5000);

                    } else {
                        // Skickar event med anrop och data till föräldrakomponent 
                        this.$emit('searchedProductArray', data);

                        // Tömmer element
                        this.searchInput = "";
                        this.warningMessage = "";
                        this.errorMessage = "";
                    }
                }
                // Skickar felmeddelande
            } else {
                this.errorMessage = "Ett namn måste anges!";

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