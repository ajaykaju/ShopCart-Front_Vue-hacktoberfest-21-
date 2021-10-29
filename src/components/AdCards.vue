<template>
  <div class="adCards">
    <div class="adCard">
      <img
        src="https://i.pinimg.com/736x/f0/27/a8/f027a8581236b14cd4629d0b1aa99c94.jpg"
      />
    </div>
    <div class="adCard">
      <img
        src="https://i.pinimg.com/600x315/d9/0f/f9/d90ff988ec7db9e7d50d166cc670360c.jpg"
      />
    </div>
    <div class="adCard card3">
      <img
        src="https://i.pinimg.com/600x315/46/54/83/465483ebeb5df92d6a3ecec605d9143f.jpg"
      />
    </div>
  </div>
  <div class="outCard">
    <img
      src="https://i.pinimg.com/600x315/46/54/83/465483ebeb5df92d6a3ecec605d9143f.jpg"
    />
  </div>
</template>

<script>
export default {};
</script>

<style lang="sass" scoped>
.adCards
    display: grid
    gap: 0 8px
    width: 100%
    .adCard
        border-radius: 8px
        img
            border-radius: 8px
            width: 100%
.outCard
    border-radius: 8px
    justify-self: center
    width: 100%
    img
        border-radius: 8px
        width: 100%

@media (min-width: 733px)
    .adCards
        grid-template-columns: 1fr 1fr 1fr
        grid-template-rows: 1fr
        .adCard
            img
                min-height: 150px
        .card3
            display: block
    .outCard
        display: none
@media (min-width: 560px) and (max-width: 733px)
    .adCards
        grid-template-columns: 1fr 1fr
        grid-template-rows: 1fr
        .adCard
            img
        .card3
            display: none
@media (max-width: 559px)
    .adCards
        grid-template-columns: 1fr
        grid-template-rows: repeat(3, 1fr)
        .adCard
            img
                min-height: 120px
        .card3
            display: block
    .outCard
        display: none
</style>