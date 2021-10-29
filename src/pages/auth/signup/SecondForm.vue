<template>
  <div class="inputPage">
    <div class="headline">
      Discover the different, Feel the path of infinity!
    </div>
    <div class="description">
      We providing non ending collection of products filled with quality and
      happiness.
    </div>

    <div class="inputField">
      <label for="dob">Date of birth</label>
      <div class="inputWrap" :class="dobClass">
        <input
          autocomplete="nope"
          type="text"
          placeholder="YYYY-MM-DD"
          maxlength="10"
          class="inputText"
          v-model="dob_loc"
          id="dob"
          name="dob"
          @focus="normalToActive"
          @blur="validation"
          @input="inputingvalidation"
        />
        <transition name="tick-anim">
          <span class="validIcon" v-show="dobValid">
            <img src="../../../assets/icons/tick.svg" />
          </span>
        </transition>
      </div>
    </div>

    <div class="inputField">
      <label for="phoneNumber">Phone number</label>
      <div class="inputWrap" :class="phoneNumberClass">
        <input
          autocomplete="nope"
          type="text"
          placeholder="Phone number"
          class="inputText"
          v-model="phoneNumber_loc"
          id="phoneNumber"
          name="phoneNumber"
          maxlength="15"
          @focus="normalToActive"
          @blur="validation"
          @input="inputingvalidation"
        />
        <transition name="tick-anim">
          <span class="validIcon" v-show="phoneNumberValid">
            <img src="../../../assets/icons/tick.svg" />
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
            <img src="../../../assets/icons/tick.svg" />
          </span>
        </transition>
      </div>
    </div>

    <div class="buttonandroute">
      <button
        type="submit"
        @click="submit"
        :class="formValid ? 'activeButton' : 'disabledButton'"
      >
        <span v-show="!submitted">SignUp </span>
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
        <div class="formDot formDotNormal"></div>
        <div class="formDot formDotActive"></div>
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
  beforeCreate() {
    history.replaceState({ urlPath: "/signup" }, "", "/signup");
  },
  computed: {
    ...mapGetters("signup", [
      "fname",
      "lname",
      "email",
      "dob",
      "phoneNumber",
      "password",
      "dobClass",
      "phoneNumberClass",
      "passwordClass",
      "dobValid",
      "phoneNumberValid",
      "passwordValid",
      "error",
    ]),
    dob_loc: {
      get() {
        return this.dob;
      },
      set(value) {
        this.dobChanger({ dob: value });
      },
    },
    phoneNumber_loc: {
      get() {
        return this.phoneNumber;
      },
      set(value) {
        this.phoneNumberChanger({ phoneNumber: value });
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
      if (this.dobValid && this.phoneNumberValid && this.passwordValid)
        return true;
      else return false;
    },
  },

  methods: {
    ...mapActions("signup", [
      "dobChanger",
      "phoneNumberChanger",
      "passwordChanger",
      "normalToActive",
      "validation",
      "inputingvalidation",
      "errorChanger",
    ]),
    async submit() {
      if (this.formValid) {
        const subButton = document.querySelector("button");
        subButton.disabled = true;
        this.submitted = !this.submitted;
        await axios
          .post(
            `${process.env.VUE_APP_NODE_DEVELOPMENT_SERVER}/user`,
            {
              firstName: this.fname,
              lastName: this.lname,
              email: this.email,
              password: this.password,
              dob: this.dob,
              phoneNumber: this.phoneNumber,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "*/*",
              },
            }
          )
          .then((data) => {
            console.log(data.status);
            if (this.formValid) this.$router.replace({ name: "cf" });
          })
          .catch((error) => {
            console.log(error.response.status);
            this.errorChanger({
              error: "An error occured. Please try again later",
            });
          });
        setTimeout(() => {
          this.errorChanger({
            error: "",
          });
        }, 3000);
        subButton.disabled = false;
        this.submitted = !this.submitted;
      }
    },
  },
};
</script>

<style lang="sass" scoped>
@import '../../../styles/auth/forms'
</style>
