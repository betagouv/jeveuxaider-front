<template>
  <div class="group cursor-pointer flex py-4 space-x-8 items-center ">
    <div
      class="text-3xl border rounded-2xl  h-[56px] w-[56px] flex items-center justify-center transition group-hover:scale-105"
      :class="[
        { 'bg-[#FFE5D2] border border-[#EAD7A1]' : ['organisations_waiting_validation', 'missions_waiting_validation' , 'organisations_incomplete'].includes(type) },
        { 'bg-[#FA9D96] border border-[#E88D96]' : ['missions_outdated'].includes(type) },
        { 'bg-[#E1E8EE] border border-[#B6E1EE]' : ['messages_unread'].includes(type) }
      ]"
    >
      {{ icon }}
    </div>
    <div class="flex-1">
      <div class="text-gray-900 font-semibold" v-html="title" />
      <div v-if="subtitle" class="text-gray-500 text-sm" v-html="subtitle" />
    </div>
    <ChevronRightIcon class="h-5 transition group-hover:scale-125" />
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      action: {
        type: Object,
        required: true
      }
    }
  }
}
</script>

<style>

</style>
