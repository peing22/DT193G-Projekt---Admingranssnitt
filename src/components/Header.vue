<template>
    <header>
        <nav>
            <ul>
                <li><RouterLink to="/produkter">Produkter</RouterLink></li>
                <li><RouterLink to="/lagg-till">Lägg till</RouterLink></li>
                <li><RouterLink to="/andra">Ändra</RouterLink></li>
                <li><RouterLink to="/registrera">Registrera</RouterLink></li>
                <li><button @click="logoutUser()">Logga ut</button></li>
            </ul>
        </nav>
    </header>
</template>

<script>
import { RouterLink } from 'vue-router'
import { mapWritableState } from 'pinia'
import { useAuthStore } from '../stores/auth'

export default {
    components: {
        RouterLink
    },
  computed: {
    ...mapWritableState(useAuthStore, ['logoutUser'])
  }
}
</script>