<template>
  <template v-if="isLoaded">
    <div class="container">
      <div class="main">
        <div class="images_and_selector">
          <div class="imageContainer">
            <img :src="product.images[imgIndex]" alt="Main_Image" />
          </div>
          <div class="imageSelector">
            <div
              class="image"
              v-for="(item, index) in product.images"
              :key="index"
              @click="imgIndex = index"
            >
              <img :src="product.images[index]" />
            </div>
          </div>
        </div>
        <div class="details">
          <div class="rating">{{ product.rating }}</div>
          <div class="title">{{ product.title }}</div>
          <div class="price">
            <div class="current">₹{{ product.currentPrice }}</div>
            <div
              class="actual"
              v-if="product.currentPrice != product.actualPrice"
            >
              ₹{{ product.actualPrice }}
            </div>
            <div
              class="perc"
              v-if="product.currentPrice != product.actualPrice"
            >
              {{ pricePercentage }}
            </div>
          </div>
          <div class="buttons">
            <button class="addToCart">Add to cart</button>
            <button class="buyNow">Buy Now</button>
          </div>
          <div class="av_offers">
            <div class="title">Available offers</div>
            <div
              v-for="(item, index) in product.availableOffers"
              :key="index"
              class="offers"
            >
              <img src="../assets/icons/offer_tag.svg" />
              <div class="offer">
                <span class="offer_title">{{ item.title }}</span>
                <span class="offer_content">{{ item.offer }}</span>
              </div>
            </div>
          </div>
          <div class="war_high_sell">
            <div class="highlights">
              <div class="inner_title">Highlights</div>
              <ul>
                <li
                  v-for="(item, index) in product.highlights"
                  :key="index"
                  class="inner_content"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
            <div class="vLine"></div>
            <div class="war_sell">
              <div class="warranty" v-if="product.warranty != ''">
                <div class="inner_title">Warranty</div>
                <ul>
                  <li class="inner_content">
                    {{ product.warranty }}
                  </li>
                </ul>
              </div>
              <div class="seller">
                <div class="inner_title">
                  Seller
                  <span class="seller_name">{{
                    product.sellerAndPolicies.name
                  }}</span>
                </div>
                <ul>
                  <li
                    v-for="(item, index) in product.sellerAndPolicies.policies"
                    :key="index"
                    class="inner_content"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hLine"></div>
      <div class="sub">
        <div class="other">
          <div class="descriptions">
            <div>
              <div class="info_title">Descriptions</div>
              <div
                v-for="(item, index) in product.descriptions"
                :key="index"
                class="info_item_contents"
              >
                <div class="info_item_title">{{ item.title }}</div>
                <div class="info_item_content">{{ item.description }}</div>
              </div>
            </div>
          </div>
          <div class="hLine"></div>
          <div class="specifications">
            <div class="info_title">Specifications</div>
            <div
              v-for="(item, index) in product.specifications"
              :key="index"
              class="info_content_and_name_wrap"
            >
              <div class="info_item_name">{{ item.name }}</div>
              <div
                class="info_item_contents"
                v-for="(spec, index) in item.specification"
                :key="index"
              >
                <div class="info_item_title">{{ spec.title }}</div>
                <div class="info_item_content">{{ spec.content }}</div>
              </div>
            </div>
          </div>
          <div class="hLine"></div>
          <div class="manufacuturer">
            <div>
              <div class="info_title">Manufacturing and other</div>
              <div
                v-for="(item, index) in product.manufactureAndOtherInfo"
                :key="index"
                class="info_item_contents"
              >
                <div class="info_item_title">{{ item.title }}</div>
                <div class="info_item_content">{{ item.content }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="reviews"></div>
      </div>
    </div>
  </template>
</template>

<script>
import axios from "axios";

export default {
  beforeCreate() {
    axios
      .get(
        `${process.env.VUE_APP_NODE_DEVELOPMENT_SERVER}/product?id=${this.$route.params.pId}`
      )
      .then((res) => {
        this.product = res.data;
        this.isLoaded = true;
      })
      .catch((e) => {
        console.log(e);
      });

    window.scrollTo(0, 0);
  },
  data() {
    return {
      product: {},
      isLoaded: false,
      imgIndex: 0,
    };
  },
  computed: {
    pricePercentage() {
      const cP = (this.product.currentPrice * 100) / this.product.actualPrice;
      const offer = Math.floor(100 - cP);
      return offer + "% off";
    },
  },
};
</script>

<style lang="sass" scoped>
@import '../styles/product'
</style>