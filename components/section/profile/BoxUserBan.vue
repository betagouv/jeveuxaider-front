<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">Statut</div>
      <slot name="action" />
    </div>
    <BaseBox variant="flat" padding="xs" class="m-[-1px]">
      <BaseDescriptionList>
        <BaseDescriptionListItem term="État">
          <div class="flex flex-wrap">
            {{ labelStatus }}
          </div>
        </BaseDescriptionListItem>
        <BaseDescriptionListItem v-if="user.banned_at" term="Raison" :description="labelReason" />
      </BaseDescriptionList>
    </BaseBox>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    labelStatus() {
      return this.user.banned_at ? 'Bloqué' : 'Actif'
    },
    labelReason() {
      return this.$filters.label(this.user.banned_reason, 'user_ban_reasons')
    },
  },
})
</script>
