<template>
  <div v-if="roles.length">
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">
        Rôles
      </div>
    </div>
    <Box v-for="(role, key) in roles" :key="key" variant="flat" padding="xs" class="m-[-1px]">
      <DescriptionList>
        <DescriptionListItem term="Rôle" :description="$options.filters.label(role.name, 'roles')" />
        <DescriptionListItem
          v-if="role.name !== 'admin'"
          :term="getTerm(role)"
          :description="role.pivot_model.name"
        />
        <DescriptionListItem v-if="role.name !== 'admin'" term="Invité par">
          <template v-if="role.invited_by">
            <Link v-if="['admin'].includes($store.getters.contextRole)" class="inline-flex" :to="`/admin/utilisateurs/${role.invited_by.profile.id}`">
              {{ role.invited_by.profile.full_name }}
            </Link>
            <span v-else>{{ role.invited_by.profile.full_name }}</span>
          </template>
          <span v-else> - </span>
        </DescriptionListItem>
      </DescriptionList>
    </Box>
  </div>
</template>

<script>
export default {
  props: {
    userId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      roles: []
    }
  },
  async fetch () {
    const { data: roles } = await this.$axios.get(`/users/${this.userId}/roles`)
    this.roles = roles
  },
  watch: {
    userId: '$fetch'
  },
  methods: {
    getTerm (role) {
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
    }
  }
}
</script>
