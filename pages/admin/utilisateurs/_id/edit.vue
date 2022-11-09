<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Tableau de bord', to: '/dashboard' },
        { text: 'Utilisateurs', to: '/admin/utilisateurs' },
        { text: profile.full_name, to: `/admin/utilisateurs/${profile.id}` },
        { text: 'Modification' }
      ]"
    />
    <div class="flex flex-col pb-6 gap-6">
      <SectionHeading :title="profile.full_name">
        <template #action>
          <div class="hidden lg:block space-x-2 flex-shrink-0">
            <Button
              type="submit"
              variant="green"
              size="xl"
              :loading="loading"
              @click.native="handleSubmit"
            >
              Enregistrer
            </Button>
          </div>
        </template>
      </Sectionheading>

      <FormProfile
        ref="form"
        :profile="profile"
        @role-changed="handleRoleChanged()"
      />
    </div>
  </div>
</template>

<script>
import FormProfile from '@/components/form/FormProfile.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default {
  components: {
    FormProfile,
    Breadcrumb
  },
  async asyncData ({ $axios, params, error, store }) {
    if (
      !['admin', 'referent', 'referent_regional'].includes(store.getters.contextRole)
    ) {
      return error({ statusCode: 403 })
    }

    const { data: profile } = await $axios.get(`/profiles/${params.id}`)
    if (!profile) {
      return error({ statusCode: 404 })
    }

    return {
      profile
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async handleSubmit () {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.$refs.form.handleSubmit()
      this.loading = false
    },
    async handleRoleChanged () {
      const { data: profile } = await this.$axios.get(`/profiles/${this.profile.id}`)
      this.profile = profile
    }
  }
}
</script>
