<template>
  <div class="flex bg-white border-b justify-between items-center px-4 py-2 lg:px-6 lg:py-4">
    <div class="flex items-center gap-4 lg:gap-8">
      <div class="lg:border-r pr-4 lg:pr-8 py-2">
        <nuxt-link
          no-prefetch
          :to="$stores.auth.contextRole === 'volontaire' ? '/profile' : '/dashboard'"
          class="flex gap-4 lg:gap-10 items-center group"
        >
          <RiArrowLeftLine
            class="hidden lg:block flex-none h-6 w-6 lg:h-8 lg:w-8 text-[#929292] fill-current group-hover:text-jva-blue-500 transition-colors"
          />
          <img src="@/assets/images/jeveuxaider-logo-short.svg" alt="" width="59" height="44" />
        </nuxt-link>
      </div>
      <div class="">
        <h1 class="text-lg lg:text-[22px] font-bold">Messagerie</h1>
        <p class="text-[#666666] text-sm lg:text-base">
          <template v-if="$stores.messaging.unreadMessagesCount === 0">
            Aucun nouveau message
          </template>
          <template v-else>
            {{
              $filters.pluralize(
                $stores.messaging.unreadMessagesCount,
                'nouveau message',
                'nouveaux messages'
              )
            }}
          </template>
        </p>
      </div>
    </div>

    <div>
      <CustomDropdownUser class="lg:ml-2" />
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  components: {},
  props: {},
})
</script>
