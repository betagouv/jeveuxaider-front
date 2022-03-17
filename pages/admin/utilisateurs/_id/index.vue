<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Utilisateurs', link: '/admin/utilisateurs' },
        { label: profile.full_name },
      ]"
    />
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 py-12">
      <div class="lg:col-span-3 space-y-6">
        <Box class="relative z-10">
          <Heading as="h1" :level="1" class="mb-2">
            {{ profile.full_name }}
          </Heading>
          <div class="text-cool-gray-500 font-semibold">
            Dernière connexion le {{ $dayjs(profile.user.last_online_at).format('D MMMM YYYY à HH:mm') }}
          </div>
          <TextFormatted v-if="profile.description" :max-lines="6" :text="profile.description" class="text-cool-gray-500 text-lg mt-4 " />
        </Box>
        <BoxInformations
          class="mb-8"
          :profile="profile"
          :show-action="false"
          box-variant="shadow"
          :show-title="false"
          box-padding="lg"
        />
        <BoxDisponibilities
          class="mb-8"
          :profile="profile"
          :show-action="false"
          box-variant="shadow"
          :show-title="false"
          box-padding="lg"
        >
          <template #box-before>
            <Heading as="div" :level="3" class="mb-4">
              Engagement
            </Heading>
          </template>
        </BoxDisponibilities>
      </div>
      <div class="lg:col-span-2 space-y-8">
        <div class="flex items-start justify-between">
          <Heading :level="1">
            Utilisateur <span class=" font-normal text-gray-500 text-2xl">#{{ profile.id }}</span>
          </Heading>
          <ButtonWithDropown class="ml-4 flex-shrink-0" :button-click="() => $router.push(`/admin/utilisateurs/${profile.id}/edit`)">
            <template #buttonText>
              <PencilIcon class="h-3 w-3 mr-3" /> Modifier
            </template>
            <template #items>
              <div
                class="text-gray-700 block cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                @click="handleImpersonate()"
              >
                Prendre sa place
              </div>
            </template>
          </ButtonWithDropown>
        </div>
        <Tabs
          :tabs="[
            { name: 'Informations', to: '', icon: 'InformationCircleIcon', current: !$route.hash },
            { name: 'Historique', to: '#historique', icon: 'ClockIcon', current: $route.hash == '#historique' }
          ]"
        />
        <div v-if="!$route.hash" class="space-y-8">
          <div>
            <div class="text-sm flex justify-between px-2 mb-2 uppercase font-semibold text-gray-600">
              Participations
            </div>
            <Box variant="flat" padding="xs">
              <div class="flex items-center">
                <div class="text-4xl font-semibold pr-4">
                  {{ profile.participations_validated_count }}
                </div>
                <div>
                  <div class="font-semibold">
                    {{ profile.participations_validated_count | pluralize('participation validée', 'participations validées', false) }}
                  </div>
                  <div class="text-gray-500 -mt-1">
                    sur {{ profile.participations_count }} candidatures
                  </div>
                </div>
              </div>
              <div class="border-t -mx-6 mt-6 mb-4" />
              <div class="flex justify-center text-sm">
                <Link :to="`/admin/participations?filter[profile.id]=${profile.id}&full_name=${profile.full_name}`">
                  Voir les participations
                </Link>
              </div>
            </Box>
          </div>
          <BoxOrganisations v-if="profile.structures" :structures="profile.structures" />
          <BoxTerritoires v-if="profile.territoires" :territoires="profile.territoires" />
          <BoxReseaux v-if="profile.tete_de_reseau" :reseau="profile.tete_de_reseau" />
        </div>
        <History v-if="$route.hash == '#historique'" :model-id="profile.id" model-type="profile" />
      </div>
    </div>
  </div>
</template>

<script>
import History from '@/components/section/History.vue'
import BoxInformations from '@/components/section/profile/BoxInformations'
import BoxDisponibilities from '@/components/section/profile/BoxDisponibilities'
import BoxReseaux from '@/components/section/profile/BoxReseaux'
import BoxTerritoires from '@/components/section/profile/BoxTerritoires'
import BoxOrganisations from '@/components/section/profile/BoxOrganisations'

export default {
  components: {
    History,
    BoxInformations,
    BoxDisponibilities,
    BoxReseaux,
    BoxTerritoires,
    BoxOrganisations
  },
  async asyncData ({ $axios, params, error, store }) {
    if (
      !['admin', 'referent', 'referent_regional'].includes(
        store.getters.contextRole
      )
    ) {
      return error({ statusCode: 403 })
    }

    const { data: profile } = await $axios.get(`/profiles/${params.id}`)
    if (!profile) {
      return error({ statusCode: 404 })
    }

    return {
      profile
    }
  },
  methods: {
    async handleImpersonate () {
      await this.$store.dispatch('auth/impersonate', this.profile.user.id)
    }
  }
}
</script>
