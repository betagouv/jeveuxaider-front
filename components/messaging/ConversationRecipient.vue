<template>
  <div class="flex justify-between">
    <div class="p-4 lg:px-8 lg:py-[26px] flex flex-col gap-2 lg:gap-4">
      <div class="flex items-center gap-2 lg:gap-4">
        <div class="text-xl lg:text-2xl font-bold">
          {{ title }}
        </div>
        <div class="flex gap-2">
          <Badge
            v-if="$store.getters['messaging2/isConversationArchivedForCurrentUser']"
            size="sm"
            type="info"
            no-icon
          >
            Archivé
          </Badge>
          <slot name="badges" />
        </div>
      </div>

      <slot />
    </div>
  </div>
</template>

<script>
import Badge from '@/components/dsfr/Badge.vue'

export default {
  components: {
    Badge
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  computed: {

  }
}
</script>

<style>

</style>
