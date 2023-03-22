<template>
  <div class="flex space-x-2">
    <button
      :disabled="instance?.currentSlideIndex === 0"
      class="flex border h-12 w-12 justify-center items-center transition"
      :class="[
        {
          'border-jva-blue-500 text-jva-blue-500': variant == 'blue',
          'border-white text-white': variant == 'white',
          'border-[#522F29] text-[#522F29]': variant == 'brown',
          'pointer-events-none opacity-25': instance?.currentSlideIndex === 0
        },
        buttonClass
      ]"
      aria-label="Précédent"
      @click="$emit('previous')"
    >
      <RiArrowLeftLine class="w-6 h-6 fill-current" />
    </button>
    <button
      :disabled="instance?.currentSlideIndex === nbSlides - 1"
      class="flex border h-12 w-12  justify-center items-center transition"
      :class="[
        {
          'border-jva-blue-500 text-jva-blue-500': variant == 'blue',
          'border-white text-white': variant == 'white',
          'border-[#522F29] text-[#522F29]': variant == 'brown',
          'pointer-events-none opacity-25': instance?.currentSlideIndex === nbSlides - 1
        },
        buttonClass
      ]"
      aria-label="Suivant"
      @click="$emit('next')"
    >
      <RiArrowRightLine class="w-6 h-6 fill-current" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: 'blue'
    },
    buttonClass: {
      type: String,
      default: null
    },
    refs: {
      type: Object,
      default: null
    },
    refName: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      instance: {}

    }
  },
  computed: {
    nbSlides () {
      return this.instance?.$slots?.default?.length ?? this.instance?.missions?.length
    }
  },
  mounted () {
    this.instance = this.refs?.[this.refName] ?? {}
  }
}
</script>
