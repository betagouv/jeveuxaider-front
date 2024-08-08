<template>
  <div class="flex flex-col gap-8">
    <DrawerNotification
      :notification-key="drawerNotificationKey"
      :notification-label="drawerNotification && drawerNotification.label"
      :notification-description="drawerNotification && drawerNotification.description"
      :notification-tags="drawerNotification && drawerNotification.brevoTags"
      class="drawer-notification"
      @close="drawerNotificationKey = null"
    />
    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <Breadcrumb
          :links="[
            { text: 'Administration', to: '/admin' },
            { text: 'Paramètres' },
            { text: 'Emails' },
          ]"
        />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading title="Emails transactionnels" />
    <SearchFilters class="mb-4" @reset-filters="deleteAllFilters">
      <DsfrInput
        type="search"
        size="lg"
        placeholder="Recherche par mots clés..."
        icon="RiSearchLine"
        :modelValue="$route.query['filter[search]']"
        @update:modelValue="changeFilter('filter[search]', $event)"
      />
      <template #prefilters>
        <BaseFilterSelectAdvanced
          name="workflow"
          placeholder="Tous les workflows"
          :options="workflows"
          :modelValue="$route.query['filter[workflow]']?.split(',')"
          clearable
          multiple
          options-class="min-w-[320px]"
          @update:modelValue="changeFilter('filter[workflow]', $event, true)"
        />
        <BaseFilterSelectAdvanced
          name="receiver"
          placeholder="Tous les destinataires"
          :options="receivers"
          :modelValue="$route.query['filter[receiver]']?.split(',')"
          clearable
          multiple
          @update:modelValue="changeFilter('filter[receiver]', $event, true)"
        />
      </template>
    </SearchFilters>
    <div
      v-for="notification in filteredNotifications"
      :key="notification.key"
      class="bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:shadow-xl transition duration-300"
      @click.native="onClick(notification)"
    >
      <div class="mb-4 flex flex-wrap gap-2">
        <DsfrBadge>{{ $filters.labelFromKey(receivers, notification.receiver) }}</DsfrBadge>
        <template v-if="notification.tags">
          <DsfrBadge v-for="(tag, i) in notification.tags" :key="i" type="gray">{{
            tag
          }}</DsfrBadge>
        </template>
      </div>
      <div class="text-lg font-bold">{{ notification.label }}</div>
      <div class="mt-2">{{ notification.description }}</div>
      <div class="mt-4 flex flex-wrap gap-2">
        <DsfrTag v-for="workflow in notification.workflows" type="gray">{{
          $filters.labelFromKey(workflows, workflow)
        }}</DsfrTag>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import DsfrBadge from '@/components/dsfr/Badge.vue'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import QueryBuilder from '@/mixins/query-builder'
import DrawerNotification from '@/components/drawer/DrawerNotification.vue'

export default defineNuxtComponent({
  components: {
    Breadcrumb,
    DsfrBadge,
    SearchFilters,
    DrawerNotification,
  },
  mixins: [QueryBuilder],
  setup() {
    definePageMeta({
      layout: 'admin-with-sidebar-menu',
      middleware: ['admin'],
    })
  },
  data() {
    return {
      loading: false,
      drawerNotificationKey: null,
      drawerNotification: null,
      notifications: notifications,
      workflows: workflows,
      receivers: receivers,
    }
  },
  computed: {
    filteredNotifications() {
      let notifications = this.notifications

      if (this.$route.query['filter[search]']) {
        notifications = notifications.filter(
          (n) =>
            n.label.toLowerCase().includes(this.$route.query['filter[search]'].toLowerCase()) ||
            n.description.toLowerCase().includes(this.$route.query['filter[search]'].toLowerCase())
        )
      }

      if (this.$route.query['filter[workflow]']) {
        notifications = notifications.filter((n) =>
          n.workflows.some((w) => this.$route.query['filter[workflow]'].split(',').includes(w))
        )
      }

      if (this.$route.query['filter[receiver]']) {
        notifications = notifications.filter((n) =>
          this.$route.query['filter[receiver]'].split(',').includes(n.receiver)
        )
      }

      return notifications.sort((a, b) => a.weight - b.weight)
    },
  },
  methods: {
    onClick(notification) {
      this.drawerNotificationKey = notification.key
      this.drawerNotification = notification
    },
  },
})

const receivers = [
  {
    key: 'benevole',
    label: 'Bénévoles',
  },
  {
    key: 'responsable',
    label: 'Responsables',
  },
  {
    key: 'referent',
    label: 'Référents',
  },
  {
    key: 'admin',
    label: 'Modérateurs',
  },
  {
    key: 'account',
    label: 'Utilisateurs',
  },
  {
    key: 'custom',
    label: 'Personnalisé',
  },
]

