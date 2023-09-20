<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Administration', to: '/admin' },
        { text: 'Contenus' },
        { text: 'Activités', to: `/admin/contenus/activites` },
        { text: 'Nouvelle activité' },
      ]"
    />
    <div class="pb-6">
      <BaseSectionHeading title="Création d'une nouvelle activité">
        <template #action>
          <div class="hidden lg:block space-x-2 flex-shrink-0">
            <BaseButton variant="green" size="xl" :loading="loading" @click.native="handleSubmit">
              Enregistrer
            </BaseButton>
          </div>
        </template>
      </BaseSectionHeading>

      <FormActivity ref="form" class="mt-8" />
    </div>
  </div>
</template>

<script>
import FormActivity from '@/components/form/FormActivity'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: { FormActivity, Breadcrumb },
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
})
</script>
