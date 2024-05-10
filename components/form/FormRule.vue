<template>
  <div>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div class="lg:col-span-8 space-y-12">
        <BaseBox>
          <BaseHeading :level="3" class="mb-8"> Paramétrages </BaseHeading>
          <div class="space-y-10">
            <BaseFormControl label="Déclencheur" html-for="event" required :error="errors.event">
              <BaseSelectAdvanced
                v-model="form.event"
                name="event"
                :options="$labels.rule_events"
                placeholder="Sélectionnez un déclencheur"
              />
            </BaseFormControl>
            <BaseFormControl
              label="Conditions"
              html-for="conditions"
              :error="errors.conditions"
              required
            >
              <InputQueryBuilder
                :model-value="form.conditions"
                :condition-field-options="conditionsOptions"
                @update:modelValue="(newValue) => (form.conditions = newValue)"
              />
            </BaseFormControl>
            <BaseFormControl
              label="Nom de l'action"
              html-for="action_key"
              :error="errors.action_key"
              required
            >
              <BaseSelectAdvanced
                v-model="form.action_key"
                name="action_key"
                :options="$labels.rule_actions"
              />
            </BaseFormControl>
            <BaseFormControl
              label="Valeur à traiter"
              html-for="action_value"
              :error="errors.action_value"
              required
            >
              <BaseInput
                v-model="form.action_value"
                name="action_value"
                :options="$labels.rule_actions"
                placeholder="ID du tag"
              />
            </BaseFormControl>
          </div>
        </BaseBox>
      </div>
      <div class="lg:col-span-4 space-y-8">
        <BaseBox padding="sm">
          <BaseHeading :level="3" class="mb-8"> Informations </BaseHeading>
          <div class="space-y-10">
            <BaseToggle
              v-model="form.is_active"
              :label="form.is_active ? 'Active' : 'Inactive'"
              :description="
                form.is_active ? 'La règle sera exécutée' : 'La règle ne sera plus exécutée'
              "
            />
            <BaseFormControl html-for="name" label="Nom" required :error="errors.name">
              <BaseInput v-model="form.name" name="name" placeholder="Nom de l'action" />
            </BaseFormControl>
          </div>
        </BaseBox>
      </div>
    </div>
    <div class="border-t my-8 pt-8 lg:pt-12 lg:my-12">
      <div class="flex flex-col gap-2 flex-shrink-0 items-center justify-center">
        <BaseButton size="xl" variant="green" :loading="loading" @click.native="handleSubmit()">
          Enregistrer
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import { string, object, array } from 'yup'
import FormErrors from '@/mixins/form/errors'
import InputQueryBuilder from '@/components/custom/InputQueryBuilder.vue'
import activitiesOptions from '@/assets/activities.json'

export default defineNuxtComponent({
  components: {
    InputQueryBuilder,
  },
  mixins: [FormErrors],
  props: {
    rule: {
      type: Object,
      default: () => {
        return {
          is_active: false,
          event: 'none',
          action_key: 'mission_attach_tag',
        }
      },
    },
  },
  data() {
    return {
      loading: false,
      form: { ...this.rule },
      formSchema: object({
        name: string().min(2, 'Le nom est trop court').required('Le nom est requis'),
        event: string().required('Préciser le déclencheur').nullable(),
        conditions: array().min(1, 'Au moins 1 condition').required('Ajouter au moins 1 condition'),
        action_key: string().required("Préciser l'action à exécuter"),
        action_value: string().required('Préciser la valeur à exécuter'),
      }),
      activitiesOptions: activitiesOptions.sort((a, b) => a.name.localeCompare(b.name)),
    }
  },
  computed: {
    conditionsOptions() {
      return [
        {
          key: 'missions.domaine_id',
          label: 'Domaine principal',
          type: 'select',
          options: this.$labels.domaines,
          operands: [
            { key: '=', label: '=' },
            { key: '!=', label: '!=' },
          ],
        },
        {
          key: 'missions.domaine_secondary_id',
          label: 'Domaine secondaire',
          type: 'select',
          options: this.$labels.domaines,
          operands: [
            { key: '=', label: '=' },
            { key: '!=', label: '!=' },
          ],
        },
        {
          key: 'missions.activity_id',
          label: 'Activité',
          type: 'select',
          options: activitiesOptions,
          operands: [
            { key: '=', label: '=' },
            { key: '!=', label: '!=' },
          ],
        },
        {
          key: 'missions.activity_secondary_id',
          label: 'Activité secondaire',
          type: 'select',
          options: activitiesOptions,
          operands: [
            { key: '=', label: '=' },
            { key: '!=', label: '!=' },
          ],
        },
        {
          key: 'missions.template_id',
          label: 'Modèle de mission',
          type: 'input',
          operands: [
            { key: '=', label: '=' },
            { key: '!=', label: '!=' },
          ],
        },
        {
          key: 'missions.state',
          label: 'Statut',
          type: 'select',
          options: this.$labels.mission_workflow_states,
          operands: [
            { key: '=', label: '=' },
            { key: '!=', label: '!=' },
          ],
        },
        {
          key: 'missions.publics_beneficiaires',
          label: 'Publics aidés',
          type: 'select',
          options: this.$labels.mission_publics_beneficiaires,
          operands: [
            { key: '=', label: '=' },
            { key: '!=', label: '!=' },
          ],
        },
        {
          key: 'missions.publics_volontaires',
          label: 'Mission ouverte aux',
          type: 'select',
          options: this.$labels.mission_publics_volontaires,
          operands: [
            { key: '=', label: '=' },
            { key: '!=', label: '!=' },
          ],
        },
        {
          key: 'missions.name',
          label: 'Nom de la mission',
          type: 'input',
          operands: [
            { key: '=', label: '=' },
            { key: '!=', label: '!=' },
            { key: 'ilike', label: 'Contient' },
          ],
        },
        {
          key: 'missions.reseau_id',
          label: 'Réseau',
          type: 'input',
          placeholder: 'ID du réseau',
          operands: [
            { key: '=', label: '=' },
            { key: '!=', label: '!=' },
          ],
        },
        {
          key: 'missions.start_date',
          label: 'Date de début',
          type: 'date',
          operands: [
            { key: '=', label: '=' },
            { key: '>', label: '>' },
            { key: '>=', label: '>=' },
            { key: '<', label: '<' },
            { key: '<=', label: '<=' },
          ],
        },
        {
          key: 'missions.end_date',
          label: 'Date de fin',
          type: 'date',
          operands: [
            { key: '=', label: '=' },
            { key: '>', label: '>' },
            { key: '>=', label: '>=' },
            { key: '<', label: '<' },
            { key: '<=', label: '<=' },
          ],
        },
        {
          key: 'missions.tags',
          label: 'Tag de mission',
          type: 'input',
          operands: [
            { key: '=', label: '=' },
            { key: '!=', label: '!=' },
          ],
        },
      ].sort((a, b) => a.label.localeCompare(b.label))
    },
  },
  methods: {
    async handleSubmit() {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          if (this.form.id) {
            await apiFetch(`/rules/${this.form.id}`, {
              method: 'PUT',
              body: this.form,
            })
          } else {
            const action = await apiFetch('/rules', {
              method: 'POST',
              body: this.form,
            })
            this.form.id = action.id
          }
          this.$emit('submitted')
          this.$toast.success('La règle a bien été enregistrée !')
          this.$router.push('/admin/settings/rules')
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
})
</script>
