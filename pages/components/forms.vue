<template>
  <CustomBox>
    <form class="space-y-8" @submit="onSubmit">
      <BaseInput v-model="form.firstname" name="firstname" label="Prénom" placeholder="Votre prénom" required />
      <BaseInput v-model="form.lastname" name="lastname" label="Nom" placeholder="Votre nom" required />
      <BaseInput v-model="form.email" name="email" label="Email" placeholder="Votre email" required />
      <BaseInput v-model="form.phone" name="phone" label="Téléphone" label-suffix="(facultatif)" placeholder="Votre téléphone" />
      <BaseButton type="submit">
        Submit
      </BaseButton>
    </form>
  </CustomBox>
</template>

<script>
export default {
  layout: 'components',
  data () {
    return {
      form: {}
    }
  },
  methods: {
    onSubmit (e) {
      e.preventDefault()
      console.log('onSubmit', this.form)
    }
  }
}
</script>
