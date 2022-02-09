<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
    <div class="px-4 pt-4 flex">
      <div class="flex">
        <Avatar
          :image="profile.avatar ? profile.avatar.urls.thumbMedium: null"
          :initials="profile.short_name"
        />
        <div class="ml-4">
          <div class="font-semibold text-sm text-gray-900">
            {{ profile.first_name }} {{ profile.last_name[0] }}
          </div>

          <Badge v-if="profile.commitment__duration" color="green" size="xxs" plain class="mt-1">
            <span>
              {{ profile.commitment__duration | label('duration') }}
            </span>
            <template v-if="profile.commitment__time_period">
              par
              <span>
                {{ profile.commitment__time_period | label('time_period') }}
              </span>
            </template>
          </Badge>
          <Badge v-else plain size="xxs" class="mt-1">
            Non renseigné
          </Badge>
        </div>
      </div>
      <div class="ml-auto text-sm text-gray-500">
        📍 {{ profile.zip }}
      </div>
    </div>
    <div v-if="profile.disponibilities" class="px-4 my-4 text-sm text-cool-gray-500">
      {{ profile.disponibilities.map((item) => $options.filters.label(item,'disponibilities')).join(' • ') }}
    </div>
    <div class="text-center text-jva-blue-500 font-bold text-sm border-t mt-4 py-3 bg-cool-gray-100 mt-auto">
      <template
        v-if="
          notifications.filter(
            (notification) => notification.profile_id == profile.id
          ).length == 0
        "
      >
        <button class="cursor-pointer hover:underline" @click="$emit('clickedProposerMission', profile);">
          Proposer la mission
        </button>
      </template>
      <span v-else class="text-jva-green-500 font-semibold">E-mail envoyé !</span>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    profile: {
      type: Object,
      required: true
    },
    notifications: {
      type: Array,
      default: () => []
    }
  }
}
</script>
