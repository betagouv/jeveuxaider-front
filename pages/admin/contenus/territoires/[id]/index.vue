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
    <!-- <BaseAlertDialog
      icon="RiErrorWarningLine"
      title="Supprimer le responsable"
      :is-open="showAlertMemberDeleted"
      @confirm="handleConfirmDeleteMember"
      @cancel="showAlertMemberDeleted = false"
    >
      <strong>{{ memberSelected.full_name }}</strong> ne sera plus responsable du territoire
      <strong>{{ territoire.name }}</strong>
    </BaseAlertDialog> -->
    <BaseDrawer
      :is-open="showDrawerAddResponsable"
      form-id="form-add-responsable"
      submit-label="Ajouter ce responsable"
      @close="showDrawerAddResponsable = false"
    >
      <template #title>
        <BaseHeading :level="3"> Ajouter un responsable </BaseHeading>
      </template>
      <FormAddResponsable
        class="mt-8"
        :endpoint="`/territoires/${territoire.id}/responsables`"
        @submited="handleSubmitAddResponsable"
      />
    </BaseDrawer>
    <BaseDrawer
      :is-open="showDrawerInvitation"
      form-id="form-invitation"
      submit-label="Envoyer l'invitation"
      @close="showDrawerInvitation = false"
    >
      <template #title>
        <BaseHeading :level="3"> Inviter un responsable </BaseHeading>
      </template>
      <FormInvitation
        class="mt-8"
        role="responsable_territoire"
        :invitable-id="territoire.id"
        invitable-type="App\Models\Territoire"
        @submited="handleSubmitInvitation"
      />
    </BaseDrawer>
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 pb-12">
      <div class="lg:col-span-3 space-y-6">
        <BaseBox class="overflow-hidden" :padding="false">
          <Banner :territoire="territoire" :show-breadcrumb="false" :show-search="false" />
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
        <div class="flex items-start justify-between">
          <div>
            <BaseHeading :level="1" class="mb-4">
              Territoire
              <span
                v-if="['admin'].includes($stores.auth.contextRole)"
                class="font-normal text-gray-500 text-2xl"
                >#{{ territoire.id }}</span
              >
            </BaseHeading>
            <div class="flex items-center space-x-4">
              <BaseBadge :color="territoire.state">
                {{ $filters.label(territoire.state, 'territoire_workflow_states') }}
              </BaseBadge>
              <OnlineIndicator :published="territoire.is_published" :link="territoire.full_url" />
            </div>
          </div>
          <nuxt-link
            no-prefetch
            v-if="canManageTerritoire"
            :to="`/admin/contenus/territoires/${territoire.id}/edit`"
          >
            <BaseButton icon="RiPencilLine"> Modifier </BaseButton>
          </nuxt-link>
        </div>
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
              <SelectTerritoireState
                v-if="canEditStatut"
                :modelValue="territoire.state"
                class="mt-4"
                @selected="handleChangeState($event)"
              />

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

                <div class="space-x-2 mt-4">
                  <BaseButton
                    v-if="canManageTerritoire"
                    variant="white"
                    @click.native="showDrawerInvitation = true"
                  >
                    <RiUserFill class="h-4 w-4 mr-2" /> Inviter un responsable
                  </BaseButton>
                  <BaseButton
                    v-if="['admin'].includes($stores.auth.contextRole)"
                    variant="white"
                    @click.native="showDrawerAddResponsable = true"
                  >
                    <RiAddLine class="h-4 w-4 mr-2" /> Ajouter un responsable
                  </BaseButton>
                </div>
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
import OnlineIndicator from '@/components/custom/OnlineIndicator.vue'
import BoxInformations from '@/components/section/territoire/BoxInformations.vue'
import BoxMission from '@/components/section/territoire/BoxMission.vue'
import BoxParticipation from '@/components/section/territoire/BoxParticipation.vue'
import Banner from '@/components/section/territoire/Banner.vue'
import Associations from '@/components/section/territoire/Associations.vue'
import Engagement from '@/components/section/territoire/Engagement.vue'
import BoxInvitations from '@/components/section/BoxInvitations.vue'
import FormInvitation from '@/components/form/FormInvitation.vue'
import FormAddResponsable from '@/components/form/FormAddResponsable.vue'
import MixinTerritoire from '@/mixins/territoire'
import SelectTerritoireState from '@/components/custom/SelectTerritoireState.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
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
    FormInvitation,
    FormAddResponsable,
    SelectTerritoireState,
    Breadcrumb,
  },
  mixins: [MixinTerritoire],
  async setup() {
    definePageMeta({
      middleware: ['authenticated'],
    })

    const { $stores } = useNuxtApp()
    const route = useRoute()

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
    async handleChangeState(option) {
      console.log('handleChangeState', option)
      await apiFetch(`/territoires/${this.territoire.id}`, {
        method: 'PUT',
        body: {
          ...this.territoire,
          state: option.key,
        },
      })
        .then(() => {
          this.territoire.state = option.key
        })
        .catch(() => {})
    },
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
    // handleDeleteMember(member) {
    //   this.memberSelected = member
    //   this.showAlertMemberDeleted = true
    // },
    // async handleConfirmDeleteMember() {
    //   await apiFetch(`/territoires/${this.territoire.id}/responsables/${this.memberSelected.id}`, {
    //     method: 'DELETE',
    //   })
    //   this.refetch()
    //   this.memberSelected = {}
    //   this.showAlertMemberDeleted = false
    // },
  },
})
</script>
