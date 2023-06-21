<template>
  <div class="flex items-stretch gap-4">
    <div
      :class="[
        'px-6 flex items-center border-r',
        {'block lg:hidden': $route.params.id}
      ]"
    >
      <RiArrowLeftLine
        class="h-8 w-8 fill-current text-jva-blue-500 hover:text-jva-blue-300 cursor-pointer"
        @click.native="$router.push('/messages')"
      />
    </div>
    <div class="p-4 lg:px-8 lg:py-[25px] flex-1 flex flex-col gap-1 lg:gap-2 overflow-hidden">
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
    <slot name="right" />
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
