<template>
  <form id="form" class="my-8" @submit.prevent="onSubmit">
    <FormControl class="mb-8" label="E-mail" html-for="email" required>
      <Input
        v-model="form.email"
        type="email"
        name="email"
        placeholder="Entrez votre email"
        required
        disabled
      />
    </FormControl>
    <FormControl label="Mot de passe" html-for="password" required>
      <Input
        v-model="form.password"
        name="password"
        placeholder="Entrez votre mot de passe"
        type="password"
        required
      />
    </FormControl>

    <div class="my-4">
      <nuxt-link
        to="/password-reset"
        class="text-jva-blue-500 text-sm hover:underline"
      >
        Mot de passe perdu ?
      </nuxt-link>
    </div>
    <Button
      type="submit"
      size="xl"
      variant="green"
      full
      :loading="loading"
    >
      J'accepte l'invitation
    </Button>
  </form>
</template>

<script>

export default {
  props: {
    invitation: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      form: {
        email: this.invitation.email
      }
    }
  },
  methods: {
    async onSubmit () {
      this.loading = true
      await this.$store.dispatch('auth/login', this.form).catch((err) => {
        console.log(err)
      })
      if (this.$store.getters.isLogged) {
        this.$emit('submitted')
      }
    }
  }
}
</script>
