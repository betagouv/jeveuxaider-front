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
        <nuxt-link :to="`/admin/utilisateurs/${profile.id}`">
          <Button
            type="tertiary"
            icon="RiEyeLine"
            size="sm"
            tabindex="-1"
            icon-class="!mr-1"
          >
            Détails
          </Button>
        </nuxt-link>

        <nuxt-link :to="`/admin/utilisateurs/${profile.id}/edit`">
          <Button
            type="tertiary"
            icon="RiPencilLine"
            size="sm"
            tabindex="-1"
            icon-class="!mr-1"
          >
            Modifier
          </Button>
        </nuxt-link>

        <Button
          v-if="['admin'].includes($store.getters.contextRole)"
          type="tertiary"
          size="sm"
          icon="RiProfileLine"
          icon-class="!mr-1"
          @click.native="handleImpersonate()"
        >
          Prendre sa place
        </Button>
      </div>
      <div class="border-t -mx-6 my-6" />
      <BoxUserBan
        v-if="['admin'].includes($store.getters.contextRole) && profile.user.context_role === 'volontaire'"
        ref="boxUserBan"
        :user="profile.user"
        class="mb-8"
        @update="$fetch"
      >
        <template #action="{ loading }">
          <Link
            v-if="!profile.user.is_banned"
            :disabled="loading"
            class="text-jva-blue-500 ml-auto"
            @click.native="$refs.boxUserBan.showModal = true"
          >
            Bloquer l'utilisateur
          </Link>
        </template>
      </BoxUserBan>
      <BoxRoles v-if="['admin', 'referent', 'referent_regional'].includes($store.getters.contextRole) && profile" :user-id="profile.user_id" class="mb-8" />
      <BoxActions v-if="$store.getters.contextRole === 'admin'" class="mb-8" :profile="profile" />
      <BoxDisponibilities class="mb-8" :profile="profile" :link-action="`/admin/utilisateurs/${profile.id}`" link-label="Consulter" />
      <BoxInformations class="mb-8" :profile="profile" :link-action="`/admin/utilisateurs/${profile.id}`" link-label="Consulter" />
      <BoxUtm v-if="$store.getters.contextRole === 'admin'" class="mb-8" :model="profile.user" />
      <BoxOrganisations v-if="profile.user.structures" :structures="profile.user.structures" class="mb-8" />
      <BoxTerritoires v-if="profile.user.territoires" :territoires="profile.user.territoires" class="mb-8" />
      <BoxReseau v-if="profile.reseau" :reseau="profile.reseau" class="mb-8" />
      <div class="flex justify-center mt-10 mb-10">
        <Link :to="`/admin/utilisateurs/${profile.id}`" class="uppercase font-semibold text-sm text-jva-blue-500">
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
import BoxActions from '@/components/section/profile/BoxActions'
import BoxUtm from '@/components/section/BoxUtm'
import Tag from '@/components/dsfr/Tag'
import Link from '@/components/dsfr/Link'
import Button from '@/components/dsfr/Button.vue'
import BoxRoles from '@/components/section/profile/BoxRoles'
import BoxUserBan from '@/components/section/profile/BoxUserBan.vue'

export default {
  components: {
    BoxInformations,
    BoxDisponibilities,
    BoxReseau,
    BoxTerritoires,
    BoxOrganisations,
    BoxUtm,
    Tag,
    Button,
    BoxActions,
    BoxRoles,
    BoxUserBan,
    Link
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
