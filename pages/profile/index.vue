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
          <Button size="xl" icon="SearchIcon" @click.native="$store.commit('toggleSearchOverlay')">
            Trouver une mission
          </Button>
        </template>
      </Sectionheading>
    </template>
    <template #left>
      <Box :loading="$fetchState.pending" loading-text="Récupération des actions en attente ...">
        <Heading as="h2" :level="3" class="mb-8">
          Vous avez {{ formattedActions.length }} action(s) en attente
        </Heading>
        <StackedList :divided="false">
          <StackedListItem
            v-for="action, i in formattedActions"
            :key="i"
            :icon="action.icon"
            :link="action.link"
          >
            <div class="text-gray-900 font-semibold" v-html="action.title" />
            <div v-if="action.subtitle" class="text-gray-500 text-sm" v-html="action.subtitle" />
          </StackedListItem>
        </StackedList>
      </Box>
      <LePetitMot />
      <Box>Mes missions</Box>
    </template>
    <template #right>
      <Box>Mes infos ?</Box>
      <Box>MarketPlace UserCard teaser ?</Box>
      <Box>
        <Heading as="h2" :level="2" class="mb-8 font-extrabold">
          Suivez le guide
        </Heading>
        <StackedList>
          <StackedListItem
            v-for="link,i in links"
            :key="i"
            :icon="link.icon"
            :link="link.link"
          >
            <div class="group-hover:underline font-bold">
              {{ link.title }}
            </div>
          </StackedListItem>
        </StackedList>
      </Box>
      <HelpCenter />
    </template>
  </Container2Cols>
</template>

<script>
import MixinAction from '@/mixins/action'
import HelpCenter from '@/components/section/dashboard/HelpCenter'
import LePetitMot from '@/components/section/dashboard/LePetitMot'

export default {
  components: {
    HelpCenter,
    LePetitMot
  },
  mixins: [MixinAction],
  layout: 'dashboard',
  middleware: 'authenticated',
  data () {
    return {
      links: [
        { icon: '🔎', title: 'Question 1', link: '#' },
        { icon: '📇', title: 'Question 2', link: '#' },
        { icon: '📇', title: 'Question 2', link: '#' }
      ]
    }
  },
  async fetch () {
    const response = await this.$axios.get('/user/actions')
    if (response.data) {
      this.actions = response.data
    }
  }
}
</script>

<style>

</style>
