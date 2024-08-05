<template>
  <div>
    <div class="text-center mb-8">
      <div class="">
        <img
          src="/images/profiles/badge-identity.svg"
          alt=""
          title=""
          class="h-[125px] lg:h-[150px] mx-auto mb-8"
          data-not-lazy
        />
      </div>
      <DsfrHeading as="div" size="xl" class="mb-2 lg:mb-4">
        On s’est permis de compléter votre profil
      </DsfrHeading>
      <div v-if="selectedMission?.activity" class="text-cool-gray-500 lg:text-lg max-w-md mx-auto">
        Nous avons ajouté “{{ selectedMission?.activity?.name }}” comme activité favorite dans vos
        préférences de missions.
      </div>
    </div>

    <div class="text-center mt-8">
      <div>
        <DsfrLink to="/profile/preferences">
          <DsfrButton :loading="loading" class="w-full" size="lg" @click.native="onSubmit">
            Compléter mon profil
          </DsfrButton>
        </DsfrLink>
      </div>
      <div class="mt-8">
        <DsfrLink @click.native="$emit('next')" class="text-jva-blue-500">
          Accéder à mes missions
        </DsfrLink>
      </div>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  name: 'SoftGateCompleteProfile',
  emits: ['next'],
  data() {
    return {
      loading: false,
      selectedMission: this.$stores.softGate.selectedMission,
    }
  },
  methods: {
    onSubmit() {
      this.$stores.softGate.closeOverlay()
    },
  },
})
</script>
