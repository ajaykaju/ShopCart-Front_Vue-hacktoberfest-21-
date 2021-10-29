<template>
  <div class="subscriber" :style="{width}">
    <input
      class="email"
      type="email"
      placeholder="Enter email for weekly newsletter"
      :style="{fontSize}"
    />
    <button class="button">
      <img src="../../assets/icons/right-chevron.svg" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '300px'
    },
    fontSize: {
      type: String,
      default: '15px'
    }
  }
};
</script>

<style lang="sass" scoped>
.subscriber
  display: inline-flex
  height: 25px
  align-self: center
  justify-self: left
  position: relative
  border-radius: 50px
  background: #ffffff
  outline: none
  border: none
  align-items: center
  .email
    border-radius: 50px
    width: 100%
    padding: 10px 20px
    outline: none
    height: 100%
    caret-color: #20272F
    place-self: center
    border: none
  button
    position: absolute
    height: fit-content
    width: fit-content
    padding: 10px
    right: -5px
    border-radius: 100%
    border: none
    background-image: linear-gradient(to right, #2196f3 0%, rgba(33, 150, 243, 0.6 ) 50%, #2196f3 100%)
    display: grid
    outline: none
    box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.2)
    cursor: pointer
    transition: 0.5s
    background-size: 200% auto
    &:hover
      background-position: right center
    img
      width: 25px
      place-self: center
</style>