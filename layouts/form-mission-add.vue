<template>
  <div class="bg-white">
    <HeaderFormMissions title="Publier une mission" />
    <div class="max-w-[648px] mx-auto">
      <div class="py-14">
        <NuxtPage class="lg:flex-1" />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderFormMissions from '@/components/layout/HeaderFormMissions.vue'

export default {
  components: {
    HeaderFormMissions,
  },
  setup() {
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
