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
        class="mt-2 mb-4 flex flex-wrap gap-2"
      >
        <Tag v-for="tag in profile.tags" :key="tag.id">
          {{ tag.name }}
        </Tag>
      </div>
      <div class="mt-2 flex flex-wrap gap-1">
        <Button
          type="tertiary"
          icon="RiEyeLine"
          size="sm"
          @click="$router.push(`/admin/utilisateurs/${profile.id}`)"
        >
          Détails
        </Button>

        <Button
          type="tertiary"
          icon="RiPencilLine"
          size="sm"
          @click="$router.push(`/admin/utilisateurs/${profile.id}/edit`)"
        >
          Modifier
        </Button>

        <Button
          v-if="['admin'].includes($store.getters.contextRole)"
          type="tertiary"
          size="sm"
          icon="RiProfileLine"
          @click.native="handleImpersonate()"
        >
          Prendre sa place
        </Button>
      </div>
      <div class="border-t -mx-6 my-6" />
      <BoxDisponibilities class="mb-8" :profile="profile" :link-action="`/admin/utilisateurs/${profile.id}`" link-label="Consulter" />
      <BoxInformations class="mb-8" :profile="profile" :link-action="`/admin/utilisateurs/${profile.id}`" link-label="Consulter" />
      <BoxUtm v-if="$store.getters.contextRole === 'admin'" class="mb-8" :model="profile.user" />
      <BoxOrganisations v-if="profile.user.structures" :structures="profile.user.structures" class="mb-8" />
      <BoxTerritoires v-if="profile.user.territoires" :territoires="profile.user.territoires" class="mb-8" />
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
import BoxUtm from '@/components/section/BoxUtm'
import Tag from '@/components/dsfr/Tag'
import Button from '@/components/dsfr/Button'

export default {
  components: {
    BoxInformations,
    BoxDisponibilities,
    BoxReseau,
    BoxTerritoires,
    BoxOrganisations,
    BoxUtm,
    Tag,
    Button
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
