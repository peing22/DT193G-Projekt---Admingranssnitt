<template>
    <div>
        <h3>Ändra kategori</h3>
        <label for="editCatName">Namn: </label>
        <input v-model="editedCategoryName" type="text" id="editCatName">
        <button @click="editCategory">Spara</button>
        <button @click="$emit('cancelEdit')">Avbryt</button>
        <p class="font-bold text-red-700" :class="{ 'fade-out': errorMessage !== '' }">{{ errorMessage }}</p>
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
            errorMessage: ""
        }
    },
    methods: {
        editCategory() {

            // Om tom textsträng skickas felmeddelande
            if (this.editedCategoryName === "") {
                this.errorMessage = "Ett namn måste anges!";

                // Tar bort meddelande efter 5 sekunder
                setTimeout(() => { this.errorMessage = "" }, 5000);

            // Skickar event med kategori-id och kategori-namn till föräldrakomponent
            } else {
                this.$emit('categoryEdited', {
                    id: this.category.id,
                    name: this.editedCategoryName,
                });
            }
        }
    }
}
</script>

<style scoped>
.fade-out {
    opacity: 0;
    transition: opacity 2s 3s;
}
</style>