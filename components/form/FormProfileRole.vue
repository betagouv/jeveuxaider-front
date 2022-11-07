<template>
  <form id="form-roles" class="mt-8 space-y-4" @submit.prevent="handleSubmit">
    <FormControl
      label="Séléctionnez le rôle"
      html-for="role"
      required
      :error="errors.role"
    >
      <SelectAdvanced
        v-model="form.role"
        name="role"
        placeholder="Ex: Référent"
        :options="[
          { key: 'referent', label: 'Référent' },
          { key: 'referent_regional', label: 'Référent régionnal' },
        ]"
      />
    </FormControl>
    <FormControl
      v-if="form.role == 'referent'"
      label="Séléctionnez le département"
      html-for="department"
      required
      :error="errors.department"
    >
      <SelectAdvanced
        v-model="form.department"
        name="department"
        placeholder="Ex: Ardennes"
        :options="$labels.departments"
      />
    </FormControl>
    <FormControl
      v-if="form.role == 'referent_regional'"
      label="Séléctionnez la région"
      html-for="region"
      required
      :error="errors.region"
    >
      <SelectAdvanced
        v-model="form.region"
        name="region"
        placeholder="Ex: Normandie"
        :options="$labels.regions"
      />
    </FormControl>
  </form>
</template>

<script>
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default {
  mixins: [FormErrors],
  props: {
    profile: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      formSchema: object({
        role: string().required('Le rôle est requis'),
        department: string().nullable().when(['role'], {
          is: role => role == 'referent',
          then: schema => schema.required('Le département est requis')
        }),
        region: string().nullable().when(['role'], {
          is: role => role == 'referent_regional',
          then: schema => schema.required('La région est requise')
        })
      }),
      form: {}
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
          await this.$axios.post(`/users/${this.profile.user_id}/roles`, this.form)
            .catch(() => {})
          await this.$store.dispatch('auth/fetchUser')
          this.$emit('submited')
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
