<template>
  <Drawer :is-open="Boolean(organisationId)" @close="$emit('close')">
    <AlertDialog
      v-if="organisation"
      theme="danger"
      title="Supprimer l'organisation"
      :text="`Vous êtes sur le point de supprimer l'organisation ${organisation.name}.`"
      :is-open="showAlert"
      @confirm="handleConfirmDelete()"
      @cancel="showAlert = false"
    />
    <template #title>
      <Heading v-if="organisation" :level="3" class="text-jva-blue-500">
        <nuxt-link :to="`/admin/organisations/${organisationId}`" class="hover:underline">
          {{ organisation.name }}
        </nuxt-link>
      </Heading>
    </template>
    <template v-if="organisation">
      <div v-if="loading">
        <LoadingIndicator class="mt-8" />
      </div>
      <div v-else>
        <div class="mt-2">
          <OnlineIndicator v-if="organisation.statut_juridique === 'Association'" :published="hasPageOnline" :link="hasPageOnline ? `/organisations/${organisation.slug}` : null" />
        </div>
        <div class="mt-4 space-x-2">
          <nuxt-link :to="`/admin/organisations/${organisation.id}`">
            <Button variant="white" size="sm" icon="EyeIcon">
              Détails
            </Button>
          </nuxt-link>
          <nuxt-link :to="`/admin/organisations/${organisation.id}/edit`">
            <Button variant="white" size="sm" icon="PencilIcon">
              Modifier
            </Button>
          </nuxt-link>
          <Button v-if="['admin'].includes($store.getters.contextRole)" variant="white" size="sm" icon="TrashIcon" @click.native="() => showAlert = true" />
        </div>
        <div class="border-t -mx-6 my-6" />
        <div class="text-sm  uppercase font-semibold text-gray-600">
          Statut de l'organisation
        </div>
        <SelectOrganisationState v-if="canEditStatut" :value="organisation.state" class="mt-4" @selected="handleChangeState($event)" />
        <div v-else class="mt-4 font-medium text-gray-800">
          {{ organisation.state }}
        </div>
        <div class="border-t -mx-6 my-6" />
        <BoxInformations class="mb-8" :organisation="organisation" show-title />
        <BoxReferents v-if="['admin'].includes($store.getters.contextRole)" class="mb-8" :department="organisation.department" />
        <BoxMission class="mb-8" :organisation="organisation" :organisation-stats="organisationStats" />
        <BoxParticipation class="mb-8" :organisation="organisation" :organisation-stats="organisationStats" />
        <BoxResponsable v-for="responsable in organisation.members" :key="responsable.id" class="mb-8" :responsable="responsable.profile" />
        <BoxReseau v-for="reseau in organisation.reseaux" :key="reseau.id" class="mb-8" :reseau="reseau" />

        <div class="flex justify-center mb-10">
          <Link :to="`/admin/organisations/${organisation.id}`" class="uppercase font-semibold text-sm hover:underline">
            Détails de l'organisation
          </Link>
        </div>
      </div>
    </template>
  </Drawer>
</template>

<script>
import MixinOrganisation from '@/mixins/organisation'
import SelectOrganisationState from '@/components/custom/SelectOrganisationState'
import BoxMission from '@/components/section/organisation/BoxMission'
import BoxParticipation from '@/components/section/organisation/BoxParticipation'
import BoxInformations from '@/components/section/organisation/BoxInformations'
import BoxResponsable from '@/components/section/BoxResponsable'
import BoxReseau from '@/components/section/organisation/BoxReseau'
import BoxReferents from '@/components/section/BoxReferents'
import LoadingIndicator from '@/components/custom/LoadingIndicator'
import OnlineIndicator from '~/components/custom/OnlineIndicator'

export default {
  components: {
    SelectOrganisationState,
    BoxMission,
    BoxParticipation,
    BoxInformations,
    BoxResponsable,
    BoxReseau,
    LoadingIndicator,
    OnlineIndicator,
    BoxReferents
  },
  mixins: [MixinOrganisation],
  props: {
    organisationId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      showAlert: false,
      organisation: null,
      organisationStats: null,
      loading: false
    }
  },
  async fetch () {
    this.loading = true
    this.organisationStats = null
    if (!this.organisationId) {
      return null
    }
    const { data } = await this.$axios.get(`/structures/${this.organisationId}`)
    this.organisation = data
    this.loading = false
    this.$axios.get(`/statistics/organisations/${this.organisationId}`).then(({ data: stats }) => { this.organisationStats = stats })
  },
  watch: {
    organisationId: '$fetch'
  },
  methods: {
    async handleChangeState (option) {
      this.organisation.state = option.key
      await this.$axios.put(`/structures/${this.organisation.id}`, this.organisation).catch(() => {})
      this.$fetch()
      this.$emit('updated')
    },
    async handleConfirmDelete () {
      await this.$axios.delete(`/structures/${this.organisationId}`).then((res) => {
        this.showAlert = false
        this.$emit('close')
        this.$emit('refetch')
      }).catch(() => {})
    }
  }
}
</script>
