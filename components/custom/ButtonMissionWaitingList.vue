<template>
  <div class="space-y-4">
    <div>
      <DsfrButton
        :size="size"
        :type="type"
        :disabled="isMissionInUserWaitingList"
        class="!font-bold w-full"
        @click.native="onClick"
      >
        {{ label }}
      </DsfrButton>
    </div>
    <div v-if="isMissionInUserWaitingList">
      <DsfrLink class="text-sm" @click="onClickUnsubscribe"> Ne plus être notifié </DsfrLink>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    mission: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      default: 'primary',
    },
    size: {
      type: String,
      default: 'lg',
    },
    label: {
      type: String,
      default: 'Être notifié par email',
    },
  },
  computed: {
    isMissionInUserWaitingList() {
      return this.$stores.auth.user?.waiting_list_missions?.some(
        (waitingListMission) => waitingListMission.id === this.mission.id
      )
    },
  },
  methods: {
    onClick() {
      if (this.disabled) {
        return
      }
      this.$plausible.trackEvent('Click CTA - Mission - Waiting list', {
        props: { isLogged: this.$stores.auth.isLogged },
      })

      this.$stores.softGate.selectedMission = this.mission
      this.$stores.softGate.waitingList = true
      this.$stores.softGate.showOverlay = true
    },
    onClickUnsubscribe() {
      apiFetch(`/missions/${this.mission.id}/waiting-list`, {
        method: 'DELETE',
      })
        .then(async () => {
          this.$toast.success('Votre alerte a été retirée')
          await this.$stores.auth.fetchUser()
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
})
</script>
