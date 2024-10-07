<template>
  <div>
    <div class="text-center mb-8">
      <!-- <div class="">
        <img
          src="/images/profiles/badge-identity.svg"
          alt=""
          title=""
          class="h-[125px] lg:h-[150px] mx-auto mb-8"
          data-not-lazy
        />
      </div> -->
      <div class="text-[48px]">💌</div>
      <DsfrHeading as="div" size="xl" class="mb-2 lg:mb-4"> Soyez informé par e-mail </DsfrHeading>
      <div v-if="selectedMission" class="text-cool-gray-500 lg:text-lg max-w-md mx-auto">
        Dès qu’une place se libère pour la mission “{{ selectedMission?.name }}”, vous serez le
        premier au courant par e-mail !
      </div>
    </div>

    <div class="text-center mt-8">
      <div>
        <DsfrButton :loading="loading" class="w-full" size="lg" @click.native="onSubmit">
          Valider
        </DsfrButton>
      </div>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  name: 'SoftGateWaitingList',
  emits: ['next'],
  data() {
    return {
      loading: false,
      selectedMission: this.$stores.softGate.selectedMission,
    }
  },
  methods: {
    async onSubmit() {
      if (this.loading) {
        return
      }

      this.loading = true

      apiFetch(`/missions/${this.selectedMission.id}/waiting-list`, {
        method: 'POST',
      })
        .then(async () => {
          this.$plausible.trackEvent('Soft Gate - Waiting list')
          this.$gtm?.trackEvent({
            event: 'benevole-participation-soft-gate-waiting-list',
          })

          this.$toast.success('Vous recevrez un e-mail si des nouvelles places se libèrent')
          await this.$stores.auth.fetchUser()
          this.$emit('next')
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
})
</script>
