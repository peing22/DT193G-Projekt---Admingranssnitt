<template>
    <h3>Ändra Produkt</h3>
    <label for="editProductName">Namn:</label>
    <br>
    <input v-model="editedProductName" type="text" id="editProductName" class="w-full mb-3">
    <br>
    <label for="descript">Beskrivning:</label>
    <br>
    <textarea v-model="editedProductDesctipt" name="descript" id="descript" rows="1" class="w-full mb-1"></textarea>
    <br>
    <label for="category">Kategori:</label>
    <br>
    <select id="category" :value="editedProductCategory" @input="updateSelectedCategory" class="w-full mb-3">
        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
    </select>
    <br>
    <div class="w-full flex">
        <div class="w-full me-2">
            <label for="quantity">Antal:</label>
            <br>
            <input v-model="editedProductQuantity" type="number" id="quantity" class="w-full mb-3">
        </div>
        <div class="w-full ms-2">
            <label for="price">Pris:</label>
            <br>
            <input v-model="editedProductPrice" type="number" id="price" class="w-full mb-3">
        </div>
    </div>
    <div v-if="product.image">
        <p class="ms-2 mt-1">Nuvarande bild:</p>
        <img :src="getProductImageUrl(product.image)" :alt="product.name" class="rounded-2xl w-full mt-1 mb-3">
    </div>
    <label for="image" v-if="product.image">Ny bild:</label>
    <label for="image" v-else>Bild:</label>
    <br>
    <input @change="imageSelected" type="file" id="image"
        class="text-xs md:text-sm file:text-white file:rounded-full file:py-1 file:px-3 md:file:px-4 md:file:mt-1 file:uppercase file:cursor-pointer file:bg-white/20 file:transition file:duration-300 file:ease-in-out file:hover:bg-white/40 file:border-solid file:border file:border-white/20 file:font-medium file:tracking-widest">
    <p v-if="imageMessage" class="text-center font-bold text-red-500 mt-2">{{ imageMessage }}</p>
    <br v-else>
    <div class="w-full mt-3 mb-3 flex">
        <button @click="editProduct" class="me-1 w-full">Spara<i class="fa-solid fa-rotate ps-1 md:ps-2"></i></button>
        <button @click="$emit('cancelEdit')" class="w-full">Avbryt</button>
    </div>
</template>
  
<script>
import config from '../config'

export default {
    props: {
        product: Object,
        categories: Array
    },
    data() {
        return {
            editedProductName: this.product.name,
            editedProductDesctipt: this.product.description,
            editedProductPrice: this.product.price,
            editedProductQuantity: this.product.quantity,
            editedProductImage: null,
            imageMessage: "",
            editedProductCategory: this.product.category_id,
            selectedCategory: null,
            catId: null
        }
    },
    methods: {
        // Hämtar sökväg till bildfil
        getProductImageUrl(imagePath) {

            // Returnerar sökvägen till bilden om imagePath inte är null
            if (imagePath !== null) {
                return config.apiUrl + imagePath;

            // Returnerar en standardbild
            } else {
                return config.apiUrl + "uploads/default.jpg";
            }
        },
        // När en förändring har skett i inputfältet för bildfil
        imageSelected(event) {

            // Lagrar eventuell fil i en variabel
            const selectedFile = event.target.files[0];

            // Tar bort felmeddelande om det inte existerar någon fil men ett felmeddelande är synligt 
            if (!selectedFile && this.imageMessage !== "") {
                this.imageMessage = "";
            }

            // Lagrar tillåtna filtyper och maxstorlek i variabler
            const allowedExtensions = ['jpeg', 'jpg', 'png', 'gif'];
            const maxFileSize = 2048;

            // Lagrar filtyp konverterad till små bokstäver i en variabel
            const fileExtension = selectedFile.name.split('.').pop().toLowerCase();

            // Skriver ut felmeddelande om filtypen inte stämmer överens med tillåtna filtyper
            if (!allowedExtensions.includes(fileExtension)) {
                this.imageMessage = "Filer av andra typer än JPEG, JPG, PNG, och GIF kommer inte laddas upp!";

            // Skriver ut felmeddelande om filen är större än 2MB
            } else if (selectedFile.size > maxFileSize * 1024) {
                this.imageMessage = "Filer större än 2MB kommer inte laddas upp!";

            // Sätter värde för propertyn image och tömmer eventuellt felmeddelande
            } else {
                this.editedProductImage = selectedFile;
                this.imageMessage = "";
            }
        },
        // Sätter värde för salectedCategory om en annan kategori har valts
        updateSelectedCategory(event) {
            this.selectedCategory = event.target.value;
        },
        editProduct() {

            // Sätter värde för catId beroende på om kategorin har ändrats eller inte
            if (this.selectedCategory !== null) {
                this.catId = this.selectedCategory;
            } else {
                this.catId = this.editedProductCategory;
            }

            // Skickar event med värden till föräldrakomponent
            this.$emit('productEdited', {
                id: this.product.id,
                category_id: this.catId,
                name: this.editedProductName,
                description: this.editedProductDesctipt,
                price: this.editedProductPrice,
                quantity: this.editedProductQuantity,
                image: this.editedProductImage
            });
        }
    }
}
</script>