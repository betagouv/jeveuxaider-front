<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Missions', link: '/admin/missions' },
        { label: mission.name, link: `/admin/missions/${mission.id}` },
        { label: 'Modification' }
      ]"
    />
    <div class="py-6">
      <SectionHeading :title="mission.name">
        <template #action>
          <div class="hidden lg:block space-x-2">
            <Button variant="white" @click.native="handleSubmitBrouillon()">
              Enregistrer en brouillon
            </Button>
            <Button variant="green" @click.native="handleSubmitPublish()">
              Soumettre à validation
            </Button>
          </div>
        </template>
      </Sectionheading>

      <FormMission
        ref="formMission"
        :mission="mission"
        :structure="mission.structure"
        class="mt-8"
      />
    </div>
  </div>
</template>

<script>
import FormMission from '@/components/form/FormMission.vue'

export default {
  components: {
    FormMission
  },
  layout: 'admin',
  async asyncData ({ $axios, params, error, store }) {
    if (
      ![
        'admin',
        'referent',
        'referent_regional',
        'tete_de_reseau',
        'responsable'
      ].includes(store.getters.contextRole)
    ) {
      return error({ statusCode: 403 })
    }

    const { data: mission } = await $axios.get(`/mission/${params.id}`)
    if (!mission) {
      return error({ statusCode: 404 })
    }

    if (store.getters.contextRole == 'responsable') {
      if (store.getters.contextableId != mission.structure_id) {
        return error({ statusCode: 403 })
      }
    }

    return {
      mission
    }
  },
  methods: {
    handleSubmitBrouillon () {
      this.$refs.formMission.handleSubmitBrouillon()
    },
    handleSubmitPublish () {
      this.$refs.formMission.handleSubmitPublish()
    }
  }
}
</script>
