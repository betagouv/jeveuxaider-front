<template>
  <div v-if="changes.length > 0">
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div v-if="showTitle" class="uppercase font-semibold text-gray-600">Champs</div>
    </div>
    <BaseBox :variant="boxVariant" :padding="boxPadding" :loading="loading">
      <BaseDisclosure v-for="change in changes" :key="change.property">
        <template #button="{ isOpen }">
          <div class="flex font-semibold text-sm items-center group">
            <div class="flex-shrink-0 group-hover:text-gray-600">
              {{ change.property }}
            </div>
            <div class="w-full border-t mt-1 mx-2" />
            <RiIndeterminateCircleLine
              v-if="isOpen"
              class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5"
            />
            <RiAddCircleLine
              v-else
              class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5"
            />
          </div>
        </template>
        <div class="mt-3 space-y-3">
          <div>
            <BaseBadge color="gray-light" size="xs"> Avant </BaseBadge>
            <div class="text-gray-500 italic mt-2">
              {{ change.before || '-' }}
            </div>
          </div>
          <div>
            <BaseBadge color="gray-light" size="xs"> Après </BaseBadge>
            <div class="text-gray-500 italic mt-2">
              {{ change.after || '-' }}
            </div>
          </div>
        </div>
      </BaseDisclosure>
    </BaseBox>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    activityLog: {
      type: Object,
      required: true,
    },
    showAction: {
      type: Boolean,
      default: true,
    },
    linkLabel: {
      type: String,
      default: 'Consulter',
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
    boxVariant: {
      type: [String],
      default: 'flat',
    },
    boxPadding: {
      type: [String, Boolean],
      default: 'xs',
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    uselessProperties() {
      return [
        'user_id',
        'latitude',
        'longitude',
        'country',
        'api_id',
        'updated_at',
        'commitment__total',
      ]
    },
    changes() {
      return this.formatChanges(this.activityLog)
    },
  },
  methods: {
    formatChanges(activityLog) {
      const changes = []

      if (!activityLog?.properties?.attributes) {
        return changes
      }

      for (const [key, value] of Object.entries(activityLog.properties.attributes)) {
        if (this.uselessProperties.includes(key)) {
          continue
        }
        if (!activityLog.properties.old && !value) {
          // Valeurs vides
          continue
        }
        changes.push({
          property: this.formatPropertyLabel(key),
          after: value,
          before: activityLog.properties.old && activityLog.properties.old[key],
        })
      }
      return changes
    },
    formatPropertyLabel(property) {
      switch (property) {
        case 'created_at':
          return 'Crée le'
        case 'updated_at':
          return 'Modifié le'
        case 'state':
          return 'Statut'
        case 'responsable_id':
          return 'Responsable'
        case 'name':
          return 'Nom'
        case 'description':
          return 'Précisions'
        case 'objectif':
          return 'Présentation'
        case 'information':
          return 'Mots pour les bénévoles'
        case 'address':
          return 'Adresse'
        case 'zip':
          return 'Code postal'
        case 'department':
          return 'Département'
        case 'structure_id':
          return 'Organisation'
        case 'participations_max':
          return 'Nombre de bénévoles recherchés'
        case 'tuteur_id':
          return 'Tuteur'
        case 'publics_beneficiaires':
          return 'Publics bénéficiaires'
        case 'publics_volontaires':
          return 'Publics volontaires'
        case 'is_snu_mig_compatible':
          return 'SNU MIG'
        case 'snu_mig_places':
          return 'Places SNU'
        case 'template_id':
          return 'Template de mission'
        case 'statut_juridique':
          return 'Statut juridique'
        case 'city':
          return 'Ville'
        case 'dates_infos':
          return 'Information sur la date'
        case 'color':
          return 'Couleur'
        case 'association_types':
          return 'Agréments'
        case 'first_name':
          return 'Prénom'
        case 'last_name':
          return 'Nom'
        case 'reseau_id':
          return 'Réseau'
        case 'mobile':
          return 'Mobile'
        case 'phone':
          return 'Téléphone'
        case 'email':
          return 'E-mail'
        case 'can_export_profiles':
          return 'Peut exporter les utilisateurs'
        case 'referent_department':
          return 'Référent départemental'
        case 'referent_region':
          return 'Référent régional'
        case 'disponibilities':
          return 'Disponibilités'
        case 'commitment__duration':
          return "Durée d'engagement"
        case 'commitment__time_period':
          return "Période d'engagement"
        case 'start_date':
          return 'Date de début'
        case 'end_date':
          return 'Date de fin'
        case 'is_visible':
          return 'Visibilité'
        case 'suffix_title':
          return 'Sous-titre'
        case 'from_id':
          return "Depuis l'ID"
        case 'places_left':
          return 'Places restantes'
        case 'activity_id':
          return 'Activité'
        case 'domaine_id':
          return 'Domaine principal'
        case 'domaine_secondary_id':
          return 'Domaine secondaire'
        case 'is_published':
          return 'En ligne'
        case 'slug':
          return 'Alias URL'
        case 'website':
          return 'Site internet'
        case 'autonomy_zips':
          return 'Autonomie - Codes postaux'
        case 'autonomy_precisions':
          return 'Autonomie - Précisions'
        case 'date_type':
          return 'Type de dates'
        case 'recurrent_description':
          return 'Récurrent - Description'
        case 'is_autonomy':
          return 'Autonomie'
        case 'notification__responsable_frequency':
          return 'Fréquence notif. responsable'
        case 'notification__responsable_bilan':
          return 'Bilan notif. responsable'
        case 'notification__referent_frequency':
          return 'Fréquence notif. referent'
        case 'notification__referent_bilan':
          return 'Bilan notif. referent'
        case 'birthday':
          return 'Date de naissance'
        case 'utm_source':
          return 'UTM source'
        case 'utm_medium':
          return 'UTM medium'
        case 'utm_campaign':
          return 'UTM campaign'
        case 'profile_id':
          return 'Profile ID'
        case 'mission_id':
          return 'Mission ID'
        case 'seo_engage_paragraphs':
          return 'SEO'
        case 'is_active':
          return 'Actif'
        case 'is_registration_open':
          return 'Inscription ouverte'
        case 'activity_secondary_id':
          return 'Activité secondaire'
      }
      return property.charAt(0).toUpperCase() + property.slice(1)
    },
  },
})
</script>
