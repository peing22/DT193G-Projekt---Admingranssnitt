<template>
  <h1>Logga in</h1>
  <form @submit.prevent="loginUser()">
    <label for="email">E-post:</label>
    <input v-model="email" type="text" id="email" name="email" class="form-control">
    <br>
    <label for="password">Lösenord:</label>
    <input v-model="password" type="password" id="password" name="password" class="form-control">
    <br>
    <input type="submit" value="Logga in">
  </form>
  <p class="font-bold text-red-700" :class="{ 'fade-out': message !== '' }">{{ message }}</p>
</template>

<script>
import { useAuthStore } from '../stores/auth'
import config from '../config'

export default {
  data() {
    return {
      email: "",
      password: "",
      message: ""
    }
  },
  methods: {

    // Loggar in användare
    async loginUser() {

      // Lagrar angivna värden i variabel
      let userBody = {
        email: this.email,
        password: this.password
      }

      // Gör fetch-anrop och skickar med angivna värden
      const resp = await fetch(config.apiUrl + "api/login", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json"
        },
        body: JSON.stringify(userBody)
      });
      const data = await resp.json();

      // Om responsen innehåller felmeddelanden
      if (data.message === 'Validation error' || data.message === 'Wrong email and/or password') {

        // Skickar felmeddelande
        this.message = "Du har angett felaktiga uppgifter!";

        // Tar bort meddelande efter 5 sekunder
        setTimeout(() => { this.message = "" }, 5000);

      // Skickar token och name från respons till auth i stores
      } else {
        let token = data.token;
        let name = data.name;
        useAuthStore().setUser(token, name);

        // Tömmer inputfälten
        this.email = "";
        this.password = "";
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