<template>
    <div>
        <label for="show">Visa: </label>
        <select name="show" :value="selectedCategory" @input="updateSelectedCategory">
            <option value="">Alla</option>
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

            // Skickar händelse och värde vidare till föräldrakomponent
            this.$emit('update:selectedCategory', event.target.value);
        }
    }
};
</script>
