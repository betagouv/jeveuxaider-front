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
            subtitle: 'Des personnes attendent votre réponse !',
            link: '/messages'
          }
        case 'profile_incomplete':
          return {
            icon: '✍',
            iconVariant: 'warning',
            title: 'Votre profil est <b>incomplet</b>',
            subtitle: 'Mettez à jour vos informations afin de permettre aux organisations de vous proposer directement des missions.',
            link: '/profile/edit'
          }
        case 'search_missions':
          return {
            icon: '🔍',
            iconVariant: 'info',
            title: 'Trouvez votre prochaine mission',
            subtitle: 'Vous avez du temps libre et souhaitez contribuer à la solidarité ?',
            link: '/missions-benevolat'
          }
        case 'organisations_waiting_validation':
          return {
            icon: '✊',
            iconVariant: 'warning',
            title: `<b>${this.$options.filters.formatNumber(action.value)} ${this.$options.filters.pluralize(action.value, 'organisation', 'organisations', false)}</b> en attente de validation`,
            subtitle: 'Elles n\'attendent que vous pour pouvoir publier leurs missions !',
            link: '/admin/organisations?filter[state]=En attente de validation'
          }
        case 'mission_template_waiting_validation':
          return {
            icon: '✊',
            iconVariant: 'warning',
            title: `<b>${this.$options.filters.formatNumber(action.value)} ${this.$options.filters.pluralize(action.value, 'modèle de mission', 'modèles de mission', false)}</b> en attente de validation`,
            subtitle: 'Des responsables de réseau souhaitent mettre en ligne des modèles de mission.',
            link: '/admin/contenus/modeles-mission?filter[state]=waiting'
          }
        case 'territoires_waiting_validation':
          return {
            icon: '✊',
            iconVariant: 'warning',
            title: `<b>${this.$options.filters.formatNumber(action.value)} ${this.$options.filters.pluralize(action.value, 'territoire', 'territoires', false)}</b> en attente de validation`,
            subtitle: 'Des collectivités territoriales souhaitent créer leur page',
            link: '/admin/contenus/territoires?filter[state]=waiting'
          }
        case 'organisation_incomplete':
          return {
            icon: '✍',
            iconVariant: 'warning',
            title: 'Votre organisation est <b>incomplète</b>',
            subtitle: 'Complétez les informations manquantes pour gagner en visibilité !',
            link: `/admin/organisations/${this.$store.getters.currentRole.contextable_id}/edit`
          }
        case 'missions_waiting_validation':
          return {
            icon: '✊',
            iconVariant: 'warning',
            title: `<b>${this.$options.filters.formatNumber(action.value)} ${this.$options.filters.pluralize(action.value, 'mission', 'missions', false)}</b> en attente de validation`,
            subtitle: 'Modérez les missions proposées afin qu\'elles soient publiées.',
            link: '/admin/missions?filter[state]=En attente de validation'
          }
        case 'missions_outdated':
          return {
            icon: '⏰️',
            iconVariant: 'danger',
            title: `<b>${this.$options.filters.formatNumber(action.value)} ${this.$options.filters.pluralize(action.value, 'mission', 'missions', false)}</b> dont la date de fin est passée`,
            subtitle: 'N\'oubliez pas de mettre à jour les dates de vos missions.',
            link: '/admin/missions'
          }
        case 'mission_new':
          return {
            icon: '✊',
            iconVariant: 'warning',
            title: 'Publiez votre première mission sur JeVeuxAider.gouv.fr',
            subtitle: 'Notre équipe se tient à votre disposition pour vous accompagner dans vos premiers pas !',
            link: `/admin/organisations/${this.$store.getters.currentRole.contextable_id}/missions/add`
          }
        case 'participations_waiting_validation':
          return {
            icon: '✊',
            iconVariant: 'warning',
            title: `<b>${this.$options.filters.formatNumber(action.value)} ${this.$options.filters.pluralize(action.value, 'participation', 'participations', false)}</b> en attente de validation`,
            subtitle: 'Des bénévoles attendent votre réponse pour s\'engager.',
            link: '/admin/participations'
          }
        case 'participations_in_progress':
          return {
            icon: '✊',
            iconVariant: 'warning',
            title: `<b>${this.$options.filters.formatNumber(action.value)} ${this.$options.filters.pluralize(action.value, 'participation', 'participations', false)}</b> en cours de traitement`,
            subtitle: 'Des bénévoles attendent votre réponse pour s\'engager.',
            link: '/admin/participations'
          }
        case 'snu_waiting_validation':
          return {
            icon: 'snu',
            iconVariant: 'snu',
            title: `<b>${this.$options.filters.formatNumber(action.value)} ${this.$options.filters.pluralize(action.value, 'candidature', 'candidatures', false)} SNU</b> en attente de validation`,
            subtitle: 'Des jeunes volontaires en SNU souhaitent vous aider',
            href: action.href
          }
        case 'snu_contract_to_be_filled':
          return {
            icon: 'snu',
            iconVariant: 'snu',
            title: `<b>${this.$options.filters.formatNumber(action.value)} ${this.$options.filters.pluralize(action.value, "contrat d'engagement", "contrats d'engagement", false)} SNU</b> à éditer`,
            subtitle: 'Complétez les contrats d\'engagement pour accueillir des jeunes en SNU sur vos missions.',
            href: action.href
          }
        case 'snu_contract_to_be_signed':
          return {
            icon: 'snu',
            iconVariant: 'snu',
            title: `<b>${this.$options.filters.formatNumber(action.value)} ${this.$options.filters.pluralize(action.value, "contrat d'engagement", "contrats d'engagement", false)} SNU</b> à signer`,
            subtitle: 'N\'oubliez pas de signer les contrats d\'engagement pour accueillir des jeunes en SNU sur vos missions.',
            href: action.href
          }
      }
    }
  }
}
