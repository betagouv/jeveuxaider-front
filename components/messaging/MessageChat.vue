<template>
  <div
    :class="[
      {'ml-auto': isFromMe},
    ]"
  >
    <div
      :class="[
        'flex items-end gap-4',
        {'flex-row-reverse': isFromMe},
      ]"
    >
      <div class="pb-[27px]">
        <Avatar
          :img-srcset="user.profile.avatar && user.profile.avatar.urls.thumbSmall"
          :img-src="user.profile.avatar && user.profile.avatar.urls.original"
          :initials="user.profile.short_name"
          size="xs"
        />
      </div>
      <div class="flex-1">
        <div
          :class="[
            'p-4 lg:p-6 border rounded-lg',
            {'border-[#E3E3FD] bg-[#F5F5FE] !rounded-br-none': isFromMe},
            {'border-[#EDEDED] bg-[#F6F6F6] !rounded-bl-none': !isFromMe},
          ]"
        >
          <div class="text-sm lg:text-base text-black whitespace-pre-line">
            {{ message.content }}
          </div>
        </div>
        <div
          :class="[
            'text-xs text-[#666666] mt-2',
            {'text-right': isFromMe},
          ]"
        >
          {{ $dayjs(message.created_at).format('D MMM HH[h]mm') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  computed: {
    user () {
      return this.message.from
    },
    isFromMe () {
      return this.message.from_id === this.$store.state.auth.user.id
    }
  }
}
</script>

<style>

</style>
