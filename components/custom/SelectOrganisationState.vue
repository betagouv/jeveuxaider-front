<template>
  <div>
    <BaseSelectWithDescription
      :options="statesAvailable"
      :modelValue="organisation.state"
      @selected="handleSelect($event)"
    />
    <ModalOrganisationValidate
      :organisation="organisation"
      :is-open="showModalValidate"
      @cancel="showModalValidate = false"
      @confirm="handleConfirmDialog()"
    />
    <ModalOrganisationReport
      :organisation="organisation"
      :is-open="showModalReport"
      @cancel="showModalReport = false"
      @confirm="handleConfirmDialog()"
    />
    <BaseAlertDialog
      theme="warning"
      title="Changement de statut"
      :text="textAlert"
      :is-open="showAlert"
      @confirm="handleConfirmDialog()"
      @cancel="showAlert = false"
    />
  </div>
</template>

<script>
export default defineNuxtComponent({
  emits: ['selected'],
  components: {},
  props: {
    organisation: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selected: null,
      showAlert: false,
      showModalValidate: false,
      showModalReport: false,
    }
  },
  computed: {
    statesAvailable() {
      if (this.$stores.auth.contextRole === 'admin') {
        return this.$labels.structure_workflow_states
      }
      const toStates = this.$filters.label(
        this.organisation.state,
        'structure_workflow_states',
        'to'
      )
      return this.$labels.structure_workflow_states.filter((state) => toStates.includes(state.key))
    },
    textAlert() {
      let output = ''
      switch (this.selected?.key) {
        case 'Brouillon':
          output = "Vous êtes sur le point de passer l'organisation au statut <b>brouillon</b>."
          break
        case 'En attente de validation':
          output =
            "Vous êtes sur le point de passer l'organisation au statut <b>en attente de validation</b>."
          break
        case 'En cours de traitement':
          output =
            "Vous êtes sur le point de passer l'organisation au statut <b>en cours de traitement</b>."
          break
        case 'Désinscrite':
          output = `
            Vous êtes sur le point de <b>désinscrire</b> cette organisation.<br><br>
            <ul>
            <li>- Tous les responsables seront exclues de l'organisation.</li>
            <li>- Les missions “En attente de validation” seront passées en “Annulée”.</li>
            <li>- Les missions “Validée” dont la date de fin est passée bascule au statut “Terminée”</li>
            <li>- Les missions “Validée” dont la date de fin n’est pas passée bascule au statut “Annulée”</li>
            </ul>
          `
          break
      }
      return output
    },
  },
  methods: {
    handleSelect($event) {
      this.selected = $event
      switch (this.selected.key) {
        case 'Validée':
          this.showModalValidate = true
          break
        case 'Signalée':
          this.showModalReport = true
          break
        default:
          this.showAlert = true
          break
      }
    },
    handleConfirmDialog() {
      this.$emit('selected', this.selected)
      this.showAlert = false
      this.showModalValidate = false
      this.showModalReport = false
    },
  },
})
</script>
