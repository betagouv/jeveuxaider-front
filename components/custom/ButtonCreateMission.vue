<template>
  <div>
    <div
      v-if="!canCreateMission"
      v-tooltip="tooltipCantCreateMission"
    >
      <Button
        icon="RiAddLine"
        :size="size"
        :disabled="true"
      >
        Publier une mission
      </Button>
    </div>
    <nuxt-link
      v-else
      :to="`/admin/organisations/${$store.getters.currentRole.contextable_id}/missions/add`"
    >
      <Button
        icon="RiAddLine"
        :size="size"
        tabindex="-1"
      >
        Publier une mission
      </Button>
    </nuxt-link>
  </div>
</template>

<script>
import Button from '@/components/dsfr/Button.vue'

export default {
  components: {
    Button
  },
  props: {
    size: {
      type: String,
      default: 'lg'
    }
  },
  data () {
    return {
      structure: null
    }
  },
  async fetch () {
    const { data: structure } = await this.$axios.get(`/structures/${this.$store.state.auth.user.contextable_id}`)
    this.structure = structure
  },
  computed: {
    canCreateMission () {
      return !!this.structure?.state && !['Brouillon', 'Signalée', 'Désinscrite'].includes(this.structure.state)
    },
    tooltipCantCreateMission () {
      let content
      switch (this.structure?.state) {
        case 'Désinscrite':
          content = 'Vous ne pouvez pas créer de mission car votre organisation est désinscrite.'
          break
        case 'Signalée':
          content = 'Vous ne pouvez pas créer de mission tant que votre organisation est signalée.'
          break
        case 'Brouillon':
          content = 'Votre organisation est incomplète - Complétez les informations de votre organisation afin de pouvoir publier une mission'
          break
        default:
          return null
      }

      return {
        content,
        hideOnTargetClick: true,
        placement: 'top'
      }
    }
  }
}
</script>
