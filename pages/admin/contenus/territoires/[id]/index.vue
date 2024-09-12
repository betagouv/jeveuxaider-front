<template>
  <div class="container">
    <Breadcrumb
      :links="[
        {
          text: 'Administration',
          to: $stores.auth.contextRole === 'admin' ? '/admin/contenus/territoires' : null,
        },
        {
          text: 'Territoires',
          to: $stores.auth.contextRole === 'admin' ? '/admin/contenus/territoires' : null,
        },
        { text: territoire.name },
      ]"
    />
  </div>

  <HeaderActions
    :territoire="territoire"
    @updated="closeDrawerAndRefreshTerritoire"
    @isPinned="(event) => (this.isPinned = event)"
  />

  <div class="container">
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 pb-12">
      <div class="lg:col-span-3 space-y-6">
        <!-- <BaseBox class="overflow-hidden" :padding="false">
          <Banner :territoire="territoire" :show-breadcrumb="false" :show-search="false" />
        </BaseBox> -->
        <BaseBox class="relative z-10">
          <!-- <img
            v-if="territoire.banner"
            :srcset="territoire.banner.urls.desktop"
            :alt="territoire.name"
            class="mb-8 h-auto"
          /> -->
          <BaseHeading as="h1" :level="1">
            Devenez bénévole {{ territoire.suffix_title }}
          </BaseHeading>
          <div class="text-xl tracking-[-1px] mt-4">
            Trouvez une mission de
            <b class="font-extrabold"> bénévolat {{ territoire.suffix_title }} </b>
            parmi les missions actuellement disponibles et faites vivre l'engagement de chacun pour
            tous
          </div>
        </BaseBox>
        <BoxInformations
          :territoire="territoire"
          :show-title="false"
          box-variant="shadow"
          box-padding="lg"
        />
        <BaseBox class="overflow-hidden" :padding="false">
          <Associations :territoire="territoire" />
        </BaseBox>
        <BaseBox class="overflow-hidden" :padding="false">
          <Engagement :territoire="territoire" />
        </BaseBox>
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
                name: 'Responsables',
                to: '#responsables',
                icon: 'RiInformationFill',
                current: $route.hash === '#responsables',
                count: territoire.responsables.length,
              },
              {
                name: 'Historique',
                to: '#historique',
                icon: 'RiTimeFill',
                current: $route.hash === '#historique',
              },
            ]"
          />
          <div v-if="$route.hash === '#infos' || !$route.hash">
            <div class="space-y-8">
              <BoxAideModeration
                v-if="['admin'].includes($stores.auth.contextRole)"
                :territoire="territoire"
              />

              <!-- <SelectTerritoireState
                v-if="canEditStatut"
                :modelValue="territoire.state"
                class="mt-4"
                @selected="handleChangeState($event)"
              /> -->

              <BoxMission :territoire="territoire" :stats="stats" />
              <BoxParticipation :territoire="territoire" :stats="stats" />
            </div>
          </div>
          <template v-if="$route.hash === '#responsables'">
            <div class="space-y-8">
              <BoxInvitations
                v-if="canManageTerritoire && invitations && invitations.length > 0"
                :title="`${$filters.pluralize(invitations.length, 'invitation')} en attente`"
                :invitations="invitations"
                @updated="fetch()"
              />

              <div>
                <SectionBoxTerritoireResponsables
                  :title="$filters.pluralize(territoire.responsables.length, 'responsable')"
                  :territoire="territoire"
                  :responsables="territoire.responsables"
                  @removed="refetch()"
                />
              </div>
            </div>
          </template>
          <History
            v-if="$route.hash === '#historique'"
            :model-id="territoire.id"
            model-type="territoire"
          />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script>
import History from '@/components/section/History.vue'
import BoxInformations from '@/components/section/territoire/BoxInformations.vue'
import BoxMission from '@/components/section/territoire/BoxMission.vue'
import BoxParticipation from '@/components/section/territoire/BoxParticipation.vue'
import Banner from '@/components/section/territoire/Banner.vue'
import Associations from '@/components/section/territoire/Associations.vue'
import Engagement from '@/components/section/territoire/Engagement.vue'
import BoxInvitations from '@/components/section/BoxInvitations.vue'
import MixinTerritoire from '@/mixins/territoire'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import BoxAideModeration from '@/components/section/territoire/BoxAideModeration.vue'
import HeaderActions from '@/components/section/territoire/HeaderActions.vue'

export default defineNuxtComponent({
  components: {
    BoxInformations,
    BoxMission,
    BoxParticipation,
    History,
    Banner,
    Associations,
    Engagement,
    BoxInvitations,
    Breadcrumb,
    BoxAideModeration,
    HeaderActions,
  },
  mixins: [MixinTerritoire],
  async setup() {
    definePageMeta({
      middleware: ['authenticated'],
    })

    const { $stores } = useNuxtApp()
    const route = useRouter().currentRoute.value

    if (!['admin', 'responsable_territoire'].includes($stores.auth.contextRole)) {
      return showError({ statusCode: 403 })
    }
    const territoire = await apiFetch(`/territoires/${route.params.id}`)
    if (!territoire) {
      return showError({ statusCode: 404 })
    }
    if ($stores.auth.contextRole == 'responsable_territoire') {
      if ($stores.auth.contextableId != territoire.id) {
        return showError({ statusCode: 403 })
      }
    }

    const stats = await apiFetch(`/territoires/${route.params.id}/statistics`)

    return {
      territoire: toRef(territoire),
      stats,
    }
  },
  data() {
    return {
      showDrawerInvitation: false,
      showDrawerAddResponsable: false,
      invitations: null,
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const invitations = await apiFetch(`/territoires/${this.territoire.id}/invitations`)
      this.invitations = invitations
    },
    // async handleChangeState(option) {
    //   console.log('handleChangeState', option)
    //   await apiFetch(`/territoires/${this.territoire.id}`, {
    //     method: 'PUT',
    //     body: {
    //       ...this.territoire,
    //       state: option.key,
    //     },
    //   })
    //     .then(() => {
    //       this.territoire.state = option.key
    //     })
    //     .catch(() => {})
    // },
    async refetch() {
      const territoire = await apiFetch(`/territoires/${this.territoire.id}`)
      this.territoire = territoire
    },
    handleSubmitInvitation() {
      this.showDrawerInvitation = false
      this.fetch()
    },
    handleSubmitAddResponsable() {
      this.showDrawerAddResponsable = false
      this.refetch()
    },
    closeDrawerAndRefreshTerritoire() {
      this.showDrawerInvitation = false
      this.showDrawerAddResponsable = false
      this.refetch()
    },
  },
})
</script>
