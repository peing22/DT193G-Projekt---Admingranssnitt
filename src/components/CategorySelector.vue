<template>
    <div class="flex justify-center mb-6 md:mb-7">
        <div class="w-full max-w-xs md:max-w-md">
            <label for="show">Välj vilka produkter som ska visas:</label>
            <select id="show" :value="selectedCategory" @input="updateSelectedCategory" class="px-2 w-full">
                <option value="">Alla</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>
        </div>
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
