<template>
    <h1 class="font-bold">Lägg till</h1>
    <AddCategory />
    <AddProduct />
</template>

<script>
import AddCategory from '../components/AddCategory.vue'
import AddProduct from '../components/AddProduct.vue'

export default {
    components: {
        AddCategory,
        AddProduct
    }
}
</script>