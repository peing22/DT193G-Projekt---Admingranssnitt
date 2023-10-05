<template>
  <header>
    <nav>
      <RouterLink to="/produkter">Produkter</RouterLink>
      <RouterLink to="/lagg-till">Lägg till</RouterLink>
      <RouterLink to="/andra">Ändra</RouterLink>
      <RouterLink to="/registrera">Registrera</RouterLink>
      <button @click="logoutUser()">Logga ut</button>
    </nav>
  </header>

  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import { mapWritableState } from 'pinia'
import { useAuthStore } from './stores/auth'

export default {
  components: {
    RouterView
  },
  computed: {
    ...mapWritableState(useAuthStore, ['logoutUser'])
  }
}
</script>