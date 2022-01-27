<template>
  <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
    <div class="lg:col-span-3 space-y-12">
      <Box>
        <Heading :level="3" class="mb-8">
          Informations générales
        </Heading>
        <div class="space-y-10">
          coucou
        </div>
      </Box>
    </div>
    <div class="lg:col-span-2 space-y-8">
      <Box padding="sm">
        <Heading :level="3" class="mb-8">
          Adresse de l'organisation
        </Heading>
        <div class="space-y-12">
          @todo
        </div>
      </Box>
      <Box padding="sm">
        <Heading :level="3" class="mb-8">
          Réseau national ou territorial
        </Heading>
        <div class="space-y-8">
          @todo
        </div>
      </Box>
      <Box padding="sm">
        <Heading :level="3" class="mb-8">
          Visuels d'illustration de l'organisation
        </Heading>
        <div class="space-y-8">
          @todo
        </div>
      </Box>
    </div>
    <div class="flex lg:hidden flex-col gap-2 flex-shrink-0 items-end justify-end">
      <Button size="xl" variant="green" @click.native="$refs.formMission.handleSubmit()">
        Enregistrer
      </Button>
      </butto>
    </div>
  </div>
</template>

<script>
import { string, object } from 'yup'
import inputGeo from '@/mixins/input-geo'
import FormErrors from '@/mixins/form/errors'

export default {
  mixins: [inputGeo, FormErrors],
  props: {
    structure: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      form: {
        ...this.structure
      },
      formSchema: object({
        name: string().min(3, 'Le nom est trop court').required('Le nom est requis')
      })
    }
  },
  methods: {
    handleSelectedAdress (item) {
      if (!item) {
        this.clearAddress()
        return
      }
      this.$set(this.form, 'address', item.name != item.city ? item.name : null)
      this.$set(this.form, 'zip', item.postcode)
      this.$set(this.form, 'city', item.city)
      this.$set(this.form, 'latitude', item.coordinates[1])
      this.$set(this.form, 'longitude', item.coordinates[0])
    },
    clearAddress () {
      this.form.address = ''
      this.form.zip = ''
      this.form.city = ''
      this.form.latitude = ''
      this.form.longitude = ''
      this.form.department = ''
    },
    handleSubmit () {
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          this.loading = true
          const { data: structure } = await this.$axios.put(`/structures/${this.structure.id}`, this.form)
          this.$router.push(`/admin/organisations/${structure.id}`)
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
