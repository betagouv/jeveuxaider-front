<template>
  <div v-if="profile">
    <div class="mt-1 text-gray-800">
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
// import BoxInformations from '@/components/section/mission/BoxInformations'
// import MixinMission from '@/mixins/mission'

export default {
  // components: {
  //   SelectMissionState,
  //   BoxPlace,
  //   BoxResponsable,
  //   BoxInformations
  // },
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
    const { data } = await this.$axios.get(`/profile/${this.profileId}`)
    this.profile = data
    this.$emit('loaded', data)
  },
  watch: {
    profileId: '$fetch'
  }
}
</script>
