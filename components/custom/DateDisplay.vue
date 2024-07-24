<template>
  <div
    class="flex flex-col items-center justify-center border w-[50px] h-[50px] xl:w-[65px] xl:h-[65px]"
  >
    <div class="text-base font-bold leading-[24px] text-[#3A3A3A]">
      {{ $dayjs.unix(unixDate).format('DD') }}
    </div>
    <div class="text-sm leading-[20px] text-[#666666]">
      {{ $dayjs.unix(unixDate).format('MMM') }}
    </div>
    <div class="hidden xl:block text-xs leading-[14px] text-[#666666]">
      {{ $dayjs.unix(unixDate).format('YYYY') }}
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    unixDate: {
      type: Number,
      required: true,
    },
  },
})
</script>
