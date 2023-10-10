<template>
    <div>
        <p class="font-bold">Ändra kategori</p>
        <input v-model="editedCategoryName" type="text" />
        <button @click="editCategory">Spara</button>
        <button @click="$emit('cancelEdit')">Avbryt</button>
    </div>
</template>
  
<script>
export default {
    props: {
        category: Object,
    },
    data() {
        return {
            editedCategoryName: this.category.name,
        };
    },
    methods: {
        editCategory() {
            // Skickar event med kategori-id och kategori-namn till föräldrakomponent
            this.$emit('categoryEdited', {
                id: this.category.id,
                name: this.editedCategoryName,
            });
        },
    },
};
</script>
  