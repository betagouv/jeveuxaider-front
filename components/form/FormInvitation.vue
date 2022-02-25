<template>
  <div>
    <form id="form-invitation" @submit.prevent="handleSubmit">
      <FormControl
        v-if="!role"
        class="mb-6"
        label="Rôle"
        html-for="role"
        required
      >
        <SelectAdvanced
          v-model="form.role"
          name="role"
          placeholder="Sélectionner un rôle"
          :options="[
            {key :'referent_departemental',label:'Référent Départemental'},
            {key :'referent_regional',label:'Référent Régional'}
          ]"
        />
      </FormControl>
      <FormControl
        v-if="form.role == 'referent_departemental'"
        class="mb-6"
        label="Département"
        html-for="referent_departemental"
        required
      >
        <SelectAdvanced
          v-model="form.properties.referent_departemental"
          name="referent_departemental"
          placeholder="Sélectionner un département"
          :options="$labels.departments"
        />
      </FormControl>
      <FormControl
        v-if="form.role == 'referent_regional'"
        class="mb-6"
        label="Région"
        html-for="referent_regional"
        required
      >
        <SelectAdvanced
          v-model="form.properties.referent_regional"
          name="referent_regional"
          placeholder="Sélectionner une région"
          :options="$labels.regions"
        />
      </FormControl>
      <FormControl
        label="E-mail"
        html-for="email"
        required
      >
        <Input
          v-model="form.email"
          name="email"
          type="email"
          required
          placeholder="E-mail"
        />
      </FormControl>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    role: {
      type: String,
      default: null
    },
    invitableId: {
      type: Number,
      default: null
    },
    invitableType: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      form: {
        user_id: this.$store.getters.profile.user_id,
        role: this.role,
        invitable_id: this.invitableId,
        invitable_type: this.invitableType,
        properties: {}
      }
    }
  },
  methods: {
    async handleSubmit () {
      const res = await this.$axios.post('/invitations', this.form).catch((errors) => {
        console.log('errors', errors)
      })
      if (res?.data) {
        this.$emit('submited', res.data)
      }
    }
  }
}
</script>
