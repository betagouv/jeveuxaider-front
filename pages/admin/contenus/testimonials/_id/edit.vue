<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Témoignages', link: $store.getters.contextRole === 'admin' ? '/admin/contenus/testimonials' : null },
        { label: `Participation de ${temoignage.participation.profile.full_name}` }
      ]"
    />
    <div class="py-6">
      <SectionHeading :title="`Participation de ${temoignage.participation.profile.full_name}`">
        <template #action>
          <div class="hidden lg:flex flex-col gap-2 flex-shrink-0 items-center justify-center">
            <Button size="xl" variant="green" :loading="loading" @click.native="handleSubmit">
              Enregistrer
            </Button>
          </div>
        </template>
      </Sectionheading>

      <FormTemoignage
        ref="form"
        :temoignage="temoignage"
        class="my-8"
      />
    </div>
  </div>
</template>

<script>
import FormTemoignage from '@/components/form/FormTemoignage'

export default {
  components: { FormTemoignage },
  middleware: 'admin',
  async asyncData ({ $axios, params, error, store }) {
    const { data: temoignage } = await $axios.get(`/temoignages/${params.id}`)
    return {
      temoignage
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
