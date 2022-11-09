<template>
  <div
    class="bg-white w-72 text-center flex-col items-center space-y-2 justify-center px-4 py-10 transform cursor-pointer hover:scale-105 duration-150"
  >
    <div v-if="icon" class="text-4xl">
      {{ icon }}
    </div>
    <div v-if="title" class="text-2xl leading-tight" v-html="title" />
    <div v-if="subtitle" class="text-gray-500 text-sm leading-tight" v-html="subtitle" />
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String, default: null
    },
    title: {
      type: String, default: null
    },
    subtitle: {
      type: String, default: null
    }
  }
}
</script>
