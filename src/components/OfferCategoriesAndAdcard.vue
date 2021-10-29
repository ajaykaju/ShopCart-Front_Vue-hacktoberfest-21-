<template>
  <div class="wrapper">
    <div class="offer_wrapper">
      <header-tab
        title="Exclusive Offers"
        moreTitle="Explore More"
      ></header-tab>
      <div class="topCategories">
        <div class="offerItems">
          <div class="offerItem" v-for="i in 50" :key="i">
            <img
              src="https://www.androidpolice.com/wp-content/uploads/2020/06/05/TCL-Android-TV.png"
            />
            <div class="titleAndOffer">
              <div class="title">Android Televisions</div>
              <div class="offer">Min 30% off</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="adCards">
      <img :src="require(`../assets/images/${adCardImage}`)" />
    </div>
  </div>
</template>


<script>
import HeaderTab from "./base/HeaderTab.vue";
export default {
  components: { HeaderTab },
  data() {
    return {
      adCardImages: {
        medium: "adrightcard_medium.png",
        small: "adrightcard_small.png",
      },
      presentWidth: 0
    };
  },
  computed: {
    adCardImage() {
      if (this.presentWidth < 770) return this.adCardImages.small;
      else return this.adCardImages.medium;
    },
  },
  methods: {
    widthCalculator() {
      this.presentWidth = window.innerWidth;
    },
  },
  mounted() {
    this.presentWidth = window.innerWidth;
    window.addEventListener("resize", this.widthCalculator);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.widthCalculator);
  },
};
</script>

<style lang="sass" scoped>
@import '../styles/offercategoriesandadcard'
</style>>
