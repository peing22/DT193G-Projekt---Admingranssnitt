<template>
    <h1 class="font-bold">Administrera</h1>
    <h2 class="font-bold text-3xl">Produktkategorier</h2>
    <AddCategory />
    <h2 class="font-bold text-3xl">Produkter</h2>
    <AddProduct :categories="categories" />
    <h2 class="font-bold text-3xl">Användarkonto</h2>
</template>

<script>
import AddCategory from '../components/AddCategory.vue'
import AddProduct from '../components/AddProduct.vue'
import { useAuthStore } from '../stores/auth'
import config from '../config'

export default {
    data() {
        return {
            categories: [],
            token: useAuthStore().$state.token
        }
    },
    components: {
        AddCategory,
        AddProduct
    },
    methods: {
        async getCategories() {
            const resp = await fetch(config.apiUrl + "api/category", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + this.token
                }
            });
            const data = await resp.json();
            this.categories = data;
        }
    },
    mounted() {
        this.getCategories();
    }
}
</script>