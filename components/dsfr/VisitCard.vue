<template>
  <div
    class="bg-white border border-[#DDDDDD] border-b-4 border-b-jva-blue-500 p-8 group cursor-pointer hover:bg-jva-blue-100"
  >
    <div class="flex gap-8">
      <div class="">
        <slot name="icon" />
      </div>
      <div class="flex-1">
        <div class="text-[30px] text-jva-blue-500 font-bold leading-8 pr-3">{{ title }}</div>
        <div class="text-lg text-[#3A3A3A] mt-2">{{ description }}</div>
        <div class="flex justify-end mt-2">
          <RiArrowRightLine class="w-6 text-jva-blue-500 fill-current" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    link: {
      type: String,
      required: true,
    },
  },
})
</script>
