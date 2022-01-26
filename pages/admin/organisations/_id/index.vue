<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Organisations', link: '/admin/organisations' },
        { label: organisation.name },
      ]"
    />
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 py-12">
      <div class="lg:col-span-3 space-y-6">
        <Box class="relative z-10">
          <img
            v-if="organisation.logo"
            :srcset="organisation.logo.large"
            :alt="organisation.name"
            class="my-8 h-auto"
            style="max-width: 16rem; max-height: 10rem"
          >
          <Heading as="h1" :level="1" class="mb-4">
            {{ organisation.name }}
          </Heading>
          <TextFormatted :max-lines="2" :text="organisation.description" class="text-cool-gray-500 text-lg" />
        </Box>
        <BoxInformations class="mb-8" :organisation="organisation" :show-title="false" box-variant="shadow" box-padding="lg" />
        <Box :style="`background-color: ${organisation.color ? organisation.color : '#B91C1C'}`" class="text-white">
          <DomainsPublicsLinks :organisation="organisation" />
        </Box>
        <Box>Todo : Siège de l'organisation avec map</Box>
      </div>
      <div class="lg:col-span-2 space-y-8">
        <div class="flex items-start justify-between">
          <div>
            <Heading :level="1">
              Organisation <span class=" font-normal text-gray-500 text-2xl">#{{ organisation.id }}</span>
            </Heading>

            <OnlineIndicator :published="hasPageOnline" :link="`/organisations/${organisation.slug}`" class="mt-2" />
          </div>
          <nuxt-link :to="`/admin/organisations/${organisation.id}/edit`">
            <Button icon="PencilIcon">
              Modifier
            </Button>
          </nuxt-link>
        </div>
        <Tabs
          :tabs="[
            { name: 'Informations', to: '', icon: 'InformationCircleIcon', current: !$route.hash },
            { name: 'Membres', to: '#membres', icon: 'UsersIcon', current: $route.hash == '#membres', count: organisation.members.length },
            { name: 'Historique', to: '#historique', icon: 'ClockIcon', current: $route.hash == '#historique' }
          ]"
        />
        <div v-if="!$route.hash" class="space-y-8">
          <BoxMission class="mb-8" :organisation="organisation" :organisation-stats="organisationStats" />
          <BoxParticipation class="mb-8" :organisation="organisation" :organisation-stats="organisationStats" />
        </div>
        <History v-if="$route.hash == '#historique'" :model-id="organisation.id" model-type="structure" />
        <template v-if="$route.hash == '#membres'">
          <div class="space-y-2">
            <Box v-for="responsable in organisation.members" :key="responsable.id" variant="flat" padding="xs">
              <DescriptionList v-if="responsable">
                <DescriptionListItem term="Nom" :description="responsable.full_name" />
                <DescriptionListItem term="E-mail" :description="responsable.email" />
                <DescriptionListItem term="Mobile" :description="responsable.mobile" />
              </DescriptionList>
            </Box>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import History from '@/components/section/History.vue'
import MixinOrganisation from '@/mixins/organisation'
import DomainsPublicsLinks from '@/components/section/organisation/DomainsPublicsLinks.vue'
import BoxInformations from '@/components/section/organisation/BoxInformations'
import BoxMission from '@/components/section/organisation/BoxMission'
import BoxParticipation from '@/components/section/organisation/BoxParticipation'
import OnlineIndicator from '~/components/custom/OnlineIndicator'

export default {
  components: {
    History,
    DomainsPublicsLinks,
    OnlineIndicator,
    BoxInformations,
    BoxMission,
    BoxParticipation
  },
  mixins: [MixinOrganisation],
  layout: 'admin',
  async asyncData ({ $axios, params, error, store }) {
    if (
      ![
        'admin',
        'referent',
        'referent_regional',
        'tete_de_reseau',
        'responsable'
      ].includes(store.getters.contextRole)
    ) {
      return error({ statusCode: 403 })
    }

    const { data: organisation } = await $axios.get(`/structures/${params.id}`)
    if (!organisation) {
      return error({ statusCode: 404 })
    }

    if (store.getters.contextRole == 'responsable') {
      if (store.getters.contextableId != organisation.id) {
        return error({ statusCode: 403 })
      }
    }

    return {
      organisation
    }
  },
  data () {
    return {
      organisationStats: null
    }
  },
  async fetch () {
    const { data: stats } = await this.$axios.get(`/statistics/organisations/${this.organisation.id}`)
    this.organisationStats = stats
  }
}
</script>
