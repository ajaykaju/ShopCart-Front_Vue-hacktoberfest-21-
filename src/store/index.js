import axios from "axios";
import { createStore } from "vuex";
import categoryList from "../assets/dummyData/categories.json";

import signupModule from "./signup";
import userModule from "./user";

export default createStore({
  modules: {
    signup: signupModule,
    user: userModule,
  },
  state() {
    return {
      showMoreCateogories: false,
      isSideMenu: false,
      products: [],
      categories: categoryList.items,

      isProductsLoaded: false,

      isAnotherPage: false,
    };
  },
  mutations: {
    showMoreCateogoriesChanger(state) {
      state.showMoreCateogories = !state.showMoreCateogories;
    },
    isSideMenuChanger(state) {
      state.isSideMenu = !state.isSideMenu;
    },
    loadProducts(state, payload) {
      state.products = payload;
    },

    isProductsLoadedChanger(state, payload) {
      state.isProductsLoaded = payload;
    },
  },
  actions: {
    showMoreCateogoriesChanger(context) {
      context.commit({ type: "showMoreCateogoriesChanger" });
    },
    isSideMenuChanger(context) {
      context.commit({ type: "isSideMenuChanger" });
    },
    async loadProducts(context) {
      await axios
        .get(`${process.env.VUE_APP_NODE_DEVELOPMENT_SERVER}/products`)
        .then((res) => {
          let ca = [];
          for (let i = 0; i < 5; i++) ca = ca.concat(res.data);
          context.commit("loadProducts", ca);
          context.commit("isProductsLoadedChanger", true);
        })
        .catch(() => {
          context.commit("isProductsLoadedChanger", false);
        });
    },

    isProductsLoadedChanger(context, payload) {
      context.commit("isProductsLoadedChanger", payload);
    },
  },
  getters: {
    showMoreCateogories(state) {
      return state.showMoreCateogories;
    },
    isSideMenu(state) {
      return state.isSideMenu;
    },
    products(state) {
      return state.products;
    },
    categories(state) {
      return state.categories;
    },

    isProductsLoaded(state) {
      return state.isProductsLoaded;
    },
  },
});
