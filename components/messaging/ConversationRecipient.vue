<template>
  <div class="flex items-stretch">
    <div
      :class="['px-4 lg:px-6 flex items-center border-r', { 'block lg:hidden': $route.params.id }]"
    >
      <RiArrowLeftLine
        class="h-8 w-8 fill-current text-jva-blue-500 hover:text-jva-blue-300 cursor-pointer"
        @click.native="$router.push('/messages')"
      />
    </div>
    <div class="py-2 lg:py-[13px] flex-1 flex flex-col min-w-0">
      <div class="px-4 lg:px-6 flex items-center gap-2 lg:gap-4">
        <div class="text-xl lg:text-2xl font-bold">
          {{ title }}
        </div>
        <div class="flex gap-2">
          <DsfrBadge
            v-if="
              $stores.messaging.isConversationArchivedForCurrentUser &&
              $stores.messaging.isCurrentUserInConversation
            "
            size="sm"
            type="info"
            no-icon
          >
            Archivé
          </DsfrBadge>
          <slot name="badges" />
        </div>
      </div>

      <slot />
    </div>
    <slot name="right" />
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
})
</script>
