<template>
    <header>
        <p class="text-green-700">{{ message }}</p>
        <button @click="logoutUser()">Logga ut</button>
        <nav>
            <ul>
                <li>
                    <RouterLink to="/produkter">Produkter</RouterLink>
                </li>
                <li>
                    <RouterLink to="/lagg-till">Lägg till</RouterLink>
                </li>
                <li>
                    <RouterLink to="/andra">Ändra</RouterLink>
                </li>
                <li>
                    <RouterLink to="/registrera">Registrera</RouterLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
import { RouterLink } from 'vue-router'
import { mapWritableState } from 'pinia'
import { useAuthStore } from '../stores/auth'

export default {
    data() {
        return {
            message: "Inloggad som " + useAuthStore().$state.name
        }
    },
    components: {
        RouterLink
    },
    computed: {
        ...mapWritableState(useAuthStore, ['logoutUser'])
    }
}
</script>