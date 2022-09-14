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
      <div
        v-if="$store.getters.contextRole == 'admin' && profile.tags"
        class="mt-2 mb-4 flex flex-wrap gap-1"
      >
        <Badge v-for="tag in profile.tags" :key="tag.id" size="xxs" color="gray-light">
          {{ tag.name }}
        </Badge>
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
        <Button v-if="['admin'].includes($store.getters.contextRole)" variant="white" size="sm" icon="IdentificationIcon" @click.native="handleImpersonate()">
          Prendre sa place
        </Button>
      </div>
      <div class="border-t -mx-6 my-6" />
      <BoxDisponibilities class="mb-8" :profile="profile" :link-action="`/admin/utilisateurs/${profile.id}`" link-label="Consulter" />
      <BoxInformations class="mb-8" :profile="profile" :link-action="`/admin/utilisateurs/${profile.id}`" link-label="Consulter" />
      <BoxOrganisations v-if="profile.structures" :structures="profile.structures" class="mb-8" />
      <BoxTerritoires v-if="profile.territoires" :territoires="profile.territoires" class="mb-8" />
      <BoxReseau v-if="profile.reseau" :reseau="profile.reseau" class="mb-8" />
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
import BoxReseau from '@/components/section/profile/BoxReseau'
import BoxTerritoires from '@/components/section/profile/BoxTerritoires'
import BoxOrganisations from '@/components/section/profile/BoxOrganisations'

export default {
  components: {
    BoxInformations,
    BoxDisponibilities,
    BoxReseau,
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
  },
  watch: {
    profileId: '$fetch'
  },
  methods: {
    async handleImpersonate () {
      await this.$store.dispatch('auth/impersonate', this.profile.user.id)
    }
  }
}
</script>
