<template>
  <div class="range_container">
    <div class="slider" ref="slider" @click="thumbClick">
      <div class="color_tab" ref="ctab"></div>
      <div
        class="thumb"
        ref="thumb"
        @mousedown="isMousedown"
        @mouseup="isMouseup"
        @touchmove="isTouchmove"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 5599,
    },
  },
  data() {
    return {
      isThumbSelect: false,
    };
  },
  watch: {},
  methods: {
    isTouchmove(e) {
      if (this.isThumbSelect !== true) {
        const p = e.touches[0];
        this.thumbSlide(p);
      }
    },

    isMousedown() {
      this.isThumbSelect = true;
      window.addEventListener("mousemove", this.isMouseMove);
    },

    isMouseMove(e) {
      if (this.isThumbSelect === true) {
        window.addEventListener("mouseup", this.isMouseup);
        this.thumbSlide(e);
      }
    },

    isMouseup() {
      this.isThumbSelect = false;
      window.removeEventListener("mousemove", this.isMouseMove);
      window.removeEventListener("mouseup", this.isMouseup);
    },

    thumbSlide(e) {
      const pos = e.clientX - this.$refs.slider.offsetLeft;
      this.thumbPosition(pos);
    },

    thumbClick(e) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = e.clientX - rect.left;
      this.thumbPosition(pos);
    },

    thumbPosition(pos) {
      const sliderWidth = this.$refs.slider.clientWidth;
      if (pos >= 0 && pos <= sliderWidth) {
        const posPer = Math.round(
          ((pos - 8) * 100) / this.$refs.slider.clientWidth
        );
        this.$refs.thumb.style.left = `${posPer}%`;

        const pricePer = Math.round(
          (pos * 100) / this.$refs.slider.clientWidth
        );
        this.$refs.ctab.style.width = `${posPer}%`;
        const price = Math.round((pricePer * this.max) / 100);
        this.$emit("currentValue", price);
        console.log(price);
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.range_container
  display: grid
  height: 500px
  align-self: center
  padding: 10px
  .slider
    width: 90%
    height: 8px
    background: #eee
    place-self: center
    border-radius: 25px
    position: relative
    display: grid
    cursor: pointer
    .thumb
      position: absolute
      height: 16px
      width: 16px
      background: rgba(36,36,36,1)
      border-radius: 50%
      cursor: pointer
      align-self: center
      z-index: 1px
      // transition: all .08s ease-in-out
      &:hover
        transform: scale(1.2)
        box-shadow: 0px 0px 4px 4px rgba(36,36,36,0.08)
    .color_tab
      height: 8px
      background: rgba(36,36,36,0.2)
      width: 0px
      border-radius: 8px
      // transition: all .08s ease-in-out
</style>