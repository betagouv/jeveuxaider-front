export default {
  data () {
    return {
      actions: [],
      snuActions: []
    }
  },
  computed: {
    formattedActions () {
      const mergedActions = [...this.actions, ...this.snuActions]
      return mergedActions.filter(item => item.value).map((item) => {
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
            link: '/messages'
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
        case 'mission_template_waiting_validation':
          return {
            icon: '✊',
            iconVariant: 'warning',
            title: `<b>${this.$options.filters.formatNumber(action.value)} ${this.$options.filters.pluralize(action.value, 'modèle de mission', 'modèles de mission', false)}</b> en attente de validation`,
            subtitle: 'Des responsables de réseau souhaitent publier des modèles de mission',
            link: '/admin/contenus/modeles-mission?filter[state]=waiting'
          }
        case 'territoires_waiting_validation':
          return {
            icon: '✊',
            iconVariant: 'warning',
            title: `<b>${this.$options.filters.formatNumber(action.value)} ${this.$options.filters.pluralize(action.value, 'territoire', 'territoires', false)}</b> en attente de validation`,
            subtitle: 'Des territoires souhaient créer leur page',
            link: '/admin/contenus/territoires?filter[state]=waiting'
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
        case 'snu_waiting_validation':
          return {
            icon: 'snu',
            iconVariant: 'snu',
            title: `<b>${this.$options.filters.formatNumber(action.value)} ${this.$options.filters.pluralize(action.value, 'candidature', 'candidatures', false)} SNU</b> en attente de validation`,
            subtitle: 'Des jeunes volontaires souhaitent vous aider',
            href: action.href
          }
        case 'snu_contract_to_be_filled':
          return {
            icon: 'snu',
            iconVariant: 'snu',
            title: `<b>${this.$options.filters.formatNumber(action.value)} ${this.$options.filters.pluralize(action.value, "contrat d'engagement", "contrats d'engagement", false)} SNU</b> à éditer`,
            subtitle: 'Formalité à remplir pour valider les candidatures de vos volontaires',
            href: action.href
          }
        case 'snu_contract_to_be_signed':
          return {
            icon: 'snu',
            iconVariant: 'snu',
            title: `<b>${this.$options.filters.formatNumber(action.value)} ${this.$options.filters.pluralize(action.value, "contrat d'engagement", "contrats d'engagement", false)} SNU</b> à signer`,
            subtitle: 'Formalité à signer pour valider les candidatures de vos volontaires',
            href: action.href
          }
      }
    }
  }
}
