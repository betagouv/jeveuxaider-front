<template>
  <Box :loading="$fetchState.pending" loading-text="Récupération des actions en attente ...">
    <Heading as="h2" :level="3" class="mb-8">
      Vous avez {{ todosList.length }} action(s) en attente
    </Heading>
    <ul class="">
      <li v-for="(action, index) in todosList" :key="index" class="">
        <WaitingActionItem
          v-if="action.type == 'organisations_waiting_validation'"
          :type="action.type"
          icon="✊"
          :title="`<b>${$options.filters.formatNumber(action.value)} organisation(s)</b> en attente de validation`"
          subtitle="Des organisations souhaitent publier des missions"
          @click.native="$router.push('/dashboard/organisations?filter[state]=En attente de validation')"
        />
        <WaitingActionItem
          v-if="action.type == 'organisations_incomplete'"
          :type="action.type"
          icon="✍"
          :title="`<b>${$options.filters.formatNumber(action.value)} organisation(s)</b> sont incomplètes`"
          subtitle="Des fiches duêment complétées augmentent la qualité de la plateforme"
          @click.native="$router.push('/dashboard/organisations')"
        />
        <WaitingActionItem
          v-if="action.type == 'missions_waiting_validation'"
          :type="action.type"
          icon="✊"
          :title="`<b>${$options.filters.formatNumber(action.value)} missions(s)</b> en attente de validation`"
          subtitle="Des missions souhaitent être publiées sur la plateforme"
          @click.native="$router.push('/dashboard/missions?filter[state]=En attente de validation')"
        />
        <WaitingActionItem
          v-if="action.type == 'missions_outdated'"
          :type="action.type"
          icon="️⏰️"
          :title="`<b>${$options.filters.formatNumber(action.value)} missions(s)</b> dont la date de fin est passée`"
          subtitle="Pensez à mettre à jour les missions"
          @click.native="$router.push('/dashboard/missions')"
        />
        <WaitingActionItem
          v-if="action.type == 'participations_waiting_validation'"
          :type="action.type"
          icon="️✊"
          :title="`<b>${$options.filters.formatNumber(action.value)} participations(s)</b> en attente de validation`"
          subtitle="Pensez à mettre à jour les missions"
          @click.native="$router.push('/dashboard/participations')"
        />
        <WaitingActionItem
          v-if="action.type == 'participations_in_progress'"
          :type="action.type"
          icon="️✊"
          :title="`<b>${$options.filters.formatNumber(action.value)} participations(s)</b> en cours de traitement`"
          subtitle="Pensez à traiter ces candidatures"
          @click.native="$router.push('/dashboard/participations')"
        />
      </li>
    </ul>
  </Box>
</template>

<script>
import WaitingActionItem from '@/components/advanced/WaitingActionItem'

export default {
  components: {
    WaitingActionItem
  },
  data () {
    return {
      actions: []
    }
  },
  async fetch () {
    const response = await this.$axios.get('/user/actions')
    if (response.data) {
      this.actions = response.data
    }
  },
  computed: {
    todosList () {
      return this.actions.filter(item => item.value)
    }
  }
}
</script>

<style>

</style>
