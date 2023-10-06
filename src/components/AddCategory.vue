<template>
    <p class="font-bold">Lägg till kategori</p>
    <form @submit.prevent="addCategory()">
        <label for="name">Namn på kategori: </label>
        <input v-model="name" type="text" id="name">
        <p class="font-bold text-red-700">{{ errorMessage }}</p>
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
            name: "",
            token: useAuthStore().$state.token,
            message: "",
            errorMessage: ""
        }
    },
    methods: {
        async addCategory() {

            // // Gör fetch-anrop och skickar med angivet värde om det inte är tomt
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
                    this.message = "Kategorin har lagts till!";

                    // Tömmer inputfält
                    this.name = "";
                }
            // Skickar felmeddelande
            } else {
                this.errorMessage = "Ange ett namn!";
            }
        }
    }
}
</script>
