<template>
  <div class="flex bg-white border-b justify-between items-center px-6 py-4">
    <div class="flex items-center gap-8">
      <div class="border-r pr-8 py-2">
        <nuxt-link
          no-prefetch
          :to="$stores.auth.contextRole === 'volontaire' ? '/profile' : '/dashboard'"
          class="flex gap-10 items-center group"
        >
          <RiArrowLeftLine
            class="h-8 w-8 text-[#929292] fill-current group-hover:text-jva-blue-500 transition-colors"
          />
          <img src="@/assets/images/jeveuxaider-logo-short.svg" alt="" width="59" height="44" />
        </nuxt-link>
      </div>
      <div class="">
        <h1 class="text-[22px] font-bold">Messagerie</h1>
        <p class="text-[#666666]">
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
