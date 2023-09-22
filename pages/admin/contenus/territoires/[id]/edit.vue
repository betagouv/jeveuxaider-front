<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Administration', to: '/admin' },
        {
          text: 'Territoires',
          to: $stores.auth.contextRole === 'admin' ? '/admin/contenus/territoires' : null,
        },
        { text: territoire.name },
      ]"
    />
    <div class="pb-6">
      <BaseSectionHeading :title="territoire.name">
        <template #action>
          <div class="hidden lg:flex flex-col gap-2 flex-shrink-0 items-center justify-center">
            <BaseButton size="xl" variant="green" :loading="loading" @click.native="handleSubmit">
              Enregistrer
            </BaseButton>
          </div>
        </template>
      </BaseSectionHeading>

      <FormTerritoire ref="form" :territoire="territoire" class="my-8" />
    </div>
  </div>
</template>

<script>
import FormTerritoire from '@/components/form/FormTerritoire.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default {
  components: { FormTerritoire, Breadcrumb },
  async setup() {
    definePageMeta({
      middleware: ['authenticated'],
    })

    const { $stores } = useNuxtApp()
    const route = useRoute()

    if (!['admin', 'responsable_territoire'].includes($stores.auth.contextRole)) {
      return showError({ statusCode: 403 })
    }
    const territoire = await apiFetch(`/territoires/${route.params.id}`)
    if (!territoire) {
      return showError({ statusCode: 404 })
    }
    if ($stores.auth.contextRole == 'responsable_territoire') {
      if ($stores.auth.contextableId != territoire.id || territoire.state != 'validated') {
        return showError({ statusCode: 403 })
      }
    }
    return {
      territoire,
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
}
</script>
