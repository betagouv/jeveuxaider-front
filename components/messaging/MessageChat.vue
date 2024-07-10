<template>
  <div :class="[{ 'ml-auto': isFromMe }]">
    <div :class="['flex items-end gap-4', { 'flex-row-reverse': isFromMe }]">
      <div class="pb-[27px]">
        <BaseAvatar
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
            { 'border-[#E3E3FD] bg-[#F5F5FE] !rounded-br-none': isFromMe },
            { 'border-[#EDEDED] bg-[#F6F6F6] !rounded-bl-none': !isFromMe },
          ]"
        >
          <div class="text-black whitespace-pre-line" v-html="messageFormatted" />
        </div>
        <div :class="['text-xs text-[#666666] mt-2', { 'text-right': isFromMe }]">
          {{ $dayjs(message.created_at).format('D MMM YYYY • HH[h]mm') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  computed: {
    messageFormatted() {
      return this.linkify(this.message.content)
    },
    user() {
      return this.message.from
    },
    isFromMe() {
      return this.message.from_id === this.$stores.auth.user?.id
    },
  },
  methods: {
    linkify(inputText) {
      // URLs starting with http://, https://, or ftp://
      const replacePattern1 =
        /(\b(https?|ftp):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim
      let replacedText = inputText.replace(
        replacePattern1,
        '<a href="$1" target="_blank" class="break-all underline hover:text-gray-700">$1</a>'
      )

      // URLs starting with www. (without // before it, or it'd re-link the ones done above)
      const replacePattern2 = /(^|[^/])(www\.[\S]+(\b|$))/gim
      replacedText = replacedText.replace(
        replacePattern2,
        '$1<a href="http://$2" target="_blank" class="break-all underline hover:text-gray-700">$2</a>'
      )

      // Change email addresses to mailto:: links
      // const replacePattern3 = /(([a-zA-Z0-9_\-.]+)@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6}))+/gim
      // replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1" class="break-all underline hover:text-gray-700">$1</a>')

      return replacedText
    },
  },
})
</script>
