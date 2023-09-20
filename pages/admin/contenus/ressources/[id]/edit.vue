<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Administration', to: '/admin' },
        { text: 'Contenus' },
        { text: 'Ressources', to: `/admin/contenus/ressources` },
        { text: ressource.title },
      ]"
    />
    <div class="pb-6">
      <BaseSectionHeading :title="ressource.title">
        <template #action>
          <div class="hidden lg:block space-x-2 flex-shrink-0">
            <BaseButton variant="green" size="xl" :loading="loading" @click.native="handleSubmit">
              Enregistrer
            </BaseButton>
          </div>
        </template>
      </BaseSectionHeading>

      <FormRessource ref="form" :ressource="ressource" class="mt-8" />
    </div>
  </div>
</template>

<script>
import FormRessource from '~/components/form/FormRessource.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default {
  components: { FormRessource, Breadcrumb },
  async setup() {
    definePageMeta({
      middleware: ['admin'],
    })

    const route = useRoute()

    const ressource = await apiFetch(`/documents/${route.params.id}`)

    if (!ressource) {
      return showError({ statusCode: 404 })
    }

    return {
      ressource,
    }
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async handleSubmit() {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.$refs.form.handleSubmit()
      this.loading = false
    },
  },
}
</script>
