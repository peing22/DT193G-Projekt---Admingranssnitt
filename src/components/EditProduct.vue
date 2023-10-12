<template>
    <div>
        <h3>Ändra Produkt</h3>
        <label for="editProductName">Namn: </label>
        <input v-model="editedProductName" type="text" id="editProductName">
        <br>
        <label for="descript">Beskrivning: </label>
        <input v-model="editedProductDesctipt" type="text" id="descript">
        <br>
        <label for="price">Pris: </label>
        <input v-model="editedProductPrice" type="number" id="price">
        <br>
        <label for="quantity">Antal: </label>
        <input v-model="editedProductQuantity" type="number" id="quantity">
        <br>
        <div v-if="product.image !== null">
            <p>Nuvarande bild: </p>
            <img :src="getProductImageUrl(product.image)" :alt="product.name" width="25" height="auto">
        </div>
        <label for="image" v-if="product.image !== null">Ny bild: </label>
        <label for="image" v-else>Bild: </label>
        <input @change="imageSelected" type="file" id="image">
        <p v-if="imageMessage" class="font-bold text-red-700">{{ imageMessage }}</p>
        <br v-else>
        <label for="category">Produktkategori: </label>
        <select id="category" :value="editedProductCategory" @input="updateSelectedCategory">
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
        <br>
        <button @click="editProduct">Spara</button>
        <button @click="$emit('cancelEdit')">Avbryt</button>
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