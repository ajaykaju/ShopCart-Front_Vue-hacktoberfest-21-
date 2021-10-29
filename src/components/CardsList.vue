<template>
  <div class="cards_list_container">
    <div
      class="cards_list_left_control"
      @click="left_scroll"
      v-show="!isTouchDevice"
    >
      <img src="../assets/icons/left-chevron.svg" />
    </div>
    <div
      class="cards_list_right_control"
      @click="right_scroll"
      v-show="!isTouchDevice"
    >
      <img src="../assets/icons/right-chevron.svg" />
    </div>
    <div class="cards_list_animator">
      <div
        class="cards_list_main"
        ref="listScroll"
        :class="[
          isEndOfScrollLeft ? 'leftScrollOverAnim' : '',
          isEndOfScrollRight ? 'rightScrollOverAnim' : '',
        ]"
      >
        <div
          v-for="(product, i) in products"
          :key="i"
          class="cards_list_item"
          :class="{
            card_large_item: isLarge,
            card_small_item: !isLarge,
            item_marger: i !== products.length,
          }"
          @click="$router.push(`/product/${product._id}`)"
        >
          <div class="cli_rate_and_count">
            <div class="cli_rating">{{ product.rating }}</div>
            <div class="cli_count">({{ "" }})</div>
          </div>
          <div class="cli_fav mouse_cursor">
            <img class="cli_favtag" src="../assets/icons/tag.svg" />
            <div class="cli_favcontent">
              <img src="../assets/icons/add-to-fav.svg" />
            </div>
          </div>
          <div class="cli_image">
            <img :src="product.images[0]" />
          </div>
          <div class="cli_title">
            {{ product.title }}
          </div>
          <div v-show="isLarge" class="cli_description">
            {{ product.briefDescription }}
          </div>
          <div class="cli_bottom">
            <div class="cli_price">${{ product.currentPrice }}</div>
            <div class="cli_offer">{{ product.actualPrice }}</div>
            <!-- <div class="cli_addToCart" @click="null">
              <img src="../assets/icons/shopping-cart-white.svg" />
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isLarge: {
      type: Boolean,
      default: true,
    },
    products: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isTouchDevice: false,
      isEndOfScrollLeft: false,
      isEndOfScrollRight: false,
      lastScrollPosition: 0,
    };
  },
  computed: {},
  methods: {
    isTouchDeviceDecider() {
      if (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      ) {
        this.isTouchDevice = true;
      } else {
        this.isTouchDevice = false;
      }
    },
    left_scroll() {
      let listScroll = this.$refs.listScroll;

      listScroll.scrollLeft -= this.isLarge ? 400 : 300;
      if (listScroll.scrollLeft === 0) this.scrollEvent();
    },
    right_scroll() {
      let listScroll = this.$refs.listScroll;
      listScroll.scrollLeft += this.isLarge ? 400 : 300;
      if (
        Math.round(listScroll.scrollLeft) ===
        Math.round(listScroll.scrollWidth - listScroll.clientWidth)
      ) {
        this.scrollEvent();
      }
    },
    scrollEvent() {
      let listScroll = this.$refs.listScroll;
      let maxScrollWidth = listScroll.scrollWidth - listScroll.clientWidth;
      if (Math.round(listScroll.scrollLeft) === 0) {
        this.isEndOfScrollLeft = true;
        setTimeout(() => {
          this.isEndOfScrollLeft = false;
        }, 1000);
      }
      if (Math.round(listScroll.scrollLeft) === Math.round(maxScrollWidth)) {
        this.isEndOfScrollRight = true;
        setTimeout(() => {
          this.isEndOfScrollRight = false;
        }, 1000);
      }
    },
  },
  beforeMount() {
    this.isTouchDeviceDecider();
  },
  mounted() {
    this.$refs.listScroll.addEventListener("scroll", this.scrollEvent);
  },
  beforeUnmount() {
    removeEventListener("scroll", this.scrollEvent);
  },
};
</script>

<style lang="sass" scoped>
@import '../styles/cardslist'
</style>