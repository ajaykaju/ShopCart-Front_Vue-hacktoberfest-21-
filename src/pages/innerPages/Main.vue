<template>
  <categories-bar></categories-bar>
  <image-carousel></image-carousel>
  <header-tab title="Deals of the Day"></header-tab>
  <cards-list :products="products"></cards-list>
  <ad-banner-min :images="adbanner1"></ad-banner-min>
  <offer-categories-and-adcard></offer-categories-and-adcard>
  <ad-banner-min :images="adbanner2"></ad-banner-min>
  <header-tab title="Exclusive For You"></header-tab>
  <cards-list :isLarge="false" :products="products"></cards-list>
</template>

<script>
import AdBannerMin from "../../components/AdBannerMin.vue";
import HeaderTab from "../../components/base/HeaderTab.vue";
import CardsList from "../../components/CardsList.vue";
import CategoriesBar from "../../components/CategoriesBar.vue";
import ImageCarousel from "../../components/ImageCarousel.vue";
import OfferCategoriesAndAdcard from "../../components/OfferCategoriesAndAdcard.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    ImageCarousel,
    AdBannerMin,
    CategoriesBar,
    OfferCategoriesAndAdcard,
    CardsList,
    HeaderTab,
  },
  data() {
    return {
      adbanner1: {
        large: `adbanner1_large.png`,
        medium: `adbanner1_medium.png`,
        small: `adbanner1_small.png`,
      },
      adbanner2: {
        large: `adbanner2_large.png`,
        medium: `adbanner2_medium.png`,
        small: `adbanner2_small.png`,
      },
    };
  },
  computed: {
    ...mapGetters(["products"]),
  },
};
</script>