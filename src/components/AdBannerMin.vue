<template>
  <div class="adBanner">
    <img :src="require(`../assets/images/${bannerImage}`)" />
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      screenWidth: 0,
    };
  },
  computed: {
    bannerImage() {
      if (this.screenWidth <= 660) return this.images.small;
      else if (this.screenWidth > 660 && this.screenWidth <= 1080)
        return this.images.medium;
      else return this.images.large;
    },
  },
  methods: {
    screenWidthCalculator() {
      this.screenWidth = window.innerWidth;
    },
  },
  mounted() {
    this.screenWidth = window.innerWidth;
    window.addEventListener("resize", this.screenWidthCalculator);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.screenWidthCalculator);
  },
};
</script>

<style lang="sass" scoped>
.adBanner
  border-radius: 10px
  height: 120px
  width: 100%
  background: white
  box-shadow: 0 0 4px 0px rgba(0, 0, 0, 0.1)
  display: grid
  position: relative
  overflow: hidden
  margin-top: 10px
  margin-bottom: 10px
  img
    border-radius: 10px
    position: absolute
    place-self: center
</style>