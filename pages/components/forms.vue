<template>
  <div>
    <Box title="Description de la mission">
      <form id="form" class="space-y-8" @submit="onSubmit">
        <Input
          v-model="form.name"
          name="name"
          label="Titre de la mission"
          placeholder="Titre de la mission"
          required
          description="Le titre de la mission doit être une phrase qui précise l'action du bénévole."
        />
        <Select
          v-model="form.state"
          name="state"
          label="Statut"
          placeholder="Statut de la mission"
          :options="[
            {key: 'draft', label:'Brouillon'},
            {key: 'waiting', label:'En attente de validation'},
            {key: 'validated', label:'Validée'}
          ]"
          required
        />
        <div class="flex space-x-8">
          <Input
            v-model="form.firstname"
            name="firstname"
            label="Prénom"
            placeholder="Votre prénom"
            class="w-1/2"
            required
          />
          <Input
            v-model="form.lastname"
            name="lastname"
            label="Nom"
            placeholder="Votre nom"
            class="w-1/2"
            required
          />
        </div>
        <div class="flex space-x-8">
          <Input
            v-model="form.password"
            name="password"
            label="Mot de passe"
            placeholder="Votre mot de passe"
            type="password"
            class="w-1/2"
            required
          />
          <Input
            v-model="form.password_confirm"
            name="password_confirm"
            label="Confirmation du mot de passe"
            placeholder="Votre mot de passe"
            type="password"
            class="w-1/2"
            required
          />
        </div>
        <Input v-model="form.phone" name="phone" label="Téléphone" label-suffix="(facultatif)" placeholder="Votre téléphone" />
        <Textarea v-model="form.description" name="description" label="Présentation de la mission" placeholder="Décrivez votre mission en quelques mots..." required />
        <CheckboxGroup
          v-model="form.notifications"
          label="Notifications"
          name="notifications"
          :options="[
            {key: 'comments', label:'Comments', description :'Get notified when someones posts a comment on a posting.'},
            {key: 'candidates', label:'Candidates', description:'Get notified when a candidate applies for a job.'},
            {key: 'offers', label:'Offers', description: 'Get notified when a candidate accepts or rejects an offer.'},
          ]"
        />
        <CheckboxGroup
          v-model="form.domaines"
          label="Domaines"
          name="domaines"
          variant="button"
          :options="[
            {key: 1, label:'Solidarité et insertion'},
            {key: 2, label:'Protection de la nature'},
            {key: 3, label:'Education pour tous'},
            {key: 4, label:'Prévention et protection'},
            {key: 5, label:'Sport pour tous'},
            {key: 6, label:'Mémoire et citoyenneté'},
            {key: 7, label:'Coopération internationale'},
            {key: 8, label:'Santé pour tous'},
            {key: 9, label:'Arte & Culture pour tous'},
          ]"
        />
      </form>
    </Box>
    <div class="flex mt-12 space-x-6 justify-end">
      <Button variant="white">
        Save as draft
      </Button>
      <Button type="submit" variant="green" form="form">
        Submit
      </Button>
    </div>
  </div>
</template>

<script>
import Box from '@/components/custom/Box.vue'

export default {
  components: {
    Box
  },
  layout: 'components',
  data () {
    return {
      form: {
        firstname: 'Nicolas',
        state: 'validated',
        notifications: ['comments'],
        domaines: [1, 5]
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
