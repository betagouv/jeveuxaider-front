<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Tableau de bord', to: '/dashboard' },
        { text: 'Utilisateurs', to: '/admin/utilisateurs' },
        { text: profile.full_name },
      ]"
    />
  </div>
  <HeaderActions :profile="profile" @updated="refreshProfile" />
  <div class="container">
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 pb-12">
      <div class="lg:col-span-3 space-y-6">
        <BaseBox class="relative z-10">
          <div class="flex flex-wrap gap-2 mb-4">
            <template v-if="profile.user.roles">
              <Tag v-for="role in profile.user.roles" :key="role.id" size="md">
                {{ $filters.label(role.name, 'roles') }}
              </Tag>
            </template>
            <template v-if="profile.tags">
              <Tag v-for="tag in profile.tags" :key="tag.id" size="md">
                {{ tag.name }}
              </Tag>
            </template>
          </div>
          <div class="sm:flex justify-between items-center">
            <BaseHeading as="h1" :level="1" class="mb-2">
              {{ profile.full_name }}
            </BaseHeading>
          </div>
          <div v-if="profile.user.last_online_at" class="text-cool-gray-500 font-semibold">
            Dernière connexion le
            {{ $dayjs(profile.user.last_online_at).format('D MMMM YYYY à HH:mm') }}
          </div>
          <BaseTextFormatted
            v-if="profile.description"
            :max-lines="6"
            :text="profile.description"
            class="text-cool-gray-500 text-lg mt-4"
          />
        </BaseBox>
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
            <BaseHeading as="div" :level="3" class="mb-4"> Engagement </BaseHeading>
          </template>
        </BoxDisponibilities>
      </div>
      <div class="lg:col-span-2 space-y-8">
        <ClientOnly>
          <BaseTabs
            :tabs="[
              {
                name: 'Informations',
                to: '#infos',
                icon: 'RiInformationFill',
                current: $route.hash === '#infos' || !$route.hash,
              },
              {
                name: 'Historique',
                to: '#historique',
                icon: 'RiTimeFill',
                current: $route.hash === '#historique',
              },
            ]"
          />
          <div v-if="$route.hash === '#infos' || !$route.hash" class="space-y-8">
            <div>
              <div
                class="text-sm flex justify-between px-2 mb-2 uppercase font-semibold text-gray-600"
              >
                Participations
              </div>
              <BaseBox variant="flat" padding="xs">
                <div class="flex items-center">
                  <div class="text-4xl font-semibold pr-4">
                    {{ profile.participations_validated_count }}
                  </div>
                  <div>
                    <div class="font-semibold">
                      {{
                        $filters.pluralize(
                          profile.participations_validated_count,
                          'participation validée',
                          'participations validées',
                          false
                        )
                      }}
                    </div>
                    <div class="text-gray-500 -mt-1">
                      sur {{ profile.participations_count }} candidatures
                    </div>
                  </div>
                </div>
                <div class="border-t -mx-4 xl:-mx-6 mt-6 mb-4" />
                <div class="flex justify-center text-sm">
                  <BaseLink
                    :to="`/admin/participations?filter[profile.id]=${profile.id}&full_name=${profile.full_name}`"
                  >
                    Voir les participations
                  </BaseLink>
                </div>
              </BaseBox>
            </div>
            <BoxRoles
              v-if="['admin', 'referent', 'referent_regional'].includes($stores.auth.contextRole)"
              :user-id="profile.user_id"
            />
            <BoxOrganisations
              v-if="profile.user.structures"
              :structures="profile.user.structures"
            />
            <BoxTerritoires
              v-if="profile.user.territoires"
              :territoires="profile.user.territoires"
            />
            <BoxReseau v-if="profile.reseau" :reseau="profile.reseau" />
            <BoxActions v-if="$stores.auth.contextRole === 'admin'" :profile="profile" />
            <BoxUtm v-if="$stores.auth.contextRole === 'admin'" :model="profile.user" />
          </div>
          <History
            v-if="$route.hash === '#historique'"
            :model-id="profile.id"
            model-type="profile"
          />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script>
import History from '@/components/section/History.vue'
import BoxInformations from '@/components/section/profile/BoxInformations.vue'
import BoxDisponibilities from '@/components/section/profile/BoxDisponibilities.vue'
import BoxReseau from '@/components/section/profile/BoxReseau.vue'
import BoxTerritoires from '@/components/section/profile/BoxTerritoires.vue'
import BoxOrganisations from '@/components/section/profile/BoxOrganisations.vue'
import BoxActions from '@/components/section/profile/BoxActions.vue'
import BoxUtm from '@/components/section/BoxUtm.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import Tag from '@/components/dsfr/Tag.vue'
import BoxRoles from '@/components/section/profile/BoxRoles.vue'
import HeaderActions from '@/components/section/profile/HeaderActions.vue'

export default defineNuxtComponent({
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
    Tag,
    BoxRoles,
    HeaderActions,
  },
  async setup() {
    const { $stores } = useNuxtApp()
    const route = useRouter().currentRoute.value

    definePageMeta({
      middleware: ['authenticated'],
    })

    if (!['admin', 'referent', 'referent_regional'].includes($stores.auth.contextRole)) {
      return showError({ statusCode: 403 })
    }

    // const profile = await apiFetch(`/profiles/${route.params.id}`)

    const { data: profile, refresh: refreshProfile } = await useApiFetch(
      `/profiles/${route.params.id}`
    )

    if (!profile) {
      return showError({ statusCode: 404 })
    }

    return {
      profile: toRef(profile),
      refreshProfile,
    }
  },
  methods: {
    async handleImpersonate() {
      await this.$stores.auth.impersonate(this.profile.user.id)
    },
  },
})
</script>
