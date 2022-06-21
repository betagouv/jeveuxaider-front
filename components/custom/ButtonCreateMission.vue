<template>
  <div>
    <div
      v-if="!canCreateMission"
      v-tooltip="tooltipCantCreateMission"
    >
      <Button
        icon="PlusIcon"
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
        icon="PlusIcon"
        :size="size"
      >
        Publier une mission
      </Button>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'xl'
    }
  },
  computed: {
    canCreateMission () {
      return !['Brouillon', 'Signalée'].includes(this.$store.getters.currentOrganisation.state)
    },
    tooltipCantCreateMission () {
      if (this.$store.getters.currentOrganisation.state === 'Brouillon') {
        return {
          content: 'Votre organisation est incomplète - Complétez les informations de votre organisation afin de pouvoir publier une mission',
          hideOnTargetClick: true,
          placement: 'top'
        }
      }

      if (this.$store.getters.currentOrganisation.state === 'Signalée') {
        return {
          content: 'Vous ne pouvez pas créer de mission tant que votre organisation est signalée.',
          hideOnTargetClick: true,
          placement: 'top'
        }
      }

      return null
    }
  }
}
</script>

<style>

</style>
