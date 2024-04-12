<template>
  <div class="flex flex-col gap-8">
    <DrawerNotification
      :notification-key="drawerNotificationKey"
      :notification-label="drawerNotification && drawerNotification.label"
      :notification-description="drawerNotification && drawerNotification.description"
      :notification-tags="drawerNotification && drawerNotification.tags"
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
    <DsfrTabs name="NAME" :tabs="tabs" tabpanel-class="!p-0">
      <template v-for="tab in tabs" :key="tab.key" #[`tab-${tab.key}`]>
        <BaseBox>
          <BaseStackedList :divided="false">
            <BaseStackedListItem
              v-for="notification in notifications.filter(
                (notification) => notification.tab === tab.key
              )"
              :key="notification.key"
              class="cursor-pointer"
              arrow
              @click.native="onClick(notification)"
            >
              <div class="flex space-x-4 items-center">
                <div class="text-gray-900 font-semibold" v-html="notification.label" />
                <DsfrBadge
                  v-for="(type, i) in notification.types"
                  :key="i"
                  size="sm"
                  type="info"
                  no-icon
                >
                  {{ type }}
                </DsfrBadge>
              </div>
              <div
                v-if="notification.description"
                class="text-gray-500 text-sm"
                v-html="notification.description"
              />
            </BaseStackedListItem>
          </BaseStackedList>
        </BaseBox>
      </template>
    </DsfrTabs>
  </div>
</template>

<script>
import DrawerNotification from '@/components/drawer/DrawerNotification.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import DsfrBadge from '@/components/dsfr/Badge.vue'
import DsfrTabs from '@/components/dsfr/Tabs.vue'

