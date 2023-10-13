<template>
    <h3>Lägg till användare</h3>
    <form @submit.prevent="addUser()">
        <label for="userName">Namn:</label>
        <br>
        <input v-model="name" type="text" id="userName" placeholder="Förnamn Efternamn"
            class="w-full mb-3 placeholder:italic">
        <br>
        <label for="email">E-post:</label>
        <br>
        <input v-model="email" type="email" id="email" placeholder="exempel@mail.com"
            class="w-full mb-3 placeholder:italic">
        <br>
        <label for="password">Lösenord: (minst åtta tecken)</label>
        <br>
        <input v-model="password" type="password" id="password" class="w-full mb-3">
        <br>
        <label for="repetedPassword">Upprepa lösenord:</label>
        <br>
        <input v-model="repetedPassword" type="password" id="repetedPassword" class="w-full mb-3">
        <br>
        <input type="submit" value="Lägg till" class="w-full mb-3">
    </form>
    <p class="font-bold text-green-500 text-center" :class="{ 'fade-out': message !== '' }">{{ message }}</p>
    <p class="font-bold text-red-500 text-center" :class="{ 'fade-out': errorMessage !== '' }">{{ errorMessage }}</p>
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
            email: "",
            password: "",
            repetedPassword: "",
            message: "",
            errorMessage: ""
        }
    },
    methods: {
        async addUser() {

            // Regular expression-mönster för att matcha en giltig e-postadress
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

            // Om alla fält är ifyllda korrekt
            if (this.name.trim() !== "" && this.email.match(emailPattern) && this.password.length >= 8 && this.repetedPassword !== "") {

                // Om lösenorden stämmer överens
                if (this.password === this.repetedPassword) {

                    // Lagrar angivna värden i variabel
                    let userBody = {
                        name: this.name,
                        email: this.email,
                        password: this.password
                    }

                    // Gör fetch-anrop och skickar med angivna värden
                    const resp = await fetch(config.apiUrl + "api/register", {
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "Content-type": "application/json",
                            "Authorization": "Bearer " + this.token
                        },
                        body: JSON.stringify(userBody)
                    });
                    const data = await resp.json();

                    // Skickar meddelande om respons är OK
                    if (resp.ok) {
                        this.message = '"' + this.name + '" har lagts till som användare';

                        // Tömmer inputfält
                        this.name = "";
                        this.email = "";
                        this.password = "";
                        this.repetedPassword = "";

                        // Tar bort meddelande efter 5 sekunder
                        setTimeout(() => { this.message = "" }, 5000);
                    }
                // Skickar felmeddelande
                } else {
                    this.errorMessage = "Lösenorden stämmer inte överens!"

                    // Tar bort meddelande efter 5 sekunder
                    setTimeout(() => { this.errorMessage = "" }, 5000);
                }
            // Skickar felmeddelande
            } else {
                this.errorMessage = "Ange korrekta uppgifter i alla fält!";

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