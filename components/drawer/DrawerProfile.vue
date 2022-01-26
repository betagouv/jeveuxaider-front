<template>
  <div v-if="profile">
    <div class="mt-1 text-gray-500">
      {{ profile.type | label('profile_type') }}
    </div>
    <div class="mt-2 space-x-2">
      <nuxt-link :to="`/admin/utilisateurs/${profile.id}`">
        <Button variant="white" size="sm" icon="EyeIcon">
          Détails
        </Button>
      </nuxt-link>
      <nuxt-link :to="`/admin/utilisateurs/${profile.id}/edit`">
        <Button variant="white" size="sm" icon="PencilIcon">
          Modifier
        </Button>
      </nuxt-link>
    </div>
    <div class="border-t -mx-6 my-6" />
    <BoxDisponibilities class="mb-8" :profile="profile" />
    <BoxInformations class="mb-8" :profile="profile" />
    <div v-for="organisation in profile.structures" :key="organisation.id" class="mb-8">
      <div class="text-sm flex justify-between px-2 mb-2 items-center">
        <div class="uppercase font-semibold text-gray-600">
          Organisation
        </div>
        <Link :to="`/admin/organisations/${organisation.id}`" icon="ChevronRightIcon">
          Consulter
        </Link>
      </div>
      <Box variant="flat" padding="xs">
        <DescriptionList>
          <DescriptionListItem term="Nom" :description="organisation.name" />
          <DescriptionListItem term="Statut" :description="organisation.state" />
          <DescriptionListItem term="Type" :description="organisation.statut_juridique | label('structure_legal_status')" />
        </DescriptionList>
      </Box>
    </div>
    <div v-for="territoire in profile.territoires" :key="territoire.id" class="mb-8">
      <div class="text-sm flex justify-between px-2 mb-2 items-center">
        <div class="uppercase font-semibold text-gray-600">
          Territoire
        </div>
        <Link to="/admin/organisations/" icon="ChevronRightIcon" class="opacity-25">
          Consulter
        </Link>
      </div>
      <Box variant="flat" padding="xs">
        <DescriptionList>
          <DescriptionListItem term="Nom" :description="territoire.name" />
          <DescriptionListItem term="Statut" :description="territoire.state | label('territoire_workflow_states')" />
          <DescriptionListItem term="Type" :description="territoire.type | label('territoire_types')" />
          <DescriptionListItem term="Département" :description="territoire.department | label('departments')" />
          <DescriptionListItem term="Zips" :description="territoire.zips.join(', ')" />
        </DescriptionList>
      </Box>
    </div>
    <div v-if="profile.tete_de_reseau" class="mb-8">
      <div class="text-sm flex justify-between px-2 mb-2 items-center">
        <div class="uppercase font-semibold text-gray-600">
          Réseau
        </div>
        <Link to="/admin/organisations/" icon="ChevronRightIcon" class="opacity-25">
          Consulter
        </Link>
      </div>
      <Box variant="flat" padding="xs">
        <DescriptionList>
          <DescriptionListItem term="Nom" :description="profile.tete_de_reseau.name" />
        </DescriptionList>
      </Box>
    </div>
    <div class="flex justify-center mt-10 mb-10">
      <Link :to="`/admin/utilisateurs/${profile.id}`" class="uppercase font-semibold text-sm hover:underline">
        Détails de l'utilisateur
      </Link>
    </div>
  </div>
</template>

<script>
// import SelectMissionState from '@/components/custom/SelectMissionState'
// import BoxPlace from '@/components/section/mission/BoxPlace'
// import BoxResponsable from '@/components/section/mission/BoxResponsable'
import BoxInformations from '@/components/section/profile/BoxInformations'
import BoxDisponibilities from '@/components/section/profile/BoxDisponibilities'
// import MixinMission from '@/mixins/mission'

export default {
  components: {
    // SelectMissionState,
    // BoxPlace,
    // BoxResponsable,
    BoxInformations,
    BoxDisponibilities
  },
  // mixins: [MixinMission],
  props: {
    profileId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      profile: null
    }
  },
  async fetch () {
    if (!this.profileId) {
      return null
    }
    const { data: profile } = await this.$axios.get(`/profile/${this.profileId}`)
    this.profile = profile
    this.$emit('loaded', profile)
  },
  watch: {
    profileId: '$fetch'
  }
}
</script>
