<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Mon profil', to: '/profile' },
        { text: 'Modification' },
      ]"
    />
    <div class="flex flex-col pb-12 gap-12">
      <SectionHeading :title="$store.state.auth.user.profile.full_name">
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
  middleware: 'authenticated',
  async asyncData ({ $axios, error, store }) {
    const { data: profile } = await $axios.get(`/profiles/${store.state.auth.user.profile.id}`)

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
