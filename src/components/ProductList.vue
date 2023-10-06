<template>
    <div v-for="product in products" :key="product.id">
        <p>{{ product.name }}</p>
        <p>{{ product.description }}</p>
        <p>{{ product.image }}</p>
        <p>{{ product.price }}</p>
        <p>{{ product.quantity }}</p>
        <br>
    </div>
</template>
  
<script>
export default {
    props: {
        products: Array
    }
};
</script>