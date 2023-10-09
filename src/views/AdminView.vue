<template>
    <h1 class="font-bold">Administrera</h1>
    <div>
        <h2 class="font-bold text-3xl">Produktkategorier</h2>
        <Categories v-for="category in categories" :category="category" :key="category.id" @editCategory="editCategory"
            @deleteCategory="deleteCategory" />
        <div v-if="editingCategory">
            <EditCategory :category="editingCategory" @categoryEdited="updateCategory" @cancelEdit="cancelEditCategory" />
        </div>
        <div v-else>
            <AddCategory :token="token" @categoryAdded="getCategories()" />
        </div>
    </div>
    <br>
    <h2 class="font-bold text-3xl">Produkter</h2>
    <AddProduct :categories="categories" :token="token" />
    <br>
    <h2 class="font-bold text-3xl">Användarkonto</h2>
</template>

<script>
import { useAuthStore } from '../stores/auth'
import config from '../config'
import Categories from '../components/Categories.vue'
import EditCategory from '../components/EditCategory.vue'
import AddCategory from '../components/AddCategory.vue'
import AddProduct from '../components/AddProduct.vue'

export default {
    data() {
        return {
            token: useAuthStore().$state.token,
            categories: [],
            editingCategory: null
        }
    },
    components: {
        Categories,
        EditCategory,
        AddCategory,
        AddProduct
    },
    methods: {
        async getCategories() {

            // Hämtar samtliga kategorier
            const resp = await fetch(config.apiUrl + "api/category", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + this.token
                }
            });
            const data = await resp.json();

            // Sätter värde för categories
            this.categories = data;
        },
        // Öppnar upp möjlighet att ändra vald kategori
        editCategory(category) {
            this.editingCategory = category;
        },
        // Avbryter ändring av kategori
        cancelEditCategory() {
            this.editingCategory = null;
        },
        // Uppdaterar en vald kategori
        async updateCategory(updatedCategory) {

            // Gör fetch-anrop för att uppdatera vald kategori
            const resp = await fetch(config.apiUrl + 'api/category/' + updatedCategory.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + this.token,
                },
                body: JSON.stringify({ name: updatedCategory.name }),
            });

            // Anropar metor för att hämta kategorier på nytt om respons är OK
            if (resp.ok) {
                this.getCategories();

                // Sätter editingCategory till null
                this.editingCategory = null;
            }
        },
        // Raderar vald kategori
        async deleteCategory(category) {

            // Gör fetch-anrop för att radera vald kategori
            const resp = await fetch(config.apiUrl + 'api/category/' + category.id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + this.token,
                },
            });

            // Anropar metor för att hämta kategorier på nytt om respons är OK
            if (resp.ok) {
                this.getCategories();
            }
        }
    },
    mounted() {
        // Anropar metod
        this.getCategories();
    }
}
</script>