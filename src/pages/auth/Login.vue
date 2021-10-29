<template>
  <div class="authBackground">
    <div class="authContainer">
      <div class="formandImage">
        <div class="authImage topImage">
          <img src="../../assets/images/authimage.jpg" />
        </div>
        <div class="formContainer">
          <form @submit.prevent="submit">
            <!-- APP TITLE -->
            <h2 @click="$router.push({ path: '/' })" class="mouse_cursor">
              ShopCart
            </h2>
            <div>
              <transition name="authslide" mode="out-in">
                <div class="inputPage">
                  <div class="headline">
                    Login to ShopCart. Enjoy the shopping!
                  </div>
                  <div class="description">
                    Login to ShopCart. Friends not let friends buy poor quality
                    products!.
                  </div>

                  <div class="inputField">
                    <label for="email">Email address</label>
                    <div class="inputWrap" :class="emailClass">
                      <input
                        autocomplete="nope"
                        type="email"
                        placeholder="Email address"
                        class="inputText"
                        v-model="email_loc"
                        id="email"
                        name="email"
                        @focus="normalToActive"
                        @blur="validation"
                        @input="inputingvalidation"
                      />
                      <transition name="tick-anim">
                        <span class="validIcon" v-show="emailValid">
                          <img src="../../assets/icons/tick.svg" />
                        </span>
                      </transition>
                    </div>
                  </div>

                  <div class="inputField">
                    <label for="password">Password</label>
                    <div class="inputWrap" :class="passwordClass">
                      <input
                        autocomplete="nope"
                        type="password"
                        placeholder="Password"
                        class="inputText"
                        v-model="password_loc"
                        id="password"
                        name="password"
                        @focus="normalToActive"
                        @blur="validation"
                        @input="inputingvalidation"
                      />
                      <transition name="tick-anim">
                        <span class="validIcon" v-show="passwordValid">
                          <img src="../../assets/icons/tick.svg" />
                        </span>
                      </transition>
                    </div>
                  </div>

                  <div class="buttonandroute">
                    <button
                      type="submit"
                      :class="formValid ? 'activeButton' : 'disabledButton'"
                    >
                      <span v-show="!submitted">Login</span>
                      <i
                        class="fa fa-circle-o-notch fa-spin"
                        v-show="submitted"
                      ></i>
                    </button>
                    <div class="route">
                      <div>New to shopcart?</div>
                      <div class="link" @click="$router.push({ name: 'f1' })">
                        SignUp instead
                      </div>
                    </div>
                  </div>

                  <div class="errorAndDots">
                    <div class="error" v-if="error">
                      <div class="container">
                        <div class="text">{{ error }}</div>
                        <img src="../../assets/icons/error.svg" />
                      </div>
                    </div>
                    <div
                      class="formDots"
                      :class="error ? 'formDotsIfError' : 'formDotsAlone'"
                    >
                      <div class="formDot formDotActive"></div>
                    </div>
                  </div>
                  <div></div>
                </div>
              </transition>
            </div>
          </form>
        </div>
        <div class="authImage rightImage">
          <img src="../../assets/images/authimage.jpg" />
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

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      submitted: false,
    };
  },
  beforeMount() {
    this.valueChangerAll();
  },
  computed: {
    email_loc: {
      get() {
        return this.email;
      },
      set(value) {
        this.emailChanger({ email: value });
      },
    },
    password_loc: {
      get() {
        return this.password;
      },
      set(value) {
        this.passwordChanger({ password: value });
      },
    },
    formValid() {
      if (this.emailValid && this.passwordValid) return true;
      else return false;
    },
    ...mapGetters("signup", [
      "email",
      "password",
      "emailClass",
      "passwordClass",
      "emailValid",
      "passwordValid",
    ]),

    ...mapGetters("user", ["error"]),
  },
  methods: {
    ...mapActions("signup", [
      "emailChanger",
      "passwordChanger",
      "normalToActive",
      "validation",
      "inputingvalidation",
      "valueChangerAll",
    ]),

    ...mapActions("user", ["logIn"]),

    async submit() {
      if (this.formValid) {
        const subButton = document.querySelector("button");
        subButton.disabled = true;
        this.submitted = !this.submitted;
        await this.logIn({ email: this.email, password: this.password });
        subButton.disabled = false;
        this.submitted = !this.submitted;
      }
    },
  },
};
</script>

<style lang="sass" scoped>
@import '../../styles/auth/auth'
@import '../../styles/auth/forms'
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css')
</style>