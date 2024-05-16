<template>
  <div class="bg-white h-screen flex flex-col">
    <HeaderFormMissions title="Publier une mission" />
    <div class="flex-1 flex">
      <div class="w-[400px] bg-[#F9F6F2]">SIDEBAR</div>
      <NuxtPage class="lg:flex-1" />
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
