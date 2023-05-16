<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Administration', to: '/admin' },
        { text: 'Contenus' },
        { text: 'Activités', to: `/admin/contenus/activites` },
        { text: activity.name }
      ]"
    />
    <div class="pb-6">
      <SectionHeading :title="activity.name">
        <template #action>
          <div class="hidden lg:block space-x-2 flex-shrink-0">
            <Button variant="green" size="xl" :loading="loading" @click.native="handleSubmit()">
              Enregistrer
            </Button>
          </div>
        </template>
      </Sectionheading>

      <FormActivity
        ref="form"
        :activity="activity"
        class="mt-8"
      />
    </div>
  </div>
</template>

<script>
import FormActivity from '@/components/form/FormActivity'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default {
  components: { FormActivity, Breadcrumb },
  middleware: 'admin',
  async asyncData ({ $axios, params, error, store }) {
    const { data: activity } = await $axios.get(`/activities/${params.id}`)
    if (!activity) {
      return error({ statusCode: 404 })
    }

    return {
      activity
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
    }
  }
}
</script>
