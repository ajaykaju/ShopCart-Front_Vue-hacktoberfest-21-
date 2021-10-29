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
      default: 200000,
    },
    isMin: {
      type: Boolean,
      default: true,
    },
    cValue: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isThumbSelect: false,
    };
  },
  mounted() {
    if (!this.isMin) {
      const sliderWidth = this.$refs.slider.clientWidth;
      let posPer;

      if (this.cValue > 0) {
        posPer = Math.round((this.cValue * 100) / (this.max - this.min));

        // const pos = Math.round(((sliderWidth - 7) * posPer) / 100);

        // posPer = Math.round((Math.abs(pos) * 100) / sliderWidth);

        // console.log(pos);

        console.log(posPer);
      } else {
        posPer = Math.round(((sliderWidth - 7) * 100) / sliderWidth);
        this.$emit("currentValue", this.max);
      }

      this.$refs.thumb.style.left = `${posPer}%`;
      this.$refs.ctab.style.width = `${posPer}%`;
    } else {
      if (this.cValue > 0) {
        let posPer = Math.round((this.cValue * 100) / (this.max - this.min));
        this.$refs.thumb.style.left = `${posPer}%`;
        this.$refs.ctab.style.width = `${posPer}%`;
      } else this.$emit("currentValue", this.min);
    }
  },
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
        const posPer = Math.round(((pos - 7) * 100) / sliderWidth);
        this.$refs.thumb.style.left = `${posPer}%`;

        this.$refs.ctab.style.width = `${posPer}%`;

        const pricePer = Math.round(
          (pos * 100) / this.$refs.slider.clientWidth
        );

        const price = Math.round((pricePer * (this.max - this.min)) / 100);
        this.$emit("currentValue", this.min + price);
        // console.log(price);
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.range_container
  display: grid
  align-self: center
  .slider
    width: 100%
    height: 5px
    background: #eee
    place-self: center
        // border-radius: 25px
    position: relative
    display: grid
    cursor: pointer
    .thumb
      position: absolute
      height: 14px
      width: 14px
      background: rgba(21, 102, 196, 1)
      border-radius: 50%
      cursor: pointer
      align-self: center
      z-index: 1px
      border: 2px solid rgba(255,255 ,255 ,1 )
      &:hover
        transform: scale(1.2)
        box-shadow: 0px 0px 4px 4px rgba(36,36,36,0.08)
        border: 2px solid rgba(255,255 ,255 ,1 )
        transition: all 0.01s ease-in-out
    .color_tab
      height: 5px
      background: rgba(21, 102, 196, 1)
      width: 0px
            // border-bottom-left-radius: 8px
            // border-top-left-radius: 8px
</style>