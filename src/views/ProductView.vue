<template>
  <div>
    <h1 class="font-bold">Produkter</h1>
    <CategorySelector :categories="categories" :selectedCategory="selectedCategory"
      @update:selectedCategory="updateSelectedCategory" />
    <ProductList :products="showProducts" />
  </div>
</template>

<script>
import CategorySelector from '../components/CategorySelector.vue'
import ProductList from '../components/ProductList.vue'
import { useAuthStore } from '../stores/auth'

export default {
  data() {
    return {
      url: "http://127.0.0.1:8000/",
      categories: [],
      selectedCategory: "",
      products: [],
      selectedProducts: [],
      token: useAuthStore().$state.token
    }
  },
  components: {
    CategorySelector,
    ProductList
  },
  computed: {
    showProducts() {
      if (this.selectedCategory === "") {
        return this.products;
      } else {
        return this.selectedProducts;
      }
    }
  },
  methods: {
    async fetchData() {
      const [categoriesResp, productsResp] = await Promise.all([
        fetch(this.url + "api/category", {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + this.token
          }
        }),
        fetch(this.url + "api/product", {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + this.token
          }
        })
      ]);
      const [categoriesData, productsData] = await Promise.all([
        categoriesResp.json(),
        productsResp.json()
      ]);
      this.categories = categoriesData;
      this.products = productsData;
    },
    updateSelectedCategory(category) {
      this.selectedCategory = category;
      if (category !== "") {
        let categoryId = this.selectedCategory;
        let products = this.products;
        this.selectedProducts = products.filter(product => product.category_id.toString() === categoryId);
      }
    }
  },
  mounted() {
    this.fetchData();
  }
}
</script>
