<template>
  <div v-if="profile" class="container">
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
            @click.native="submitForm"
          >
            Mettre à jour
          </Button>
        </template>
      </Sectionheading>

      <UserProfileTabs selected-tab-key="preferences">
        <FormUserPreferences
          ref="form"
          :profile="profile"
          @change="formIsDirty = $event"
          @submit="fetchProfile"
        />
      </UserProfileTabs>
    </div>
  </div>
</template>

<script>
import FormUserPreferences from '@/components/form/FormUserPreferences.vue'
import Button from '@/components/dsfr/Button.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import UserProfileTabs from '@/components/custom/UserProfileTabs.vue'
import MixinFormDirtyState from '@/mixins/form/dirty-state.js'

export default {
  components: {
    FormUserPreferences,
    Breadcrumb,
    UserProfileTabs,
    Button
  },
  mixins: [MixinFormDirtyState],
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
    async fetchProfile () {
      const { data: profile } = await this.$axios.get(`/profiles/${this.$store.state.auth.user.profile.id}`)
      this.profile = profile
    },
    async submitForm () {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.$refs.form.handleSubmit()
      this.loading = false
    }
  }
}
</script>
