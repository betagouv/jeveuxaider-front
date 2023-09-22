<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Administration', to: '/admin' },
        { text: 'Contenus' },
        { text: 'Domaines', to: `/admin/contenus/domaines` },
        { text: domaine.name },
      ]"
    />
    <div class="pb-6">
      <BaseSectionHeading :title="domaine.name">
        <template #action>
          <div class="hidden lg:block space-x-2 flex-shrink-0">
            <BaseButton variant="green" size="xl" :loading="loading" @click.native="handleSubmit()">
              Enregistrer
            </BaseButton>
          </div>
        </template>
      </BaseSectionHeading>

      <FormDomaine ref="form" :domaine="domaine" class="mt-8" />
    </div>
  </div>
</template>

<script>
import FormDomaine from '@/components/form/FormDomaine.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: { FormDomaine, Breadcrumb },
  async setup() {
    definePageMeta({
      middleware: ['admin'],
    })

    const route = useRoute()
    const domaine = await apiFetch(`/domaines/${route.params.id}`)

    if (!domaine) {
      return showError({ statusCode: 404 })
    }

    return {
      domaine,
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
