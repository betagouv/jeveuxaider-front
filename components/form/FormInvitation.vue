<template>
  <div>
    <form id="form-invitation" novalidate @submit.prevent="handleSubmit">
      <BaseFormControl v-if="!role" class="mb-6" label="Rôle" html-for="role" required>
        <BaseSelectAdvanced
          v-model="form.role"
          name="role"
          placeholder="Sélectionner un rôle"
          :options="[
            { key: 'referent_departemental', label: 'Référent Départemental' },
            { key: 'referent_regional', label: 'Référent Régional' },
          ]"
        />
      </BaseFormControl>
      <BaseFormControl
        v-if="form.role == 'referent_departemental'"
        class="mb-6"
        label="Département"
        html-for="referent_departemental"
        required
      >
        <BaseSelectAdvanced
          v-model="form.properties.referent_departemental"
          name="referent_departemental"
          placeholder="Sélectionner un département"
          :options="
            $labels.departments.map((item) => {
              return { key: item.key, label: `${item.key} - ${item.label}` }
            })
          "
        />
      </BaseFormControl>
      <BaseFormControl
        v-if="form.role == 'responsable_antenne'"
        class="mb-6"
        label="Nom de l'antenne de votre réseau"
        html-for="antenne_name"
        required
      >
        <BaseAlert>
          Indiquer en minuscules le nom du réseau suivi de la localisation de votre antenne.
          <br />Ex : Banque Alimentaire du Nord
        </BaseAlert>
        <BaseInput
          v-model="form.properties.antenne_name"
          class="!mt-2"
          name="antenne_name"
          placeholder="Ex : Banque Alimentaire du Nord"
          required
        />
      </BaseFormControl>
      <BaseFormControl
        v-if="form.role == 'referent_regional'"
        class="mb-6"
        label="Région"
        html-for="referent_regional"
        required
      >
        <BaseSelectAdvanced
          v-model="form.properties.referent_regional"
          name="referent_regional"
          placeholder="Sélectionner une région"
          :options="$labels.regions"
        />
      </BaseFormControl>
      <BaseFormControl
        :label="form.role == 'responsable_antenne' ? 'E-mail du responsable' : 'E-mail'"
        html-for="email"
        required
      >
        <BaseInput v-model="form.email" name="email" type="email" required placeholder="E-mail" />
      </BaseFormControl>
    </form>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    role: {
      type: String,
      default: null,
    },
    invitableId: {
      type: Number,
      default: null,
    },
    invitableType: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      form: {
        user_id: this.$stores.auth.profile.user_id,
        role: this.role,
        invitable_id: this.invitableId,
        invitable_type: this.invitableType,
        properties: {},
      },
    }
  },
  methods: {
    async handleSubmit() {
      await apiFetch('/invitations', {
        method: 'POST',
        body: this.form,
      })
        .then((res) => {
          this.$toast.success("L'invitation a bien été envoyée")
          this.$emit('submited', res)
        })
        .catch((errors) => {
          console.log('errors', errors)
        })
    },
  },
})
</script>
