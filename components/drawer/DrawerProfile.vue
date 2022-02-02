<template>
  <Drawer :is-open="Boolean(profileId)" @close="$emit('close')">
    <template #title>
      <Heading v-if="profile" :level="3" class="text-jva-blue-500">
        <nuxt-link :to="`/admin/utilisateurs/${profileId}`" class="hover:underline">
          {{ profile.full_name }}
        </nuxt-link>
      </Heading>
    </template>
    <template v-if="profile">
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
      <BoxOrganisations v-if="profile.structures" :structures="profile.structures" class="mb-8" />
      <BoxTerritoires v-if="profile.territoires" :territoires="profile.territoires" class="mb-8" />
      <BoxReseaux v-if="profile.tete_de_reseau" :reseau="profile.tete_de_reseau" class="mb-8" />
      <div class="flex justify-center mt-10 mb-10">
        <Link :to="`/admin/utilisateurs/${profile.id}`" class="uppercase font-semibold text-sm hover:underline">
          Détails de l'utilisateur
        </Link>
      </div>
    </template>
  </Drawer>
</template>

<script>
import BoxInformations from '@/components/section/profile/BoxInformations'
import BoxDisponibilities from '@/components/section/profile/BoxDisponibilities'
import BoxReseaux from '@/components/section/profile/BoxReseaux'
import BoxTerritoires from '@/components/section/profile/BoxTerritoires'
import BoxOrganisations from '@/components/section/profile/BoxOrganisations'

export default {
  components: {
    BoxInformations,
    BoxDisponibilities,
    BoxReseaux,
    BoxTerritoires,
    BoxOrganisations
  },
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
    const { data: profile } = await this.$axios.get(`/profiles/${this.profileId}`)
    this.profile = profile
    this.$emit('loaded', profile)
  },
  watch: {
    profileId: '$fetch'
  }
}
</script>
