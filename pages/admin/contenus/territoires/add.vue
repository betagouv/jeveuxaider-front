<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Administration', to: '/admin' },
        { text: 'Contenus' },
        { text: 'Territoires', to: `/admin/contenus/territoires` },
        { text: 'Nouveau territoire' },
      ]"
    />
    <div class="pb-6">
      <BaseSectionHeading title="Création d'un nouveau territoire">
        <template #action>
          <div class="hidden lg:flex flex-col gap-2 flex-shrink-0 items-center justify-center">
            <BaseButton size="xl" variant="green" :loading="loading" @click.native="handleSubmit">
              Enregistrer
            </BaseButton>
          </div>
        </template>
      </BaseSectionHeading>

      <FormTerritoire ref="form" class="my-8" />
    </div>
  </div>
</template>

<script>
import FormTerritoire from '@/components/form/FormTerritoire'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: { FormTerritoire, Breadcrumb },
  setup() {
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
})
</script>
