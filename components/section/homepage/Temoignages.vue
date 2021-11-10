<template>
  <section class="py-16 bg-jva-grayLight overflow-hidden relative">
    <img
      src="/images/deco_2.svg"
      alt="Décorations"
      class="deco--2 absolute hidden lg:block pointer-events-none"
      data-not-lazy
    >

    <img
      src="/images/deco_3.svg"
      alt="Décorations"
      class="deco--3 absolute hidden lg:block pointer-events-none"
      data-not-lazy
    >

    <div class="container mx-auto px-4 xl:max-w-[1412px]">
      <h2
        class="text-4xl lg:text-[40px] lg:leading-[42px] tracking-tight text-center text-[#AFAFAE]"
      >
        Paroles de
        <strong class="font-extrabold">bénévoles</strong>
      </h2>

      <!-- <SlideshowTestimonies class="mt-12" /> -->
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="postcss" scoped>

.deco--2 {
  left: calc(50% - 728px);
  top: 50px;
}

.deco--3 {
  right: calc(50% - 728px);
  top: -12px;
}
</style>
