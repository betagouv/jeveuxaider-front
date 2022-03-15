<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Mon profil', link: '/profile' },
        { label: 'Modification' },
      ]"
    />
    <div class="flex flex-col py-12 gap-12">
      <SectionHeading :title="$store.state.auth.user.profile.full_name">
        <template #action>
          <div class="hidden lg:block space-x-2 flex-shrink-0">
            <Button
              type="submit"
              variant="green"
              size="xl"
              @click.native="handleSubmit"
            >
              Enregistrer
            </Button>
          </div>
        </template>
      </Sectionheading>

      <FormProfile
        ref="form"
        :profile="form"
      />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import FormProfile from '@/components/form/FormProfile.vue'

export default {
  components: {
    FormProfile
  },
  middleware: 'authenticated',
  data () {
    return {
      loading: false,
      form: _.cloneDeep(this.$store.state.auth.user.profile)
    }
  },
  methods: {
    async handleSubmit () {
      await this.$refs.form.handleSubmit()
    }
    // async onSubmitted (profile) {
    //   await this.$store.dispatch('auth/updateProfile', {
    //     id: this.$store.getters.profile.id,
    //     ...profile
    //   })
    //   // this.loading = false
    //   this.$toast.success('Modifications enregistrées')
    //   // this.$router.push('/profile')
    // }
  }
}
</script>
