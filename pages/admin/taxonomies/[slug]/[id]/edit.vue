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
        { text: term.name },
      ]"
    />
    <div class="pb-6">
      <BaseSectionHeading :title="term.name">
        <template #action>
          <div class="hidden lg:block space-x-2 flex-shrink-0">
            <BaseButton variant="green" size="xl" :loading="loading" @click.native="handleSubmit">
              Enregistrer
            </BaseButton>
          </div>
        </template>
      </BaseSectionHeading>

      <FormTerm ref="form" :term="term" class="mt-8" :vocabulary="$route.params.slug" />
    </div>
  </div>
</template>

<script>
import FormTerm from '@/components/form/FormTerm.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: { FormTerm, Breadcrumb },
  async setup() {
    definePageMeta({
      middleware: ['admin'],
    })

    const route = useRoute()
    const term = await apiFetch(`/terms/${route.params.id}`)

    if (!term) {
      return showError({ statusCode: 404 })
    }

    return {
      term,
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
