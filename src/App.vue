<template>
  <Header v-if="showHeader" />
  <RouterView />
</template>

<script>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'

export default {
  components: {
    Header,
    RouterView
  },
  computed: {

    // Visar header om namnet på routen inte är home
    showHeader() {
      return this.$route.name !== 'home';
    }
  }
}
</script>