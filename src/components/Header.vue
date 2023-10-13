<template>
    <header>
        <div class="flex items-center justify-end p-2">
            <p class="mx-2 md:text-base">{{ message }}</p>
            <button @click="logoutUser()">Logga ut<i class="fa-solid fa-right-from-bracket ps-1 md:ps-2"></i></button>
        </div>
        <nav
            class="bg-white/20 flex items-center justify-center py-3 md:py-7 mx-auto uppercase tracking-widest text-xs md:text-xl">
            <RouterLink to="/produkter"
                class="border-solid border-y border-white/20 transition duration-300 ease-in-out hover:border-white/60 p-2 md:p-4 mx-3 md:mx-10"
                :class="{ active: currentRoute === '/produkter' }">Produkter</RouterLink>
            <RouterLink to="/administrera"
                class="border-solid border-y border-white/10 transition duration-300 ease-in-out hover:border-white/60 p-2 md:p-4 mx-3 md:mx-10"
                :class="{ active: currentRoute === '/administrera' }">Administrera</RouterLink>
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
            message: "Inloggad: " + useAuthStore().$state.name,
            currentRoute: ""
        }
    },
    components: {
        RouterLink
    },
    computed: {
        ...mapWritableState(useAuthStore, ['logoutUser'])
    },
    watch: {
        $route(to) {
            this.currentRoute = to.path
        }
    }
}
</script>

<style scoped>
.active {
    border-top: solid 1px rgba(255, 255, 255, 0.6);
    border-bottom: solid 1px rgba(255, 255, 255, 0.6);
}
</style>