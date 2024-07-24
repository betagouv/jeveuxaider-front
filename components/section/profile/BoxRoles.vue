<template>
  <div v-if="roles.length">
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">Rôles</div>
    </div>
    <BaseBox v-for="(role, key) in roles" :key="key" variant="flat" padding="xs" class="m-[-1px]">
      <BaseDescriptionList>
        <BaseDescriptionListItem term="Rôle" :description="$filters.label(role.name, 'roles')" />
        <BaseDescriptionListItem
          v-if="role.name !== 'admin'"
          :term="getTerm(role)"
          :description="role.pivot_model.name"
        />
        <BaseDescriptionListItem v-if="role.name !== 'admin'" term="Invité par">
          <template v-if="role.invited_by">
            <BaseLink
              v-if="['admin'].includes($stores.auth.contextRole)"
              class="inline-flex"
              :to="`/admin/utilisateurs/${role.invited_by.profile.id}`"
            >
              {{ role.invited_by.profile.full_name }}
            </BaseLink>
            <span v-else>{{ role.invited_by.profile.full_name }}</span>
          </template>
          <span v-else> - </span>
        </BaseDescriptionListItem>
      </BaseDescriptionList>
    </BaseBox>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      roles: [],
    }
  },

  watch: {
    userId: 'fetch',
  },

  methods: {
    async fetch() {
      const roles = await apiFetch(`/users/${this.userId}/roles`)
      this.roles = roles
    },
    getTerm(role) {
      switch (role.name) {
        case 'responsable':
          return 'Organisation'
        case 'referent':
          return 'Département'
        case 'referent_regional':
          return 'Région'
        case 'tete_de_reseau':
          return 'Réseau'
        case 'responsable_territoire':
          return 'Territoire'
      }
    },
  },
})
</script>
