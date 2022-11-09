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
    <portal to="breadcrumb">
      <Breadcrumb
        :links="[
          { text: 'Tableau de bord', to: '/dashboard' },
          { text: 'Paramètres' },
          { text: 'Emails' },
        ]"
      />
    </portal>

    <SectionHeading title="Emails transactionnels" />
    <div class="space-y-8">
      <div
        v-for="group in groups"
        :key="group.key"
      >
        <Box>
          <Heading as="h2" :level="3" class="mb-8">
            {{ group.label }}
          </Heading>
          <StackedList :divided="false">
            <StackedListItem
              v-for="notification in group.notifications"
              :key="notification.key"
              class="cursor-pointer"
              arrow
              @click.native="onClick(notification)"
            >
              <div class="text-gray-900 font-semibold" v-html="notification.label" />
              <div v-if="notification.description" class="text-gray-500 text-sm" v-html="notification.description" />
            </StackedListItem>
          </StackedList>
        </Box>
      </div>
    </div>
  </div>
</template>

<script>
import DrawerNotification from '@/components/drawer/DrawerNotification'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default {
  components: {
    DrawerNotification,
    Breadcrumb
  },
  layout: 'admin-with-sidebar-menu',
  middleware: 'admin',
  data () {
    return {
      loading: false,
      drawerNotificationKey: null,
      drawerNotification: null,
      groups: [
        {
          key: 'benevole',
          label: '🙋‍♀️ Emails envoyés aux bénévoles',
          notifications: [
            { key: 'benevole_register', label: '💪 Une dernière étape pour s’engager XXX !', description: "Notification envoyée au bénévole lorsqu'il s'inscrit", tags: ['app-benevole-inscription'] },
            { key: 'benevole_participation_being_processed', label: 'Votre demande de participation est en cours de traitement', description: 'Notification envoyée au bénévole lorsque le responsable passe la participation en cours de traitement' },
            { key: 'benevole_participation_validated', label: 'Bravo ! Votre demande de participation vient d’être acceptée', description: 'Notification envoyée au bénévole lorsque sa participation est validée', tags: ['app-benevole-participation-validee'] },
            { key: 'benevole_participation_temoignage', label: 'Participation terminée, demande de témoignage', description: 'Notification envoyée au bénévole lorsque sa participation est terminée' },
            { key: 'benevole_participation_refused', label: 'Votre participation a été déclinée', description: 'Notification envoyée au bénévole lorsque sa participation est refusée' },
            { key: 'benevole_participation_canceled', label: 'Votre participation a été annulée', description: 'Notification envoyée au bénévole lorsque sa participation est annulée' },
            { key: 'benevole_marketplace_mission', label: 'XXX vous propose une mission de bénévolat', description: 'Notification envoyée via la marketplace inversée' },
            { key: 'new_message', label: 'Nouveau message de la part de XXX ([organisation])', description: "Lorsque le bénévole reçoit un nouveau message dans l'une de ses conversations", tags: ['app-benevole-nouveau-message'] },
            { key: 'register_user_volontaire_cej', label: 'XXX, avec le Contrat d’Engagement Jeune, réalisez des missions de bénévolat !', description: 'Notification envoyée au bénévole 3 jours après avoir indiqué être engagé CEJ' },
            { key: 'benevole_cej_no_participation', label: 'XXX, votre première mission de bénévolat vous attend sur JeVeuxAider.gouv.fr', description: "Notification envoyée au bénévole engagé CEJ s'il n'a toujours pas de participation 10 jours après son inscription" },
            { key: 'benevole_cej_six_months_after', label: 'XXX, êtes-vous toujours en Contrat d’Engagement Jeune ?', description: 'Notification envoyée au bénévole engagé CEJ 6 mois et 1 an après ajout de la mention CEJ sur le profil' }
          ]
        },
        {
          key: 'responsable',
          label: '👨‍💼 Emails envoyés aux responsables',
          notifications: [
            { key: 'responsable_register', label: 'Votre organisation est en cours de validation', description: "Notification envoyée au responsable d'organisation lorsque le statut passe de Brouillon à En attente de validation" },
            { key: 'responsable_still_in_draft', label: 'Finalisez votre inscription sur JeVeuxAider.gouv.fr', description: "Notification envoyée au responsable d'organisation lorsque son organisation est toujours en Brouillon. (J+1, J+7, J+15)" },
            { key: 'responsable_organisation_being_processed', label: 'Organisation en cours de traitement', description: 'Notification envoyée au responsable lorsque son organisation est en cours de traitement' },
            { key: 'responsable_organisation_validated', label: 'Votre organisation a été validée', description: 'Notification envoyée au responsable lorsque son organisation est validée' },
            { key: 'responsable_association_validated', label: 'Bienvenue sur JeVeuxAider.gouv.fr', description: 'Notification envoyée au responsable lorsque son organisation de type association est validée', tags: ['app-organisation-validee'] },
            { key: 'responsable_collectivite_validated', label: 'Organisation de type collectivité territoriale validée', description: 'Notification envoyée au responsable lorsque son organisation de type collectivité territoriale est validée' },
            { key: 'responsable_organisation_signaled', label: 'Votre organisation a été signalée', description: 'Notification envoyée au responsable lorsque son organisation est signalée' },
            { key: 'responsable_mission_created', label: 'Votre mission a bien été déposée', description: "Notification envoyée au responsable lorsqu'une mission est postée" },
            { key: 'responsable_mission_validated', label: 'Votre mission est validée !', description: 'Notification envoyée au responsable lorsque sa mission est validée' },
            { key: 'responsable_mission_being_processed', label: 'Votre mission est en cours de traitement', description: 'Notification envoyée au responsable lorsque sa mission est en cours de traitement' },
            { key: 'responsable_mission_outdated', label: 'Votre mission XXX a-t-elle pris fin ?', description: 'Notification envoyée au responsable lorsque sa mission a une date de fin périmée de plus de 15 jours' },
            { key: 'responsable_mission_almost_full', label: 'Votre mission XXX est bientôt complète ?', description: "Notification envoyée au responsable lorsque sa mission n'a plus qu'une seule place restante" },
            { key: 'responsable_mission_signaled', label: 'Votre mission a été signalée', description: 'Notification envoyée au responsable lorsque sa mission est signalée' },
            { key: 'responsable_participation_created', label: 'Vous avez une nouvelle demande de participation', description: "Notification envoyée au responsable lorsqu'un bénévole souhaite participer à une mission", tags: ['app-organisation-participation-en-attente-de-validation'] },
            { key: 'responsable_participation_canceled', label: 'Une participation a été annulée', description: "Notification envoyée au responsable lorsqu'une participation est annulée par le bénévole" },
            { key: 'responsable_missin_in_draft', label: 'Votre mission XXX est restée au statut « Brouillon »', description: 'Notification envoyée au responsable si une mission est restée au statut brouillon 7 jours' },
            { key: 'responsable_no_new_mission', label: 'Publiez une nouvelle mission sur JeVeuxAider.gouv.fr', description: "Notification envoyée au responsable si aucune mission n'est postée en 3 mois" },
            { key: 'responsable_waiting_actions', label: 'Des bénévoles attendent votre réponse !', description: 'Rappel envoyé au responsable si des participations sont toujours en attente de validation', tags: ['app-organisation-rappel-participations-en-attente-de-validation'] },
            { key: 'new_message', label: 'Nouveau message de la part de XXX', description: "Lorsque le responsable reçoit un nouveau message dans l'une de ses conversations", tags: ['app-organisation-nouveau-message'] },
            { key: 'structure_switch_responsable', label: 'XXX vous a confié la gestion de nouvelles missions', description: "Lorsque'un responsable quitte l'organisation ou se désinscrit" },
            { key: 'structure_unregister_contact_admin', label: 'XXX souhaite se désinscrire...', description: "Lorsque'un responsable ne peut pas se désinscrire (car participations reliées à sa structure)" }
          ]
        },
        {
          key: 'referent',
          label: '👮🏽‍♀️ Emails envoyés aux référents',
          notifications: [
            { key: 'referent_mission_created', label: 'Mission en attente de validation par les référents', description: "Notification envoyée aux référents du département lorsqu'une mission est postée" },
            { key: 'referent_organisation_created', label: 'Organisation créée', description: "Notification envoyée aux référents du département lorsqu'une organisation s'inscrit" },
            { key: 'referent_waiting_actions', label: 'Actions à faire - ça bouge dans votre département !', description: "Notification envoyée aux référents lorsqu'ils ont des actions en attente" }
          ]
        },
        {
          key: 'other',
          label: '🤷🏽‍♀️ Les autres emails',
          notifications: [
            { key: 'admin_reseau_new_lead', label: 'Nouveau Lead Tête de réseau !', description: "Lorsqu'une demande de création de réseau est soumise" },
            { key: 'admin_document_submitted', label: 'Une nouvelle ressource est accessible dans votre espace', description: "Notification envoyée aux référents et/ou responsable lorsqu'un nouveau document est postée" },
            { key: 'export_ready', label: 'Votre export est prêt', description: "Lorsqu'un export est prêt à être téléchargé" },
            { key: 'invitation_sent', label: 'Invitation en attente', description: "Lorsqu'une inviation est envoyée. Le wording dépend du type d'invitation." },
            { key: 'mission_template_created', label: 'XXX : Nouveau modèle de mission en attente de validation', description: "Lorsqu'un réseau créé un nouveau template de mission" },
            { key: 'reset_password', label: 'Réinitialiser mon mot de passe', description: "Lorsqu'un utilisateur réinialise son mot de passe" },
            { key: 'user_anonymize', label: 'Suppression de votre compte sur JeVeuxAider.gouv.fr', description: "Lorsqu'un utilisateur supprime son compte" },
            { key: 'register_user_volontaire_cej_adviser', label: 'XXX s’est inscrit sur JeVeuxAider.gouv.fr', description: "Envoyé au conseiller CEJ lorqu'un bénévole s'inscrit sur la plateforme" },
            { key: 'participation_validated_cej_adviser', label: 'XXX s’est inscrit sur une mission de bénévolat', description: "Envoyé au conseiller CEJ lorqu'un bénévole s'inscrit à une mission" },
            { key: 'notes_created', label: 'Nouvelle note postée par XXX', description: "Lorsqu'une note est postée par un référent" }
          ]
        }
      ]
    }
  },
  methods: {
    onClick (notification) {
      this.drawerNotificationKey = notification.key
      this.drawerNotification = notification
    }
  }
}
</script>
