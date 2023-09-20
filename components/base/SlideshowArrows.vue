<template>
  <div class="flex space-x-2">
    <button
      :disabled="currentSlide === 0"
      class="flex border h-12 w-12 justify-center items-center transition"
      :class="[
        {
          'border-jva-blue-500 text-jva-blue-500': variant == 'blue',
          'border-white text-white': variant == 'white',
          'border-[#522F29] text-[#522F29]': variant == 'brown',
          'pointer-events-none opacity-25': currentSlide === 0,
        },
        buttonClass,
      ]"
      aria-label="Précédent"
      @click="$emit('previous')"
    >
      <RiArrowLeftLine class="w-6 h-6 fill-current" />
    </button>
    <button
      :disabled="currentSlide === nbSlides - 1"
      class="flex border h-12 w-12 justify-center items-center transition"
      :class="[
        {
          'border-jva-blue-500 text-jva-blue-500': variant == 'blue',
          'border-white text-white': variant == 'white',
          'border-[#522F29] text-[#522F29]': variant == 'brown',
          'pointer-events-none opacity-25': currentSlide === nbSlides - 1,
        },
        buttonClass,
      ]"
      aria-label="Suivant"
      @click="$emit('next')"
    >
      <RiArrowRightLine class="w-6 h-6 fill-current" />
    </button>
  </div>
</template>

<script>
export default defineNuxtComponent({
  emits: ['previous', 'next'],
  props: {
    variant: {
      type: String,
      default: 'blue',
    },
    buttonClass: {
      type: String,
      default: null,
    },
    currentSlide: {
      type: Number,
      required: true,
    },
    nbSlides: {
      type: Number,
      required: true,
    },
  },
})
</script>
