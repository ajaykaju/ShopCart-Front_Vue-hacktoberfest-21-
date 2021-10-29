<template>
  <div class="block">
    <div class="title">
      <div class="text">{{ title }}</div>
      <img v-if="icon != ''" :src="require(`../../assets/icons/${icon}`)" />
    </div>
    <div class="lists">
      <transition-group :name="!isAnimated ? '' : 'listSlide'" tag="div">
        <div
          class="item"
          v-for="(item, index) in itemsForList"
          :key="index"
          @click="
            item.more
              ? itemOpenDecider(item)
              : isCategory
              ? $router.push(`/category/${item.title}`)
              : isInnerCategory
              ? $router.push(
                  `/category/${title}?brand=${item.title
                    .toString()
                    .toLowerCase()}`
                )
              : $router.push('/')
          "
        >
          <div class="item_title">{{ item.title }}</div>
          <img
            v-if="item.more"
            src="../../assets/icons/right-chevron-black.svg"
          />
          <span v-else></span>
        </div>
      </transition-group>
      <div
        class="show"
        @click="menuItemShower"
        v-show="items.length > 7 && listLimitNeeded"
        id="shower"
      >
        <div>{{ showButtonText }}</div>
        <img
          :style="{ transform: showImageTransform }"
          src="../../assets/icons/right-chevron-black.svg"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Object,
      default: function () {
        return {};
      },
    },
    listLimit: {
      type: Number,
      default: 7,
    },
    listLimitNeeded: {
      type: Boolean,
      default: false,
    },
    isAnimated: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    isCategory: {
      type: Boolean,
      default: false,
    },
    isInnerCategory: {
      type: Boolean,
      default: false,
    },
    link: {
      type: String,
      default: "/",
    },
  },
  data() {
    return {
      menuItemLimit: null,
      expand: true,
      menuItemOpen: false,
    };
  },
  computed: {
    itemsForList() {
      if (this.items.length > 7 && this.listLimitNeeded) {
        return this.items.slice(0, this.menuItemLimit);
      } else return this.items;
    },
    showButtonText() {
      if (this.menuItemLimit < this.items.length && this.expand)
        return "Show More";
      else return "Show Less";
    },
    showImageTransform() {
      if (this.menuItemLimit < this.items.length && this.expand)
        return "rotate(90deg)";
      else return "rotate(-90deg)";
    },
    iconImage() {
      console.log(this.icon);
      return this.icon;
    },
  },
  methods: {
    itemOpenDecider(itemContents) {
      this.$emit("menuItemClick", itemContents);
    },
    menuItemShower() {
      let itemsLength = this.items.length;

      if (this.menuItemLimit < itemsLength) {
        if (this.expand) this.menuItemLimit += this.listLimit;
        else this.menuItemLimit -= this.listLimit;
        if (this.menuItemLimit === this.listLimit) this.expand = !this.expand;
      } else {
        this.menuItemLimit -= this.listLimit;
        this.expand = !this.expand;
      }
    },

    clickDecider(item) {
      this.$router.push({
        path: `/category?parent=${item}&path=`,
      });
    },
  },
  mounted() {
    this.menuItemLimit = this.listLimit;
  },
};
</script>

<style lang="sass" scoped>
@import '../../styles/base/listblock'
</style>