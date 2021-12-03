<template>
  <Box v-if="actions">
    <Heading as="h2" :level="3" class="mb-8">
      Vous avez {{ todosList.length }} actions en attente
    </Heading>
    <ul class="">
      <li v-for="(action, index) in todosList" :key="index" class="">
        <WaitingActionItem
          v-if="action.type == 'organisations_waiting_validation'"
          :type="action.type"
          icon="✊"
          :title="`<b>${action.value} organisation(s)</b> en attente de validation`"
          subtitle="Des organisations souhaitent publier des missions"
          @click.native="$router.push('/dashboard/organisations?filter[state]=En attente de validation')"
        />
        <WaitingActionItem
          v-if="action.type == 'organisations_incomplete'"
          :type="action.type"
          icon="✍"
          :title="`<b>${action.value} organisation(s)</b> sont incomplètes`"
          subtitle="Des fiches duêment complétées augmentent la qualité de la plateforme"
          @click.native="$router.push('/dashboard/organisations')"
        />
        <WaitingActionItem
          v-if="action.type == 'missions_waiting_validation'"
          :type="action.type"
          icon="✊"
          :title="`<b>${action.value} missions(s)</b> en attente de validation`"
          subtitle="Des missions souhaitent être publiées sur la plateforme"
          @click.native="$router.push('/dashboard/missions?filter[state]=En attente de validation')"
        />
      </li>
    </ul>
  </Box>
</template>

<script>
import WaitingActionItem from '@/components/custom/WaitingActionItem'

export default {
  components: {
    WaitingActionItem
  },
  data () {
    return {
      actions: null
    }
  },
  computed: {
    todosList () {
      return this.actions.filter(item => item.value)
    }
  },
  async created () {
    const response = await this.$axios.get('/user/actions')
    if (response.data) {
      this.actions = response.data
    }
  }
}
</script>

<style>

</style>
