<template>
  <div class="bg-white flex flex-col h-screen">
    <div id="teleport-header" class="relative z-50"></div>
    <div class="flex-grow flex h-full min-h-0">
      <LayoutSidebarFormMission class="w-[400px]" />
      <NuxtPage class="flex-1" />
    </div>
    <div id="teleport-body-end"></div>
  </div>
</template>

<script>
export default {
  async setup() {
    useHead({
      bodyAttrs: {
        class: 'full-height-layout',
      },
    })
  },
  data() {
    return {}
  },
  created() {},
  computed: {},
  methods: {},
}
</script>
