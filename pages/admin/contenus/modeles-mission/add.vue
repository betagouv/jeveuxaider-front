<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Contenus' },
        { label: 'Modèles de mission', link: `/admin/contenus/modeles-mission` },
        { label: 'Nouveau modèle' }
      ]"
    />
    <div class="py-6">
      <SectionHeading title="Création d'un nouveau modèle de mission">
        <template #action>
          <ButtonsSubmitFormMissionTemplate class="hidden lg:flex" @submitted="$refs.form.handleSubmit($event)" />
        </template>
      </Sectionheading>

      <FormMissionTemplate
        ref="form"
        class="my-8"
        :mission-template="{reseau_id: $store.getters.contextRole === 'tete_de_reseau' ? $store.getters.profile.tete_de_reseau_id: null}"
      />
      <ButtonsSubmitFormMissionTemplate class="flex lg:hidden" @submitted="$refs.form.handleSubmit($event)" />
    </div>
  </div>
</template>

<script>
import FormMissionTemplate from '~/components/form/FormMissionTemplate.vue'
import ButtonsSubmitFormMissionTemplate from '@/components/custom/ButtonsSubmitFormMissionTemplate.vue'

export default {
  components: { FormMissionTemplate, ButtonsSubmitFormMissionTemplate },
  layout: 'admin',
  asyncData ({ $axios, params, error, store }) {
    if (!['admin', 'tete_de_reseau'].includes(store.getters.contextRole)) {
      return error({ statusCode: 403 })
    }
    return {
    }
  },
  methods: {

  }
}
</script>
