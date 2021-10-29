<template>
  <div class="header_tab">
    <div class="header_title">{{ title }}</div>
    <div class="header_more mouse_cursor" v-if="isMore">
      {{ moreTitle }}
      <img draggable="false" src="../../assets/icons/right-arrow-double.svg" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    moreTitle: {
      type: String,
      default: "View All",
    },
    moreLink: {
      type: String,
      default: "",
    },
    isMore: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="sass" scoped>
.header_tab
    display: grid
    grid-auto-flow: column
    background: #fff
    padding: 5px 10px
    border-radius: 10px
    margin: 0 0 5px 0
    .header_title
        width: fit-content
        height: fit-content
        align-self: center
        font-family: 'Roboto-Medium'
    .header_more
        align-self: center
        justify-self: end
        padding: 10px
        transition: opacity .3s ease-out
        opacity: 0.8
        display: grid
        grid-auto-flow: column
        img
            align-self: center
            margin-left: 2px
        &:hover
            opacity: 1

@media (min-width: 936px)
    .header_tab
        .header_title
            font-size: 22px
        .header_more
            font-size: 15px
            img
                width: 12px

@media (max-width: 936px)
    .header_tab
        .header_title
            font-size: 18px
        .header_more
            font-size: 13px
            img
                width: 10px
</style>