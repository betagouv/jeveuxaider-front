<template>
  <div>
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div class="lg:col-span-3 space-y-12">
        <Box>
          <Heading :level="3" class="mb-8">
            Paramétrages
          </Heading>
          <div class="space-y-10">
            <FormControl
              label="Déclencheurs"
              html-for="events"
              required
              :error="errors.events"
            >
              <CheckboxGroup
                v-model="form.events"
                name="events"
                variant="button"
                :options="$labels.rule_events"
              />
            </FormControl>
            <FormControl
              label="Conditions"
              html-for="conditions"
              :error="errors.conditions"
              required
            >
              <RuleConditions
                :available-condition-fields="[
                  {key:'domaines', label: 'Domaines'},
                  {key:'activities', label: 'Activities'}
                ]"
                :conditions="form.conditions"
                empty-text="Aucune condition"
                add-button-label="Ajouter une condition"
                @add="onParagraphAddItem('conditions', $event)"
                @update="onParagraphUpdateItem('conditions', $event)"
                @remove="onParagraphRemoveItem('conditions', $event)"
              />
            </FormControl>
            {{ form.conditions }}
            <FormControl
              label="Actions"
              html-for="actions"
              :error="errors.actions"
              required
            >
              <RuleActions
                :available-action-fields="[
                  {key:'attach_tag', label: 'Ajouter un tag'},
                  {key:'detach_tag', label: 'Retirer un tag'}
                ]"
                :actions="form.actions"
                empty-text="Aucune action"
                add-button-label="Ajouter une action"
                @add="onParagraphAddItem('actions', $event)"
                @update="onParagraphUpdateItem('actions', $event)"
                @remove="onParagraphRemoveItem('actions', $event)"
              />
            </FormControl>
            {{ form.actions }}
          </div>
        </Box>
      </div>
      <div class="lg:col-span-2 space-y-8">
        <Box padding="sm">
          <Heading :level="3" class="mb-8">
            Informations
          </Heading>
          <div class="space-y-10">
            <Toggle
              v-model="form.is_active"
              :label="form.is_active ? 'Active' : 'Inactive'"
              description="dsfsdfsdffds"
            />
            <FormControl
              html-for="name"
              label="Nom"
              required
              :error="errors.name"
            >
              <Input
                v-model="form.name"
                name="name"
                placeholder="Nom de l'action"
              />
            </FormControl>
          </div>
        </Box>
      </div>
    </div>
    <div class="border-t my-8 pt-8 lg:pt-12 lg:my-12">
      <div class="flex flex-col gap-2 flex-shrink-0 items-center justify-center">
        <Button size="xl" variant="green" :loading="loading" @click.native="handleSubmit()">
          Enregistrer
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import { string, object, array } from 'yup'
import FormErrors from '@/mixins/form/errors'
import FormParagraphs from '@/mixins/form/paragraphs'
import RuleConditions from '@/components/custom/RuleConditions.vue'
import RuleActions from '@/components/custom/RuleActions.vue'

export default {
  components: {
    RuleConditions,
    RuleActions
  },
  mixins: [FormErrors, FormParagraphs],
  middleware: 'admin',
  props: {
    rule: {
      type: Object,
      default: () => {
        return {
          is_active: true
        }
      }
    }
  },
  data () {
    return {
      loading: false,
      form: { ...this.rule },
      formSchema: object({
        name: string().min(2, 'Le nom est trop court').required('Le nom est requis'),
        events: array().min(1, 'Au moins 1 déclencheur').required('Ajouter au moins 1 déclencheur'),
        conditions: array().min(1, 'Au moins 1 condition').required('Ajouter au moins 1 condition'),
        actions: array().min(1, 'Au moins 1 actions').required('Ajouter au moins 1 action')
      })
    }
  },
  methods: {
    async handleSubmit () {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          if (this.form.id) {
            await this.$axios.put(`/rules/${this.form.id}`, this.form)
          } else {
            const { data: action } = await this.$axios.post('/rules', this.form)
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
    }
  }
}
</script>
