<template>
    <p class="font-bold">Lägg till produkt</p>
    <form>
        <label for="name">Produktnamn: </label>
        <input type="text" id="name">
        <br>
        <label for="descript">Beskrivning: </label>
        <input type="text" id="descript">
        <br>
        <label for="price">Pris: </label>
        <input type="number" id="price">
        <br>
        <label for="antal">Antal: </label>
        <input type="number" id="number">
        <br>
        <label for="image">Bild: </label>
        <input type="file" id="image">
        <br>
        <input type="submit" value="Lägg till">
    </form>
</template>