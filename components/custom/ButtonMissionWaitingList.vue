<template>
  <div>
    <div class="text-[#666666] mb-6">Des places peuvent se libérer à l’avenir</div>
    <DsfrButton :size="size" :type="buttonType" class="w-full" @click.native="onClick">
      {{ !isMissionInUserWaitingList ? 'Être notifié par e-mail' : 'Ne plus être notifié' }}
    </DsfrButton>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    mission: {
      type: Object,
      required: true,
    },
    size: {
      type: String,
      default: 'lg',
    },
  },
  computed: {
    buttonType() {
      return this.isMissionInUserWaitingList ? 'secondary' : 'primary'
    },
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

      if (this.isMissionInUserWaitingList) {
        this.onClickUnsubscribe()
      } else {
        this.onClickSubscribe()
      }
    },
    onClickSubscribe() {
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
          this.$toast.success('Vous ne serez plus notifié pour cette mission')
          await this.$stores.auth.fetchUser()
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
})
</script>
