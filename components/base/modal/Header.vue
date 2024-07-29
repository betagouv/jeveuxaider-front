<script>
export default defineNuxtComponent({
  props: {
    sticky: { type: Boolean, default: false },
    headerClass: { type: String, default: null },
  },
})
</script>

<template>
  <slot>
    <div
      :class="[
        'initial:py-4 initial:px-6 initial:sm:px-8 flex justify-end',
        { 'shadow-[0px_3px_10px_0px_#00000014]': sticky },
        headerClass,
      ]"
    >
      <button
        type="button"
        class="flex items-center text-jva-blue-500 text-sm hover:bg-[#F6F6F6] px-3 py-1 -mr-4"
        @click="$emit('close')"
      >
        <span class="font-medium">Fermer</span>
        <RiCloseFill class="h-4 w-4 fill-current cursor-pointer mt-0.5 ml-1 flex-none" />
      </button>
    </div>
  </slot>
</template>
