<template>
  <div v-if="queryActivityLogs && queryActivityLogs.total > 0" class="text-sm space-y-2">
    <Box v-for="activity in queryActivityLogs.data" :key="activity.id" variant="flat" padding="xs">
      <div class="font-medium">
        {{ activity.data.full_name }}
      </div>
      <div class="text-gray-500 mb-4">
        {{ formatActionLabel(activity) }}
      </div>
      <div class="flex space-y-2 flex-col">
        <Disclosure v-for="change in changes(activity)" :key="change.property">
          <template #button="{ isOpen }">
            <div class="flex font-semibold text-sm items-center group">
              <div class="flex-shrink-0 group-hover:text-gray-600">
                {{ change.property }}
              </div>
              <div class="w-full border-t mt-1 ml-2 -mr-1" />
              <MinusCircleIcon v-if="isOpen" class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
              <PlusCircleIcon v-else class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
            </div>
          </template>
          <div class="mt-3 space-y-3">
            <div>
              <Badge color="gray-light" size="xs">
                Avant
              </Badge>
              <div class="text-gray-500 italic mt-2">
                {{ change.before || '-' }}
              </div>
            </div>
            <div>
              <Badge color="gray-light" size="xs">
                Après
              </Badge>
              <div class="text-gray-500 italic mt-2">
                {{ change.after || '-' }}
              </div>
            </div>
          </div>
        </Disclosure>
      </div>
    </Box>
  </div>
  <div v-else>
    <Box variant="flat" padding="xs" class="text-sm">
      Aucun historique disponible
    </Box>
  </div>
</template>

<script>
export default {
  props: {
    modelId: {
      type: Number,
      required: true
    },
    modelType: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      queryActivityLogs: null
    }
  },
  async fetch () {
    const { data: queryActivityLogs } = await this.$axios.get('/activity-logs', {
      params: {
        'filter[subject_id]': this.modelId,
        'filter[subject_type]': this.modelType
      }
    })
    this.queryActivityLogs = queryActivityLogs
  },
  computed: {
    uselessProperties () {
      return ['user_id', 'latitude', 'longitude', 'country', 'api_id', 'updated_at', 'commitment__total']
    }
  },
  methods: {
    formatActionLabel (activity) {
      let label = 'Crée le '
      if (activity.description == 'updated') {
        label = 'Modifiée le '
      } else if (activity.description == 'duplicated') {
        label = 'Dupliquée le '
      }
      label = label + this.$dayjs(activity.created_at).format('D MMM YYYY')
      return label
    },
    formatPropertyLabel (property) {
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
          return 'Peut exporter les profils'
        case 'tete_de_reseau_id':
          return 'Tête de réseau'
        case 'referent_department':
          return 'Référent départemental'
        case 'referent_region':
          return 'Référent régional'
        case 'disponibilities':
          return 'Disponibilités'
        case 'commitment__duration':
          return 'Durée d\'engagement'
        case 'commitment__time_period':
          return 'Période d\'engagement'
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
      }
      return property.charAt(0).toUpperCase() + property.slice(1)
    },
    changes (activity) {
      const changes = []
      for (const [key, value] of Object.entries(activity.properties.attributes)) {
        if (this.uselessProperties.includes(key)) {
          continue
        }
        if (!activity.properties.old && !value) { // Valeurs vides
          continue
        }
        changes.push({
          property: this.formatPropertyLabel(key),
          after: value,
          before: activity.properties.old && activity.properties.old[key]
        })
      }
      return changes
    }
  }

}
</script>
