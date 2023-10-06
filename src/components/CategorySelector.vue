<template>
    <div>
        <select :value="selectedCategory" @input="updateSelectedCategory">
            <option value="">Visa alla</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
    </div>
</template>
  
<script>
export default {
    props: {
        categories: Array,
        selectedCategory: String
    },
    methods: {
        updateSelectedCategory(event) {
            this.$emit('update:selectedCategory', event.target.value);
        }
    }
};
</script>
