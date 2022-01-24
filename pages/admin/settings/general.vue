<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Paramètres' },
        { label: 'Général' },
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
          <SectionHeading title="Paramétrage général" />
          <Box>
            <div class="space-y-8">
              <Toggle
                v-model="form.blog_active"
                label="Blog"
                description="Récupèration des articles du blog sur la page d'accueil"
              />
              <Toggle
                v-model="form.france_connect_active"
                label="France Connect"
                description="Activer le France Connect pour la connexion et l'inscription des utilisateurs"
              />
              <Toggle
                v-model="form.maintenance_mode_active"
                label="Mode de maintenance"
                description="Activer le mode maintenance pour les autres utilisateurs"
              />
              <Toggle
                v-model="form.light_mode_active"
                label="Mode dégradé"
                description="Activer le mode dégradé lors de très fort trafic (inscriptions désactivées)"
              />
              <div class="text-right">
                <Button type="submit" variant="green" size="xl" :loading="loading" @click.native="onSubmit">
                  Enregistrer
                </Button>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { object, boolean } from 'yup'
import MenuAdmin from '@/components/section/admin/MenuAdmin'
import FormErrors from '@/mixins/form/errors'

export default {
  components: {
    MenuAdmin
  },
  mixins: [FormErrors],
  middleware: 'admin',
  async asyncData ({ $axios }) {
    const { data: settings } = await $axios.get('/settings/general')
    return {
      form: settings
    }
  },
  data () {
    return {
      loading: false,
      formSchema: object({
        maintenance_mode_active: boolean(),
        france_connect_active: boolean(),
        light_mode_active: boolean()
      })
    }
  },
  methods: {
    onSubmit () {
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          if (this.loading) {
            return
          }
          this.loading = true
          await this.$store.dispatch('settings/updateGeneral', this.form)
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
