<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Réseaux', link: '/admin/contenus/reseaux' },
        { label: reseau.name },
      ]"
    />
    <Drawer :is-open="showDrawerInvitation" form-id="form-invitation" submit-label="Envoyer l'invitation" @close="showDrawerInvitation = false">
      <template #title>
        <Heading :level="3">
          Inviter un responsable
        </Heading>
      </template>
      <FormInvitation
        class="mt-8"
        role="responsable_reseau"
        :invitable-id="reseau.id"
        invitable-type="App\Models\Reseau"
        @submited="handleSubmitInvitation"
      />
    </Drawer>
    <div v-if="reseau" class="grid grid-cols-1 lg:grid-cols-5 gap-8 py-12">
      <div class="lg:col-span-3 space-y-6">
        <Box class="relative z-10">
          <img
            v-if="reseau.logo"
            :srcset="reseau.logo.large"
            :alt="reseau.name"
            class="my-8 h-auto"
            style="max-width: 16rem; max-height: 10rem"
          >
          <Heading as="h1" :level="1" class="mb-4">
            {{ reseau.name }}
          </Heading>
          <TextFormatted :max-lines="2" :text="reseau.description" class="text-cool-gray-500 text-lg" />
        </Box>
        <Box :style="`background-color: ${reseau.color ? reseau.color : '#B91C1C'}`" class="text-white">
          <DomainsPublicsLinks :organisation="reseau" />
        </Box>
        <Box :padding="false">
          <iframe
            width="100%"
            height="100%"
            style="border: 0; min-height: 190px"
            loading="lazy"
            allowfullscreen
            :src="`https://www.google.com/maps/embed/v1/place?key=${$config.google.places}&q=${reseau.full_address}`"
          />
          <div class="text-sm px-6 py-4 flex justify-between items-center">
            <div class="font-bold text-gray-800 uppercase">
              Siège du réseau
            </div>
            <div class="text-gray-500">
              📍 {{ reseau.full_address }}
            </div>
          </div>
        </Box>
      </div>
      <div class="lg:col-span-2 space-y-8">
        <div class="flex items-start justify-between">
          <div>
            <Heading :level="1">
              Réseau <span class=" font-normal text-gray-500 text-2xl">#{{ reseau.id }}</span>
            </Heading>

            <OnlineIndicator :published="!!reseau.is_published" :link="reseau.full_url" class="mt-2" />
          </div>
          <nuxt-link :to="`/admin/contenus/reseaux/${reseau.id}/edit`">
            <Button icon="PencilIcon">
              Modifier
            </Button>
          </nuxt-link>
        </div>
        <Tabs
          :tabs="[
            { name: 'Informations', to: '', icon: 'InformationCircleIcon', current: !$route.hash },
            { name: 'Responsables', to: '#responsables', icon: 'UsersIcon', current: $route.hash == '#responsables', count: reseau.responsables_count },
            { name: 'Historique', to: '#historique', icon: 'ClockIcon', current: $route.hash == '#historique' }
          ]"
        />
        <div v-if="!$route.hash">
          <div class="space-y-8">
            <BoxInformations :reseau="reseau" />
            <BoxAntenne class="mb-8" :reseau="reseau" :stats="stats" />
            <BoxMission class="mb-8" :reseau="reseau" :stats="stats" />
            <BoxParticipation class="mb-8" :reseau="reseau" :stats="stats" />
          </div>
        </div>
        <History v-if="$route.hash == '#historique'" :model-id="reseau.id" model-type="reseau" />
        <template v-if="$route.hash == '#responsables'">
          <div class="space-y-2">
            <BoxInvitations v-if="queryInvitations && queryInvitations.data.length > 0" :invitations="queryInvitations.data" />

            <Box v-for="responsable in reseau.responsables" :key="responsable.id" variant="flat" padding="xs">
              <DescriptionList v-if="responsable">
                <DescriptionListItem term="Nom" :description="responsable.full_name" />
                <DescriptionListItem term="E-mail" :description="responsable.email" />
                <DescriptionListItem term="Mobile" :description="responsable.mobile" />
              </DescriptionList>
            </Box>
            <Button variant="white" @click.native="showDrawerInvitation = true">
              <UsersIcon class="h-4 w-4 mr-2" /> Inviter un responsable
            </Button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import MixinReseau from '@/mixins/reseau'
import History from '@/components/section/History'
import DomainsPublicsLinks from '@/components/section/organisation/DomainsPublicsLinks'
import BoxInformations from '@/components/section/reseau/BoxInformations'
import BoxAntenne from '@/components/section/reseau/BoxAntenne'
import BoxMission from '@/components/section/reseau/BoxMission'
import BoxParticipation from '@/components/section/reseau/BoxParticipation'
import FormInvitation from '@/components/form/FormInvitation'
import OnlineIndicator from '@/components/custom/OnlineIndicator'
import BoxInvitations from '@/components/section/BoxInvitations'

export default {
  components: {
    History,
    DomainsPublicsLinks,
    BoxInformations,
    BoxAntenne,
    BoxMission,
    BoxParticipation,
    OnlineIndicator,
    FormInvitation,
    BoxInvitations
  },
  mixins: [MixinReseau],
  layout: 'admin',
  async asyncData ({ $axios, params, error, store }) {
    const { data: reseau } = await $axios.get(`/reseaux/${params.id}`)
    if (!reseau) {
      return error({ statusCode: 404 })
    }

    return {
      reseau
    }
  },
  data () {
    return {
      stats: null,
      showDrawerInvitation: false,
      queryInvitations: null
    }
  },
  fetch () {
    this.$axios.get(`/statistics/reseaux/${this.reseau.id}`).then(({ data: stats }) => {
      this.stats = stats
    })

    this.$axios.get('/invitations', {
      params: {
        'filter[of_reseau]': this.reseau.id
      }
    }).then(({ data: queryInvitations }) => {
      this.queryInvitations = queryInvitations
    })
  },
  methods: {
    handleSubmitInvitation () {
      this.showDrawerInvitation = false
      this.$fetch()
    }
  }
}
</script>
