<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
    <div class="px-4 pt-4 flex">
      <div class="flex">
        <BaseAvatar
          :img-srcset="profile.avatar ? profile.avatar.urls.thumbMedium : null"
          :img-src="profile.avatar ? profile.avatar.urls.original : null"
          :initials="profile.short_name"
        />
        <div class="ml-4">
          <div class="font-semibold text-sm text-gray-900">
            {{ profile.secret_name }}
          </div>

          <BaseBadge v-if="profile.commitment" color="green" size="xxs" plain class="mt-1">
            {{ $filters.label(profile.commitment, 'commitment') }}
          </BaseBadge>
          <BaseBadge v-else plain size="xxs" class="mt-1"> Non renseigné </BaseBadge>
        </div>
      </div>
      <div class="ml-auto text-sm text-gray-500">📍 {{ profile.zip }}</div>
    </div>
    <div v-if="profile.disponibilities" class="px-4 my-4 text-sm text-cool-gray-500">
      {{
        profile.disponibilities.map((item) => $filters.label(item, 'disponibilities')).join(' • ')
      }}
    </div>
    <div
      class="text-center text-jva-blue-500 font-bold text-sm border-t py-3 bg-cool-gray-100 mt-auto"
    >
      <span v-if="hasAlreadyBeenNotified" class="text-jva-green-500 font-semibold"
        >E-mail envoyé !</span
      >
      <span v-else-if="hasBeenFlooded" class="font-medium text-gray-600">Non disponible</span>
      <template v-else>
        <button class="cursor-pointer hover:underline" @click.stop="showAlert = true">
          Proposer la mission
        </button>
        <BaseAlertDialog
          icon="RiErrorWarningLine"
          title="Proposer la mission"
          :is-open="showAlert"
          @confirm="onConfirmSendEmail"
          @cancel="showAlert = false"
        >
          {{ profile.secret_name }} recevra un e-mail pour l'inviter à participer à votre mission
        </BaseAlertDialog>
      </template>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  emits: ['clickedProposerMission'],
  props: {
    missionId: {
      type: Number,
      required: true,
    },
    profile: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showAlert: false,
    }
  },
  computed: {
    hasAlreadyBeenNotified() {
      return (
        this.profile.notifications_benevoles.filter(
          (notification) => notification.mission_id == this.missionId
        ).length > 0
      )
    },
    hasBeenFlooded() {
      // Si plus de 2 notifations dans le mois passé
      return (
        this.profile.notifications_benevoles.filter((notification) => {
          const minusOneMonth = this.$dayjs().subtract(1, 'month')
          return this.$dayjs(notification.created_at).isAfter(minusOneMonth)
        }).length >= 2
      )
    },
  },
  methods: {
    onConfirmSendEmail(payload) {
      this.$emit('clickedProposerMission', this.profile)
      this.showAlert = false
    },
  },
})
</script>
