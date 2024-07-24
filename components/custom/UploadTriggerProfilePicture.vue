<template>
  <div class="group pb-4 inline-flex cursor-pointer">
    <div
      class="relative w-[112px] h-[112px] rounded-full border-4 border-white bg-jva-blue-500 shadow-md"
    >
      <div
        :class="[
          'border-jva-blue-500 flex items-end justify-center rounded-full w-full h-full overflow-hidden',
          previewSrcset ? 'border-0' : 'border-4',
        ]"
      >
        <img
          v-if="previewSrcset"
          alt="Preview"
          class="object-cover object-center aspect-square w-full h-full"
          :srcset="previewSrcset"
          :width="104"
          :height="104"
        />

        <RiUserFill v-else class="w-[81px] text-white fill-current translate-y-2" />
      </div>

      <button
        :class="[
          'bg-white p-2 pr-3 shadow-md rounded-full flex items-center gap-2 text-jva-blue-500',
          'absolute -bottom-4 w-max -translate-x-1/2 left-1/2',
          'transition group-hover:bg-[#E3E3FD]',
        ]"
      >
        <RiImageAddFill class="w-4 fill-current" />
        <span class="text-xs leading-none font-bold">{{ label }}</span>
      </button>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    label: { type: String, required: true },
    previewSrcset: { type: String, required: false },
  },
})
</script>
