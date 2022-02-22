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
          <div class="hidden lg:flex flex-col gap-2 flex-shrink-0 items-center justify-center">
            <Button v-if="!mission.template_id || mission.structure.state === 'En attente de validation'" size="xl" variant="green" @click.native="$refs.formMission.handleSubmit({state: 'En attente de validation'})">
              Soumettre à validation
            </Button>
            <Button v-else size="xl" variant="green" @click.native="$refs.formMission.handleSubmit({state: 'Validée'})">
              Enregistrer et publier
            </Button>
            <Link v-if="['Brouillon','En attente de validation'].includes(mission.state)" class="text-sm font-medium" @click.native="$refs.formMission.handleSubmit({state: 'Brouillon'})">
              Enregistrer en brouillon
            </Link>
          </div>
        </template>
      </Sectionheading>

      <FormMission
        ref="formMission"
        :mission="mission"
        :structure="mission.structure"
        class="my-8"
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

    const { data: mission } = await $axios.get(`/missions/${params.id}`)
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

  }
}
</script>
