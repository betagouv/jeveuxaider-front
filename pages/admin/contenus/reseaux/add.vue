<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Administration', to: '/admin' },
        { text: 'Contenus' },
        { text: 'Réseaux', to: `/admin/contenus/reseaux` },
        { text: 'Nouveau réseau' },
      ]"
    />
    <div class="pb-6">
      <BaseSectionHeading title="Création d'un nouveau réseau">
        <template #action>
          <div class="hidden lg:flex flex-col gap-2 flex-shrink-0 items-center justify-center">
            <BaseButton size="xl" variant="green" :loading="loading" @click.native="handleSubmit">
              Enregistrer
            </BaseButton>
          </div>
        </template>
      </BaseSectionHeading>

      <FormReseau ref="form" class="my-8" />
    </div>
  </div>
</template>

<script>
import FormReseau from '@/components/form/FormReseau.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: { FormReseau, Breadcrumb },
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
