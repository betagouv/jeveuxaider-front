export default {
  computed: {
    canEditStatut() {
      const rolesWhoCanEdit = this.$filters.label(
        this.territoire.state,
        'territoire_workflow_states',
        'roles'
      )
      return !!rolesWhoCanEdit.includes(this.$stores.auth.contextRole)
    },
    canManageTerritoire() {
      return this.$stores.auth.contextRole === 'admin' || this.territoire.state === 'validated'
    },
    badgeTypeTerritoireSate() {
      switch (this.territoire.state) {
        case 'validated':
          return 'success'
        case 'refused':
          return 'error'
        case 'waiting':
        default:
          return 'info'
      }
    },
    hasPageOnline() {
      return this.territoire.is_published && this.territoire.state === 'validated'
    },
  },
  methods: {},
}
