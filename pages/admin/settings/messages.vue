<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Paramètres' },
        { label: 'Messages' },
      ]"
    />

    <div class="grid grid-cols-5 py-12 ">
      <aside class="relative col-span-1">
        <div class="sticky top-12">
          <MenuAdmin />
        </div>
      </aside>
      <div class="col-span-4">
        <div class="flex flex-col gap-12">
          <SectionHeading title="Messages">
            <template #action>
              <div class="hidden lg:block space-x-2 flex-shrink-0">
                <Button type="submit" variant="green" size="xl" :loading="loading" @click.native="onSubmit">
                  Enregistrer
                </Button>
              </div>
            </template>
          </Sectionheading>

          <Box>
            <Heading :level="3" class="mb-8">
              Les petits mots
            </Heading>
            <div class="space-y-8">
              <FormControl label="Auteur des petits mots" html-for="title" required :error="errors.title">
                <Input v-model="form.title" name="title" placeholder="Le petit mot de Giulietta" />
              </FormControl>
              <FormControl label="Pour les bénévoles" html-for="benevole" required :error="errors.benevole">
                <Textarea v-model="form.benevole" name="benevole" placeholder="Message que vous souhaitez afficher..." />
              </FormControl>
              <FormControl label="Pour les responsables d'organisations" html-for="responsable_organisation" required :error="errors.responsable_organisation">
                <Textarea v-model="form.responsable_organisation" name="responsable_organisation" placeholder="Message que vous souhaitez afficher..." />
              </FormControl>
              <FormControl label="Pour les responsables de réseaux" html-for="responsable_reseau" required :error="errors.responsable_reseau">
                <Textarea v-model="form.responsable_reseau" name="responsable_reseau" placeholder="Message que vous souhaitez afficher..." />
              </FormControl>
              <FormControl label="Pour les respondables de collectivités" html-for="responsable_territoire" required :error="errors.responsable_territoire">
                <Textarea v-model="form.responsable_territoire" name="responsable_territoire" placeholder="Message que vous souhaitez afficher..." />
              </FormControl>
              <FormControl label="Pour les référents departementaux" html-for="referent_departemental" required :error="errors.referent_departemental">
                <Textarea v-model="form.referent_departemental" name="referent_departemental" placeholder="Message que vous souhaitez afficher..." />
              </FormControl>
              <FormControl label="Pour les référents régionaux" html-for="referent_regional" required :error="errors.referent_regional">
                <Textarea v-model="form.referent_regional" name="referent_regional" placeholder="Message que vous souhaitez afficher..." />
              </FormControl>
              <FormControl label="Pour les analystes" html-for="analyste" required :error="errors.analyste">
                <Textarea v-model="form.analyste" name="analyste" placeholder="Message que vous souhaitez afficher..." />
              </FormControl>
              <FormControl label="Pour les modérateurs" html-for="admin" required :error="errors.admin">
                <Textarea v-model="form.admin" name="admin" placeholder="Message que vous souhaitez afficher..." />
              </FormControl>
            </div>
          </Box>
          <div class="text-right">
            <Button type="submit" variant="green" size="xl" :loading="loading" @click.native="onSubmit">
              Enregistrer
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { string, object } from 'yup'
import MenuAdmin from '@/components/section/admin/MenuAdmin'
import FormErrors from '@/mixins/form/errors'

export default {
  components: {
    MenuAdmin
  },
  mixins: [FormErrors],
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
        analyste: string().required(),
        admin: string().required()
      })
    }
  },
  methods: {
    onSubmit () {
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          this.loading = true
          console.log('this.form', this.form)
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
