<template>
  <div v-if="organisation" class="p-6">
    <div class="flex items-center space-x-2">
      <div class="text-lg leading-8 font-bold text-gray-900 sm:truncate">
        {{ $store.getters['messaging/recipient'].profile.first_name }} {{ $store.getters['messaging/recipient'].profile.last_name }}
      </div>
      <div v-if="$store.getters['messaging/isRecipientAdmin']" class="text-jva-red-500 font-bold text-sm truncate">
        🧑‍💻<span class="ml-2">Modérateur</span>
      </div>
      <div v-else-if="$store.getters['messaging/isRecipientReferent']" class="text-jva-red-500 font-bold text-sm truncate">
        🧑‍💻<span class="ml-2">Référent {{ $store.getters['messaging/recipient'].roles.filter(role => role.key == 'referent')[0].label | label('departments') }}</span>
      </div>
    </div>
    <template v-if="($store.getters['messaging/isRecipientAdmin'] || $store.getters['messaging/isRecipientReferent']) && $store.getters.contextRole == 'responsable'">
      <div class=" text-gray-600 mt-2">
        <template v-if="$store.getters['messaging/isRecipientReferent']">
          {{ descriptionReferent }}
        </template>
        <template v-if="$store.getters['messaging/isRecipientAdmin']">
          {{ descriptionAdmin }}
        </template>
        <span class="font-bold text-black">
          il est essentiel de lui répondre.
        </span>
      </div>
      <div class="border-t -mx-6 my-6" />
    </template>
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
      loading: false,
      descriptionReferent: 'Le référent départemental assure le bon fonctionnement de la plateforme JeVeuxAider.gouv.fr au niveau local. Il est notamment en charge de modérer les organisations et missions mises en ligne. Le référent peut ainsi vous solliciter afin d’obtenir des informations complémentaires sur l’activité de votre structure :',
      descriptionAdmin: 'Le modérateur assure le bon fonctionnement de la plateforme JeVeuxAider.gouv.fr. Il est notamment en charge de modérer les organisations et missions mises en ligne. Le modérateur peut ainsi vous solliciter afin d’obtenir des informations complémentaires sur l’activité de votre structure :'
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
  },
  methods: {
    async handleChangeState (option) {
      this.organisation.state = option.key
      await this.$axios.put(`/structures/${this.organisation.id}`, this.organisation).catch(() => {})
      this.$fetch()
      this.$emit('updated')
    }
  }
}
</script>
