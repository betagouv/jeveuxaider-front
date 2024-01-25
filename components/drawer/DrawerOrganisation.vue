<template>
  <BaseDrawer :is-open="Boolean(organisationId)" @close="$emit('close')">
    <template #title>
      <BaseHeading v-if="organisation" :level="3" class="text-jva-blue-500">
        <nuxt-link
          no-prefetch
          :to="`/admin/organisations/${organisationId}`"
          class="hover:underline"
        >
          {{ organisation.name }}
        </nuxt-link>
      </BaseHeading>
    </template>
    <template v-if="organisation">
      <div v-if="loading">
        <LoadingIndicator class="mt-8" />
      </div>
      <div v-else>
        <DsfrLink
          :to="`/organisations/${organisation.slug}`"
          :is-external="true"
          class="text-xs font-normal"
        >
          Voir l'organisation
        </DsfrLink>
        <Badges class="mt-5" :organisation="organisation" />
        <div class="flex flex-wrap gap-1 mt-6">
          <DsfrButton
            :to="`/admin/organisations/${organisation.id}`"
            type="tertiary"
            icon="RiEyeLine"
            size="sm"
          >
            Détails
          </DsfrButton>

          <DsfrButton
            :to="`/admin/organisations/${organisation.id}/edit`"
            type="tertiary"
            icon="RiPencilLine"
            size="sm"
          >
            Modifier
          </DsfrButton>

          <Actions
            v-if="['admin', 'referent', 'referent_regional'].includes($stores.auth.contextRole)"
            :organisation="organisation"
            @organisationDeleted="handleDeleted"
            buttonSize="sm"
          />
        </div>
        <div class="border-t -mx-6 my-6" />
        <div class="text-sm uppercase font-semibold text-gray-600">Statut de l'organisation</div>
        <SelectOrganisationState
          v-if="canEditStatut"
          :organisation="organisation"
          class="mt-4"
          @selected="handleChangeState($event)"
        />
        <div v-else class="mt-4 font-medium text-gray-800">
          {{ organisation.state }}
        </div>
        <div class="border-t -mx-6 my-6" />
        <BoxInformations class="mb-8" :organisation="organisation" show-title />
        <BoxScoreLight
          v-if="['admin', 'referent'].includes($stores.auth.contextRole)"
          class="mb-8"
          :structure-id="organisation.id"
          show-title
        />
        <HistoryStateChanges
          v-if="['admin', 'referent'].includes($stores.auth.contextRole)"
          :model-id="organisation.id"
          model-type="structure"
          class="mb-8"
        />
        <BoxReferents
          v-if="['admin'].includes($stores.auth.contextRole)"
          class="mb-8"
          :department="organisation.department"
        />
        <BoxMission
          class="mb-8"
          :organisation="organisation"
          :organisation-stats="organisationStats"
        />
        <BoxParticipation
          class="mb-8"
          :organisation="organisation"
          :organisation-stats="organisationStats"
        />
        <BoxResponsable
          v-for="responsable in organisation.members"
          :key="responsable.id"
          class="mb-8"
          :responsable="responsable.profile"
          :conversable-id="organisation.id"
          conversable-type="App\Models\Structure"
          :conversable="organisation"
          @updated="fetch"
        />
        <BoxReseau
          v-for="reseau in organisation.reseaux"
          :key="reseau.id"
          class="mb-8"
          :reseau="reseau"
        />
        <div class="flex justify-center mb-10">
          <BaseLink
            :to="`/admin/organisations/${organisation.id}`"
            class="uppercase font-semibold text-sm hover:underline"
          >
            Détails de l'organisation
          </BaseLink>
        </div>
      </div>
    </template>
  </BaseDrawer>
</template>

<script>
import MixinOrganisation from '@/mixins/organisation'
import SelectOrganisationState from '@/components/custom/SelectOrganisationState.vue'
import BoxMission from '@/components/section/organisation/BoxMission.vue'
import BoxParticipation from '@/components/section/organisation/BoxParticipation.vue'
import BoxInformations from '@/components/section/organisation/BoxInformations.vue'
import BoxResponsable from '@/components/section/BoxResponsable.vue'
import BoxReseau from '@/components/section/organisation/BoxReseau.vue'
import BoxReferents from '@/components/section/BoxReferents.vue'
import LoadingIndicator from '@/components/custom/LoadingIndicator.vue'
import OnlineIndicator from '@/components/custom/OnlineIndicator.vue'
import BoxScoreLight from '@/components/section/organisation/BoxScoreLight.vue'
import HistoryStateChanges from '@/components/section/HistoryStateChanges.vue'
import Badges from '@/components/section/organisation/Badges.vue'
import Actions from '@/components/section/organisation/Actions.vue'

export default defineNuxtComponent({
  components: {
    SelectOrganisationState,
    BoxMission,
    BoxParticipation,
    BoxInformations,
    BoxResponsable,
    BoxReseau,
    LoadingIndicator,
    OnlineIndicator,
    BoxReferents,
    BoxScoreLight,
    HistoryStateChanges,
    Badges,
    Actions,
  },
  mixins: [MixinOrganisation],
  props: {
    organisationId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      organisation: null,
      organisationStats: null,
      loading: false,
    }
  },
  watch: {
    organisationId: 'fetch',
  },
  methods: {
    async fetch() {
      this.loading = true
      this.organisationStats = null
      if (!this.organisationId) {
        return null
      }
      const organisation = await apiFetch(`/structures/${this.organisationId}`)
      this.organisation = organisation
      this.loading = false
      apiFetch(`/statistics/organisations/${this.organisationId}`).then((response) => {
        this.organisationStats = response
      })
    },
    async handleChangeState(option) {
      this.organisation.state = option.key
      apiFetch(`/structures/${this.organisation.id}`, {
        method: 'PUT',
        body: this.organisation,
      })
        .then((res) => {
          this.fetch()
          this.$emit('updated')
        })
        .catch(() => {})
    },
    handleDeleted() {
      this.$emit('updated')
      this.$emit('close')
      this.$router.push('/admin/organisations')
    },
  },
})
</script>
