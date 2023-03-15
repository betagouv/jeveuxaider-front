<template>
  <div class="flex space-x-2">
    <button
      class="flex border h-12 w-12  justify-center items-center"
      :class="[
        {
          'border-jva-blue-500 text-jva-blue-500': variant == 'blue',
          'border-white text-white': variant == 'white',
          'border-[#522F29] text-[#522F29]': variant == 'brown',
        },
        buttonClass
      ]"
      @click="$emit('previous')"
    >
      <RiArrowLeftLine class="w-6 h-6 fill-current" />
    </button>
    <button
      class="flex border h-12 w-12  justify-center items-center"
      :class="[
        {
          'border-jva-blue-500 text-jva-blue-500': variant == 'blue',
          'border-white text-white': variant == 'white',
          'border-[#522F29] text-[#522F29]': variant == 'brown'
        },
        buttonClass
      ]"
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
    }
  }
}
</script>

<style>

</style>
