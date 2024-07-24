<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Administration', to: '/admin' },
        {
          text: 'Témoignages',
          to: $stores.auth.contextRole === 'admin' ? '/admin/contenus/testimonials' : null,
        },
        {
          text: `Participation de ${temoignage.participation.profile.full_name}`,
        },
      ]"
    />
    <div class="pb-6">
      <BaseSectionHeading :title="`Participation de ${temoignage.participation.profile.full_name}`">
        <template #action>
          <div class="hidden lg:flex flex-col gap-2 flex-shrink-0 items-center justify-center">
            <BaseButton size="xl" variant="green" :loading="loading" @click.native="handleSubmit">
              Enregistrer
            </BaseButton>
          </div>
        </template>
      </BaseSectionHeading>

      <FormTemoignage ref="form" :temoignage="temoignage" class="my-8" />
    </div>
  </div>
</template>

<script>
import FormTemoignage from '@/components/form/FormTemoignage.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: { FormTemoignage, Breadcrumb },
  async setup() {
    definePageMeta({
      middleware: ['admin'],
    })

    const route = useRoute()

    const temoignage = await apiFetch(`/temoignages/${route.params.id}`)
    return {
      temoignage,
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
  },
})
</script>
