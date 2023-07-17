<template>
  <div
    class="p-4 lg:p-6 flex gap-4 lg:gap-6 items-center cursor-pointer bg-white shadow-md hover:bg-gray-50"
    @click="handleClick(notification)"
  >
    <div
      :class="[
        'w-[30px] text-3xl',
      ]"
    >
      {{ notificationResolver.emoji }}
    </div>
    <div
      :class="[
        'flex-1 overflow-x-hidden',
      ]"
    >
      <div
        v-if="notificationResolver.contexte"
        :class="[
          'text-[#666666] text-sm flex items-center truncate gap-2 mb-4',
        ]"
      >
        <component
          :is="notificationResolver.contexteIcon"
          v-if="notificationResolver.contexteIcon"
          class="w-4 fill-current flex-none"
        />
        <span class="truncate">
          {{ notificationResolver.contexte }}
        </span>
      </div>
      <div
        v-if="notificationResolver.message"
        :class="[
          'text-black text-xl mb-4',
        ]"
        v-html="$options.filters.marked(notificationResolver.message)"
      />

      <template v-if="showBenevole">
        <div class="flex items-center gap-4 lg:gap-6 mb-4">
          <div>
            <Avatar
              :img-srcset="
                notification.data.benevole_picture?.thumbSmall
              "
              :img-src="notification.data.benevole_picture?.original"
              :initials="`${notification.data.benevole_first_name[0]}${notification.data.benevole_last_name[0]}`"
              class="transition transform group-hover:scale-110"
              size="xs"
            />
          </div>
          <div class="">
            <div class="text-lg font-bold">
              {{ notification.data.benevole_first_name }} {{ notification.data.benevole_last_name }}
            </div>
            <div class="flex gap-4 items-center overflow-hidden whitespace-nowrap">
              <div v-if=" notification.data.benevole_birthday" class="flex gap-1 items-center text-sm text-cool-gray-500">
                <RiCakeFill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
                <p class="">
                  {{ $dayjs( notification.data.benevole_birthday).fromNow('year') }}
                </p>
              </div>
              <div v-if=" notification.data.benevole_zip" class="flex gap-1 items-center text-sm text-cool-gray-500">
                <RiMapPin2Fill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
                <p class="">
                  {{ notification.data.benevole_zip }}
                </p>
              </div>
              <div v-if=" notification.data.benevole_type" class="flex gap-1 items-center text-sm text-cool-gray-500">
                <RiSuitcaseFill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
                <p class="">
                  {{ notification.data.benevole_type | label('profile_type') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </template>
      <div
        :class="[
          'text-sm text-gray-600 first-letter:uppercase',
        ]"
      >
        {{ $dayjs(notification.created_at).fromNow() }}
      </div>
    </div>
    <div class="w-[12px]">
      <div
        v-if="notification.read_at === null"
        aria-label="Notification non lue"
        class="flex-none w-[9px] h-[9px] bg-[#FF463D] rounded-full"
      />
    </div>
  </div>
</template>

<script>
import MixinNotification from '@/mixins/notification'

export default {
  mixins: [MixinNotification],
  props: {
    notification: {
      type: Object,
      required: true
    },
    variant: {
      type: String,
      default: 'dropdown' // dropdown, card
    }
  },
  computed: {
    showBenevole () {
      switch (this.notification.type) {
        case 'App\\Notifications\\ParticipationWaitingValidation':
        case 'App\\Notifications\\ParticipationBenevoleValidated':
        case 'App\\Notifications\\ParticipationBenevoleCanceled':
          return true
        default:
          return false
      }
    }

  }

}
</script>

<style>

</style>
