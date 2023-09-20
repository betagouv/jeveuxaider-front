<template>
  <div v-if="profile" class="container">
    <DsfrBreadcrumb
      :links="[{ text: 'Mon espace', to: '/profile' }, { text: 'Mes préférences de missions' }]"
    />
    <div class="flex flex-col pb-12 gap-12">
      <BaseSectionHeading title="Mes préférences de missions">
        <template #action>
          <DsfrButton
            class="hidden lg:flex"
            size="lg"
            variant="primary"
            :loading="loading"
            :disabled="!formIsDirty"
            @click.native="submitForm"
          >
            Mettre à jour
          </DsfrButton>
        </template>
      </BaseSectionHeading>

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
import UserProfileTabs from '@/components/custom/UserProfileTabs.vue'
import MixinFormDirtyState from '@/mixins/form/dirty-state.js'

export default defineNuxtComponent({
  components: {
    FormUserPreferences,
    UserProfileTabs,
  },
  mixins: [MixinFormDirtyState],
  async setup() {
    definePageMeta({
      middleware: ['authenticated'],
    })

    const { $stores } = useNuxtApp()
    const profile = await apiFetch(`/profiles/${$stores.auth.user.profile.id}`)

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
    async fetchProfile() {
      const profile = await apiFetch(`/profiles/${this.$stores.auth.user.profile.id}`)
      this.profile = profile
    },
    async submitForm() {
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
