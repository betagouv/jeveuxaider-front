<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Administration', to: '/admin' },
        { text: 'Paramètres' },
        { text: 'Règles', to: `/admin/settings/rules` },
        { text: 'Nouvelle règle' },
      ]"
    />
    <div class="py-6">
      <BaseSectionHeading title="Création d'une nouvelle règle">
        <template #action>
          <div class="hidden lg:block space-x-2 flex-shrink-0">
            <BaseButton variant="green" size="xl" :loading="loading" @click.native="handleSubmit">
              Enregistrer
            </BaseButton>
          </div>
        </template>
      </BaseSectionHeading>

      <FormRule ref="form" class="mt-8" />
    </div>
  </div>
</template>

<script>
import FormRule from '@/components/form/FormRule.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: { FormRule, Breadcrumb },
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
