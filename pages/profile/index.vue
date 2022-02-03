<template>
  <Container2Cols>
    <template #breadcrumb>
      <Breadcrumb
        :items="[{ label: 'Mon profil' }]"
      />
    </template>
    <template #header>
      <SectionHeading title="Ravi de vous retrouver 👋" :secondary-title="`Bonjour ${$store.state.auth.user.profile.first_name }`">
        <template #action>
          <div>
            <Button size="xl" icon="SearchIcon" @click.native="$store.commit('toggleSearchOverlay')">
              Trouver une mission
            </Button>
          </div>
        </template>
      </Sectionheading>
    </template>
    <template #left>
      <Box :loading="loadingActions" loading-text="Récupération des actions en attente ...">
        <Heading as="h2" :level="3" class="mb-8">
          Vous avez {{ formattedActions.length | pluralize('action') }} en attente
        </Heading>
        <StackedList :divided="false">
          <StackedListItem
            v-for="action, i in formattedActions"
            :key="i"
            :icon="action.icon"
            :link="action.link"
            :icon-variant="action.iconVariant"
          >
            <div class="text-gray-900 font-semibold" v-html="action.title" />
            <div v-if="action.subtitle" class="text-gray-500 text-sm" v-html="action.subtitle" />
          </StackedListItem>
        </StackedList>
      </Box>
      <LePetitMot />
    </template>
    <template #right>
      <BoxDisponibilities :profile="$store.state.auth.user.profile" />

      <BoxInformations :profile="$store.state.auth.user.profile" />

      <HelpCenter />
    </template>
  </Container2Cols>
</template>

<script>
import MixinAction from '@/mixins/action'
import HelpCenter from '@/components/section/dashboard/HelpCenter'
import LePetitMot from '@/components/section/dashboard/LePetitMot'
import BoxDisponibilities from '@/components/section/profile/BoxDisponibilities'
import BoxInformations from '@/components/section/profile/BoxInformations'

export default {
  components: {
    HelpCenter,
    LePetitMot,
    BoxDisponibilities,
    BoxInformations
  },
  mixins: [MixinAction],
  layout: 'admin',
  middleware: 'authenticated',
  data () {
    return {
      loadingActions: true,
      links: [
        { icon: '🔎', title: 'Question 1', link: '#' },
        { icon: '📇', title: 'Question 2', link: '#' },
        { icon: '📇', title: 'Question 2', link: '#' }
      ]
    }
  },
  created () {
    this.$axios.get('/user/actions/benevole').then((response) => {
      this.loadingActions = false
      this.actions = response.data
    })
  }
}
</script>

<style>

</style>
