<template>
  <template v-if="isLoaded">
    <div class="cat_container">
      <div class="filter">
        <div class="price_block">
          <div class="block_title">Price</div>
          <div class="range">
            <span>Min</span>
            <div class="box">
              ₹<input type="text" v-model="minPrice" readonly />
            </div>
          </div>
          <range-slider
            :max="5000"
            @currentValue="minCurrent"
            :cValue="minPrice"
          ></range-slider>
          <div class="range">
            <span>Max</span>
            <div class="box">
              ₹<input type="text" v-model="maxPrice" readonly />
            </div>
          </div>
          <range-slider
            :min="5000"
            :max="200000"
            @currentValue="maxCurrent"
            :cValue="maxPrice"
            :isMin="false"
          ></range-slider>
        </div>
        <div class="hLine"></div>
        <div class="dynamic_block" v-for="(filter, i) in filters" :key="i">
          <div class="bl_title">{{ filter.title }}</div>
          <div class="subvalues" v-for="(value, j) in filter.values" :key="j">
            <div
              class="catname"
              :class="filterClass(i, j)"
              @click="filterDecider(i, j)"
            >
              {{ value }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="products.length > 0" class="products_wrapper">
        <div
          class="pcard cat_item"
          v-for="product in products"
          :key="product._id"
          @click="$router.push(`/product/${product._id}`)"
        >
          <img :src="product.images[0]" />
          <div class="rating">{{ product.rating }}</div>
          <div class="title">{{ product.title }}</div>
          <div class="price_and_offer">
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
              {{ pricePercentage(product) }}
            </div>
          </div>
        </div>
        <div
          class="pcard loading"
          v-for="i in 3 - products.length"
          :key="i"
          v-show="products.length <= 3"
        >
          <div class="image"></div>
          <div class="rating"></div>
          <div class="title"></div>
          <div class="price"></div>
        </div>
      </div>
      <div v-else class="products_wrapper">
        <div class="pcard loading" v-for="i in 3" :key="i">
          <div class="image"></div>
          <div class="rating"></div>
          <div class="title"></div>
          <div class="price"></div>
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <loader :isError="isError"></loader>
  </template>
</template>

<script>
import axios from "axios";
import loader from "../../components/loader.vue";
import RangeSlider from "../../components/RangeSlider.vue";

export default {
  components: { loader, RangeSlider },
  data() {
    return {
      isLoaded: false,
      products: [],
      isError: false,
      minPrice: 0,
      maxPrice: 0,
      filters: [],
      selectedFilters: {},
      max: 200000,
      min: 0,
      minTimeId: "",
      maxTimeId: "",
    };
  },
  computed: {},
  methods: {
    minCurrent(value) {
      this.minPrice = value;

      clearTimeout(this.minTimeId);

      // this.minTimeId = setTimeout(() => {
      //   this.fetchFilterData(this.filterUrlGenerator());
      // }, 2000);
    },
    maxCurrent(value) {
      this.maxPrice = value;

      clearTimeout(this.maxTimeId);

      // this.maxTimeId = setTimeout(() => {
      //   this.fetchFilterData(this.filterUrlGenerator());
      // }, 2000);
    },
    filterUrlGenerator() {
      let filterUrl = "";

      if (this.maxPrice > 0)
        filterUrl = `&rangeFrom=${this.minPrice}&rangeTo=${this.maxPrice}`;
      else filterUrl = `&rangeFrom=${this.minPrice}`;

      for (let i in this.selectedFilters) {
        this.selectedFilters[i].forEach((j) => {
          filterUrl =
            filterUrl +
            `&${this.filters[i].title}=${this.filters[i].values[j]}`;
        });
      }

      // this.$router.replace({ query: { ram: "4 gb" } });
      // console.log(this.$router.currentRoute.values)
      history.pushState(
        {},
        null,
        this.$router.currentRoute.value.path + "?" + filterUrl.slice(1)
      );

      filterUrl =
        `${process.env.VUE_APP_NODE_DEVELOPMENT_SERVER}/category?parent=${this.$route.params.parent}` +
        filterUrl;
      return filterUrl;
    },
    filterClass(i, j) {
      if (this.selectedFilters[i]) {
        if (this.selectedFilters[i].indexOf(j) > -1) {
          return "catSelect";
        } else {
          return "catNormal";
        }
      } else {
        return "catNormal";
      }
    },
    filterDecider(i, j) {
      this.filterSelector(i, j);
      this.fetchFilterData(this.filterUrlGenerator());
    },

    filterSelector(i, j) {
      if (this.selectedFilters[i]) {
        if (this.selectedFilters[i].indexOf(j) > -1) {
          this.selectedFilters[i] = this.selectedFilters[i].filter(
            (item) => item !== j
          );
        } else {
          this.selectedFilters[i].push(j);
        }
      } else {
        this.selectedFilters[i] = [];
        this.selectedFilters[i].push(j);
      }
    },

    generateUrl() {
      let queries = ``;

      for (let qu in this.$route.query) {
        if (Array.isArray(this.$route.query[qu])) {
          this.$route.query[qu].forEach((item) => {
            queries = queries + `&${qu}=${item}`;
          });
        } else {
          queries = queries + `&${qu}=${this.$route.query[qu]}`;
        }
      }

      return (
        `${process.env.VUE_APP_NODE_DEVELOPMENT_SERVER}/category?parent=${this.$route.params.parent}` +
        queries
      );
    },
    async fetchFilters() {
      await axios
        .get(
          `${process.env.VUE_APP_NODE_DEVELOPMENT_SERVER}/category/filters?parent=${this.$route.params.parent}`
        )
        .then((res) => {
          this.filters = res.data;
        })
        .then(() => {
          this.filters.forEach((item, i) => {
            for (let qu in this.$route.query) {
              if (item.title === qu.toString().toLowerCase()) {
                if (Array.isArray(this.$route.query[qu])) {
                  this.$route.query[qu].forEach((val) => {
                    if (item.values.indexOf(val) > -1)
                      this.filterSelector(i, item.values.indexOf(val));
                  });
                } else {
                  if (item.values.indexOf(this.$route.query[qu]) > -1)
                    this.filterSelector(
                      i,
                      item.values.indexOf(this.$route.query[qu])
                    );
                }
              }
            }
          });
        })
        .then(() => {
          if (this.$route.query.rangeFrom) {
            this.minPrice = +this.$route.query.rangeFrom;
          }

          if (this.$route.query.rangeTo)
            this.maxPrice = +this.$route.query.rangeTo;
        })
        .catch(() => {
          this.isError = true;
        });
    },
    async fetchData(link) {
      this.products = [];
      this.isLoaded = false;
      this.isError = false;
      await axios
        .get(link)
        .then((res) => {
          this.products = res.data;
        })
        .then(async () => {
          await this.fetchFilters();
        })
        .then(() => {
          this.isLoaded = true;
        })
        .catch(() => {
          this.isError = true;
        });
    },
    async fetchFilterData(link) {
      this.products = [];
      this.isError = false;
      await axios
        .get(link)
        .then((res) => {
          this.products = res.data;
        })
        .catch(() => {
          this.isError = true;
        });
    },
    pricePercentage(product) {
      const cP = (product.currentPrice * 100) / product.actualPrice;
      const offer = Math.floor(100 - cP);
      return offer + "% off";
    },
  },
  watch: {
    "$route.params": {
      handler() {
        this.fetchData(this.generateUrl());
      },
      immediate: true,
    },
  },
};
</script>


<style lang="sass" scoped>
@import '../../styles/categories'
</style>
