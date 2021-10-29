<template>
  <side-menu :isScrolled="isScrolled"></side-menu>
  <nav class="top_bar" :class="isLarge ? 'navLarge' : 'navSmall'">
    <div class="top_left">
      <div class="menu_button mouse_cursor" @click="isSideMenuChanger">
        <img src="../assets/icons/menu-01.png" />
      </div>
      <div class="logo mouse_cursor" @click="$router.push('/')">
        ShopCart<img src="" />
      </div>
    </div>
    <search-bar class="navbar_search"></search-bar>
    <div class="top_navigations">
      <div class="user_welcome" v-if="isLoggedIn">
        <span>Hello,</span><span class="user_name"> {{ user.firstName }}</span>
      </div>
      <div class="signup" v-else>
        <button @click="$router.push({ name: 'f1' })">SignUp</button>
      </div>
      <div
        class="avatar"
        @mouseover="userDrop = true"
        @mouseleave="userDrop = false"
      >
        <div class="circle mouse_cursor">
          <img src="" />
        </div>

        <!-- if no user -->
        <transition name="userDrop">
          <div class="userDrop" v-show="userDrop && !isLoggedIn">
            <div class="arrowContainer"></div>
            <button @click="$router.push({ name: 'LogIn' })">LogIn</button>
            <div>or</div>
            <button @click="$router.push({ name: 'f1' })">SignUp</button>
            <div class="link">Help</div>
            <div class="link">Privacy Policy</div>
          </div>
        </transition>

        <!-- if logged in -->
        <transition name="userDrop">
          <div class="userDrop" v-show="userDrop && isLoggedIn">
            <div class="arrowContainer"></div>
            <div class="link">My Account</div>
            <div class="link">Orders</div>
            <div class="link">Wishlist</div>
            <button @click="signOut_loc" id="signout">
              <span v-show="!submitted">Sign Out</span>
              <i class="fa fa-circle-o-notch fa-spin" v-show="submitted"></i>
            </button>
            <div class="link">Help</div>
            <div class="link">Privacy Policy</div>
          </div>
        </transition>
      </div>
      <div class="cart mouse_cursor">
        <span class="cart_items">0</span>
        <img src="../assets/icons/shopping-cart-black.svg" />
      </div>
    </div>
  </nav>
</template>

<script>
import SearchBar from "./base/SearchBar.vue";
import SideMenu from "./SideMenu.vue";

import { mapActions, mapGetters } from "vuex";

export default {
  components: { SearchBar, SideMenu },
  props: {
    navType: {
      type: String,
      default: "large",
    },
    isScrolled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      userDrop: false,
      submitted: false,
    };
  },
  computed: {
    isLarge() {
      if (this.navType.toLowerCase() === "small") return false;
      else return true;
    },

    ...mapGetters("user", ["user", "isLoggedIn"]),
  },
  methods: {
    ...mapActions(["isSideMenuChanger"]),
    ...mapActions("user", ["signOut"]),
    async signOut_loc() {
      const subButton = document.getElementById("signout");
      subButton.disabled = true;
      this.submitted = !this.submitted;
      await this.signOut();
      subButton.disabled = false;
      this.submitted = !this.submitted;
    },
  },
};
</script>

<style lang="sass" scoped>
@import ../styles/navbar
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css')
</style>