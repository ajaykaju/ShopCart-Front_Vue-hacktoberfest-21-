<template>
  <div class="inputPage">
    <div class="dummyDiv"></div>
    <div class="verificationImage">
      <img src="../../../assets/icons/emailVerification.svg" />
    </div>
    <div class="thanksText">Thanks! One more step to go</div>
    <div class="confirmText">
      <div>We've sent a confirmation email to</div>
      <div class="userMail">{{ email }}</div>
    </div>
    <div></div>
    <div></div>
    <div class="resend">
      <div>Didn't receive an email?</div>
      <div class="resendButton">Click to resend</div>
    </div>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    history.replaceState({ urlPath: "/signup" }, "", "/signup");
  },
  computed: {
    email() {
      return this.$store.getters["signup/email"];
    },
  },
};
</script>


<style lang="sass" scoped>
@import '../../../styles/auth/forms'
</style>