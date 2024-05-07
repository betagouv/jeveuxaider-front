<template>
  <div class="container">
    <Breadcrumb
      :links="[
        {
          text: 'Administration',
          to: $stores.auth.contextRole === 'admin' ? '/admin/contenus/territoires' : null,
        },
        {
          text: 'Territoires',
          to: $stores.auth.contextRole === 'admin' ? '/admin/contenus/territoires' : null,
        },
        { text: territoire.name },
      ]"
    />
  </div>

  <HeaderActions :territoire="territoire">
    <template v-slot:actions>
      <DsfrButton :loading="loading" @click.native="handleSubmit"> Enregistrer </DsfrButton>
    </template>
  </HeaderActions>
  <div class="container">
    <div class="pb-20">
      <FormTerritoire ref="form" :territoire="territoire" class="my-8" />
    </div>
  </div>
</template>

<script>
import FormTerritoire from '@/components/form/FormTerritoire.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import HeaderActions from '@/components/section/territoire/HeaderActions.vue'

export default {
  components: { FormTerritoire, Breadcrumb, HeaderActions },
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
