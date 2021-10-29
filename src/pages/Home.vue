<template>
  <transition name="minNavBar">
    <div v-if="showMinNavBar" class="minNav">
      <nav-bar navType="small" :isScrolled="isScrolled"></nav-bar>
    </div>
  </transition>
  <nav-bar></nav-bar>
  <div class="content">
    <search-bar class="main_search_bar"></search-bar>
    <router-view />
  </div>
  <footer-field></footer-field>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import SearchBar from "../components/base/SearchBar.vue";
import FooterField from "../components/FooterField.vue";

const OFFSET = 50;

export default {
  components: { NavBar, SearchBar, FooterField },
  mounted() {
    this.lastScrollPosition = window.pageYOffset;
    window.addEventListener("scroll", this.onScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  },
  data() {
    return {
      showMinNavBar: false,
      lastScrollPosition: 0,
      scrollValue: 0,
      isScrolled: false,
    };
  },
  methods: {
    onScroll() {
      if (window.pageYOffset < 250) {
        if (this.isScrolled) this.isScrolled = false;
        this.showMinNavBar = false;
        return;
      }
      if (Math.abs(window.pageYOffset - this.lastScrollPosition) < OFFSET)
        return;
      if (!this.isScrolled) this.isScrolled = true;
      this.showMinNavBar = window.pageYOffset < this.lastScrollPosition;
      this.lastScrollPosition = window.pageYOffset;
    },
  },
};
</script>


<style lang="sass">
@import '../styles/home'
</style>

<style lang="sass" scoped>
@import '../styles/home_scoped'
</style>