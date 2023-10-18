<template>
    <h1 class="mb-9 md:mb-12">Administrera</h1>
    <div class="px-5">
        <div class="flex justify-center">
            <div class="w-full max-w-sm md:max-w-md">
                <section class="bg-white/20 rounded-2xl p-5 md:p-7 pb-3 md:pb-5 md:pt-9 mb-9 md:mb-12">
                    <h2 class="mb-4 md:mb-7 border-solid border-b border-white/20 pb-5 md:pb-7">Kategorier</h2>
                    <div>
                        <h3 class="mb-2 md:mb-5">Befintliga kategorier</h3>
                        <Categories v-for="category in categories" :category="category" :key="category.id"
                            @editCategory="editCategory" @deleteCategory="deleteCategory" />
                    </div>
                    <p class="font-bold text-green-500 text-center" :class="{ 'fade-out': msgCategory !== '' }">{{
                        msgCategory }}</p>
                    <div class="mt-4 md:mt-7">
                        <div v-if="editingCategory">
                            <EditCategory :category="editingCategory" @categoryEdited="updateCategory"
                                @cancelEdit="cancelEditCategory" />
                        </div>
                        <div v-else>
                            <AddCategory :token="token" @categoryAdded="getCategories()" />
                        </div>
                    </div>
                </section>
                <section class="bg-white/20 rounded-2xl p-5 md:p-7 pb-3 md:pb-5 md:pt-7 mb-9 md:mb-12">
                    <h2 class="mb-4 md:mb-7 border-solid border-b border-white/20 pb-5 md:pb-7">Produkter</h2>
                    <SearchProduct :token="token" @searchedProductArray="searchedProductArray" />
                    <div v-if="showSearchedProduct">
                        <ShowProduct v-for="product in searchedProduct" :product="product" :key="product.id"
                            @editProduct="editProduct" @deleteProduct="deleteProduct" />
                    </div>
                    <p class="font-bold text-green-500 text-center" :class="{ 'fade-out': msgDeleteProduct !== '' }">{{ msgDeleteProduct
                    }}</p>
                    <div class="mt-4 md:mt-7">
                        <div v-if="editingProduct">
                            <EditProduct :product="editingProduct" :categories="categories" @productEdited="updateProduct"
                                @cancelEdit="cancelEditProduct" />
                            <p class="font-bold text-red-500 text-center" :class="{ 'fade-out': errorMsgProduct !== '' }">{{
                                errorMsgProduct
                            }}
                            </p>
                        </div>
                        <div v-else>
                            <AddProduct :categories="categories" :token="token" />
                        </div>
                    </div>
                    <p class="font-bold text-green-500 text-center" :class="{ 'fade-out': msgProduct !== '' }">{{ msgProduct
                    }}</p>
                </section>
                <section class="bg-white/20 rounded-2xl p-5 md:p-7 pb-3 md:pb-5 md:pt-7 mb-9 md:mb-12">
                    <h2 class="mb-4 md:mb-7 border-solid border-b border-white/20 pb-5 md:pb-7">Användare</h2>
                    <AddUser :token="token" />
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from '../stores/auth'
import config from '../config'
import Categories from '../components/Categories.vue'
import EditCategory from '../components/EditCategory.vue'
import AddCategory from '../components/AddCategory.vue'
import SearchProduct from '../components/SearchProduct.vue'
import ShowProduct from '../components/ShowProduct.vue'
import EditProduct from '../components/EditProduct.vue'
import AddProduct from '../components/AddProduct.vue'
import AddUser from '../components/AddUser.vue'

export default {
    data() {
        return {
            token: useAuthStore().$state.token,
            categories: [],
            editingCategory: null,
            msgCategory: "",
            searchedProduct: [],
            showSearchedProduct: false,
            editingProduct: null,
            msgProduct: "",
            errorMsgProduct: "",
            msgDeleteProduct: ""
        }
    },
    components: {
        Categories,
        EditCategory,
        AddCategory,
        SearchProduct,
        ShowProduct,
        EditProduct,
        AddProduct,
        AddUser
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

            // Anropar metod för att hämta kategorier på nytt om respons är OK
            if (resp.ok) {
                this.getCategories();

                // Sätter null för propertyn editingCategory
                this.editingCategory = null;

                // Skickar meddelande
                this.msgCategory = 'Kategorin "' + updatedCategory.name + '" har uppdaterats';

                // Tar bort meddelande efter 5 sekunder
                setTimeout(() => { this.msgCategory = "" }, 5000);
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

                // Skickar meddelande
                this.msgCategory = 'Kategorin "' + category.name + '" har raderats';

                // Tar bort meddelande efter 5 sekunder
                setTimeout(() => { this.msgCategory = "" }, 5000);
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

                // Skapar nytt FormData-objekt
                const formData = new FormData();

                // Adderar kategori-id, namn och antal till FormData-objektet
                formData.append("category_id", updatedProduct.category_id)
                formData.append("name", updatedProduct.name);
                formData.append("quantity", updatedProduct.quantity);

                // Adderar beskrivning till FormData-objektet om descript inte är null
                if (updatedProduct.description !== null) {
                    formData.append("description", updatedProduct.description);
                }

                // Adderar bildfil till FormData-objektet om image inte är null
                if (updatedProduct.image !== null) {
                    formData.append("image", updatedProduct.image);
                }

                // Adderar pris till FormData-objektet om price inte är null
                if (updatedProduct.price !== null) {
                    formData.append("price", updatedProduct.price);
                }

                // Adderar method spoofing eftersom formulärdata inte accepteras vid PUT-request
                formData.append("_method", "PUT");

                // Gör fetch-anrop och skickar med FormData-objektet
                const resp = await fetch(config.apiUrl + "api/product/" + updatedProduct.id, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Authorization": "Bearer " + this.token
                    },
                    body: formData
                });
                const data = await resp.json();

                // Om respons är OK
                if (resp.ok) {

                    // Sätter null för propertyn editingProduct
                    this.editingProduct = null;

                    // Döljer framsökt(a) produkt(er)
                    this.showSearchedProduct = false;

                    // Skickar meddelande
                    this.msgProduct = 'Produkten "' + updatedProduct.name + '" har uppdaterats'

                    // Tar bort meddelande efter 5 sekunder
                    setTimeout(() => { this.msgProduct = "" }, 5000);
                }
            // Skickar felmeddelande
            } else {
                this.errorMsgProduct = "Namn och antal måste anges!";

                // Tar bort meddelande efter 5 sekunder
                setTimeout(() => { this.errorMsgProduct = "" }, 5000);
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

            // Om respons är OK
            if (resp.ok) {

                // Döljer framsökt(a) produkt(er)
                this.showSearchedProduct = false;

                // Skickar meddelande
                this.msgDeleteProduct = 'Produkten "' + product.name + '" har raderats'

                // Tar bort meddelande efter 5 sekunder
                setTimeout(() => { this.msgDeleteProduct = "" }, 5000);
            }
        }
    },
    mounted() {
        // Anropar metod
        this.getCategories();
    }
}
</script>

<style scoped>
.fade-out {
    opacity: 0;
    transition: opacity 2s 3s;
}
</style>