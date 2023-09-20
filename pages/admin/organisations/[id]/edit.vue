<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Tableau de bord', to: '/dashboard' },
        {
          text: 'Organisations',
          to: ['admin', 'referent', 'referent_regional', 'tete_de_reseau'].includes(
            $stores.auth.contextRole
          )
            ? '/admin/organisations'
            : null,
        },
        { text: structure.name, to: `/admin/organisations/${structure.id}` },
        { text: 'Modification' },
      ]"
    />
    <div class="pb-6">
      <BaseSectionHeading :title="structure.name">
        <template #action>
          <div class="hidden lg:block">
            <BaseButton size="xl" variant="green" :loading="loading" @click.native="handleSubmit">
              Enregistrer
            </BaseButton>
          </div>
        </template>
      </BaseSectionHeading>

      <FormOrganisation ref="form" :structure="structure" class="my-8" />
    </div>
  </div>
</template>

<script>
import FormOrganisation from '@/components/form/FormOrganisation.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: {
    FormOrganisation,
    Breadcrumb,
  },
  async setup() {
    definePageMeta({
      middleware: ['authenticated', 'agreed-responsable-terms'],
    })

    const { $stores } = useNuxtApp()
    const route = useRoute()

    if (
      !['admin', 'referent', 'referent_regional', 'tete_de_reseau', 'responsable'].includes(
        $stores.auth.contextRole
      )
    ) {
      return showError({ statusCode: 403 })
    }

    const structure = await apiFetch(`/structures/${route.params.id}`)
    if (!structure) {
      return showError({ statusCode: 404 })
    }

    if ($stores.auth.contextRole == 'responsable') {
      if ($stores.auth.contextableId != structure.id) {
        return showError({ statusCode: 403 })
      }
    }

    return {
      structure,
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
