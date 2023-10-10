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
    <div>
        <h2 class="font-bold text-3xl">Produkter</h2>
        <AddProduct :categories="categories" :token="token" />
        <SearchProduct :token="token" @searchedProductArray="searchedProductArray" />
        <div v-if="showSearchedProduct">
            <ShowProduct v-for="product in searchedProduct" :product="product" :key="product.id" @editProduct="editProduct"
                @deleteProduct="deleteProduct" />
        </div>
        <div v-if="editingProduct">
            <EditProduct :product="editingProduct" :categories="categories" @productEdited="updateProduct"
                @cancelEdit="cancelEditProduct" />
        </div>
    </div>
    <br>
    <h2 class="font-bold text-3xl">Användarkonton</h2>
</template>

<script>
import { useAuthStore } from '../stores/auth'
import config from '../config'
import Categories from '../components/Categories.vue'
import EditCategory from '../components/EditCategory.vue'
import AddCategory from '../components/AddCategory.vue'
import AddProduct from '../components/AddProduct.vue'
import SearchProduct from '../components/SearchProduct.vue'
import ShowProduct from '../components/ShowProduct.vue'
import EditProduct from '../components/EditProduct.vue'

export default {
    data() {
        return {
            token: useAuthStore().$state.token,
            categories: [],
            editingCategory: null,
            searchedProduct: [],
            showSearchedProduct: false,
            editingProduct: null
        }
    },
    components: {
        Categories,
        EditCategory,
        AddCategory,
        AddProduct,
        SearchProduct,
        ShowProduct,
        EditProduct
    },
    methods: {
        // Hämtar samtliga kategorier
        async getCategories() {

            // Gör fetch-anrop för att läsa ut samtliga kategorier
            const resp = await fetch(config.apiUrl + "api/category", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + this.token
                }
            });
            const data = await resp.json();

            // Sätter värde för propertyn categories
            this.categories = data;
        },
        // Öppnar upp möjlighet att ändra vald kategori
        editCategory(category) {

            // Sätter värde för propertyn editingCategory
            this.editingCategory = category;
        },
        // Avbryter ändring av vald kategori
        cancelEditCategory() {

            // Sätter null för propertyn editingCategory
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

                // Sätter null för propertyn editingCategory
                this.editingCategory = null;
            }
        },
        // Raderar en vald kategori
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

            // Anropar metod för att hämta kategorier på nytt om respons är OK
            if (resp.ok) {
                this.getCategories();
            }
        },
        // Sätter värde för propertyn searchedProducts
        searchedProductArray(product) {
            this.searchedProduct = product;
            this.showSearchedProduct = true;
        },
        // Öppnar upp möjlighet att ändra vald produkt
        editProduct(product) {

            // Sätter värde för propertyn editingProduct
            this.editingProduct = product;

            // Döljer framsökt(a) produkt(er)
            this.showSearchedProduct = false;
        },
        // Avbryter ändring av vald produkt
        cancelEditProduct() {

            // Sätter null för propertyn editingProduct
            this.editingProduct = null;
        },
        // Uppdaterar en vald produkt
        async updateProduct(updatedProduct) {

            // Om namn och antal har angivits
            if (updatedProduct.name.trim() !== "" && updatedProduct.quantity !== "") {

                // Skapar objekt
                let toolBody = {
                    category_id: updatedProduct.category_id,
                    name: updatedProduct.name,
                    description: updatedProduct.description,
                    price: updatedProduct.price,
                    quantity: updatedProduct.quantity
                }

                // Gör fetch-anrop för att uppdatera vald produkt
                const resp = await fetch(config.apiUrl + 'api/product/' + updatedProduct.id, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + this.token,
                    },
                    body: JSON.stringify(toolBody),
                });
                const data = await resp.json();

                // Sätter null för propertyn editingProduct om respons är OK
                if (resp.ok) {
                    this.editingProduct = null;
                }
            // Skickar felmeddelande
            } else {
                alert("Namn och antal måste anges!");
            }
        },
        // Raderar en vald produkt
        async deleteProduct(product) {

            // Gör fetch-anrop för att radera vald produkt
            const resp = await fetch(config.apiUrl + 'api/product/' + product.id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + this.token,
                },
            });
            const data = await resp.json();

            // Döljer framsökt(a) produkt(er) om respons är OK
            if (resp.ok) {
                this.showSearchedProduct = false;
            }
        }
    },
    mounted() {
        // Anropar metod
        this.getCategories();
    }
}
</script>