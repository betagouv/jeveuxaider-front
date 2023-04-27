<template>
  <portal to="body-end">
    <Modal
      v-scroll-lock="isOpen"
      :is-open="isOpen"
      theme="warning"
      :title="`${mission.is_active ? 'Désactiver' : 'Activer'} la mission`"
      :prevent-click-outside="true"
      @close="$emit('cancel')"
    >
      <div class="formatted-text">
        <p>
          Vous êtes sur le point {{ mission.is_active ? 'de désactiver' : 'd\'activer' }} la mission <strong>{{ mission.name }}</strong> <span class="text-gray-500">#{{ mission.id }}</span>.
        </p>
        <p v-if="mission.is_active">
          La mission <strong>n'apparaîtra plus dans la recherche</strong> et il sera impossible pour de nouveaux bénévoles de s'y inscrire.
        </p>
        <p v-else>
          La mission sera de nouveau visible dans la recherche et de nouveaux bénévoles pourront s'y inscrire.
        </p>
      </div>

      <template #footer>
        <Button class="mr-3" variant="white" @click.native="$emit('cancel')">
          Annuler
        </Button>
        <Button @click.native="toggleIsActive()">
          Confirmer
        </Button>
      </template>
    </Modal>
  </portal>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    mission: {
      type: Object,
      required: true
    }
  },
  methods: {
    async toggleIsActive () {
      const { data: mission } = await this.$axios.put(`/missions/${this.mission.id}`, { ...this.mission, is_active: !this.mission.is_active }).catch(() => {})
      this.$toast.success(mission.is_active ? 'La mission est désormais active' : 'La mission a été désactivée')
      this.$emit('confirm', mission)
    }
  }
}
</script>
