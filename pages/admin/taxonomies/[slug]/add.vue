<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Administration', to: '/admin' },
        { text: 'Taxonomies' },
        {
          text: 'Tous les termes',
          to: `/admin/taxonomies/${$route.params.slug}`,
        },
        { text: 'Nouvelle entrée' },
      ]"
    />
    <div class="pb-6">
      <BaseSectionHeading title="Nouvelle entrée">
        <template #action>
          <div class="hidden lg:block space-x-2 flex-shrink-0">
            <BaseButton variant="green" size="xl" :loading="loading" @click.native="handleSubmit">
              Enregistrer
            </BaseButton>
          </div>
        </template>
      </BaseSectionHeading>

      <FormTerm ref="form" class="mt-8" :vocabulary="$route.params.slug" />
    </div>
  </div>
</template>

<script>
import FormTerm from '@/components/form/FormTerm.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: { FormTerm, Breadcrumb },
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
