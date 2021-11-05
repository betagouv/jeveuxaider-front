<template>
  <div>
    <CustomBox title="Description de la mission">
      <form id="form" class="space-y-8" @submit="onSubmit">
        <BaseInput
          v-model="form.name"
          name="name"
          label="Titre de la mission"
          placeholder="Titre de la mission"
          required
          description="Le titre de la mission doit être une phrase qui précise l'action du bénévole."
        />
        <BaseSelect
          v-model="form.state"
          name="state"
          label="Statut"
          placeholder="Statut de la mission"
          required
        />
        <div class="flex space-x-8">
          <BaseInput
            v-model="form.firstname"
            name="firstname"
            label="Prénom"
            placeholder="Votre prénom"
            class="w-1/2"
            required
          />
          <BaseInput
            v-model="form.lastname"
            name="lastname"
            label="Nom"
            placeholder="Votre nom"
            class="w-1/2"
            required
          />
        </div>
        <div class="flex space-x-8">
          <BaseInput
            v-model="form.password"
            name="password"
            label="Mot de passe"
            placeholder="Votre mot de passe"
            type="password"
            class="w-1/2"
            required
          />
          <BaseInput
            v-model="form.password_confirm"
            name="password_confirm"
            label="Confirmation du mot de passe"
            placeholder="Votre mot de passe"
            type="password"
            class="w-1/2"
            required
          />
        </div>
        <BaseInput v-model="form.phone" name="phone" label="Téléphone" label-suffix="(facultatif)" placeholder="Votre téléphone" />
        <BaseTextarea v-model="form.description" name="description" label="Présentation de la mission" placeholder="Décrivez votre mission en quelques mots..." required />
      </form>
    </CustomBox>
    <div class="flex mt-12 space-x-6 justify-end">
      <BaseButton variant="white">
        Save as draft
      </BaseButton>
      <BaseButton type="submit" variant="primary-green" form="form">
        Submit
      </BaseButton>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'components',
  data () {
    return {
      form: {
        firstname: 'Nicolas'
      }
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
