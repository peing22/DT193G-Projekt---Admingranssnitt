<template>
    <p class="font-bold text-green-700" :class="{ 'fade-out': message !== '' }">{{ message }}</p>
    <h3 class="font-bold">Lägg till kategori</h3>
    <form @submit.prevent="addCategory()">
        <label for="name">Namn: </label>
        <input v-model="name" type="text" id="name">
        <input type="submit" value="Lägg till">
    </form>
    <p class="font-bold text-red-700" :class="{ 'fade-out': errorMessage !== '' }">{{ errorMessage }}</p>
</template>

<script>
import config from '../config'

export default {
    props: {
        token: String
    },
    data() {
        return {
            name: "",
            message: "",
            errorMessage: ""
        }
    },
    emits: ['categoryAdded'],
    methods: {
        async addCategory() {

            // Gör fetch-anrop och skickar med angivet värde om det inte är tomt
            if (this.name.trim() !== "") {
                const resp = await fetch(config.apiUrl + "api/category", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json",
                        "Authorization": "Bearer " + this.token
                    },
                    body: JSON.stringify({ name: this.name })
                });
                const data = await resp.json();

                // Skickar meddelande om respons är OK
                if (resp.ok) {
                    this.message = 'Kategorin "' + this.name + '" har lagts till';

                    // Skickar event med anrop och data till föräldrakomponent 
                    this.$emit("categoryAdded", data);

                    // Tömmer inputfält
                    this.name = "";

                    // Tar bort meddelande efter 5 sekunder
                    setTimeout(() => { this.message = "" }, 5000);
                }
            // Skickar felmeddelande
            } else {
                this.errorMessage = "Namn måste anges!";

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