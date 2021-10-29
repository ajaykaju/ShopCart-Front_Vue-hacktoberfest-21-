<template>
  <div class="inputPage">
    <div class="headline">Sign Up For Your Shopping Journey with ShopCart!</div>
    <div class="description">
      See how ShopCart can help improve your life with quality products and
      offers!.
    </div>

    <div class="inputField">
      <label for="fname">First name</label>
      <div class="inputWrap" :class="fnameClass">
        <input
          autocomplete="nope"
          type="text"
          placeholder="First name"
          minlength="3"
          maxlength="21"
          class="inputText"
          v-model="fname_loc"
          id="fname"
          name="fname"
          @focus="normalToActive"
          @blur="validation"
          @input="inputingvalidation"
        />
        <transition name="tick-anim">
          <span class="validIcon" v-show="fnameValid">
            <img src="../../../assets/icons/tick.svg" />
          </span>
        </transition>
      </div>
    </div>

    <div class="inputField">
      <label for="lname">Last name</label>
      <div class="inputWrap" :class="lnameClass">
        <input
          autocomplete="nope"
          type="text"
          placeholder="Last name"
          class="inputText"
          v-model="lname_loc"
          id="lname"
          name="lname"
          minlength="1"
          maxlength="21"
          @focus="normalToActive"
          @blur="validation"
          @input="inputingvalidation"
        />
        <transition name="tick-anim">
          <span class="validIcon" v-show="lnameValid">
            <img src="../../../assets/icons/tick.svg" />
          </span>
        </transition>
      </div>
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
            <img src="../../../assets/icons/tick.svg" />
          </span>
        </transition>
      </div>
    </div>

    <div class="buttonandroute">
      <button
        type="submit"
        :class="formValid ? 'activeButton' : 'disabledButton'"
        @click="formNext"
      >
        <span v-show="!submitted">Continue </span
        ><img v-show="!submitted" src="../../../assets/icons/arrow.svg" />
        <i class="fa fa-circle-o-notch fa-spin" v-show="submitted"></i>
      </button>
      <div class="route">
        <div>Already have an account?</div>
        <div class="link" @click="$router.push({ name: 'LogIn' })">
          Login instead
        </div>
      </div>
    </div>

    <div class="errorAndDots">
      <div class="error" v-if="error">
        <div class="container">
          <div class="text">{{ error }}</div>
          <img src="../../../assets/icons/error.svg" />
        </div>
      </div>
      <div
        class="formDots"
        :class="error ? 'formDotsIfError' : 'formDotsAlone'"
      >
        <div class="formDot formDotActive"></div>
        <div class="formDot formDotNormal"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import axios from "axios";

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
    ...mapGetters("signup", [
      "fname",
      "lname",
      "email",
      "fnameClass",
      "lnameClass",
      "emailClass",
      "fnameValid",
      "lnameValid",
      "emailValid",
      "error",
    ]),
    fname_loc: {
      get() {
        return this.fname;
      },
      set(value) {
        this.fnameChanger({ fname: value });
      },
    },
    lname_loc: {
      get() {
        return this.lname;
      },
      set(value) {
        this.lnameChanger({ lname: value });
      },
    },
    email_loc: {
      get() {
        return this.email;
      },
      set(value) {
        this.emailChanger({ email: value });
      },
    },
    formValid() {
      if (this.fnameValid && this.lnameValid && this.emailValid) return true;
      else return false;
    },
  },

  methods: {
    ...mapActions("signup", [
      "fnameChanger",
      "lnameChanger",
      "emailChanger",
      "fnameClassChanger",
      "lnameClassChanger",
      "emailClassChanger",
      "fnameValidChanger",
      "lnameValidChanger",
      "emailValidChanger",
      "normalToActive",
      "validation",
      "inputingvalidation",
      "errorChanger",
      "valueChangerAll",
    ]),
    async formNext() {
      if (this.formValid) {
        const subButton = document.querySelector("button");
        subButton.disabled = true;
        this.submitted = !this.submitted;
        await axios
          .post(
            `${process.env.VUE_APP_NODE_DEVELOPMENT_SERVER}/user/isNewUser`,
            { email: this.email },
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "*/*",
              },
            }
          )
          .then(() => {
            this.errorChanger({
              error: "",
            });
            if (this.formValid) this.$router.replace({ name: "f2" });
          })
          .catch((e) => {
            if (e.response.status == 406) {
              this.emailValidChanger({ emailValid: false });
              this.emailClassChanger({ emailClass: "inputErrorWrap" });
              this.errorChanger({ error: "Email already in use!" });
            } else {
              this.errorChanger({
                error: "An error occured. Please try again later",
              });
            }
            setTimeout(() => {
              this.errorChanger({
                error: "",
              });
            }, 3000);
            subButton.disabled = false;
            this.submitted = !this.submitted;
          });
      }
    },
  },
};
</script>

<style lang="sass" scoped>
@import '../../../styles/auth/forms'
</style>
