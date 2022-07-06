<template>
  <BadgeFilter
    v-if="isPresentiel"
    v-tooltip="{
      content: 'Mission à réaliser de votre côté sans présence obligatoire.',
      classes: 'theme-white',
      hideOnTargetClick: true,
      placement: 'bottom',
      offset: 8
    }"
    :is-active="isAutonomy"
    class="cursor-pointer"
    @click.native="handleToggle"
  >
    <span :class="[{'text-jva-blue-500': isAutonomy}]">En autonomie</span>
  </BadgeFilter>
</template>

<script>
import BadgeFilter from '~/components/search/BadgeFilter.vue'

export default {
  components: {
    BadgeFilter
  },
  computed: {
    isAutonomy () { return !!this.$route.query.is_autonomy },
    isPresentiel () { return !this.$route.query.type || this.$route.query.type == 'Mission en présentiel' }
  },
  methods: {
    handleToggle () {
      const isAutonomy = !this.isAutonomy

      const query = {
        ...this.$route.query,
        page: undefined
      }
      if (isAutonomy) {
        query.is_autonomy = '=1'
      } else {
        delete query.is_autonomy
      }

      this.$router.push({
        path: this.$route.path,
        query
      })
    }
  }
}
</script>
