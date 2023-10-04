<template>
  <div class="container">
    <div class="py-12">
      <BaseSectionHeading title="Création d'un nouveau modèle de message">
        <template #action>
          <BaseButton size="xl" variant="green" :loading="loading" @click.native="handleSubmit">
            Enregistrer
          </BaseButton>
        </template>
      </BaseSectionHeading>

      <FormMessageTemplate
        ref="form"
        class="my-8"
        :message-template="{
          user_id: $stores.auth.user.id,
        }"
      />
    </div>
  </div>
</template>

<script>
import FormMessageTemplate from '@/components/form/FormMessageTemplate.vue'

export default defineNuxtComponent({
  components: {
    FormMessageTemplate,
  },
  setup() {
    definePageMeta({
      layout: 'messages-params',
      middleware: ['authenticated'],
    })

    const { $stores } = useNuxtApp()

    if (['volontaire'].includes($stores.auth.contextRole)) {
      return showError({ statusCode: 403 })
    }
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async handleSubmit(payload) {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.$refs.form.handleSubmit(payload)
      this.loading = false
    },
  },
})
</script>
