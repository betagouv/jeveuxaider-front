<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Administration', to: '/admin' },
        { text: 'Paramètres' },
        { text: 'Règles', to: `/admin/settings/rules` },
        { text: rule.name },
      ]"
    />
    <div class="pb-6">
      <BaseSectionHeading :title="rule.name">
        <template #action>
          <div class="hidden lg:block space-x-2 flex-shrink-0">
            <BaseButton variant="green" size="xl" :loading="loading" @click.native="handleSubmit">
              Enregistrer
            </BaseButton>
          </div>
        </template>
      </BaseSectionHeading>

      <FormRule ref="form" :rule="rule" class="mt-8" />
    </div>
  </div>
</template>

<script>
import FormRule from '@/components/form/FormRule.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: { FormRule, Breadcrumb },
  async setup() {
    definePageMeta({
      middleware: ['admin'],
    })

    const route = useRoute()

    const rule = await apiFetch(`/rules/${route.params.id}`)
    if (!rule) {
      return showError({ statusCode: 404 })
    }

    return {
      rule,
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
})
</script>
