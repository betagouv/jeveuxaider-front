<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Administration', to: '/admin' },
        { text: 'Contenus' },
        { text: 'Modèles de mission', to: `/admin/contenus/modeles-mission` },
        { text: 'Nouveau modèle' }
      ]"
    />
    <div class="pb-6">
      <SectionHeading title="Création d'un nouveau modèle de mission">
        <template #action>
          <ButtonsSubmitFormMissionTemplate class="hidden lg:flex" :loading="loading" @submitted="handleSubmit($event)" />
        </template>
      </Sectionheading>

      <FormMissionTemplate
        ref="form"
        class="my-8"
        :mission-template="{
          reseau_id: $store.getters.contextRole === 'tete_de_reseau' ? $store.getters.contextableId: null,
          tags: []
        }"
      />
    </div>
  </div>
</template>

<script>
import FormMissionTemplate from '~/components/form/FormMissionTemplate.vue'
import ButtonsSubmitFormMissionTemplate from '@/components/custom/ButtonsSubmitFormMissionTemplate.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default {
  components: { FormMissionTemplate, ButtonsSubmitFormMissionTemplate, Breadcrumb },
  middleware: 'authenticated',
  asyncData ({ $axios, params, error, store }) {
    if (!['admin', 'tete_de_reseau'].includes(store.getters.contextRole)) {
      return error({ statusCode: 403 })
    }
    return {}
  },
  data () {
    return {
      loading: false
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
    }
  }
}
</script>
