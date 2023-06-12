<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Mon espace', to: '/profile' },
        { text: 'Mes préférences de missions' },
      ]"
    />
    <div class="flex flex-col pb-12 gap-12">
      <SectionHeading title="Mes préférences de missions">
        <template #action>
          <Button
            class="hidden lg:flex"
            size="lg"
            variant="primary"
            :loading="loading"
            :disabled="!formIsDirty"
            @click.native="handleSubmit($event)"
          >
            Mettre à jour
          </Button>
        </template>
      </Sectionheading>

      <UserProfileTabs selected-tab-key="preferences">
        <FormUserPreferences ref="form" :profile="profile" @change="onChange($event)" />
      </UserProfileTabs>
    </div>
  </div>
</template>

<script>
import FormUserPreferences from '@/components/form/FormUserPreferences.vue'
import Button from '@/components/dsfr/Button.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import UserProfileTabs from '@/components/custom/UserProfileTabs.vue'

export default {
  components: {
    FormUserPreferences,
    Breadcrumb,
    UserProfileTabs,
    Button
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
      loading: false,
      formIsDirty: false
    }
  },
  methods: {
    async handleSubmit (payload) {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.$refs.form.handleSubmit(payload)
      this.loading = false
    },
    onChange (formIsDirty) {
      this.formIsDirty = formIsDirty
    }
  }
}
</script>
