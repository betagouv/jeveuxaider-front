<template>
  <div class="container">
    <DrawerNotification
      :notification-key="drawerNotificationKey"
      :notification-label="drawerNotification && drawerNotification.label"
      :notification-description="drawerNotification && drawerNotification.description"
      @close="drawerNotificationKey = null"
    />
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Paramètres' },
        { label: 'Emails' },
      ]"
    />

    <div class="grid grid-cols-5 py-12 ">
      <aside class="relative col-span-1">
        <div class="sticky top-12">
          <SecondaryMenuAdmin />
        </div>
      </aside>
      <div class="col-span-4">
        <div class="flex flex-col gap-12">
          <SectionHeading title="Emails transactionnels" />
          <div class="space-y-12">
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

              <!-- <div class="space-y-4">
                <Box
                  v-for="notification in group.notifications"
                  :key="notification.key"
                  padding="xs"
                  variant="flat"
                  class="hover:bg-gray-50 cursor-pointer"
                >
                  <div class="text-md font-medium">
                    {{ notification.label }}
                  </div>
                  <div class="text-xs text-gray-500">
                    {{ notification.description }}
                  </div>
                </Box>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SecondaryMenuAdmin from '@/components/section/admin/SecondaryMenuAdmin'
import DrawerNotification from '@/components/drawer/DrawerNotification'

export default {
  components: {
    SecondaryMenuAdmin,
    DrawerNotification
  },
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
            { key: 'benevole_register', label: 'Votre compte a été validé', description: "Notification envoyée au bénévole lorsqu'il s'inscrit" },
            { key: 'benevole_participation_being_processed', label: 'Votre demande de participation est en cours de traitement', description: 'Notification envoyée au bénévole lorsque le responsable passe la participation en cours de traitement' },
            { key: 'benevole_participation_validated', label: 'Bravo ! Votre demande de participation vient d’être acceptée', description: 'Notification envoyée au bénévole lorsque sa participation est validée' },
            { key: 'benevole_participation_temoignage', label: 'Participation terminée, demande de témoignage', description: 'Notification envoyée au bénévole lorsque sa participation est terminée' },
            { key: 'benevole_participation_refused', label: 'Votre participation a été déclinée', description: 'Notification envoyée au bénévole lorsque sa participation est refusée' },
            { key: 'benevole_participation_canceled', label: 'Votre participation a été annulée', description: 'Notification envoyée au bénévole lorsque sa participation est annulée' },
            { key: 'benevole_marketplace_mission', label: 'XXX vous propose une mission de bénévolat', description: 'Notification envoyée via la marketplace inversée' }
          ]
        },
        {
          key: 'responsable',
          label: '👨‍💼 Emails envoyés aux responsables',
          notifications: [
            { key: 'responsable_register', label: 'Votre organisation est en cours de validation', description: "Notification envoyée au responsable d'organisation lorsqu'il s'inscrit" },
            { key: 'responsable_organisation_being_processed', label: 'Organisation en cours de traitement', description: 'Notification envoyée au responsable lorsque son organisation est en cours de traitement' },
            { key: 'responsable_organisation_validated', label: 'Votre organisation a été validée', description: 'Notification envoyée au responsable lorsque son organisation est validée' },
            { key: 'responsable_association_validated', label: 'Bienvenue sur JeVeuxAider.gouv.fr', description: 'Notification envoyée au responsable lorsque son organisation de type association est validée' },
            { key: 'responsable_collectivite_validated', label: 'Organisation de type collectivité validée', description: 'Notification envoyée au responsable lorsque son organisation de type collectivité est validée' },
            { key: 'responsable_organisation_signaled', label: 'Votre organisation a été signalée', description: 'Notification envoyée au responsable lorsque son organisation est signalée' },
            { key: 'responsable_mission_created', label: 'Votre mission a bien été déposée', description: "Notification envoyée au responsable lorsqu'une mission est postée" },
            { key: 'responsable_mission_validated', label: 'Votre mission est validée !', description: 'Notification envoyée au responsable lorsque sa mission est validée' },
            { key: 'responsable_mission_being_processed', label: 'Votre mission est en cours de traitement', description: 'Notification envoyée au responsable lorsque sa mission est en cours de traitement' },
            { key: 'responsable_mission_outdated', label: 'Votre mission XXX a-t-elle pris fin ?', description: 'Notification envoyée au responsable lorsque sa mission a une date de fin périmée de plus de 15 jours' },
            { key: 'responsable_mission_almost_full', label: 'Votre mission XXX est bientôt complète ?', description: "Notification envoyée au responsable lorsque sa mission n'a plus qu'une seule place restante" },
            { key: 'responsable_mission_signaled', label: 'Votre mission a été signalée', description: 'Notification envoyée au responsable lorsque sa mission est signalée' },
            { key: 'responsable_participation_created', label: 'Vous avez une nouvelle demande de participation', description: "Notification envoyée au responsable lorsqu'un bénévole souhaite participer à une mission" },
            { key: 'responsable_participation_canceled', label: 'Une participation a été annulée', description: "Notification envoyée au responsable lorsqu'une participation est annulée par le bénévole" },
            { key: 'responsable_missin_in_draft', label: 'Votre mission XXX est restée au statut « Brouillon »', description: 'Notification envoyée au responsable si une mission est restée au statut brouillon 7 jours' },
            { key: 'responsable_no_new_mission', label: 'Publiez une nouvelle mission sur JeVeuxAider.gouv.fr', description: "Notification envoyée au responsable si aucune mission n'est postée en 3 mois" },
            { key: 'responsable_waiting_actions', label: 'Des bénévoles attendent votre réponse !', description: 'Notification envoyée au responsable si des participations sont en attente de validation' }
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
            { key: 'new_message', label: 'Nouveau message de la part de XXX', description: "Lorsqu'un nouveau message est postée dans une conversation" },
            { key: 'admin_reseau_new_lead', label: 'Nouveau Lead Tête de réseau !', description: "Lorsqu'une demande de création de réseau est soumise" },
            { key: 'admin_document_submitted', label: 'Une nouvelle ressource est accessible dans votre espace', description: "Notification envoyée aux référents et/ou responsable lorsqu'un nouveau document est postée" },
            { key: 'export_ready', label: 'Votre export est prêt', description: "Lorsqu'un export est prêt à être téléchargé" },
            { key: 'invitation_sent', label: 'Invitation en attente', description: "Lorsqu'une inviation est envoyée. Le wording dépend du type d'invitation." },
            { key: 'mission_template_created', label: 'XXX : Nouveau modèle de mission en attente de validation', description: "Lorsqu'un réseau créé un nouveau template de mission" },
            { key: 'reset_password', label: 'Réinitialiser mon mot de passe', description: "Lorsqu'un utilisateur réinialise son mot de passe" },
            { key: 'moderateur_daily_todo', label: 'Arf on a perdu des référents', description: "Envoyée à Giulietta quand des référents ont trop d'actions en attente sous les 3 derniers jours" }
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
