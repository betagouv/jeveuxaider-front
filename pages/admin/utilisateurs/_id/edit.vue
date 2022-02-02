<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Utilisateurs', link: '/admin/utilisateurs' },
        { label: profile.full_name, link: `/admin/utilisateurs/${profile.id}` },
        { label: 'Modification' }
      ]"
    />
    <div class="flex flex-col py-6 gap-6">
      <SectionHeading :title="profile.full_name">
        <template #action>
          <div class="hidden lg:block space-x-2 flex-shrink-0">
            <Button type="submit" variant="green" size="xl" @click.native="$refs.formProfile.handleSubmit()">
              Enregistrer
            </Button>
          </div>
        </template>
      </Sectionheading>

      <FormProfile
        ref="formProfile"
        :profile="profile"
        @submited="handleSubmit($event)"
      />
    </div>
  </div>
</template>

<script>
import FormProfile from '@/components/form/FormProfile.vue'

export default {
  components: {
    FormProfile
  },
  layout: 'admin',
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
  methods: {
    async handleSubmit (profile) {
      await this.$axios.put(`/profiles/${profile.id}`, profile)
      this.$router.push(`/admin/utilisateurs/${profile.id}`)
    }
  }
}
</script>