const workflows = [
  {
    key: 'inscription-benevole',
    label: 'Inscription bénévole à la plateforme',
  },
  {
    key: 'creation-participation',
    label: 'Candidature à une mission',
  },
  {
    key: 'creation-organisation',
    label: 'Création d’une organisation',
  },
  {
    key: 'creation-mission',
    label: 'Création d’une mission',
  },
  {
    key: 'actions-en-attente',
    label: 'Actions en attente',
  },
  {
    key: 'messagerie',
    label: 'Messagerie',
  },
  {
    key: 'compte-utilisateur',
    label: 'Compte utilisateur',
  },
  {
    key: 'moderation-compte-utilisateur',
    label: 'Modération des comptes utilisateurs',
  },
  {
    key: 'moderation-participation',
    label: 'Modération des participations',
  },
  {
    key: 'moderation-mission',
    label: 'Modération des missions',
  },
  {
    key: 'moderation-organisation',
    label: 'Modération des organisations',
  },
  {
    key: 'cej',
    label: 'CEJ',
  },
  {
    key: 'relances',
    label: 'Relances',
  },
  {
    key: 'france-travail',
    label: 'Bénéficiaire du RSA',
  },
  {
    key: 'desinscription-organisation',
    label: 'Désinscription d’une organisation',
  },
  {
    key: 'archivage',
    label: 'Archivage',
  },
  {
    key: 'autres',
    label: 'Autres',
  },
]

