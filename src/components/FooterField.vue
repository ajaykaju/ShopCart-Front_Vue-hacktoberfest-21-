<template>
  <div class="footer">
    <div class="footer_content">
      <div class="links">
        <div class="section">
          <div class="title">ABOUT</div>
          <div class="item">Contact Us</div>
          <div class="item">About Us</div>
          <div class="item">Careers</div>
          <div class="item">Press</div>
          <div class="item">Subsidiaries</div>
        </div>
        <div class="section">
          <div class="title">SOCIAL</div>
          <div class="item">Facebook</div>
          <div class="item">Twitter</div>
          <div class="item">Youtube</div>
        </div>
        <div class="section">
          <div class="title">POLICY</div>
          <div class="item">Return Policy</div>
          <div class="item">Term Of Use</div>
          <div class="item">Security</div>
          <div class="item">Privacy</div>
          <div class="item">Sitemap</div>
        </div>
        <div class="section">
          <div class="title">HELP</div>
          <div class="item">Payments</div>
          <div class="item">Shipping</div>
          <div class="item">Cancellation & Returns</div>
          <div class="item">FAQ</div>
          <div class="item">Report</div>
        </div>
      </div>
      <span class="divider_vert"><hr /></span>
      <div class="sub_address">
        <div class="address">
          <div class="addrIcon">
            <img src="../assets/icons/address.svg" />
          </div>
          <div class="text">
            <span>ShopCart Private Limited,</span>
            <span>929 George Street</span>
            <span>NORWALK Tech Village,</span>
            <span>Oakland 94612</span>
            <span>California, USA</span>
          </div>
        </div>
        <subscriber-bar class="subscriber_1"></subscriber-bar>
      </div>
      <subscriber-bar class="subscriber_2"></subscriber-bar>
      <subscriber-bar
        class="subscriber_3"
        width="100%"
        fontSize="12px"
      ></subscriber-bar>
    </div>
    <span><hr /></span>
    <div class="credits">
      <div class="title">ShopCart</div>
      &nbsp;
      <div class="divider">| &copy; 2021-2022,</div>
      &nbsp;
      <div class="copyright">ShopCart, Inc. or its affiliates</div>
    </div>
  </div>
</template>


<script>
import SubscriberBar from "./base/SubscriberBar.vue";
export default {
  components: { SubscriberBar },
  created() {},
  methods: {},
  data() {
    return {};
  },
  computed: {},
};
</script>

<style lang="sass" scoped>
.footer
  width: 100%
  background: #242424
  display: grid
  grid-template-rows: auto 1fr 3fr
  .footer_content
    padding: 60px 60px 0px 60px
    display: grid
    .links
      color: #ffffff
      font-size: 12px
      display: grid
      .section
        display: grid
        grid-template-rows: repeat(auto-fill, 1fr)
        align-self: start
        .title
          margin: 0 0 10px 0px
          opacity: 0.5
        .item
          margin: 5px 0px
    .divider_vert
      display: grid
      hr
        border-width: 0px
    .sub_address
      display: grid
      justify-self: center
      .address
        align-self: center
        padding: 10px
        color: rgba(255,255 ,255 ,1 )
        font-size: 12px
        justify-self: left
        display: inline-flex
        .addrIcon
          display: grid
          place-self: center
          img
            width: 50px
        .text
          display: grid
          grid-template-rows: repeat(5, 1fr)
          gap: 2px 0
    .subscriber_2
      align-self: center
  hr
    border-width: 0px
    height: 1px
    background-color: rgba(255,255 , 255, 0.2)
  .credits
    display: inline-flex
    flex-wrap: wrap
    justify-content: center
    color: #ffffff
    font-size: 13px
    opacity: 0.8
    padding: 5px
    .title
      place-self: center
    .divider
      place-self: center
    .copyright
      place-self: center

@media (min-width: 923px)
  .footer
    .footer_content
      grid-template-columns: 3fr 1fr 2fr
      grid-template-rows: 2fr 2fr
      .sub_address
      .divider_vert
        hr
          height: 100%
          width: 1px
          align-self: start
      .subscriber_1
        display: none
      .subscriber_2
        display: inline-flex
@media (min-width: 673px) and (max-width: 923px)
  .footer
    .footer_content
      grid-template-rows: 2fr 1fr 2fr
      .sub_address
        grid-template-columns: 2fr 3fr
      .divider_vert
        hr
          height: 1px
          width: 100%
          align-self: center
      .subscriber_1
        display: inline-flex
      .subscriber_2
        display: none
@media (min-width: 610px) and (max-width: 672px)
  .footer
    .footer_content
      grid-template-columns: 3fr 1fr 3fr
      grid-template-rows: 2fr 1fr
      .divider_vert
        hr
          height: 100%
          width: 1px
          align-self: start
      .sub_address
        grid-template-columns: 1fr
@media (max-width: 672px)
  .footer
    .footer_content
      .subscriber_1
        display: none
@media (min-width: 378px) and (max-width: 672px)
  .footer
    .footer_content
      .subscriber_2
        display: inline-flex
@media (min-width: 438px) and (max-width: 609px)
  .footer
    .footer_content
      .sub_address
        place-self: center
@media (max-width: 609px)
  .footer
    .footer_content
      grid-template-columns: 1fr
      grid-template-rows: 2fr 10% 1fr 1fr
      .divider_vert
        hr
          height: 1px
          width: 100%
          align-self: center
      .subscriber_2
        place-self: center
@media (min-width: 438px)
  .footer
    .footer_content
      .links
        grid-template-columns: repeat(4, 1fr)
    .credits
      grid-auto-flow: column
      place-content: center
      place-items: center
@media (max-width: 437px)
  .footer
    .footer_content
      padding: 30px 30px 0px 30px
      grid-template-columns: 1fr
      .links
        grid-template-columns: 1fr 1fr
        grid-template-rows: 1fr 1fr
        gap: 10px 0px
        justify-self: center
@media (min-width: 378px)
  .footer
    .footer_content
      .subscriber_3
        display: none
@media (max-width: 377px)
  .footer
    .footer_content
      .subscriber_2
        display: none
      .subscriber_3
        display: inline-flex
</style>