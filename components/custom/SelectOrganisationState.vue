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
      icon="RiErrorWarningLine"
      title="Changement de statut"
      :is-open="showAlert"
      @confirm="handleConfirmDialog()"
      @cancel="showAlert = false"
    >
      <template v-if="selected">
        <template v-if="selected.key === 'Brouillon'">
          <p>Vous êtes sur le point de passer l'organisation au statut <b>brouillon</b>.</p>
        </template>

        <template v-else-if="selected.key === 'En attente de validation'">
          <p>
            Vous êtes sur le point de passer l'organisation au statut
            <b>en attente de validation</b>.
          </p>
        </template>

        <template v-else-if="selected.key === 'En cours de traitement'">
          <p>
            Vous êtes sur le point de passer l'organisation au statut <b>en cours de traitement</b>.
          </p>
        </template>

        <template v-else-if="selected.key === 'Désinscrite'">
          <p>Vous êtes sur le point de <b>désinscrire</b> cette organisation.<br /><br /></p>
          <ul>
            <li>- Tous les responsables seront exclues de l'organisation.</li>
            <li>- Les missions “En attente de validation” seront passées en “Annulée”.</li>
            <li>
              - Les missions “Validée” dont la date de fin est passée basculent au statut “Terminée”
            </li>
            <li>
              - Les missions “Validée” dont la date de fin n’est pas passée basculent au statut
              “Annulée”
            </li>
          </ul>
        </template>
      </template>
    </BaseAlertDialog>
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
      if (['admin'].includes(this.$stores.auth.contextRole)) {
        return this.$labels.structure_workflow_states
      }
      const toStates = this.$filters.label(
        this.organisation.state,
        'structure_workflow_states',
        'to'
      )
      return this.$labels.structure_workflow_states.filter((state) => toStates.includes(state.key))
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
