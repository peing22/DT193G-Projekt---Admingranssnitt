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
</template>

<script>
import { useAuthStore } from '../stores/auth';

export default {
  data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    async loginUser() {
      let userBody = {
        email: this.email,
        password: this.password
      }

      const resp = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json"
        },
        body: JSON.stringify(userBody)
      });
      const data = await resp.json();

      if (data.message === 'Validation error' || data.message === 'Wrong email and/or password') {
        alert("Felaktiga uppgifter!");
      } else {
        let token = data.token;
        useAuthStore().setToken(token);

        this.email = "";
        this.password = "";
      }
    }
  }
}
</script>