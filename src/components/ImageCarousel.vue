<template>
  <div class="slider" id="slider">
    <div class="slider_control_arrows">
      <div class="control_left mouse_cursor" @click="toLeftSlide()">
        <img draggable="false" src="../assets/icons/left-arrow.svg" />
      </div>
      <div></div>
      <div class="control_right mouse_cursor" @click="toRightSlide()">
        <img draggable="false" src="../assets/icons/right-arrow.svg" />
      </div>
    </div>
    <div class="slider_control_dots">
      <div
        v-for="(item, index) in images"
        :key="index"
        class="slide_item"
        :class="index === current_index ? 'slide_active' : 'slide_normal'"
      ></div>
    </div>
    <div class="draggable" @dragend="dragEnd" @dragover="dragOverSlide"></div>
    <div class="slider_main">
      <img :src="require(`../assets/images/${slideImage}`)" />
    </div>
  </div>
</template>


<script>
let slideIntervel;
export default {
  data() {
    return {
      current_index: 0,
      images: [
        {
          large: `slide1_large.png`,
          medium: `slide1_medium.png`,
          small: `slide1_small.png`,
        },
        {
          large: `slide2_large.png`,
          medium: `slide2_medium.png`,
          small: `slide2_small.png`,
        },
        {
          large: `slide3_large.png`,
          medium: `slide3_medium.png`,
          small: `slide3_small.png`,
        },
      ],
      screenWidth: 0,
      drag: false,
      dragPositionStart: null,
      dragPositionEnd: null,
    };
  },
  computed: {
    slideImage() {
      if (this.screenWidth <= 540) return this.images[this.current_index].small;
      else if (this.screenWidth > 540 && this.screenWidth <= 1080)
        return this.images[this.current_index].medium;
      else return this.images[this.current_index].large;
    },
  },
  methods: {
    slideImageChanger() {
      if (this.current_index === this.images.length - 1) this.current_index = 0;
      else this.current_index++;
    },
    screenWidthCalculator() {
      this.screenWidth = window.innerWidth;
    },
    slideIntervelSetter() {
      slideIntervel = setInterval(() => {
        this.slideImageChanger();
      }, 5000);
    },
    toLeftSlide() {
      clearInterval(slideIntervel);
      if (this.current_index === 0) this.current_index = this.images.length - 1;
      else this.current_index--;
      this.slideIntervelSetter();
    },
    toRightSlide() {
      clearInterval(slideIntervel);
      this.slideImageChanger();
      this.slideIntervelSetter();
    },
    dragStart(e) {
      if (e.type !== "touchstart") {
        document.onmouseup = this.dragEnd;
        document.onmousemove = this.dragMove;
      }
    },
    dragMove(e) {
      if (!this.drag) {
        this.dragPositionStart = e.touches[0].clientX;
        this.drag = !this.drag;
      }
      this.dragPositionEnd = e.touches[0].clientX;
    },
    dragEnd() {
      this.drag = !this.drag;
      if (Math.abs(this.dragPositionStart - this.dragPositionEnd) > 100) {
        if (this.dragPositionEnd > this.dragPositionStart) this.toLeftSlide();
        else this.toRightSlide();
      }
      this.dragPositionEnd = this.dragPositionStart = null;
    },
    dragOverSlide(e) {
      if (!this.drag) {
        this.dragPositionStart = e.clientX;
        this.drag = !this.drag;
      }
      this.dragPositionEnd = e.clientX;
    },
  },
  mounted() {
    this.screenWidth = window.innerWidth;
    window.addEventListener("resize", this.screenWidthCalculator);
    this.slideIntervelSetter();
    const slider = document.getElementById("slider");
    slider.addEventListener("touchstart", this.dragStart);
    slider.addEventListener("touchmove", this.dragMove);
    slider.addEventListener("touchend", this.dragEnd);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.screenWidthCalculator);
    clearInterval(slideIntervel);
    const slider = document.getElementById("slider");
    slider.removeEventListener("touchstart", this.dragStart);
    slider.removeEventListener("touchmove", this.dragMove);
    slider.removeEventListener("touchend", this.dragEnd);
  },
};
</script>


<style lang="sass" scoped>
@import '../styles/imagecarousel'
</style>