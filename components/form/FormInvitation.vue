<template>
  <div>
    <form id="form-invitation" @submit.prevent="handleSubmit">
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
        invitable_type: this.invitableType
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
