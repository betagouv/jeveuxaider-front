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
          <div class="hidden lg:flex flex-col gap-2 flex-shrink-0 items-center justify-center">
            <Button size="xl" variant="green" @click.native="$refs.form.handleSubmit()">
              Enregistrer
            </Button>
            <Link class="text-sm font-medium" @click.native="$refs.form.handleSubmit({state: 'draft'})">
              Enregistrer en brouillon
            </Link>
          </div>
        </template>
      </Sectionheading>

      <FormMissionTemplate
        ref="form"
        class="my-8"
        :mission-template="{reseau_id: $store.getters.contextRole === 'tete_de_reseau' ? $store.getters.profile.tete_de_reseau_id: null}"
      />
    </div>
  </div>
</template>

<script>
import FormMissionTemplate from '~/components/form/FormMissionTemplate.vue'

export default {
  components: { FormMissionTemplate },
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
