<template>
  <h1>Produkter</h1>
  <div class="px-5">
    <CategorySelector :categories="categories" :selectedCategory="selectedCategory"
      @update:selectedCategory="updateSelectedCategory" />
    <div class="flex flex-wrap justify-center gap-6 md:gap-7">
      <ProductList :products="showProducts" />
    </div>
  </div>
</template>

<script>
import CategorySelector from '../components/CategorySelector.vue'
import ProductList from '../components/ProductList.vue'
import { useAuthStore } from '../stores/auth'
import config from '../config'


export default {
  data() {
    return {
      // Lagrar produktkategorier
      categories: [],

      // Lagrar tom textsträng eller vald kategori
      selectedCategory: "",

      // Lagrar samtliga produkter
      products: [],

      // Lagrar valda produkter utifrån kategori
      selectedProducts: [],

      // Lagrar token
      token: useAuthStore().$state.token
    }
  },
  components: {
    CategorySelector,
    ProductList
  },
  computed: {
    showProducts() {

      // Returnerar samtliga produkter om selectedCategory är tom
      if (this.selectedCategory === "") {
        return this.products;

        // Returnerar produkter för vald kategori
      } else {
        return this.selectedProducts;
      }
    }
  },
  methods: {
    // Hämtar kategorier och produkter
    async fetchData() {

      // Gör två parallella fetch-anrop
      const [categoriesResp, productsResp] = await Promise.all([

        // Hämtar kategorier
        fetch(config.apiUrl + "api/category", {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + this.token
          }
        }),
        // Hämtar produkter
        fetch(config.apiUrl + "api/product", {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + this.token
          }
        })
      ]);
      // Extraherar och analyserar JSON-responsen
      const [categoriesData, productsData] = await Promise.all([
        categoriesResp.json(),
        productsResp.json()
      ]);

      // Uppdaterar categories och products med hämtad data
      this.categories = categoriesData;
      this.products = productsData;
    },
    // Uppdaterar vald kategori
    updateSelectedCategory(category) {

      // Uppdaterar selectedCategory med id för vald kategori
      this.selectedCategory = category;

      // Om id inte är en tom textsträng
      if (category !== "") {

        // Lagrar alla produkter i en variabel
        let products = this.products;

        // Uppdaterar selectedProducts med en array filtrerad efter vald kategori
        this.selectedProducts = products.filter(product => product.category_id.toString() === category);
      }
    }
  },
  mounted() {
    // Anropar metod
    this.fetchData();
  }
}
</script>
