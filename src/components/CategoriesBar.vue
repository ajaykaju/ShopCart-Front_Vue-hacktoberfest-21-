<template>
  <div class="category_bar">
    <div class="categories">
      <div
        class="item mouse_cursor"
        v-for="item in categories"
        :key="item"
        @click="$router.push(`/category/${item.title}`)"
      >
        <img v-if="item.image" :src="item.image" draggable="false" />
        <img
          draggable="false"
          v-else
          src="https://i.pinimg.com/originals/20/04/a8/2004a85062138d1ed8908a5c1fe4cd04.png"
        />
        <div class="title">{{ item.title }}</div>
      </div>
    </div>
    <div class="more" @click="showAllCateogories">
      <img draggable="false" src="../assets/icons/right-arrow-double.svg" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    showAllCateogories() {
      this.showMoreCateogoriesChanger();
      this.isSideMenuChanger();
    },
    ...mapActions(["showMoreCateogoriesChanger", "isSideMenuChanger"]),
  },
  computed: {
    ...mapGetters(["categories"]),
  },
};
</script>

<style lang="sass" scoped>
@import '../styles/categorybar'
</style>