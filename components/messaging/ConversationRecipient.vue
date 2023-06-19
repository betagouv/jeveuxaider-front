<template>
  <div class="flex justify-between">
    <div class="p-4 lg:p-6 flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <div class="text-2xl font-bold">
          {{ title }}
        </div>
        <div class="flex space-x-2">
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
      <div class="flex space-x-4 items-center">
        <slot />
      </div>
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
