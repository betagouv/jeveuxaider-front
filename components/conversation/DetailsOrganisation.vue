<template>
  <div v-if="organisation" class="p-6">
    <Heading v-if="organisation" :level="3" class="text-jva-blue-500 mb-4">
      <nuxt-link :to="`/admin/organisations/${organisationId}`" class="hover:underline">
        {{ organisation.name }}
      </nuxt-link>
    </Heading>
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
    <BoxInformations class="mb-8" :organisation="organisation" />
  </div>
</template>

<script>
import BoxInformations from '@/components/section/organisation/BoxInformations'
import MixinOrganisation from '@/mixins/organisation'
import OnlineIndicator from '~/components/custom/OnlineIndicator'
import SelectOrganisationState from '@/components/custom/SelectOrganisationState'

export default {
  components: {
    BoxInformations,
    OnlineIndicator,
    SelectOrganisationState
  },
  mixins: [MixinOrganisation],
  data () {
    return {
      organisation: null,
      loading: false
    }
  },
  async fetch () {
    this.loading = true
    const { data } = await this.$axios.get(`/structures/${this.organisationId}`)
    this.organisation = data
    this.loading = false
  },
  computed: {
    organisationId () {
      return this.conversation.conversable.id
    },
    conversation () {
      return this.$store.getters['messaging/conversation']
    }
  }
}
</script>
