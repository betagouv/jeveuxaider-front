<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Territoires', link: $store.getters.contextRole === 'admin' ? '/admin/contenus/territoires' : null },
        { label: territoire.name },
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
        role="responsable_territoire"
        :invitable-id="territoire.id"
        invitable-type="App\Models\Territoire"
        @submited="handleSubmitInvitation"
      />
    </Drawer>
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 py-12">
      <div class="lg:col-span-3 space-y-6">
        <Box class="overflow-hidden" :padding="false">
          <Banner :territoire="territoire" :show-breadcrumb="false" :show-search="false" />
        </Box>
        <Box class="overflow-hidden opacity-25" :padding="false">
          <div class="col-span-2 bg-yellow-100 p-4 text-sm rounded-lg">
            @TODO ORGANISATIONS PARTENAIRES
          </div>
          <Associations
            v-if="territoire.promoted_organisations && territoire.promoted_organisations.length"
            :territoire="territoire"
          />
        </Box>
        <Box class="overflow-hidden opacity-25" :padding="false">
          <div class="col-span-2 bg-yellow-100 p-4 text-sm rounded-lg">
            @TODO SEO
          </div>
          <Engagement :territoire="territoire" />
        </Box>
      </div>
      <div class="lg:col-span-2 space-y-8">
        <div class="flex items-start justify-between">
          <div>
            <Heading :level="1" class="mb-4">
              Territoire <span class=" font-normal text-gray-500 text-2xl">#{{ territoire.id }}</span>
            </Heading>
            <div class="flex items-center space-x-4">
              <Badge :color="territoire.state">
                {{ territoire.state |label('territoire_workflow_states') }}
              </Badge>
              <OnlineIndicator :published="territoire.is_published" :link="territoire.full_url" />
            </div>
          </div>
          <nuxt-link :to="`/admin/contenus/territoires/${territoire.id}/edit`">
            <Button icon="PencilIcon">
              Modifier
            </Button>
          </nuxt-link>
        </div>
        <Tabs
          :tabs="[
            { name: 'Informations', to: '', icon: 'InformationCircleIcon', current: !$route.hash },
            { name: 'Responsables', to: '#responsables', icon: 'InformationCircleIcon', current: $route.hash == '#responsables' },
            { name: 'Historique', to: '#historique', icon: 'ClockIcon', current: $route.hash == '#historique' }
          ]"
        />
        <div v-if="!$route.hash" class="space-y-8">
          <BoxInformations :territoire="territoire" />
          <BoxMission :territoire="territoire" :stats="stats" />
          <BoxParticipation :territoire="territoire" :stats="stats" />
        </div>
        <template v-if="$route.hash == '#responsables'">
          <div class="space-y-2">
            <BoxInvitations v-if="queryInvitations && queryInvitations.data.length > 0" :invitations="queryInvitations.data" @updated="$fetch()" />

            <Box v-for="responsable in territoire.responsables" :key="responsable.id" variant="flat" padding="xs">
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
        <History v-if="$route.hash == '#historique'" :model-id="territoire.id" model-type="territoire" />
      </div>
    </div>
  </div>
</template>

<script>
import History from '@/components/section/History'
import OnlineIndicator from '~/components/custom/OnlineIndicator'
import BoxInformations from '@/components/section/territoire/BoxInformations'
import BoxMission from '@/components/section/territoire/BoxMission'
import BoxParticipation from '@/components/section/territoire/BoxParticipation'
import Banner from '@/components/section/territoire/Banner'
import Associations from '@/components/section/territoire/Associations'
import Engagement from '@/components/section/territoire/Engagement'
import BoxInvitations from '@/components/section/BoxInvitations'
import FormInvitation from '@/components/form/FormInvitation'

export default {
  components: {
    OnlineIndicator,
    BoxInformations,
    BoxMission,
    BoxParticipation,
    History,
    Banner,
    Associations,
    Engagement,
    BoxInvitations,
    FormInvitation
  },
  layout: 'admin',
  async asyncData ({ $axios, params, error, store }) {
    if (!['admin', 'responsable_territoire'].includes(store.getters.contextRole)) {
      return error({ statusCode: 403 })
    }
    const { data: territoire } = await $axios.get(`/territoires/${params.id}`)
    if (!territoire) {
      return error({ statusCode: 404 })
    }
    if (store.getters.contextRole == 'responsable_territoire') {
      if (store.getters.contextableId != territoire.id) {
        return error({ statusCode: 403 })
      }
    }

    const { data: stats } = await $axios.get(`/territoires/${params.id}/statistics`)

    return {
      territoire,
      stats
    }
  },
  data () {
    return {
      showDrawerInvitation: false,
      queryInvitations: null
    }
  },
  async fetch () {
    const { data: queryInvitations } = await this.$axios.get('/invitations', {
      params: {
        'filter[of_territoire]': this.territoire.id
      }
    })
    this.queryInvitations = queryInvitations
  },
  methods: {
    handleSubmitInvitation () {
      this.showDrawerInvitation = false
      this.$fetch()
    }
  }
}
</script>
