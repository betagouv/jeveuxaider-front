<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Administration', to: '/admin' },
        {
          text: 'Réseaux',
          to: $stores.auth.contextRole === 'admin' ? `/admin/contenus/reseaux` : null,
        },
        { text: reseau.name, to: `/admin/contenus/reseaux/${reseau.id}` },
      ]"
    />
    <div class="pb-6">
      <BaseSectionHeading :title="reseau.name">
        <template #action>
          <div class="hidden lg:flex flex-col gap-2 flex-shrink-0 items-center justify-center">
            <BaseButton size="xl" variant="green" :loading="loading" @click.native="handleSubmit()">
              Enregistrer
            </BaseButton>
          </div>
        </template>
      </BaseSectionHeading>

      <FormReseau ref="form" :reseau="reseau" class="my-8" />
    </div>
  </div>
</template>

<script>
import FormReseau from '@/components/form/FormReseau.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: { FormReseau, Breadcrumb },
  async setup() {
    definePageMeta({
      middleware: ['authenticated'],
    })

    const { $stores } = useNuxtApp()
    const route = useRoute()

    if (!['admin', 'tete_de_reseau'].includes($stores.auth.contextRole)) {
      return showError({ statusCode: 403 })
    }

    const reseau = await apiFetch(`/reseaux/${route.params.id}`)
    if (!reseau) {
      return showError({ statusCode: 404 })
    }

    if ($stores.auth.contextRole === 'tete_de_reseau') {
      if ($stores.auth.user.contextableId !== reseau.id) {
        return showError({ statusCode: 403 })
      }
    }

    return {
      reseau,
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
