<template>
  <div class="spin_container">
    <div class="lds-ellipsis" v-if="!isError">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <transition name="loader" v-else>
      <div class="loadingError">
        <img src="../assets/images/loadingError.png" />
        <div class="message">
          An error occured. Please check your internet connectivity and reload
          this page!
        </div>
        <button @click="reloader">Reload</button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    isError: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    reloader() {
      location.reload();
    },
  },
};
</script>

<style lang="sass" scoped>
@import "../styles/loader"
</style>