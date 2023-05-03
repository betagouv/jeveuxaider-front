<template>
  <div class="bg-white p-6 !flex flex-col h-full min-h-0 transition md:flex-row md:items-center md:p-10">
    <img
      :src="quote.organization.logo.default"
      :srcset="
        quote.organization.logo.x2
          ? `${quote.organization.logo.x2} 2x`
          : false
      "
      :alt="quote.organization.name"
      class="md:flex-none max-w-[120px] max-h-[60px] md:max-h-[120px] object-contain w-full h-full mt-6 mb-12 mx-auto"
      :width="quote.organization.logo.width"
      :height="quote.organization.logo.height"
      data-not-lazy
    >

    <div class="hidden md:flex flex-none self-stretch w-[1px] bg-[#CACAFB] mx-8" />

    <div>
      <img src="/images/home/quote.svg" class="text-[#8B8BF6] fill-current w-6 h-6 mb-2" alt="" aria-hidden="true">
      <blockquote class="text-[#161616] text-xl font-bold" v-html="quote.content" />
      <div class="mt-4">
        <p class="font-bold text-[#3A3A3A]">
          {{ quote.author.name }}
        </p>
        <p class="text-[#666666] text-xs mt-1">
          Bénévole chez <span class="uppercase"> {{ quote.organization.name }} </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    quote: { type: Object, required: true }
  }
}
</script>
