<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Administration', to: '/admin' },
        { text: 'Contenus' },
        { text: 'Ressources', to: `/admin/contenus/ressources` },
        { text: 'Nouvelle ressource' },
      ]"
    />
    <div class="py-6">
      <BaseSectionHeading title="Création d'un nouvelle ressource">
        <template #action>
          <div class="hidden lg:block space-x-2 flex-shrink-0">
            <BaseButton variant="green" size="xl" :loading="loading" @click.native="handleSubmit">
              Enregistrer
            </BaseButton>
          </div>
        </template>
      </BaseSectionHeading>

      <FormRessource ref="form" class="mt-8" />
    </div>
  </div>
</template>

<script>
import FormRessource from '@/components/form/FormRessource.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default {
  components: { FormRessource, Breadcrumb },
  async setup() {
    definePageMeta({
      middleware: ['admin'],
    })
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
