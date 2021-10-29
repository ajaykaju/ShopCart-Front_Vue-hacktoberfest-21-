<template>
  <div class="authBackground">
    <div class="authContainer">
      <div class="formandImage">
        <div class="authImage topImage">
          <img src="../../../assets/images/authimage.jpg" />
        </div>
        <div class="formContainer">
          <form @submit.prevent="formSubmitter">
            <!-- APP TITLE -->
            <h2 @click="$router.push({ path: '/' })" class="mouse_cursor">
              ShopCart
            </h2>
            <div>
              <router-view v-slot="{ Component }">
                <transition name="authslide" mode="out-in">
                  <component :is="Component" />
                </transition>
              </router-view>
            </div>
          </form>
        </div>
        <div class="authImage rightImage">
          <img src="../../../assets/images/authimage.jpg" />
        </div>
      </div>

      <div class="authFooter">
        <div class="links">
          <li @click="$router.push({ path: '/' })">Home</li>
          <li>Privacy policy</li>
          <li>Help</li>
        </div>
        <div class="credits">© 2021-2022, ShopCart, Inc. or its affiliates</div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../../../styles/auth/auth'
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css')
</style>