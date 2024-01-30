<template>
  <div class="container">
    <DsfrBreadcrumb
      :links="[
        { text: 'Tableau de bord', to: '/dashboard' },
        { text: 'Utilisateurs', to: '/admin/utilisateurs' },
        { text: profile.full_name, to: `/admin/utilisateurs/${profile.id}` },
        { text: 'Modification' },
      ]"
    />
  </div>
  <HeaderActions :profile="profile">
    <template v-slot:actions>
      <DsfrButton :loading="loading" @click.native="handleSubmit"> Enregistrer </DsfrButton>
    </template>
  </HeaderActions>
  <div class="container">
    <div class="flex flex-col pb-20 gap-6">
      <FormProfile ref="form" :profile="profile" @role-changed="handleRoleChanged()" />
    </div>
  </div>
</template>

<script>
import FormProfile from '@/components/form/FormProfile.vue'
import HeaderActions from '@/components/section/profile/HeaderActions.vue'

export default defineNuxtComponent({
  components: {
    FormProfile,
    HeaderActions,
  },
  async setup() {
    const { $stores } = useNuxtApp()
    const route = useRoute()

    definePageMeta({
      middleware: ['authenticated'],
    })

    if (!['admin', 'referent', 'referent_regional'].includes($stores.auth.contextRole)) {
      return showError({ statusCode: 403 })
    }

    const profile = await apiFetch(`/profiles/${route.params.id}`)
    if (!profile) {
      return showError({ statusCode: 404 })
    }

    return {
      profile,
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
    async handleRoleChanged() {
      const profile = await apiFetch(`/profiles/${this.profile.id}`)
      this.profile = profile
    },
  },
})
</script>
