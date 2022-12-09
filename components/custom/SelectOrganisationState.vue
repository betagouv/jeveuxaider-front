<template>
  <div>
    <SelectWithDescription :options="statesAvailable" :value="value" @selected="handleSelect($event)" />
    <AlertDialog
      theme="warning"
      :title="titleAlert"
      :text="textAlert"
      :is-open="showAlert"
      @confirm="handleConfirmDialog()"
      @cancel="showAlert = false"
    />
  </div>
</template>

<script>

export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      selected: null,
      showAlert: false,
      titleAlert: '',
      textAlert: ''
    }
  },
  computed: {
    statesAvailable () {
      if (this.$store.getters.contextRole === 'admin') {
        return this.$labels.structure_workflow_states
      }
      const toStates = this.$options.filters.label(this.value, 'structure_workflow_states', 'to')
      return this.$labels.structure_workflow_states.filter(state => toStates.includes(state.key))
    }
  },
  methods: {
    handleConfirmDialog () {
      this.$emit('selected', this.selected)
      this.showAlert = false
    },
    handleSelect ($event) {
      this.titleAlert = 'Changement de statut'

      if ($event.key == 'Brouillon') {
        this.textAlert = 'Vous êtes sur le point de passer l\'organisation au statut <b>brouillon</b>.'
      }

      if ($event.key == 'En attente de validation') {
        this.textAlert = 'Vous êtes sur le point de passer l\'organisation au statut <b>en attente de validation</b>.'
      }

      if ($event.key == 'En cours de traitement') {
        this.textAlert = 'Vous êtes sur le point de passer l\'organisation au statut <b>en cours de traitement</b>.'
      }

      if ($event.key == 'Validée') {
        this.textAlert = 'Vous êtes sur le point de <b>valider</b> cette organisation. Ses missions seront disponibles dans la recherche.'
      }

      if ($event.key == 'Signalée') {
        this.textAlert = 'Vous êtes sur le point de <b>signaler</b> cette organisation qui ne répond pas aux exigences de la charte ou des règles fixés par le Décret n° 2017-930 du 9 mai 2017 relatif à la Réserve Civique. Ses missions seront également signalées et toutes les participations déjà effectuées seront annulées.'
      }

      if ($event.key == 'Désinscrite') {
        this.textAlert = `
          Vous êtes sur le point de <b>désinscrire</b> cette organisation.<br><br>
          <ul>
          <li>- Tous les responsables seront exclues de l'organisation.</li>
          <li>- Les missions “En attente de validation” seront passées en “Annulée”.</li>
          <li>- Les missions “Validée” dont la date de fin est passée bascule au statut “Terminée”</li>
          <li>- Les missions “Validée” dont la date de fin n’est pas passée bascule au statut “Annulée”</li>
          </ul>
        `
      }

      this.selected = $event
      this.showAlert = true
    }
  }
}
</script>