export default defineNuxtComponent({
  components: {
    DrawerNotification,
    Breadcrumb,
    DsfrBadge,
    DsfrTabs,
  },
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
      tabs: [
        { key: 'benevoles', content: 'Bénévoles' },
        { key: 'responsables', content: 'Responsables' },
        { key: 'referents', content: 'Référents' },
        { key: 'other', content: 'Autres' },
      ],
      notifications: [
        {
          tab: 'benevoles',
          key: 'benevole_register',
          label: '💪 Une dernière étape pour s’engager [PRENOM] !',
          description:
            'Le bénévole vient de s’inscrire sur JVA et reçoit une première proposition de mission',
          tags: ['app-benevole-inscription'],
          is_updated: true,
        },
        {
          tab: 'benevoles',
          key: 'benevole_mission_shared',
          label: '[PRENOM] [NOM] veut faire du bénévolat avec vous',
          description: 'Le bénévole partage à ses proches une mission',
          tags: ['app-benevole-mission-shared'],
        },
        {
          tab: 'benevoles',
          key: 'benevole_participation_created',
          label: '🔖 Votre demande de participation a bien été enregistrée !',
          description: 'Le bénévole candidate à une mission et reçoit une confirmation',
          tags: ['app-benevole-participation-created'],
          types: ['Notification'],
        },
        {
          tab: 'benevoles',
          key: 'benevole_participation_being_processed',
          label: '⏳ Votre demande de participation est en cours de traitement',
          description:
            'Le référent a répondu au premier message du bénévole ou a besoin d’informations complémentaires et a donc passé la mission à “En cours de traitement”',
          tags: ['app-benevole-participation-being-processed'],
          types: ['Notification'],
        },
        {
          tab: 'benevoles',
          key: 'benevole_participation_validated',
          label: '🥳 Bonne nouvelle ! Votre demande de participation est validée',
          description:
            'Le bénévole a reçu une réponse positive suite à sa candidature sur une mission de bénévolat',
          tags: ['app-benevole-participation-validee'],
          types: ['Notification'],
        },
        {
          tab: 'benevoles',
          key: 'benevole_participation_temoignage',
          label: '[PRENOM], comment s’est passée votre mission ?',
          description:
            'Le responsable de mission a passé la mission au statut Terminé. Le bénévole est invité à partager son retour d’expérience.',
          tags: ['app-benevole-mission-over-temoignage'],
          is_updated: true,
        },
        {
          tab: 'benevoles',
          key: 'benevole_participation_refused',
          label: 'Quel dommage… votre participation vient d’être déclinée',
          description:
            'Le responsable a refusé la candidature proposée par le bénévole. Ce dernier a une précision sur les raisons de refus de sa proposition de participation.',
          tags: ['app-benevole-participation-declined'],
          types: ['Notification'],
        },
        {
          tab: 'benevoles',
          key: 'benevole_participation_declined_mission_terminated',
          label: 'La mission à laquelle vous avez candidaté est terminée',
          description:
            'La mission a été terminée et les bénévoles avec des participations en attente de validation sont notifiés',
          tags: ['app-benevole-participation-declined-mission-terminated'],
          types: ['Notification'],
        },
        {
          tab: 'benevoles',
          key: 'benevole_participation_canceled',
          label: '😔 Oh non… La mission de [ORGANISATION] a été annulée',
          description:
            'Le responsable annule la mission : elle n’a finalement pas lieu pour une raison X ou Y (il pleut, pas assez de bénévoles)',
          tags: ['app-benevole-participation-canceled'],
          types: ['Notification'],
        },
        {
          tab: 'benevoles',
          key: 'benevole_message_participation',
          label: 'Nouveau message de la part de [PRENOM]',
          description: 'Le responsable de mission a envoyé un message au bénévole',
          tags: ['app-benevole-nouveau-message'],
          is_updated: true,
        },
        {
          tab: 'benevoles',
          key: 'benevole_marketplace_mission',
          label: '[NOM-ORGA] vous propose une mission de bénévolat',
          description: 'Notification envoyée via la marketplace inversée',
        },
        {
          tab: 'benevoles',
          key: 'register_user_volontaire_cej',
          label:
            '[PRENOM], avec le Contrat d’Engagement Jeune, réalisez des missions de bénévolat !',
          description:
            'Notification envoyée au bénévole 3 jours après avoir indiqué être engagé CEJ',
        },
        {
          tab: 'benevoles',
          key: 'benevole_cej_no_participation',
          label:
            '[PRENOM], votre première mission de bénévolat vous attend sur JeVeuxAider.gouv.fr',
          description:
            "Notification envoyée au bénévole engagé CEJ s'il n'a toujours pas de participation 10 jours après son inscription",
        },
        {
          tab: 'benevoles',
          key: 'benevole_cej_six_months_after',
          label: '[PRENOM], êtes-vous toujours en Contrat d’Engagement Jeune ?',
          description:
            'Notification envoyée au bénévole engagé CEJ 6 mois et 1 an après ajout de la mention CEJ sur le profil',
        },
        {
          tab: 'benevoles',
          key: 'benevole_participation_should_be_done',
          label: 'Avez-vous réalisé votre mission ?',
          description:
            'Notification envoyée au bénévole lorsque sa participation est toujours en attente de validation / en cours de traitement alors que la mission est censée être terminée. Pour les missions ponctuelles, la notification est envoyée 1 jour après la date de fin de la mission. Pour les missions récurrentes ou sans date de fin, 1 mois après la création de la participation.',
          tags: ['app-benevole-participation-should-be-done'],
          is_updated: true,
        },
        {
          tab: 'benevoles',
          key: 'benevole_participation_will_start',
          label: 'Votre mission commence très prochainement 👟',
          description:
            'Notification envoyée au bénévole lorsque sa participation est validée et que la mission commence demain. Seulement pour les missions ponctuelles.',
          tags: ['app-benevole-participation-will-start'],
          is_updated: true,
        },
        {
          tab: 'benevoles',
          key: 'user_banned_not_regular_resident',
          label: 'Vous avez été automatiquement désinscrit de la plateforme JeVeuxAider.gouv.fr',
          description:
            'Notification envoyée au bénévole quand un administrateur bloque son compte car il ne réside pas régulièrement en France',
          tags: ['app-benevole-banni-ne-reside-pas-en-france'],
          is_updated: true,
        },
        {
          tab: 'benevoles',
          key: 'user_banned_younger_than_16',
          label: 'Vous avez été automatiquement désinscrit de la plateforme JeVeuxAider.gouv.fr',
          description:
            'Notification envoyée au bénévole quand un administrateur bloque son compte car il est agé de moins de 16 ans',
          tags: ['app-benevole-banni-moins-de-16-ans'],
          is_updated: true,
        },
        {
          tab: 'benevoles',
          key: 'user_banned_inappropriate_behavior',
          label: 'Vous avez été automatiquement désinscrit de la plateforme JeVeuxAider.gouv.fr',
          description:
            'Notification envoyée au bénévole quand un administrateur bloque son compte car il a eu un comportement inapproprié',
          tags: ['app-benevole-banni-comportement-inadapte'],
          is_updated: true,
        },
        {
          tab: 'benevoles',
          key: 'benevole_will_be_archived',
          label: 'On ne va pas se quitter comme ça 😢',
          description: "Le bénévole est sur le point d'être archivé (M-1)",
          tags: ['app-benevole-archivage'],
          is_updated: true,
        },
        {
          tab: 'benevoles',
          key: 'benevole_will_be_archived_second_reminder',
          label: '[Prénom], c’est bientôt l’heure des au-revoir 😢',
          description: "Le bénévole est sur le point d'être archivé (J-7)",
          tags: ['app-benevole-archivage-relance'],
          is_updated: true,
        },
        {
          tab: 'responsables',
          key: 'responsable_mission_deactivated',
          label: 'Votre mission a été mise hors ligne',
          description:
            "Notification envoyée au responsable d'organisation lorsqu'un modérateur met hors ligne l'une de ses missions",
          tags: ['app-responsable-mission-desactivee'],
          types: ['Notification'],
        },
        {
          tab: 'responsables',
          key: 'responsable_mission_reactivated',
          label: 'Votre mission est de nouveau en ligne 👏🏻',
          description:
            "Notification envoyée au responsable d'organisation lorsqu'un modérateur remet en ligne l'une de ses missions",
          tags: ['app-responsable-mission-reactivee'],
          types: ['Notification'],
        },
        {
          tab: 'responsables',
          key: 'responsable_missions_deactivated',
          label: 'Vos missions ont été mises hors ligne',
          description:
            "Notification envoyée au responsable d'organisation lorsqu'un modérateur désactive toutes ses missions",
          tags: ['app-responsable-missions-desactivees'],
          types: ['Notification'],
        },
        {
          tab: 'responsables',
          key: 'responsable_missions_reactivated',
          label: 'Vos missions sont de nouveau actives 👏🏻',
          description:
            "Notification envoyée au responsable d'organisation lorsqu'un modérateur réactive toutes ses missions",
          tags: ['app-responsable-missions-desactivees'],
          types: ['Notification'],
        },
        {
          tab: 'responsables',
          key: 'responsable_organisation_waiting_validation',
          label: 'Plus que quelques étapes avant de commencer à recruter des bénévoles !',
          description:
            "Notification envoyée au responsable d'organisation lorsque le statut passe de Brouillon à En attente de validation",
          tags: ['app-responsable-organisation-en-attente-de-validation'],
          is_updated: true,
        },
        {
          tab: 'responsables',
          key: 'responsable_still_in_draft',
          label: '[PRENOM], recrutez des bénévoles en 2 minutes',
          description:
            "Notification envoyée aux membres de l'organisation lorsqu'elle est toujours en Brouillon. (J+1, J+7, J+15)",
          tags: ['app-responsable-organisation-en-brouillon'],
          is_updated: true,
        },
        {
          tab: 'responsables',
          key: 'responsable_organisation_being_processed',
          label: 'Votre demande d’inscription est en cours d’analyse',
          description:
            'Notification envoyée au responsable lorsque son organisation est en cours de traitement',
          tags: ['app-responsable-organisation-en-cours-de-traitement'],
          types: ['Notification'],
        },
        {
          tab: 'responsables',
          key: 'responsable_organisation_validated',
          label: 'Vos missions sont désormais visibles par les bénévoles',
          description: 'Notification envoyée au responsable lorsque son organisation est validée',
          tags: ['app-responsable-organisation-validee'],
          types: ['Notification'],
        },
        {
          tab: 'responsables',
          key: 'responsable_organisation_signaled',
          label: 'Votre organisation a été signalée',
          description: 'Notification envoyée au responsable lorsque son organisation est signalée',
          tags: ['app-responsable-organisation-signalee'],
          types: ['Notification'],
        },
        {
          tab: 'responsables',
          key: 'responsable_structure_unsubscribed',
          label: 'Votre organisation a été désinscrite',
          description: 'Notification envoyée à tous les membres de la structure',
          tags: ['app-responsable-organisation-desinscrite'],
          types: ['Notification'],
          is_updated: true,
        },
        {
          tab: 'responsables',
          key: 'responsable_mission_created',
          label: '😊 Merci d’avoir proposé une mission ! ',
          description:
            "Notification envoyée au responsable lorsqu'une mission est postée et est en attente de validation",
          tags: ['app-responsable-mission-en-attente-de-validation'],
          types: ['Notification'],
        },
        {
          tab: 'responsables',
          key: 'responsable_mission_being_processed',
          label: 'Votre mission est en cours de traitement ⏳',
          description:
            'Notification envoyée au responsable lorsque sa mission est en cours de traitement',
          tags: ['app-responsable-mission-en-cours-de-traitement'],
          is_updated: true,
        },
        {
          tab: 'responsables',
          key: 'responsable_mission_validated',
          label: '🔎 Votre mission est désormais visible par les bénévoles !',
          description: 'Notification envoyée au responsable lorsque sa mission est validée',
          tags: ['app-responsable-mission-validee'],
          types: ['Notification'],
        },
        {
          tab: 'responsables',
          key: 'responsable_mission_signaled',
          label: 'Mince, votre mission ne respecte par la Charte de la Réserve Civique',
          description: 'Notification envoyée au responsable lorsque sa mission est signalée',
          tags: ['app-responsable-mission-signalee'],
          types: ['Notification'],
        },
        {
          tab: 'responsables',
          key: 'responsable_mission_outdated_first_reminder',
          label: 'Votre mission a-t-elle pris fin ?',
          description:
            'Notification envoyée au responsable lorsque sa mission a une date de fin passée depuis 5 jours',
          tags: ['app-responsable-relance-mission-passee-1'],
          is_updated: true,
        },
        {
          tab: 'responsables',
          key: 'responsable_mission_outdated_second_reminder',
          label: 'Votre mission va être clôturée',
          description:
            'Notification envoyée au responsable lorsque sa mission a une date de fin passée depuis 20 jours',
          tags: ['app-responsable-relance-mission-passee-2'],
          is_updated: true,
        },
        {
          tab: 'responsables',
          key: 'responsable_mission_almost_full',
          label: '🔥 Votre mission est presque complète ! ',
          description:
            "Notification envoyée au responsable lorsque sa mission n'a plus qu'une seule place restante",
          tags: ['app-responsable-mission-presque-complete'],
          types: ['Notification'],
        },
        {
          tab: 'responsables',
          key: 'responsable_participation_created',
          label: 'Vous avez une nouvelle demande de participation 👊',
          description:
            "Le responsable reçoit uen notification lorsqu'un bénévole souhaite participer à une mission",
          tags: ['app-responsable-participation-en-attente-de-validation'],
          types: ['Notification'],
        },
        {
          tab: 'responsables',
          key: 'responsable_association_validated',
          label: 'Découvrez le fonctionnement de la plateforme JeVeuxAider.gouv.fr',
          description:
            'Notification envoyée au responsable lorsque son organisation de type association est validée',
          tags: ['app-responsable-association-validee'],
          is_updated: true,
        },
        {
          tab: 'responsables',
          key: 'responsable_collectivite_validated',
          label: 'Découvrez le fonctionnement de la plateforme JeVeuxAider.gouv.fr',
          description:
            'Notification envoyée au responsable lorsque son organisation de type collectivité territoriale est validée',
          tags: ['app-responsable-collectivite-validee'],
          is_updated: true,
        },
        {
          tab: 'responsables',
          key: 'responsable_participation_canceled',
          label: 'Oh non… [PRENOM] a annulé sa participation',
          description:
            "Notification envoyée au responsable lorsqu'une participation est annulée par le bénévole",
          tags: ['app-responsable-participation-annulee-par-benevole'],
          types: ['Notification'],
        },
        {
          tab: 'responsables',
          key: 'responsable_participation_validated_by_benevole',
          label: 'Nouvelle participation validée ✔️',
          description:
            "Notification envoyée au responsable lorsqu'une participation est validée par le bénévole",
          tags: ['app-responsable-participation-validee-par-benevole'],
          types: ['Notification'],
        },
        {
          tab: 'responsables',
          key: 'responsable_mission_still_in_draft',
          label: 'Votre mission est restée au statut “Brouillon”',
          description:
            'Notification envoyée au responsable si une mission est restée au statut brouillon 7 jours',
          tags: ['app-responsable-mission-restee-en-brouillon'],
          is_updated: true,
        },
        {
          tab: 'responsables',
          key: 'responsable_no_new_mission',
          label: 'Vous nous manquez sur JeVeuxAider.gouv.fr !',
          description:
            "Notification envoyée au responsable si aucune mission n'est postée en 3 mois",
          tags: ['app-responsable-no-new-mission'],
          is_updated: true,
        },
        {
          tab: 'responsables',
          key: 'responsable_participations_need_to_be_treated',
          label: 'Vous avez X participations à traiter en priorité ! 🙌',
          description:
            'Rappel envoyé au responsable si des participations doivent être traitées en priorité',
          tags: ['app-responsable-rappel-participations-a-traiter-en-priorite'],
          is_updated: true,
        },
        {
          tab: 'responsables',
          key: 'structure_switch_responsable',
          label: '[PRENOM-NOM] vous a confié la gestion de nouvelles missions',
          description: "Lorsque'un responsable quitte l'organisation ou se désinscrit",
          types: ['Notification'],
        },
        {
          tab: 'responsables',
          key: 'structure_unregister_contact_admin',
          label: '[NOM-ORGA] souhaite se désinscrire...',
          description:
            "Lorsque'un responsable ne peut pas se désinscrire (car participations reliées à sa structure)",
        },
        {
          tab: 'responsables',
          key: 'responsable_summary_daily',
          label: '[PRENOM], découvrez l’activité du jour sur JeVeuxAider.gouv.fr !',
          description:
            "Notification envoyée aux responsables lorsqu'ils ont activé le résumé quotidien dans leurs préférences de notification",
        },
        {
          tab: 'responsables',
          key: 'responsable_summary_monthly',
          label: '[PRENOM], découvrez votre résumé mensuel d’activité sur JeVeuxaider.gouv.fr !',
          description:
            "Notification envoyée aux responsables lorsqu'ils ont activé le résumé mensuel dans leurs préférences de notification",
        },
        {
          tab: 'responsables',
          key: 'responsable_message_participation',
          label: '[PRENOM] vous a envoyé un nouveau message !',
          description: 'Le bénévole a envoyé un message au responsable à propos de sa candidature',
          tags: ['app-responsable-nouveau-message-participation'],
          is_updated: true,
        },
        {
          tab: 'responsables',
          key: 'responsable_message_organisation',
          label: '[PRENOM] souhaite en savoir plus sur votre organisation',
          description:
            'Le référent a envoyé un message au responsable à propos de son organisation',
          tags: ['app-responsable-nouveau-message-organisation'],
          is_updated: true,
        },
        {
          tab: 'responsables',
          key: 'responsable_message_mission',
          label: '[PRENOM] souhaite en savoir plus sur votre mission',
          description: 'Le référent a envoyé un message au responsable à propos de sa mission',
          tags: ['app-responsable-nouveau-message-mission'],
          is_updated: true,
        },
        {
          tab: 'responsables',
          key: 'responsable_organisation_without_mission_first_reminder',
          label: '[PRENOM], avez-vous besoin de bénévoles ?',
          description:
            "Mail envoyé au responsable au bout de 10 jours si son organisation n'a toujours pas de mission",
          tags: ['app-responsable-publication-mission'],
          is_updated: true,
        },
        {
          tab: 'responsables',
          key: 'responsable_organisation_without_mission_second_reminder',
          label: 'Les bénévoles n’attendent plus que vous !',
          description:
            "Mail envoyé au responsable au bout de 30 jours si son organisation n'a toujours pas de mission",
          tags: ['app-responsable-publication-mission-relance'],
          is_updated: true,
        },
        {
          tab: 'responsables',
          key: 'responsable_will_be_archived',
          label: 'On ne va pas se quitter comme ça 😢',
          description: "Le responsable est sur le point d'être archivé (M-1)",
          tags: ['app-responsable-archivage'],
          is_updated: true,
        },
        {
          tab: 'responsables',
          key: 'responsable_will_be_archived_second_reminder',
          label: '[Prénom], votre compte est sur le point d’être désactivé',
          description: "Le responsable est sur le point d'être archivé (J-7)",
          tags: ['app-responsable-archivage-relance'],
          is_updated: true,
        },
        {
          tab: 'referents',
          key: 'referent_message_organisation',
          label: 'Le responsable de [STRUCTURE] vous a répondu !',
          description:
            'Le référent a envoyé un message au responsable à propos de son organisation',
          tags: ['app-referent-nouveau-message-organisation'],
          is_updated: true,
        },
        {
          tab: 'referents',
          key: 'referent_message_mission',
          label: 'Le responsable de [STRUCTURE] vous a répondu !',
          description: 'Le référent a envoyé un message au responsable à propos de sa mission',
          tags: ['app-referent-nouveau-message-mission'],
          is_updated: true,
        },
        {
          tab: 'referents',
          key: 'referent_mission_created',
          label: '[PRENOM], vous avez une nouvelle mission à modérer',
          description:
            "Notification envoyée aux référents du département lorsqu'une mission est postée",
          tags: ['app-referent-mission-en-attente-de-validation'],
          is_updated: true,
        },
        {
          tab: 'referents',
          key: 'referent_organisation_created',
          label:
            '[PRENOM], une nouvelle organisation vient de s’inscrire sur JeVeuxAider.gouv.fr !',
          description:
            "Notification envoyée aux référents du département lorsqu'une organisation s'inscrit et est en attente de validation",
          tags: ['app-referent-organisation-en-attente-de-validation'],
          types: ['Notification'],
        },
        {
          tab: 'referents',
          key: 'referent_waiting_actions',
          label: 'Ça bouge dans votre département !',
          description: "Notification envoyée aux référents lorsqu'ils ont des actions en attente",
          tags: ['app-referent-daily-todo'],
          is_updated: true,
        },
        {
          tab: 'referents',
          key: 'referent_summary_daily',
          label: '[PRENOM], on vous passe le relais !',
          description:
            "Notification envoyée aux référents lorsqu'ils ont activé le résumé bi-hebdomadaire dans leurs préférences de notification",
          tags: ['app-referent-bilan-quotidien'],
          is_updated: true,
        },
        {
          tab: 'referents',
          key: 'referent_summary_monthly',
          label: '[PRENOM], découvrez le résumé mensuel de l’activité sur JeVeuxaider.gouv.fr !',
          description:
            "Notification envoyée aux référents lorsqu'ils ont activé le résumé mensuel dans leurs préférences de notification",
          tags: ['app-referent-bilan-mensuel'],
          is_updated: true,
        },
        {
          tab: 'other',
          key: 'user_unarchive_code',
          label: "Votre code d'activation à usage unique",
          description: "L'utilisateur demande un code pour réactiver son compte archivé",
          tags: ['app-user-activation-code'],
          is_updated: true,
        },
        {
          tab: 'other',
          key: 'admin_reseau_new_lead',
          label: 'Nouveau Lead Tête de réseau !',
          description: "Lorsqu'une demande de création de réseau est soumise",
        },
        {
          tab: 'other',
          key: 'admin_document_submitted',
          label: 'Une nouvelle ressource est accessible dans votre espace',
          description:
            "Notification envoyée aux référents et/ou responsable lorsqu'un nouveau document est postée",
          types: ['Notification'],
        },
        {
          tab: 'other',
          key: 'export_ready',
          label: 'Votre export est prêt',
          description: "Lorsqu'un export est prêt à être téléchargé",
        },
        {
          tab: 'other',
          key: 'invitation_sent',
          label: 'Invitation en attente',
          description: "Lorsqu'une inviation est envoyée. Le wording dépend du type d'invitation.",
        },
        {
          tab: 'other',
          key: 'mission_template_created',
          label: '[NOM-RESEAU]: Nouveau modèle de mission en attente de validation',
          description: "Lorsqu'un réseau créé un nouveau template de mission",
        },
        {
          tab: 'other',
          key: 'reset_password',
          label: 'Réinitialiser mon mot de passe',
          description: "Lorsqu'un utilisateur réinialise son mot de passe",
          types: ['Notification'],
        },
        {
          tab: 'other',
          key: 'user_anonymize',
          label: 'Suppression de votre compte sur JeVeuxAider.gouv.fr',
          description: "Lorsqu'un utilisateur supprime son compte",
        },
        {
          tab: 'other',
          key: 'register_user_volontaire_cej_adviser',
          label: '[PRENOM-NOM] s’est inscrit sur JeVeuxAider.gouv.fr',
          description: "Envoyé au conseiller CEJ lorqu'un bénévole s'inscrit sur la plateforme",
        },
        {
          tab: 'other',
          key: 'participation_validated_cej_adviser',
          label: '[PRENOM-NOM] s’est inscrit sur une mission de bénévolat',
          description: "Envoyé au conseiller CEJ lorqu'un bénévole s'inscrit à une mission",
        },
        {
          tab: 'other',
          key: 'notes_created',
          label: 'Nouvelle note postée par XXX',
          description: "Lorsqu'une note est postée par un référent",
        },
      ],
    }
  },
  methods: {
    onClick(notification) {
      this.drawerNotificationKey = notification.key
      this.drawerNotification = notification
    },
  },
})
</script>
