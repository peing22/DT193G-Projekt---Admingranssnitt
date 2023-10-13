<template>
    <h3>Ändra kategori</h3>
    <label for="editCatName">Namn:</label>
    <br>
    <input v-model="editedCategoryName" type="text" id="editCatName" class="w-full">
    <br>
    <div class="w-full mt-3 mb-3 flex">
        <button @click="editCategory" class="me-1 w-full">Spara<i class="fa-solid fa-rotate ps-1 md:ps-2"></i></button>
        <button @click="$emit('cancelEdit')" class="w-full">Avbryt</button>
    </div>
    <p class="text-center font-bold text-red-500 mt-1" :class="{ 'fade-out': errorMessage !== '' }">{{ errorMessage }}</p>
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