export default {
  data() {
    return {
      actions: [],
      snuActions: [],
    }
  },
  computed: {
    formattedActions() {
      const mergedActions = [...this.actions, ...this.snuActions]
      return mergedActions
        .filter((item) =>
          Array.isArray(item.value) ? item.value.length : item.value
        )
        .map((item) => {
          return {
            ...item,
            ...this.formatAction(item),
          }
        })
    },
  },
  methods: {
    formatAction(action) {
      switch (action.type) {
        case 'messages_unread':
          return {
            icon: '💬',
            iconVariant: 'warning',
            title: `<b>${this.$numeral(action.value)} message(s)</b> non lu(s)`,
            subtitle: 'Des personnes attendent votre réponse !',
            link: '/messages',
          }
        case 'profile_incomplete':
          return {
            icon: '✍',
            iconVariant: 'warning',
            title: `Votre profil est incomplet (${action.completion_rate}%)`,
            subtitle: `Complétez votre profil : ${action.value
              .map((item) => this.$filters.label(item, 'profile_fields'))
              .join(', ')}`,
            link: '/profile/edit',
          }
        case 'profile_without_activities':
          return {
            icon: '✊',
            iconVariant: 'warning',
            title: 'Vous n’avez pas défini de préférences d’activités',
            subtitle:
              'Utiles pour vous suggérer des missions en fonction de vos préférences',
            link: '/profile/preferences',
          }
        case 'search_missions':
          return {
            icon: '🔍',
            iconVariant: 'info',
            title: 'Trouvez votre prochaine mission',
            subtitle:
              'Vous avez du temps libre et souhaitez contribuer à la solidarité ?',
            link: '/missions-benevolat',
          }
        case 'organisations_waiting_validation':
          return {
            icon: '✊',
            iconVariant: 'warning',
            title: `<b>${this.$numeral(action.value)} ${this.$filters.pluralize(
              action.value,
              'organisation',
              'organisations',
              false
            )}</b> en attente de validation`,
            subtitle:
              "Elles n'attendent que vous pour pouvoir publier leurs missions !",
            link: '/admin/organisations?filter[state]=En attente de validation',
          }
        case 'organisations_in_progress':
          return {
            icon: '✍',
            iconVariant: 'warning',
            title: `<b>${this.$numeral(action.value)} ${this.$filters.pluralize(
              action.value,
              'organisation',
              'organisations',
              false
            )}</b> en cours de traitement`,
            subtitle:
              "Elles n'attendent que vous pour pouvoir publier leurs missions !",
            link: '/admin/organisations?filter[state]=En cours de traitement',
          }
        case 'organisation_signaled':
          return {
            icon: '⛔',
            iconVariant: 'danger',
            title:
              'Votre organisation <b>a été signalée</b> par le référent de votre département. <b>',
            subtitle:
              'L’activité de votre organisation n’entre pas dans le cadre défini par la Charte de la Réserve Civique : vous ne pouvez donc pas publier de mission sur JeVeuxAider.gouv.fr',
            href: action.href,
          }
        case 'mission_template_waiting_validation':
          return {
            icon: '🗂',
            iconVariant: 'warning',
            title: `<b>${this.$numeral(action.value)} ${this.$filters.pluralize(
              action.value,
              'modèle de mission',
              'modèles de mission',
              false
            )}</b> en attente de validation`,
            subtitle:
              'Des responsables de réseau souhaitent mettre en ligne des modèles de mission.',
            link: '/admin/contenus/modeles-mission?filter[state]=waiting',
          }
        case 'territoires_waiting_validation':
          return {
            icon: '✊',
            iconVariant: 'warning',
            title: `<b>${this.$numeral(action.value)} ${this.$filters.pluralize(
              action.value,
              'territoire',
              'territoires',
              false
            )}</b> en attente de validation`,
            subtitle:
              'Des collectivités territoriales souhaitent créer leur page',
            link: '/admin/contenus/territoires?filter[state]=waiting',
          }
        case 'organisation_incomplete':
          return {
            icon: '✍',
            iconVariant: 'warning',
            title: 'Votre organisation est <b>incomplète</b>',
            subtitle:
              'Complétez les informations manquantes pour gagner en visibilité !',
            link: `/admin/organisations/${this.$stores.auth.currentRole.contextable_id}/edit`,
          }
        case 'organisation_brouillon_incomplete':
          return {
            icon: '✍',
            iconVariant: 'warning',
            title: 'Votre organisation est <b>incomplète</b>',
            subtitle:
              'Complétez les informations manquantes pour que votre organisation soit modérée par notre équipe',
            link: `/admin/organisations/${this.$stores.auth.currentRole.contextable_id}/edit`,
          }
        case 'missions_waiting_validation':
          return {
            icon: '✊',
            iconVariant: 'warning',
            title: `<b>${this.$numeral(action.value)} ${this.$filters.pluralize(
              action.value,
              'mission',
              'missions',
              false
            )}</b> en attente de validation`,
            subtitle:
              "Modérez les missions proposées afin qu'elles soient publiées.",
            link: '/admin/missions?filter[state]=En attente de validation',
          }
        case 'missions_in_progress':
          return {
            icon: '✍️',
            iconVariant: 'warning',
            title: `<b>${this.$numeral(action.value)} ${this.$filters.pluralize(
              action.value,
              'mission',
              'missions',
              false
            )}</b> en cours de traitement`,
            subtitle:
              "Modérez les missions proposées afin qu'elles soient publiées.",
            link: '/admin/missions?filter[state]=En cours de traitement',
          }
        case 'missions_outdated':
          return {
            icon: '⏰️',
            iconVariant: 'danger',
            title: `<b>${this.$numeral(action.value)} ${this.$filters.pluralize(
              action.value,
              'mission',
              'missions',
              false
            )}</b> dont la date de fin est passée`,
            subtitle:
              "N'oubliez pas de mettre à jour les dates de vos missions.",
            link: '/admin/missions?filter[date]=over&filter[state]=Validée',
          }
        case 'mission_template_new':
          return {
            icon: '🗂',
            iconVariant: 'warning',
            title: 'Publiez votre premier modèle de mission',
            subtitle:
              'Notre équipe se tient à votre disposition pour vous accompagner dans vos premiers pas !',
            link: '/admin/contenus/modeles-mission/add',
          }
        case 'mission_template_manage':
          return {
            icon: '🗂',
            iconVariant: 'info',
            title: 'Gérez vos modèles de mission',
            subtitle:
              'Notre équipe se tient à votre disposition pour vous accompagner !',
            link: '/admin/contenus/modeles-mission',
          }
        case 'mission_new':
          return {
            icon: '✊',
            iconVariant: 'warning',
            title: 'Publiez votre première mission sur JeVeuxAider.gouv.fr',
            subtitle:
              'Notre équipe se tient à votre disposition pour vous accompagner dans vos premiers pas !',
            link: `/admin/organisations/${this.$stores.auth.currentRole.contextable_id}/missions/add`,
          }
        case 'participations_waiting_validation':
          return {
            icon: '✊',
            iconVariant: 'warning',
            title: `<b>${this.$numeral(action.value)} ${this.$filters.pluralize(
              action.value,
              'participation',
              'participations',
              false
            )}</b> en attente de validation`,
            subtitle: "Des bénévoles attendent votre réponse pour s'engager.",
            link:
              this.$stores.auth.contextRole === 'responsable'
                ? `/admin/participations?filter[state]=En attente de validation&filter[ofResponsable]=${this.$stores.auth.profile.id}`
                : '/admin/participations?filter[state]=En attente de validation',
          }
        case 'participations_need_to_be_treated':
          return {
            icon: '⚠️',
            iconVariant: 'warning',
            title: `<b>${this.$numeral(action.value)} ${this.$filters.pluralize(
              action.value,
              'participation',
              'participations',
              false
            )}</b> à traiter en priorité`,
            subtitle: 'Les bénévoles risquent de se désengager',
            link: `/admin/participations?filter[need_to_be_treated]=true&filter[ofResponsable]=${this.$stores.auth.profile.id}`,
          }
        case 'participations_in_progress':
          return {
            icon: '⌛',
            iconVariant: 'warning',
            title: `<b>${this.$numeral(action.value)} ${this.$filters.pluralize(
              action.value,
              'participation',
              'participations',
              false
            )}</b> en cours de traitement`,
            subtitle: "Des bénévoles attendent votre réponse pour s'engager.",
            link:
              this.$stores.auth.contextRole === 'responsable'
                ? `/admin/participations?filter[state]=En cours de traitement&filter[ofResponsable]=${this.$stores.auth.profile.id}`
                : '/admin/participations?filter[state]=En attente de validation',
          }
        case 'snu_waiting_validation':
          return {
            icon: 'snu',
            iconVariant: 'snu',
            title: `<b>${this.$numeral(action.value)} ${this.$filters.pluralize(
              action.value,
              'candidature',
              'candidatures',
              false
            )} SNU</b> en attente de validation`,
            subtitle: 'Des jeunes volontaires en SNU souhaitent vous aider',
            href: action.href,
          }
        case 'snu_application_waiting_validation':
          return {
            icon: 'snu',
            iconVariant: 'snu',
            title: `<b>${this.$numeral(action.value)} ${this.$filters.pluralize(
              action.value,
              'candidature',
              'candidatures',
              false
            )} SNU</b> en attente de validation`,
            subtitle: 'Des jeunes volontaires en SNU souhaitent vous aider',
            href: action.href,
          }
        case 'snu_mission_waiting_correction':
          return {
            icon: 'snu',
            iconVariant: 'snu',
            title: `<b>${this.$numeral(action.value)} ${this.$filters.pluralize(
              action.value,
              'mission',
              'missions',
              false
            )} SNU</b> en attente de correction`,
            subtitle:
              action.value > 1
                ? 'Corriger les informations des missions afin qu’elles soient publiées'
                : 'Corriger les informations de la mission afin qu’elle soit publiée',
            href: action.href,
          }
        case 'snu_contract_to_be_filled':
          return {
            icon: 'snu',
            iconVariant: 'snu',
            title: `<b>${this.$numeral(action.value)} ${this.$filters.pluralize(
              action.value,
              "contrat d'engagement",
              "contrats d'engagement",
              false
            )} SNU</b> à éditer`,
            subtitle:
              action.value > 1
                ? "Renseignez les contrats d'engagement pour accueillir un volontaire SNU."
                : 'Renseignez le contrat d’engagement pour accueillir un volontaire SNU',
            href: action.href,
          }
        case 'snu_contract_to_be_signed':
          return {
            icon: 'snu',
            iconVariant: 'snu',
            title: `<b>${this.$numeral(action.value)} ${this.$filters.pluralize(
              action.value,
              "contrat d'engagement",
              "contrats d'engagement",
              false
            )} SNU</b> à signer`,
            subtitle:
              action.value > 1
                ? 'Signer les contrats d’engagement pour accueillir des volontaires SNU.'
                : 'Signer le contrat d’engagement pour accueillir un volontaire SNU',
            href: action.href,
          }
        case 'snu_volunteer_to_host':
          return {
            icon: 'snu',
            iconVariant: 'snu',
            title: `<b>${this.$numeral(action.value)} ${this.$filters.pluralize(
              action.value,
              'volontaire',
              'volontaires',
              false
            )} SNU</b> à accueillir`,
            subtitle:
              action.value > 1
                ? 'Tout est prêt pour accueillir les volontaires SNU sur vos missions. Une fois la mission débutée, passez-les en statut “mission en cours”'
                : 'Tout est prêt pour accueillir le volontaire SNU sur sa mission. Une fois la mission débutée, passez-le en statut “mission en cours”',
            href: action.href,
          }
        case 'snu_mission_in_progress':
          return {
            icon: 'snu',
            iconVariant: 'snu',
            title: `<b>${this.$numeral(action.value)} ${this.$filters.pluralize(
              action.value,
              'volontaire',
              'volontaires',
              false
            )} SNU</b> en cours de mission`,
            subtitle:
              action.value > 1
                ? 'À la fin de sa mission, passer les volontaires SNU en statut “mission effectuée” et renseigner le nombre d’heure effectué !'
                : 'À la fin de sa mission, passer le volontaire SNU en statut “mission effectuée” et renseigner le nombre d’heure effectué !',
            href: action.href,
          }
        case 'has_not_agreed_benevole_terms':
          return {
            icon: '📋',
            iconVariant: 'warning',
            title: '<b>Acceptez la charte de bon fonctionnement</b>',
            subtitle:
              'Quelques règles utiles pour assurer une bonne utilisation de la plateforme',
            link: '/profile/charte-bon-fonctionnement',
          }
        case 'has_agreed_benevole_terms':
          return {
            icon: '📋',
            iconVariant: 'info',
            title: '<b>Retrouvez la charte de bon fonctionnement ici</b>',
            subtitle:
              'Quelques règles utiles pour assurer une bonne utilisation de la plateforme',
            link: '/profile/charte-bon-fonctionnement',
          }
      }
    },
  },
}
