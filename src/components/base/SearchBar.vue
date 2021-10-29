<template>
  <div class="search_bar" :style="{ boxShadow : isBoxShadow }">
    <span class="search_icon"><img :src="searchIcon" /></span>
    <input
      @focus="searchIconChanger"
      @blur="searchIconChanger"
      type="text"
      class="search_text"
      name="search_text"
      placeholder="Search for products"
    />
    <span class="filter_icon mouse_cursor"
      ><img :src="filterIcon" @click="filterIconChanger"
    /></span>
  </div>
</template>

<script>
import searchIcon from "../../assets/icons/search.svg";
import searchIconBlue from "../../assets/icons/search_blue.svg";

import filterIcon from "../../assets/icons/sliders.svg";
import filterIconBlue from "../../assets/icons/sliders_blue.svg";

export default {
  props: {
    boxShadow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isSearchFocused: false,
      isFilterFocused: false,
    };
  },
  computed: {
    searchIcon() {
      if (this.isSearchFocused) return searchIconBlue;
      else return searchIcon;
    },
    filterIcon() {
      if (this.isFilterFocused) return filterIconBlue;
      else return filterIcon;
    },
    isBoxShadow() {
      if(this.boxShadow) return '0 0 4px 0px rgba( 0, 0, 0, 0.1)'
      else return '0px'
    }
  },
  methods: {
    searchIconChanger() {
      this.isSearchFocused = !this.isSearchFocused;
    },
    filterIconChanger() {
      this.isFilterFocused = !this.isFilterFocused;
    },
  },
};
</script>

<style lang="sass" scoped>
.search_bar
    display: inline-flex
    place-self: center
    border-radius: 20px
    height: 35px
    background: #ffffff
    padding: 5px 10px
    width: 100%
    .search_icon, .filter_icon, .search_text
        align-items: center
        align-self: center
        align-content: center
        display: flex
        img
            width: 23px
            opacity: 1
    .search_icon
    .search_text
        border: none
        margin: 0 5px 0 5px
        outline: none
        height: 20px
        caret-color: #2196f3
        font-size: 15px
        width: 100%
    .filter_icon
</style>