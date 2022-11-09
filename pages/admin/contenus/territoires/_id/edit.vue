<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Tableau de bord', to: '/dashboard' },
        { text: 'Territoires', to: $store.getters.contextRole === 'admin' ? '/admin/contenus/territoires' : null },
        { text: territoire.name }
      ]"
    />
    <div class="pb-6">
      <SectionHeading :title="territoire.name">
        <template #action>
          <div class="hidden lg:flex flex-col gap-2 flex-shrink-0 items-center justify-center">
            <Button size="xl" variant="green" :loading="loading" @click.native="handleSubmit">
              Enregistrer
            </Button>
          </div>
        </template>
      </Sectionheading>

      <FormTerritoire
        ref="form"
        :territoire="territoire"
        class="my-8"
      />
    </div>
  </div>
</template>

<script>
import FormTerritoire from '@/components/form/FormTerritoire'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default {
  components: { FormTerritoire, Breadcrumb },
  middleware: 'authenticated',
  async asyncData ({ $axios, params, error, store }) {
    if (!['admin', 'responsable_territoire'].includes(store.getters.contextRole)) {
      return error({ statusCode: 403 })
    }
    const { data: territoire } = await $axios.get(`/territoires/${params.id}`)
    if (!territoire) {
      return error({ statusCode: 404 })
    }
    if (store.getters.contextRole == 'responsable_territoire') {
      if (store.getters.contextableId != territoire.id || territoire.state != 'validated') {
        return error({ statusCode: 403 })
      }
    }
    return {
      territoire
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async handleSubmit () {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.$refs.form.handleSubmit()
      this.loading = false
    }
  }
}
</script>
