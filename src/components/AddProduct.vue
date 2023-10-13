<template>
    <h3>Lägg till produkt</h3>
    <form ref="productForm" @submit.prevent="addProduct()">
        <label for="productName">Namn:</label>
        <br>
        <input v-model="name" type="text" id="productName" class="w-full mb-3">
        <br>
        <label for="descript">Beskrivning:</label>
        <br>
        <textarea v-model="descript" name="descript" id="descript" rows="1" class="w-full mb-1"></textarea>
        <br>
        <label for="category">Kategori:</label>
        <br>
        <select id="category" :value="selectedCategory" @input="updateSelectedCategory" class="w-full mb-3">
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
        <br>
        <div class="w-full flex">
            <div class="w-full me-2">
                <label for="quantity">Antal:</label>
                <br>
                <input v-model="quantity" type="number" id="quantity" class="w-full mb-3">
            </div>
            <div class="w-full ms-2">
                <label for="price">Pris:</label>
                <br>
                <input v-model="price" type="number" id="price" class="w-full mb-3">
            </div>
        </div>
        <label for="image">Bild:</label>
        <br>
        <input @change="imageSelected" type="file" id="image"
            class="text-xs md:text-sm file:text-white file:rounded-full file:py-1 file:px-3 md:file:px-4 md:file:mt-1 file:uppercase file:cursor-pointer file:bg-white/20 file:transition file:duration-300 file:ease-in-out file:hover:bg-white/40 file:border-solid file:border file:border-white/20 file:font-medium file:tracking-widest">
        <p v-if="imageMessage" class="text-center font-bold text-red-500 mt-2">{{ imageMessage }}</p>
        <br v-else>
        <input type="submit" value="Lägg till" class="w-full mt-3 mb-3">
    </form>
    <p class="font-bold text-green-500 text-center" :class="{ 'fade-out': message !== '' }">{{ message }}</p>
    <p class="font-bold text-red-500 text-center" :class="{ 'fade-out': errorMessage !== '' }">{{ errorMessage }}</p>
</template>

<script>
import config from '../config'

export default {
    props: {
        categories: Array,
        token: String
    },
    data() {
        return {
            name: "",
            descript: "",
            price: null,
            quantity: null,
            image: null,
            imageMessage: "",
            selectedCategory: "",
            message: "",
            errorMessage: ""
        }
    },
    methods: {
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
                this.image = selectedFile;
                this.imageMessage = "";
            }
        },
        // Sätter värde för salectedCategory när en kategori har valts
        updateSelectedCategory(event) {
            this.selectedCategory = event.target.value;
        },
        async addProduct() {

            // Om namn, antal och produktkategori har angivits
            if (this.name.trim() !== "" && this.quantity !== null && this.selectedCategory.trim() !== "") {

                // Skapar nytt FormData-objekt
                const formData = new FormData();

                // Adderar namn och antal till FormData-objektet
                formData.append("name", this.name);
                formData.append("quantity", this.quantity);

                // Adderar beskrivning till FormData-objektet om descript inte är tom
                if (this.descript !== "") {
                    formData.append("description", this.descript);
                }

                // Adderar bildfil till FormData-objektet om image inte är null
                if (this.image !== null) {
                    formData.append("image", this.image);
                }

                // Adderar pris till FormData-objektet om price inte är null
                if (this.price !== null) {
                    formData.append("price", this.price);
                }

                // Gör fetch-anrop och skickar med FormData-objektet
                const resp = await fetch(config.apiUrl + "api/product/" + this.selectedCategory, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Authorization": "Bearer " + this.token
                    },
                    body: formData
                });

                // Om responsen är OK
                if (resp.ok) {

                    // Skickar meddelande
                    this.message = 'Produkten "' + this.name + '" har lagts till';

                    // Tömmer och återställer formulär
                    this.$refs.productForm.reset();
                    this.name = "";
                    this.descript = "";
                    this.price = null;
                    this.quantity = null;
                    this.image = null;
                    this.selectedCategory = "";

                    // Tar bort meddelande efter 5 sekunder
                    setTimeout(() => { this.message = "" }, 5000);
                }
                // Skickar felmeddelande
            } else {
                this.errorMessage = "Namn, kategori och antal måste anges!";

                // Tar bort meddelande efter 5 sekunder
                setTimeout(() => { this.errorMessage = "" }, 5000);
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