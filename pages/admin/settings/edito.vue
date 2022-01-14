<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Paramètres' },
        { label: 'Édito' },
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
          <SectionHeading title="Édito">
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
              Les missions prioritaires
            </Heading>
            <div class="col-span-2 bg-yellow-100 p-4 text-sm rounded-lg">
              @TODO: Listing des Releases
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
import MixinForm from '@/mixins/form'

export default {
  components: {
    MenuAdmin
  },
  mixins: [MixinForm],
  async asyncData ({ $axios }) {
    const { data: settings } = await $axios.get('/settings/edito')
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
