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
        case 'messages_unread':
          return {
            icon: '💬',
            iconVariant: 'warning',
            title: `<b>${this.$options.filters.formatNumber(action.value)} message(s)</b> non lu(s)`,
            subtitle: 'Vous avez de nouveaux messages en attente',
            link: '/messagerie'
          }
        case 'profile_incomplete':
          return {
            icon: '✍',
            iconVariant: 'warning',
            title: 'Votre profil est <b>incomplet</b>',
            subtitle: 'Champs manquants: <span class="lowercase">' + action.value.map(option => this.$options.filters.label(option, 'profile_fields')).join(', ') + '</span>',
            link: '/profile/edit'
          }
        case 'search_missions':
          return {
            icon: '🔍',
            iconVariant: 'info',
            title: 'Trouver votre prochaine mission à réaliser',
            subtitle: 'Vous avez du temps libre et souhaitez aider les organisations ?',
            link: '/missions-benevolat'
          }
        case 'organisations_waiting_validation':
          return {
            icon: '✊',
            iconVariant: 'warning',
            title: `<b>${this.$options.filters.formatNumber(action.value)} ${this.$options.filters.pluralize(action.value, 'organisation', 'organisations', false)}</b> en attente de validation`,
            subtitle: 'Des organisations souhaitent publier des missions',
            link: '/admin/organisations?filter[state]=En attente de validation'
          }
        case 'organisation_incomplete':
          return {
            icon: '✍',
            iconVariant: 'warning',
            title: 'Votre organisation est <b>incomplète</b>',
            subtitle: 'Champs manquants: <span class="lowercase">' + action.value.map(option => this.$options.filters.label(option, 'structure_fields')).join(', ') + '</span>',
            link: `/admin/organisations/${this.$store.getters.currentRole.contextable_id}/edit`
          }
        case 'missions_waiting_validation':
          console.log('action', action)
          return {
            icon: '✊',
            iconVariant: 'warning',
            title: `<b>${this.$options.filters.formatNumber(action.value)} ${this.$options.filters.pluralize(action.value, 'mission', 'missions', false)}</b> en attente de validation`,
            subtitle: 'Des missions souhaitent être publiées sur la plateforme',
            link: '/admin/missions?filter[state]=En attente de validation'
          }
        case 'missions_outdated':
          return {
            icon: '⏰️',
            iconVariant: 'danger',
            title: `<b>${this.$options.filters.formatNumber(action.value)} ${this.$options.filters.pluralize(action.value, 'mission', 'missions', false)}</b> dont la date de fin est passée`,
            subtitle: 'Pensez à mettre à jour les missions',
            link: '/admin/missions'
          }
        case 'mission_new':
          return {
            icon: '✊',
            iconVariant: 'warning',
            title: 'Créez votre première mission sur la plateforme',
            subtitle: 'Aidez-vous de nos modèles de missions',
            link: `/admin/organisations/${this.$store.getters.currentRole.contextable_id}/missions/add`
          }
        case 'participations_waiting_validation':
          return {
            icon: '✊',
            iconVariant: 'warning',
            title: `<b>${this.$options.filters.formatNumber(action.value)} ${this.$options.filters.pluralize(action.value, 'participation', 'participations', false)}</b> en attente de validation`,
            subtitle: 'Pensez à mettre à jour les missions',
            link: '/admin/participations'
          }
        case 'participations_in_progress':
          return {
            icon: '✊',
            iconVariant: 'warning',
            title: `<b>${this.$options.filters.formatNumber(action.value)} ${this.$options.filters.pluralize(action.value, 'participation', 'participations', false)}</b> en cours de traitement`,
            subtitle: 'Pensez à traiter ces candidatures',
            link: '/admin/participations'
          }
      }
    }
  }
}
