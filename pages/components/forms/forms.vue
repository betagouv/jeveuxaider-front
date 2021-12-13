<template>
  <div>
    <Box>
      <form id="form" class="space-y-8" @submit="onSubmit">
        <Heading as="h2" :level="3" class="mb-8 text-jva-gray-900">
          Informations générales
        </Heading>
        <div>
          <FormLabel html-for="name" required>
            Titre de la mission
          </FormLabel>
          <FormHelperText required>
            Le titre de la mission doit être une phrase qui précise l'action du bénévole.
          </FormHelperText>
          <Input
            v-model="form.name"
            name="name"
            placeholder="Titre de la mission"
          />
        </div>
        <div>
          <FormLabel html-for="state" required>
            Statut
          </FormLabel>
          <Select
            v-model="form.state"
            name="state"
            placeholder="Statut de la mission"
            :options="[
              {key: 'draft', label:'Brouillon'},
              {key: 'waiting', label:'En attente de validation'},
              {key: 'validated', label:'Validée'}
            ]"
          />
        </div>
        <div class="grid sm:grid-cols-2 gap-8">
          <div>
            <FormLabel html-for="firstname" required>
              Prénom
            </FormLabel>
            <Input
              v-model="form.firstname"
              name="firstname"
              placeholder="Votre prénom"
            />
          </div>
          <div>
            <FormLabel html-for="lastname" required>
              Nom
            </FormLabel>
            <Input
              v-model="form.lastname"
              name="lastname"
              placeholder="Votre nom"
            />
          </div>
        </div>
        <div class="grid sm:grid-cols-2 gap-8">
          <div>
            <FormLabel html-for="password" required>
              Mot de passe
            </FormLabel>
            <Input
              v-model="form.password"
              name="password"
              placeholder="Votre mot de passe"
              type="password"
            />
          </div>
          <div>
            <FormLabel html-for="password_confirm" required>
              Confirmation du mot de passe
            </FormLabel>
            <Input
              v-model="form.password_confirm"
              name="password_confirm"
              placeholder="Votre mot de passe"
              type="password"
            />
          </div>
        </div>
        <div>
          <FormLabel html-for="phone">
            Téléphone <span class="text-jva-blue-400 uppercase">(facultatif)</span>
          </FormLabel>
          <Input
            v-model="form.phone"
            name="phone"
            placeholder="Votre téléphone"
          />
        </div>
        <div>
          <FormLabel html-for="description" required>
            Présentation de la mission
          </FormLabel>
          <Textarea v-model="form.description" name="description" placeholder="Décrivez votre mission en quelques mots..." />
        </div>
        <div>
          <FormLabel html-for="places" required>
            Places disponibles
          </FormLabel>
          <Input
            v-model="form.places"
            name="places"
            placeholder="Saisissez le nombre de personnes"
            suffix="personnes"
            type="number"
          />
        </div>
        <Heading as="h2" :level="3" class="mb-8 text-jva-gray-900">
          Notifications
        </Heading>
        <div>
          <FormLabel html-for="notifications">
            Notifications
          </FormLabel>
          <CheckboxGroup
            v-model="form.notifications"
            name="notifications"
            :options="[
              {key: 'comments', label:'Comments', description :'Get notified when someones posts a comment on a posting.'},
              {key: 'candidates', label:'Candidates', description:'Get notified when a candidate applies for a job.'},
              {key: 'offers', label:'Offers', description: 'Get notified when a candidate accepts or rejects an offer.'},
            ]"
          />
        </div>
        <div>
          <FormLabel html-for="domaines">
            Domaines
          </FormLabel>
          <CheckboxGroup
            v-model="form.domaines"
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
        </div>
        <Heading as="h2" :level="3" class="mb-8 text-jva-gray-900">
          Socials
        </Heading>
        <div class="grid sm:grid-cols-2 gap-8">
          <div>
            <FormLabel html-for="website">
              Le site de l'organisation
            </FormLabel>
            <Input
              v-model="form.website"
              name="website"
              placeholder="https://wwww.website.com"
              icon="LinkIcon"
            />
          </div>
          <div>
            <FormLabel html-for="twitter">
              Page twitter
            </FormLabel>
            <Input
              v-model="form.twitter"
              name="twitter"
              placeholder="https://twitter.com/votrepage"
              icon="LinkIcon"
            />
          </div>
          <div>
            <FormLabel html-for="facebook">
              Page facebook
            </FormLabel>
            <Input
              v-model="form.facebook"
              name="facebook"
              placeholder="https://facebook.com/votrepage"
              icon="LinkIcon"
            />
          </div>
        </div>
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
export default {
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
