<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Tableau de bord', to: '/dashboard' },
        { text: 'Utilisateurs', to: '/admin/utilisateurs' },
        { text: profile.full_name },
      ]"
    />
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 pb-12">
      <div class="lg:col-span-3 space-y-6">
        <Box class="relative z-10">
          <div class="flex flex-wrap gap-2 mb-2">
            <template v-if="profile.user.roles">
              <Tag v-for="role in profile.user.roles" :key="role.id" size="md">
                {{ role.name | label('roles') }}
              </Tag>
            </template>
            <template v-if="profile.tags">
              <Tag v-for="tag in profile.tags" :key="tag.id" size="md">
                {{ tag.name }}
              </Tag>
            </template>
          </div>
          <div class="sm:flex justify-between items-center">
            <Heading as="h1" :level="1" class="mb-2">
              {{ profile.full_name }}
            </Heading>
          </div>
          <div v-if="profile.user.last_online_at" class="text-cool-gray-500 font-semibold">
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
            Utilisateur <span v-if="['admin'].includes($store.getters.contextRole)" class=" font-normal text-gray-500 text-2xl">#{{ profile.id }}</span>
          </Heading>
          <ButtonWithDropown class="ml-4 flex-shrink-0" :button-click="() => $router.push(`/admin/utilisateurs/${profile.id}/edit`)">
            <template #buttonText>
              <PencilIcon class="h-3 w-3 mr-3" /> Modifier
            </template>
            <template #items>
              <div
                v-if="['admin'].includes($store.getters.contextRole)"
                class="text-gray-700 block cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                @click="handleImpersonate()"
              >
                Prendre sa place
              </div>
            </template>
          </ButtonWithDropown>
        </div>
        <client-only>
          <Tabs
            :tabs="[
              { name: 'Informations', to: '', icon: 'InformationCircleSolidIcon', current: $route.hash === '' },
              { name: 'Historique', to: '#historique', icon: 'ClockIcon', current: $route.hash === '#historique' }
            ]"
          />
          <div v-if="$route.hash === ''" class="space-y-8">
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
                <div class="border-t -mx-4 xl:-mx-6 mt-6 mb-4" />
                <div class="flex justify-center text-sm">
                  <Link :to="`/admin/participations?filter[profile.id]=${profile.id}&full_name=${profile.full_name}`">
                    Voir les participations
                  </Link>
                </div>
              </Box>
            </div>
            <BoxOrganisations v-if="profile.user.structures" :structures="profile.user.structures" />
            <BoxTerritoires v-if="profile.user.territoires" :territoires="profile.user.territoires" />
            <BoxReseau v-if="profile.reseau" :reseau="profile.reseau" />
            <BoxActions v-if="$store.getters.contextRole === 'admin'" :profile="profile" />
            <BoxUtm v-if="$store.getters.contextRole === 'admin'" :model="profile.user" />
          </div>
          <History v-if="$route.hash === '#historique'" :model-id="profile.id" model-type="profile" />
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import History from '@/components/section/History.vue'
import BoxInformations from '@/components/section/profile/BoxInformations'
import BoxDisponibilities from '@/components/section/profile/BoxDisponibilities'
import BoxReseau from '@/components/section/profile/BoxReseau'
import BoxTerritoires from '@/components/section/profile/BoxTerritoires'
import BoxOrganisations from '@/components/section/profile/BoxOrganisations'
import BoxActions from '@/components/section/profile/BoxActions'
import BoxUtm from '@/components/section/BoxUtm'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import Tag from '@/components/dsfr/Tag.vue'

export default {
  components: {
    History,
    BoxInformations,
    BoxDisponibilities,
    BoxReseau,
    BoxTerritoires,
    BoxOrganisations,
    BoxUtm,
    BoxActions,
    Breadcrumb,
    Tag
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
