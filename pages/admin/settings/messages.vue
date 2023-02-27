<template>
  <div class="flex flex-col gap-8">
    <portal to="breadcrumb">
      <Breadcrumb
        :links="[
          { text: 'Tableau de bord', to: '/dashboard' },
          { text: 'Paramètres' },
          { text: 'Messages' },
        ]"
      />
    </portal>

    <SectionHeading title="Messages" />

    <Box>
      <div class="space-y-8">
        <FormControl label="Auteur des petits mots" html-for="title" required :error="errors.title">
          <Input v-model="form.title" name="title" placeholder="Le petit mot de Margot" />
        </FormControl>
        <FormControl label="Le petit mot pour les bénévoles" html-for="benevole" required :error="errors.benevole">
          <RichEditor v-model="form.benevole" :toolbar="['bold','link']" name="benevole" placeholder="Message que vous souhaitez afficher..." />
        </FormControl>
        <FormControl label="Le petit mot pour les responsables d'organisations" html-for="responsable_organisation" required :error="errors.responsable_organisation">
          <RichEditor v-model="form.responsable_organisation" :toolbar="['bold','link']" name="responsable_organisation" placeholder="Message que vous souhaitez afficher..." />
        </FormControl>
        <FormControl label="Le petit mot pour les responsables de réseaux" html-for="responsable_reseau" required :error="errors.responsable_reseau">
          <RichEditor v-model="form.responsable_reseau" :toolbar="['bold','link']" name="responsable_reseau" placeholder="Message que vous souhaitez afficher..." />
        </FormControl>
        <FormControl label="Le petit mot pour les responsables de collectivités territoriales" html-for="responsable_territoire" required :error="errors.responsable_territoire">
          <RichEditor v-model="form.responsable_territoire" :toolbar="['bold','link']" name="responsable_territoire" placeholder="Message que vous souhaitez afficher..." />
        </FormControl>
        <FormControl label="Le petit mot pour les référents departementaux" html-for="referent_departemental" required :error="errors.referent_departemental">
          <RichEditor v-model="form.referent_departemental" :toolbar="['bold','link']" name="referent_departemental" placeholder="Message que vous souhaitez afficher..." />
        </FormControl>
        <FormControl label="Le petit mot pour les référents régionaux" html-for="referent_regional" required :error="errors.referent_regional">
          <RichEditor v-model="form.referent_regional" :toolbar="['bold','link']" name="referent_regional" placeholder="Message que vous souhaitez afficher..." />
        </FormControl>
        <FormControl label="Le petit mot pour les modérateurs" html-for="admin" required :error="errors.admin">
          <RichEditor v-model="form.admin" :toolbar="['bold','link']" name="admin" placeholder="Message que vous souhaitez afficher..." />
        </FormControl>
        <div class="text-right">
          <Button type="submit" variant="green" size="xl" :loading="loading" @click.native="onSubmit">
            Enregistrer
          </Button>
        </div>
      </div>
    </Box>
  </div>
</template>

<script>
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default {
  components: {
    Breadcrumb
  },
  mixins: [FormErrors],
  layout: 'admin-with-sidebar-menu',
  middleware: 'admin',
  async asyncData ({ $axios }) {
    const { data: settings } = await $axios.get('/settings/messages')
    return {
      form: settings
    }
  },
  data () {
    return {
      loading: false,
      formSchema: object({
        title: string().required(),
        benevole: string().required(),
        responsable_organisation: string().required(),
        responsable_reseau: string().required(),
        responsable_territoire: string().required(),
        referent_departemental: string().required(),
        referent_regional: string().required(),
        admin: string().required()
      })
    }
  },
  methods: {
    onSubmit () {
      if (this.loading) {
        return
      }
      this.loading = true
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          await this.$axios.post('/settings/messages', this.form)
          this.$toast.success('Modifications enregistrées')
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

<style>

</style>
