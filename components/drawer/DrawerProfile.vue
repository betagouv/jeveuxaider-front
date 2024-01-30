<template>
  <BaseDrawer :is-open="Boolean(profileId)" @close="$emit('close')">
    <template #title>
      <BaseHeading v-if="profile" :level="3" class="text-jva-blue-500">
        <nuxt-link no-prefetch :to="`/admin/utilisateurs/${profileId}`" class="hover:underline">
          {{ profile.full_name }}
        </nuxt-link>
      </BaseHeading>
    </template>
    <template v-if="profile">
      <div
        v-if="$stores.auth.contextRole == 'admin' && profile.tags"
        class="mt-2 mb-4 flex flex-wrap gap-2"
      >
        <DsfrTag v-for="tag in profile.tags" :key="tag.id">
          {{ tag.name }}
        </DsfrTag>
      </div>
      <div class="mt-2 flex flex-wrap gap-1">
        <nuxt-link no-prefetch :to="`/admin/utilisateurs/${profile.id}`">
          <DsfrButton type="tertiary" icon="RiEyeLine" size="sm" tabindex="-1" icon-class="!mr-1">
            Détails
          </DsfrButton>
        </nuxt-link>

        <nuxt-link no-prefetch :to="`/admin/utilisateurs/${profile.id}/edit`">
          <DsfrButton
            type="tertiary"
            icon="RiPencilLine"
            size="sm"
            tabindex="-1"
            icon-class="!mr-1"
          >
            Modifier
          </DsfrButton>
        </nuxt-link>

        <Actions :profile="profile" @updated="fetch()" buttonSize="sm" />
      </div>
      <div class="border-t -mx-6 my-6" />
      <BoxUserBan
        v-if="
          ['admin'].includes($stores.auth.contextRole) && profile.user.context_role === 'volontaire'
        "
        ref="boxUserBan"
        :user="profile.user"
        class="mb-8"
      />

      <BoxRoles
        v-if="
          ['admin', 'referent', 'referent_regional'].includes($stores.auth.contextRole) && profile
        "
        :user-id="profile.user_id"
        class="mb-8"
      />
      <BoxActions v-if="$stores.auth.contextRole === 'admin'" class="mb-8" :profile="profile" />
      <BoxDisponibilities
        class="mb-8"
        :profile="profile"
        :link-action="`/admin/utilisateurs/${profile.id}`"
        link-label="Consulter"
      />
      <BoxInformations
        class="mb-8"
        :profile="profile"
        :link-action="`/admin/utilisateurs/${profile.id}`"
        link-label="Consulter"
      />
      <BoxUtm v-if="$stores.auth.contextRole === 'admin'" class="mb-8" :model="profile.user" />
      <BoxOrganisations
        v-if="profile.user.structures"
        :structures="profile.user.structures"
        class="mb-8"
      />
      <BoxTerritoires
        v-if="profile.user.territoires"
        :territoires="profile.user.territoires"
        class="mb-8"
      />
      <BoxReseau v-if="profile.reseau" :reseau="profile.reseau" class="mb-8" />
      <div class="flex justify-center mt-10 mb-10">
        <DsfrLink
          :to="`/admin/utilisateurs/${profile.id}`"
          class="uppercase font-semibold text-sm text-jva-blue-500"
        >
          Détails de l'utilisateur
        </DsfrLink>
      </div>
    </template>
  </BaseDrawer>
</template>

<script>
import BoxInformations from '@/components/section/profile/BoxInformations.vue'
import BoxDisponibilities from '@/components/section/profile/BoxDisponibilities.vue'
import BoxReseau from '@/components/section/profile/BoxReseau.vue'
import BoxTerritoires from '@/components/section/profile/BoxTerritoires.vue'
import BoxOrganisations from '@/components/section/profile/BoxOrganisations.vue'
import BoxActions from '@/components/section/profile/BoxActions.vue'
import BoxUtm from '@/components/section/BoxUtm.vue'
import BoxRoles from '@/components/section/profile/BoxRoles.vue'
import BoxUserBan from '@/components/section/profile/BoxUserBan.vue'
import Actions from '@/components/section/profile/Actions.vue'

export default defineNuxtComponent({
  components: {
    BoxInformations,
    BoxDisponibilities,
    BoxReseau,
    BoxTerritoires,
    BoxOrganisations,
    BoxUtm,
    BoxActions,
    BoxRoles,
    BoxUserBan,
    Actions,
  },
  props: {
    profileId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      profile: null,
    }
  },
  watch: {
    profileId: 'fetch',
  },
  methods: {
    async fetch() {
      if (!this.profileId) {
        return null
      }
      const profile = await apiFetch(`/profiles/${this.profileId}`)
      this.profile = profile
    },
  },
})
</script>
