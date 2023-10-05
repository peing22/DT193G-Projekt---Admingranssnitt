<template>
  <h1 class="font-bold">Logga in</h1>
  <form @submit.prevent="loginUser()">
    <label for="email">E-post:</label>
    <input v-model="email" type="text" id="email" name="email" class="form-control">
    <br>
    <label for="password">Lösenord:</label>
    <input v-model="password" type="password" id="password" name="password" class="form-control">
    <br>
    <input type="submit" value="Logga in">
  </form>
  <p class="font-bold text-red-700">{{ message }}</p>
</template>

<script>
import { useAuthStore } from '../stores/auth';

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
      const resp = await fetch("http://127.0.0.1:8000/api/login", {
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
        this.message = "Du har angett felaktiga uppgifter";

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