const notifications = [
  {
    receiver: 'benevole',
    key: 'benevole_register',
    label: 'Bienvenue sur JeVeuxAider.gouv.fr 💙',
    description:
      'Le bénévole vient de s’inscrire sur JVA et reçoit une première proposition de mission',
    brevoTags: ['app-benevole-inscription'],
    workflows: ['inscription-benevole'],
    weight: 1,
  },
  {
    receiver: 'benevole',
    key: 'benevole_mission_shared',
    label: '[PRENOM] [NOM] veut faire du bénévolat avec vous',
    description: 'Le bénévole partage à ses proches une mission',
    brevoTags: ['app-benevole-mission-shared'],
    workflows: ['creation-participation'],
    weight: 100,
  },
  {
    receiver: 'benevole',
    key: 'benevole_participation_created',
    label: '🔖 Votre demande de participation a bien été enregistrée !',
    description: 'Le bénévole candidate à une mission et reçoit une confirmation',
    brevoTags: ['app-benevole-participation-created'],
    workflows: ['creation-participation'],
    weight: 20,
  },
  {
    receiver: 'benevole',
    key: 'benevole_participation_being_processed',
    label: '⏳ Votre demande de participation est en cours de traitement',
    description:
      'Le référent a répondu au premier message du bénévole ou a besoin d’informations complémentaires et a donc passé la mission à “En cours de traitement”',
    brevoTags: ['app-benevole-participation-being-processed'],
    workflows: ['creation-participation'],
    weight: 22,
  },
  {
    receiver: 'benevole',
    key: 'benevole_participation_validated',
    label: '🥳 Bonne nouvelle ! Votre demande de participation est validée',
    description:
      'Le bénévole a reçu une réponse positive suite à sa candidature sur une mission de bénévolat',
    brevoTags: ['app-benevole-participation-validee'],
    workflows: ['creation-participation'],
    weight: 23,
  },
  {
    receiver: 'benevole',
    key: 'benevole_participation_temoignage',
    label: '[PRENOM], comment s’est passée votre mission ?',
    description:
      'Le responsable de mission a passé la mission au statut Terminé. Le bénévole est invité à partager son retour d’expérience.',
    brevoTags: ['app-benevole-mission-over-temoignage'],
    workflows: ['autres'],
    weight: 100,
  },
  {
    receiver: 'benevole',
    key: 'benevole_participation_refused',
    label: 'Quel dommage… votre participation vient d’être déclinée',
    description:
      'Le responsable a refusé la candidature proposée par le bénévole. Ce dernier a une précision sur les raisons de refus de sa proposition de participation.',
    brevoTags: ['app-benevole-participation-declined'],
    workflows: ['creation-participation'],
    weight: 24,
  },
  {
    receiver: 'benevole',
    key: 'benevole_participation_declined_mission_terminated',
    label: 'La mission à laquelle vous avez candidaté est terminée',
    description:
      'La mission a été terminée et les bénévoles avec des participations en attente de validation sont notifiés',
    brevoTags: ['app-benevole-participation-declined-mission-terminated'],
    workflows: ['creation-participation'],
    weight: 26,
  },
  {
    receiver: 'benevole',
    key: 'benevole_participation_canceled',
    label: '😔 Oh non… La mission de [ORGANISATION] a été annulée',
    description:
      'Le responsable annule la mission : elle n’a finalement pas lieu pour une raison X ou Y (il pleut, pas assez de bénévoles)',
    brevoTags: ['app-benevole-participation-canceled'],
    workflows: ['creation-participation'],
    weight: 25,
  },
  {
    receiver: 'benevole',
    key: 'benevole_message_participation',
    label: 'Nouveau message de la part de [PRENOM]',
    description: 'Le responsable de mission a envoyé un message au bénévole',
    brevoTags: ['app-benevole-nouveau-message'],
    workflows: ['messagerie'],
    weight: 50,
  },
  {
    receiver: 'benevole',
    key: 'benevole_marketplace_mission',
    label: '[NOM-ORGA] vous propose une mission de bénévolat',
    description: 'Notification envoyée via la marketplace inversée',
    workflows: ['autres'],
    weight: 100,
  },
  {
    receiver: 'benevole',
    key: 'register_user_volontaire_cej',
    label: '[PRENOM], avec le Contrat d’Engagement Jeune, réalisez des missions de bénévolat !',
    description: 'Notification envoyée au bénévole 3 jours après avoir indiqué être engagé CEJ',
    workflows: ['relances', 'cej'],
    weight: 100,
    tags: ['J+3'],
  },
  {
    receiver: 'benevole',
    key: 'user_no_participation_ft_j3',
    label: '[PRENOM], réalisez des missions de bénévolat !',
    description:
      'Notification envoyée au bénévole 3 jours après avoir indiqué être bénéficiaire du RSA',
    workflows: ['relances', 'france-travail'],
    weight: 100,
    tags: ['J+3'],
  },
  {
    receiver: 'benevole',
    key: 'user_no_participation_ft_j10',
    label: '[PRENOM], réalisez des missions de bénévolat !',
    description:
      'Notification envoyée au bénévole 10 jours après avoir indiqué être bénéficiaire du RSA',
    workflows: ['relances', 'france-travail'],
    weight: 100,
    tags: ['J+10'],
  },
  {
    receiver: 'benevole',
    key: 'benevole_cej_no_participation',
    label: '[PRENOM], votre première mission de bénévolat vous attend sur JeVeuxAider.gouv.fr',
    description:
      "Notification envoyée au bénévole engagé CEJ s'il n'a toujours pas de participation 10 jours après son inscription",
    workflows: ['relances', 'cej'],
    weight: 100,
    tags: ['J+10'],
  },
  {
    receiver: 'benevole',
    key: 'benevole_cej_six_months_after',
    label: '[PRENOM], êtes-vous toujours en Contrat d’Engagement Jeune ?',
    description:
      'Notification envoyée au bénévole engagé CEJ 6 mois après ajout de la mention CEJ sur le profil',
    workflows: ['relances', 'cej'],
    weight: 100,
    tags: ['M+6'],
  },
  {
    receiver: 'benevole',
    key: 'benevole_cej_one_year_after',
    label: '[PRENOM], êtes-vous toujours en Contrat d’Engagement Jeune ?',
    description:
      'Notification envoyée au bénévole engagé CEJ 1 an après ajout de la mention CEJ sur le profil',
    workflows: ['relances', 'cej'],
    weight: 100,
    tags: ['Y+1'],
  },
  {
    receiver: 'benevole',
    key: 'benevole_participation_should_be_done',
    label: 'Avez-vous réalisé votre mission ?',
    description:
      'Notification envoyée au bénévole lorsque sa participation est toujours en attente de validation / en cours de traitement alors que la mission est censée être terminée. Pour les missions ponctuelles, la notification est envoyée 1 jour après la date de fin de la mission. Pour les missions récurrentes ou sans date de fin, 1 mois après la création de la participation.',
    brevoTags: ['app-benevole-participation-should-be-done'],
    workflows: ['creation-participation', 'relances'],
    weight: 100,
    tags: ['J+1', 'M+1'],
  },
  {
    receiver: 'benevole',
    key: 'benevole_participation_will_start',
    label: 'Votre mission commence très prochainement 👟',
    description:
      'Notification envoyée au bénévole lorsque sa participation est validée et que la mission commence demain. Seulement pour les missions ponctuelles.',
    brevoTags: ['app-benevole-participation-will-start'],
    workflows: ['creation-participation', 'relances'],
    weight: 100,
    tags: ['J-1'],
  },
  {
    receiver: 'benevole',
    key: 'user_banned_not_regular_resident',
    label: 'Vous avez été automatiquement désinscrit de la plateforme JeVeuxAider.gouv.fr',
    description:
      'Notification envoyée au bénévole quand un administrateur bloque son compte car il ne réside pas régulièrement en France',
    brevoTags: ['app-benevole-banni-ne-reside-pas-en-france'],
    workflows: ['moderation-compte-utilisateur'],
    weight: 100,
  },
  {
    receiver: 'benevole',
    key: 'user_banned_younger_than_16',
    label: 'Vous avez été automatiquement désinscrit de la plateforme JeVeuxAider.gouv.fr',
    description:
      'Notification envoyée au bénévole quand un administrateur bloque son compte car il est agé de moins de 16 ans',
    brevoTags: ['app-benevole-banni-moins-de-16-ans'],
    workflows: ['moderation-compte-utilisateur'],
    weight: 100,
  },
  {
    receiver: 'benevole',
    key: 'user_banned_inappropriate_behavior',
    label: 'Vous avez été automatiquement désinscrit de la plateforme JeVeuxAider.gouv.fr',
    description:
      'Notification envoyée au bénévole quand un administrateur bloque son compte car il a eu un comportement inapproprié',
    brevoTags: ['app-benevole-banni-comportement-inadapte'],
    workflows: ['moderation-compte-utilisateur'],
    weight: 100,
  },
  {
    receiver: 'benevole',
    key: 'benevole_is_inactive',
    label: 'Ah, vous voilà ! 💃',
    description:
      "Le benevole est inactif depuis 3 mois et n'a aucune mise en relation en cours ou validée dans les 6 mois",
    brevoTags: ['app-benevole-inactif'],
    workflows: ['relances'],
    weight: 99,
    tags: ['M+3'],
  },
  {
    receiver: 'benevole',
    key: 'benevole_is_inactive_second_reminder',
    label: 'Quelle mission est faite pour vous ?',
    description: 'Le benevole est inactif depuis 6 mois',
    brevoTags: ['app-benevole-inactif-relance'],
    workflows: ['relances'],
    weight: 100,
    tags: ['M+6'],
  },
  {
    receiver: 'benevole',
    key: 'benevole_will_be_archived',
    label: 'On ne va pas se quitter comme ça 😢',
    description: "Le bénévole est sur le point d'être archivé (M-1)",
    brevoTags: ['app-benevole-archivage'],
    workflows: ['archivage', 'relances'],
    weight: 99,
    tags: ['M-1'],
  },
  {
    receiver: 'benevole',
    key: 'benevole_will_be_archived_second_reminder',
    label: '[Prénom], c’est bientôt l’heure des au-revoir 😢',
    description: "Le bénévole est sur le point d'être archivé (J-7)",
    brevoTags: ['app-benevole-archivage-relance'],
    workflows: ['archivage', 'relances'],
    weight: 100,
    tags: ['J-7'],
  },
  {
    receiver: 'responsable',
    key: 'responsable_mission_deactivated',
    label: 'Votre mission a été mise hors ligne',
    description:
      "Notification envoyée au responsable d'organisation lorsqu'un modérateur met hors ligne l'une de ses missions",
    brevoTags: ['app-responsable-mission-desactivee'],
    workflows: ['moderation-mission'],
    weight: 100,
  },
  {
    receiver: 'responsable',
    key: 'responsable_mission_reactivated',
    label: 'Votre mission est de nouveau en ligne 👏🏻',
    description:
      "Notification envoyée au responsable d'organisation lorsqu'un modérateur remet en ligne l'une de ses missions",
    brevoTags: ['app-responsable-mission-reactivee'],
    workflows: ['moderation-mission'],
    weight: 100,
  },
  {
    receiver: 'responsable',
    key: 'responsable_missions_deactivated',
    label: 'Vos missions ont été mises hors ligne',
    description:
      "Notification envoyée au responsable d'organisation lorsqu'un modérateur désactive toutes ses missions",
    brevoTags: ['app-responsable-missions-desactivees'],
    workflows: ['moderation-mission'],
    weight: 100,
  },
  {
    receiver: 'responsable',
    key: 'responsable_missions_reactivated',
    label: 'Vos missions sont de nouveau actives 👏🏻',
    description:
      "Notification envoyée au responsable d'organisation lorsqu'un modérateur réactive toutes ses missions",
    brevoTags: ['app-responsable-missions-desactivees'],
    workflows: ['moderation-mission'],
    weight: 100,
  },
  {
    receiver: 'responsable',
    key: 'responsable_organisation_waiting_validation',
    label: 'Plus que quelques étapes avant de commencer à recruter des bénévoles !',
    description:
      "Notification envoyée au responsable d'organisation lorsque le statut passe de Brouillon à En attente de validation",
    brevoTags: ['app-responsable-organisation-en-attente-de-validation'],
    workflows: ['creation-organisation', 'moderation-organisation'],
    weight: 30,
  },
  {
    receiver: 'responsable',
    key: 'responsable_still_in_draft',
    label: '[PRENOM], recrutez des bénévoles en 2 minutes',
    description:
      "Notification envoyée aux membres de l'organisation lorsqu'elle est toujours en Brouillon.",
    brevoTags: ['app-responsable-organisation-en-brouillon'],
    workflows: ['creation-organisation', 'relances'],
    weight: 100,
    tags: ['J+1', 'J+7', 'J+15'],
  },
  {
    receiver: 'responsable',
    key: 'responsable_organisation_being_processed',
    label: 'Votre demande d’inscription est en cours d’analyse',
    description:
      'Notification envoyée au responsable lorsque son organisation est en cours de traitement',
    brevoTags: ['app-responsable-organisation-en-cours-de-traitement'],
    workflows: ['creation-organisation', 'moderation-organisation'],
    weight: 32,
  },
  {
    receiver: 'responsable',
    key: 'responsable_organisation_validated',
    label: 'Vos missions sont désormais visibles par les bénévoles',
    description: 'Notification envoyée au responsable lorsque son organisation est validée',
    brevoTags: ['app-responsable-organisation-validee'],
    workflows: ['creation-organisation', 'moderation-organisation'],
    weight: 33,
  },
  {
    receiver: 'responsable',
    key: 'responsable_organisation_signaled',
    label: 'Votre organisation a été signalée',
    description: 'Notification envoyée au responsable lorsque son organisation est signalée',
    brevoTags: ['app-responsable-organisation-signalee'],
    workflows: ['creation-organisation', 'moderation-organisation'],
    weight: 34,
  },
  {
    receiver: 'responsable',
    key: 'responsable_structure_unsubscribed',
    label: 'Votre organisation a été désinscrite',
    description: 'Notification envoyée à tous les membres de la structure',
    brevoTags: ['app-responsable-organisation-desinscrite'],
    workflows: ['moderation-organisation', 'desinscription-organisation'],
    weight: 36,
  },
  {
    receiver: 'responsable',
    key: 'responsable_mission_created',
    label: '😊 Merci d’avoir proposé une mission ! ',
    description:
      "Notification envoyée au responsable lorsqu'une mission est postée et est en attente de validation",
    brevoTags: ['app-responsable-mission-en-attente-de-validation'],
    workflows: ['creation-mission', 'moderation-mission'],
    weight: 40,
  },
  {
    receiver: 'responsable',
    key: 'responsable_mission_being_processed',
    label: 'Votre mission est en cours de traitement ⏳',
    description:
      'Notification envoyée au responsable lorsque sa mission est en cours de traitement',
    brevoTags: ['app-responsable-mission-en-cours-de-traitement'],
    workflows: ['creation-mission', 'moderation-mission'],
    weight: 41,
  },
  {
    receiver: 'responsable',
    key: 'responsable_mission_validated',
    label: '🔎 Votre mission est désormais visible par les bénévoles !',
    description: 'Notification envoyée au responsable lorsque sa mission est validée',
    brevoTags: ['app-responsable-mission-validee'],
    workflows: ['creation-mission', 'moderation-mission'],
    weight: 42,
  },
  {
    receiver: 'responsable',
    key: 'responsable_mission_signaled',
    label: 'Mince, votre mission ne respecte par la Charte de la Réserve Civique',
    description: 'Notification envoyée au responsable lorsque sa mission est signalée',
    brevoTags: ['app-responsable-mission-signalee'],
    workflows: ['creation-mission', 'moderation-mission'],
    weight: 43,
  },
  {
    receiver: 'responsable',
    key: 'responsable_mission_outdated_first_reminder',
    label: 'Votre mission a-t-elle pris fin ?',
    description:
      'Notification envoyée au responsable lorsque sa mission a une date de fin passée depuis 5 jours',
    brevoTags: ['app-responsable-relance-mission-passee-1'],
    workflows: ['creation-mission', 'relances'],
    weight: 46,
    tags: ['J+5'],
  },
  {
    receiver: 'responsable',
    key: 'responsable_mission_outdated_second_reminder',
    label: 'Votre mission va être clôturée',
    description:
      'Notification envoyée au responsable lorsque sa mission a une date de fin passée depuis 20 jours',
    brevoTags: ['app-responsable-relance-mission-passee-2'],
    workflows: ['creation-mission', 'relances'],
    weight: 47,
    tags: ['J+20'],
  },
  {
    receiver: 'responsable',
    key: 'responsable_mission_almost_full',
    label: '🔥 Votre mission est presque complète !',
    description:
      "Notification envoyée au responsable lorsque sa mission nécessite au moins 5 places, et il n'y en a plus qu'une seule place restante.",
    brevoTags: ['app-responsable-mission-presque-complete'],
    workflows: ['creation-mission', 'relances'],
    weight: 45,
  },
  {
    receiver: 'responsable',
    key: 'responsable_mission_full',
    label: 'Vous ne pouvez plus recevoir de demandes de participations 😢',
    description: 'Notification envoyée au responsable lorsque sa mission est complète',
    brevoTags: ['app-responsable-mission-complete'],
    workflows: ['creation-mission', 'relances'],
    weight: 45,
  },
  {
    receiver: 'responsable',
    key: 'responsable_participation_created',
    label: 'Vous avez une nouvelle demande de participation 👊',
    description:
      "Notification envoyée au responsable lorsqu'un bénévole souhaite participer à une mission",
    brevoTags: ['app-responsable-participation-en-attente-de-validation'],
    workflows: ['creation-participation', 'moderation-participation'],
    weight: 21,
  },
  {
    receiver: 'responsable',
    key: 'responsable_association_validated',
    label: 'Découvrez le fonctionnement de la plateforme JeVeuxAider.gouv.fr',
    description:
      'Notification envoyée au responsable lorsque son organisation de type association est validée',
    brevoTags: ['app-responsable-association-validee'],
    workflows: ['creation-organisation', 'moderation-organisation'],
    weight: 33,
  },
  {
    receiver: 'responsable',
    key: 'responsable_collectivite_validated',
    label: 'Découvrez le fonctionnement de la plateforme JeVeuxAider.gouv.fr',
    description:
      'Notification envoyée au responsable lorsque son organisation de type collectivité territoriale est validée',
    brevoTags: ['app-responsable-collectivite-validee'],
    workflows: ['creation-organisation', 'moderation-organisation'],
    weight: 33,
  },
  {
    receiver: 'responsable',
    key: 'responsable_participation_canceled',
    label: 'Oh non… [PRENOM] a annulé sa participation',
    description:
      "Notification envoyée au responsable lorsqu'une participation est annulée par le bénévole",
    brevoTags: ['app-responsable-participation-annulee-par-benevole'],
    workflows: ['moderation-participation'],
    weight: 100,
  },
  {
    receiver: 'responsable',
    key: 'responsable_participation_validated_by_benevole',
    label: 'Nouvelle participation validée ✔️',
    description:
      "Notification envoyée au responsable lorsqu'une participation est validée par le bénévole",
    brevoTags: ['app-responsable-participation-validee-par-benevole'],
    workflows: ['creation-participation', 'moderation-participation'],
    weight: 100,
  },
  {
    receiver: 'responsable',
    key: 'responsable_mission_still_in_draft',
    label: 'Votre mission est restée au statut “Brouillon”',
    description:
      'Notification envoyée au responsable si une mission est restée au statut brouillon 7 jours',
    brevoTags: ['app-responsable-mission-restee-en-brouillon'],
    workflows: ['creation-mission', 'relances'],
    weight: 100,
    tags: ['J+7'],
  },
  {
    receiver: 'responsable',
    key: 'responsable_no_new_mission',
    label: 'Vous nous manquez sur JeVeuxAider.gouv.fr !',
    description: "Notification envoyée au responsable si aucune mission n'est postée en 3 mois",
    brevoTags: ['app-responsable-no-new-mission'],
    workflows: ['creation-mission', 'relances'],
    weight: 100,
    tags: ['M+3'],
  },
  {
    receiver: 'responsable',
    key: 'responsable_participations_need_to_be_treated',
    label: 'Vous avez X participations à traiter en priorité ! 🙌',
    description:
      'Rappel envoyé au responsable si des participations doivent être traitées en priorité',
    brevoTags: ['app-responsable-rappel-participations-a-traiter-en-priorite'],
    workflows: ['moderation-participation', 'actions-en-attente', 'relances'],
    weight: 100,
  },
  {
    receiver: 'responsable',
    key: 'structure_switch_responsable',
    label: '[PRENOM-NOM] vous a confié la gestion de nouvelles missions',
    description: "Lorsqu'un responsable quitte l'organisation ou se désinscrit",
    workflows: ['desinscription-organisation', 'moderation-organisation'],
    weight: 100,
  },
  {
    receiver: 'responsable',
    key: 'structure_unregister_contact_admin',
    label: '[NOM-ORGA] souhaite se désinscrire...',
    description:
      "Lorsqu'un responsable ne peut pas se désinscrire (car participations reliées à sa structure)",
    workflows: ['desinscription-organisation'],
    weight: 100,
  },
  {
    receiver: 'responsable',
    key: 'responsable_summary_daily',
    label: '[PRENOM], découvrez l’activité du jour sur JeVeuxAider.gouv.fr !',
    description:
      "Notification envoyée aux responsables lorsqu'ils ont activé le résumé quotidien dans leurs préférences de notification",
    workflows: ['relances'],
    weight: 100,
    tags: ['Tous les jours'],
  },
  {
    receiver: 'responsable',
    key: 'responsable_summary_monthly',
    label: '[PRENOM], découvrez votre résumé mensuel d’activité sur JeVeuxaider.gouv.fr !',
    description:
      "Notification envoyée aux responsables lorsqu'ils ont activé le résumé mensuel dans leurs préférences de notification",
    workflows: ['relances'],
    weight: 100,
    tags: ['Tous les mois'],
  },
  {
    receiver: 'responsable',
    key: 'responsable_message_participation',
    label: '[PRENOM] vous a envoyé un nouveau message !',
    description: 'Le bénévole a envoyé un message au responsable à propos de sa candidature',
    brevoTags: ['app-responsable-nouveau-message-participation'],
    workflows: ['messagerie'],
    weight: 100,
  },
  {
    receiver: 'responsable',
    key: 'responsable_message_organisation',
    label: '[PRENOM] souhaite en savoir plus sur votre organisation',
    description: 'Le référent a envoyé un message au responsable à propos de son organisation',
    brevoTags: ['app-responsable-nouveau-message-organisation'],
    workflows: ['messagerie'],
    weight: 100,
  },
  {
    receiver: 'responsable',
    key: 'responsable_message_mission',
    label: '[PRENOM] souhaite en savoir plus sur votre mission',
    description: 'Le référent a envoyé un message au responsable à propos de sa mission',
    brevoTags: ['app-responsable-nouveau-message-mission'],
    workflows: ['messagerie'],
    weight: 100,
  },
  {
    receiver: 'responsable',
    key: 'responsable_organisation_without_mission_first_reminder',
    label: '[PRENOM], avez-vous besoin de bénévoles ?',
    description:
      "Mail envoyé au responsable au bout de 10 jours si son organisation n'a toujours pas de mission",
    brevoTags: ['app-responsable-publication-mission'],
    workflows: ['creation-organisation', 'relances'],
    weight: 100,
    tags: ['J+10'],
  },
  {
    receiver: 'responsable',
    key: 'responsable_organisation_without_mission_second_reminder',
    label: 'Les bénévoles n’attendent plus que vous !',
    description:
      "Mail envoyé au responsable au bout de 30 jours si son organisation n'a toujours pas de mission",
    brevoTags: ['app-responsable-publication-mission-relance'],
    workflows: ['creation-organisation', 'relances'],
    weight: 100,
    tags: ['J+30'],
  },
  {
    receiver: 'responsable',
    key: 'responsable_is_inactive',
    label: 'Ah, vous voilà ! 💃',
    description: 'Le responsable est inactif depuis 3 mois',
    brevoTags: ['app-responsable-inactif'],
    workflows: ['moderation-compte-utilisateur', 'relances'],
    weight: 100,
    tags: ['M+3'],
  },
  {
    receiver: 'responsable',
    key: 'responsable_is_inactive_second_reminder',
    label: 'Vous avez besoin de bénévoles sur des missions ponctuelles ?',
    description: 'Le responsable est inactif depuis 6 mois',
    brevoTags: ['app-responsable-inactif-relance'],
    workflows: ['moderation-compte-utilisateur', 'relances'],
    weight: 100,
    tags: ['M+6'],
  },
  {
    receiver: 'responsable',
    key: 'responsable_will_be_archived',
    label: 'On ne va pas se quitter comme ça 😢',
    description: "Le responsable est sur le point d'être archivé dans 1 mois",
    brevoTags: ['app-responsable-archivage'],
    workflows: ['archivage', 'relances'],
    weight: 99,
    tags: ['M-1'],
  },
  {
    receiver: 'responsable',
    key: 'responsable_will_be_archived_second_reminder',
    label: '[Prénom], votre compte est sur le point d’être désactivé',
    description: "Le responsable est sur le point d'être archivé dans 7 jours",
    brevoTags: ['app-responsable-archivage-relance'],
    workflows: ['archivage', 'relances'],
    weight: 100,
    tags: ['J-7'],
  },
  {
    receiver: 'referent',
    key: 'referent_message_organisation',
    label: 'Le responsable de [STRUCTURE] vous a répondu !',
    description: 'Le référent a envoyé un message au responsable à propos de son organisation',
    brevoTags: ['app-referent-nouveau-message-organisation'],
    workflows: ['messagerie'],
    weight: 100,
  },
  {
    receiver: 'referent',
    key: 'referent_message_mission',
    label: 'Le responsable de [STRUCTURE] vous a répondu !',
    description: 'Le référent a envoyé un message au responsable à propos de sa mission',
    brevoTags: ['app-referent-nouveau-message-mission'],
    workflows: ['messagerie'],
    weight: 100,
  },
  {
    receiver: 'referent',
    key: 'referent_mission_created',
    label: '[PRENOM], vous avez une nouvelle mission à modérer',
    description: "Notification envoyée aux référents du département lorsqu'une mission est postée",
    brevoTags: ['app-referent-mission-en-attente-de-validation'],
    workflows: ['creation-mission', 'moderation-mission'],
    weight: 41,
  },
  {
    receiver: 'referent',
    key: 'referent_organisation_created',
    label: '[PRENOM], une nouvelle organisation vient de s’inscrire sur JeVeuxAider.gouv.fr !',
    description:
      "Notification envoyée aux référents du département lorsqu'une organisation s'inscrit et est en attente de validation",
    brevoTags: ['app-referent-organisation-en-attente-de-validation'],
    workflows: ['creation-organisation', 'moderation-organisation'],
    weight: 31,
  },
  {
    receiver: 'referent',
    key: 'referent_waiting_actions',
    label: 'Ça bouge dans votre département !',
    description: "Notification envoyée aux référents lorsqu'ils ont des actions en attente",
    brevoTags: ['app-referent-daily-todo'],
    workflows: ['actions-en-attente'],
    weight: 100,
  },
  {
    receiver: 'referent',
    key: 'referent_summary_daily',
    label: '[PRENOM], on vous passe le relais !',
    description:
      "Notification envoyée aux référents lorsqu'ils ont activé le résumé bi-hebdomadaire dans leurs préférences de notification",
    brevoTags: ['app-referent-bilan-quotidien'],
    workflows: ['actions-en-attente'],
    weight: 100,
    tags: ['Tous les jours'],
  },
  {
    receiver: 'referent',
    key: 'referent_summary_monthly',
    label: '[PRENOM], découvrez le résumé mensuel de l’activité sur JeVeuxaider.gouv.fr !',
    description:
      "Notification envoyée aux référents lorsqu'ils ont activé le résumé mensuel dans leurs préférences de notification",
    brevoTags: ['app-referent-bilan-mensuel'],
    workflows: ['actions-en-attente'],
    weight: 100,
    tags: ['Tous les mois'],
  },
  {
    receiver: 'account',
    key: 'user_unarchive_code',
    label: "Votre code d'activation à usage unique",
    description: "L'utilisateur demande un code pour réactiver son compte archivé",
    brevoTags: ['app-user-activation-code'],
    workflows: ['archivage'],
    weight: 98,
  },
  {
    receiver: 'admin',
    key: 'admin_reseau_new_lead',
    label: 'Nouveau Lead Tête de réseau !',
    description: "Lorsqu'une demande de création de réseau est soumise",
    workflows: ['autres'],
    weight: 100,
  },
  {
    receiver: 'referent',
    key: 'admin_document_submitted',
    label: 'Une nouvelle ressource est accessible dans votre espace',
    description:
      "Notification envoyée aux référents et/ou responsable lorsqu'un nouveau document est postée",
    workflows: ['autres'],
    weight: 100,
  },
  // {
  //   receiver: 'account',
  //   key: 'export_ready',
  //   label: 'Votre export est prêt',
  //   description: "Lorsqu'un export est prêt à être téléchargé",
  //   workflows: ['autres'],
  //   weight: 100,
  // },
  {
    receiver: 'account',
    key: 'invitation_sent',
    label: 'Invitation en attente',
    description: "Lorsqu'une inviation est envoyée. Le wording dépend du type d'invitation.",
    workflows: ['autres'],
    weight: 100,
  },
  {
    receiver: 'admin',
    key: 'mission_template_created',
    label: '[NOM-RESEAU]: Nouveau modèle de mission en attente de validation',
    description: "Lorsqu'un réseau créé un nouveau template de mission",
    workflows: ['autres'],
    weight: 100,
  },
  {
    receiver: 'account',
    key: 'reset_password',
    label: 'Réinitialiser mon mot de passe',
    description: "Lorsqu'un utilisateur réinialise son mot de passe",
    workflows: ['compte-utilisateur'],
    weight: 100,
  },
  {
    receiver: 'account',
    key: 'user_anonymize',
    label: 'Suppression de votre compte sur JeVeuxAider.gouv.fr',
    description: "Lorsqu'un utilisateur supprime son compte",
    workflows: ['compte-utilisateur'],
    weight: 100,
  },
  {
    receiver: 'custom',
    key: 'register_user_volontaire_cej_adviser',
    label: '[PRENOM-NOM] s’est inscrit sur JeVeuxAider.gouv.fr',
    description: "Envoyé au conseiller CEJ lorqu'un bénévole s'inscrit sur la plateforme",
    workflows: ['inscription-benevole', 'cej'],
    weight: 2,
  },
  {
    receiver: 'custom',
    key: 'register_user_volontaire_ft_adviser',
    label: '[PRENOM-NOM] s’est inscrit sur JeVeuxAider.gouv.fr',
    description: "Envoyé au conseiller RSA lorqu'un bénévole s'inscrit sur la plateforme",
    workflows: ['inscription-benevole', 'france-travail'],
    weight: 2,
  },
  {
    receiver: 'custom',
    key: 'participation_validated_cej_adviser',
    label: '[PRENOM-NOM] s’est inscrit sur une mission de bénévolat',
    description: "Envoyé au conseiller CEJ lorqu'un bénévole s'inscrit à une mission",
    workflows: ['creation-participation', 'cej'],
    weight: 91,
  },
  {
    receiver: 'custom',
    key: 'participation_created_ft_adviser',
    label: '[PRENOM-NOM] s’est inscrit sur une mission de bénévolat',
    description: "Envoyé au conseiller RSA lorqu'un bénévole s'inscrit à une mission",
    workflows: ['creation-participation', 'france-travail'],
    weight: 91,
  },
  {
    receiver: 'account',
    key: 'notes_created',
    label: 'Nouvelle note postée par XXX',
    description: "Lorsqu'une note est postée par un référent",
    workflows: ['autres'],
    weight: 100,
  },
]
</script>
