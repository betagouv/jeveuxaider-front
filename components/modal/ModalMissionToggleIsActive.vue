<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal
        :is-open="isOpen"
        icon="RiErrorWarningLine"
        :title="`${mission.is_online ? 'Mettre hors ligne' : 'Mettre en ligne'} la mission`"
        :prevent-click-outside="true"
        @close="$emit('cancel')"
      >
        <div class="formatted-text">
          <p>
            Vous êtes sur le point de
            {{ mission.is_online ? 'mettre hors ligne' : 'mettre en ligne' }} la mission
            <strong>{{ mission.name ?? 'Titre à définir' }}</strong>
            <span class="text-gray-500"> #{{ mission.id }}</span
            >. Le responsable de la mission
            <strong>{{ mission.responsables[0].full_name }}</strong> en sera notifié par mail.
          </p>
          <p v-if="mission.is_online">
            La mission <strong>n'apparaîtra plus dans la recherche</strong> et il sera impossible
            pour de nouveaux bénévoles de s'y inscrire.
          </p>
          <p v-else>
            La mission sera de nouveau visible dans la recherche et de nouveaux bénévoles pourront
            s'y inscrire.
          </p>
        </div>

        <template #footer>
          <DsfrButton :disabled="loading" type="secondary" @click.native="$emit('cancel')">
            Annuler
          </DsfrButton>
          <DsfrButton :disabled="loading" :loading="loading" @click.native="toggleIsActive()">
            Confirmer
          </DsfrButton>
        </template>
      </BaseModal>
    </Teleport>
  </ClientOnly>
</template>

<script>
export default defineNuxtComponent({
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    mission: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async toggleIsActive() {
      if (this.loading) {
        return
      }

      this.loading = true
      const mission = await apiFetch(`/missions/${this.mission.id}`, {
        method: 'PUT',
        body: {
          ...this.mission,
          is_online: !this.mission.is_online,
        },
      }).catch(() => {})
      this.$toast.success(
        mission.is_online ? 'La mission est désormais en ligne' : 'La mission a été mise hors ligne'
      )
      this.loading = false
      this.$emit('confirm', mission)
    },
  },
})
</script>
