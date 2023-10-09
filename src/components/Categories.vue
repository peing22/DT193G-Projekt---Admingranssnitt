<template>
    <div>
        <p>{{ category.name }}</p>
        <button @click="$emit('editCategory', category)">Ändra</button>
        <button @click="$emit('deleteCategory')">Radera</button>
    </div>
</template>

<script>
export default {
    props: {
        category: Object
    }
}
</script>