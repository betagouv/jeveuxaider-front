export default {
  data () {
    return {
      actions: []
    }
  },
  computed: {
    formattedActions () {
      return this.actions.filter(item => item.value).map((item) => {
        return {
          ...item,
          ...this.formatAction(item)
        }
      })
    }
  },
  methods: {
    formatAction (action) {
      switch (action.type) {
        case 'organisations_waiting_validation':
          return {
            icon: '✊',
            iconVariant: 'warning',
            title: `<b>${this.$options.filters.formatNumber(action.value)} organisation(s)</b> en attente de validation`,
            subtitle: 'Des organisations souhaitent publier des missions',
            link: '/dashboard/organisations?filter[state]=En attente de validation'
          }
        case 'organisations_incomplete':
          return {
            icon: '✍',
            iconVariant: 'warning',
            title: `<b>${this.$options.filters.formatNumber(action.value)} organisation(s)</b> sont incomplètes`,
            subtitle: 'Des fiches duêment complétées augmentent la qualité de la plateforme',
            link: '/dashboard/organisations'
          }
        case 'missions_waiting_validation':
          return {
            icon: '✊',
            iconVariant: 'warning',
            title: `<b>${this.$options.filters.formatNumber(action.value)} missions(s)</b> en attente de validation`,
            subtitle: 'Des missions souhaitent être publiées sur la plateforme',
            link: '/dashboard/missions?filter[state]=En attente de validation'
          }
        case 'missions_outdated':
          return {
            icon: '⏰️',
            iconVariant: 'danger',
            title: `<b>${this.$options.filters.formatNumber(action.value)} missions(s)</b> dont la date de fin est passée`,
            subtitle: 'Pensez à mettre à jour les missions',
            link: '/dashboard/missions'
          }
        case 'participations_waiting_validation':
          return {
            icon: '✊',
            iconVariant: 'warning',
            title: `<b>${this.$options.filters.formatNumber(action.value)} participations(s)</b> en attente de validation`,
            subtitle: 'Pensez à mettre à jour les missions',
            link: '/dashboard/participations'
          }
        case 'participations_in_progress':
          return {
            icon: '✊',
            iconVariant: 'warning',
            title: `<b>${this.$options.filters.formatNumber(action.value)} participations(s)</b> en cours de traitement`,
            subtitle: 'Pensez à traiter ces candidatures',
            link: '/dashboard/participations'
          }
      }
    }
  }
}
