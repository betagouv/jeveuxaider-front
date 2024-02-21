<template>
  <div class="flex items-center space-x-3">
    <DsfrBadge
      v-tooltip="{
        content: 'Raison : ' + labelReason,
      }"
      v-if="profile.user.banned_at"
      size="sm"
      type="error"
    >
      Bloqué
    </DsfrBadge>
    <DsfrBadge size="sm" type="gray">
      <div class="flex items-center">
        <div
          :class="[
            'h-2 w-2  rounded-full mr-1',
            profile.is_visible && !profile.user.banned_reason ? 'bg-green-600' : 'bg-red-600',
          ]"
        ></div>
        {{
          profile.is_visible && !profile.user.banned_reason
            ? 'Visible des organisations'
            : 'Invisible des organisations'
        }}
      </div>
    </DsfrBadge>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
  computed: {
    labelReason() {
      return this.$filters.label(this.profile.user.banned_reason, 'user_ban_reasons')
    },
  },
})
</script>
