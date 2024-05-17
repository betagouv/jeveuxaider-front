<template>
  <div class="bg-white flex flex-col h-screen">
    <HeaderFormMissions class="" title="Publier une mission" />
    <div class="flex-grow flex h-full min-h-0">
      <div class="w-[400px] bg-[#F9F6F2]">SIDEBAR</div>
      <NuxtPage class="flex-1" />
    </div>
  </div>
</template>

<script>
import HeaderFormMissions from '@/components/layout/HeaderFormMissions.vue'

export default {
  components: {
    HeaderFormMissions,
  },
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
