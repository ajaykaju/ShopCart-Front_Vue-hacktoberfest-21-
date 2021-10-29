<template>
    <router-view />
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  created() {
    this.autoLogin();
    this.loadProducts();
  },
  computed: {
    ...mapGetters(["isProductsLoaded"]),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("user", ["autoLogin"]),
    ...mapActions(["loadProducts"]),
  },
};
</script>

<style lang="sass">
@import './styles/app'
</style>
