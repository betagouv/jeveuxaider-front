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
        <template #tags>
          <Badge :color="mission.state" class="mt-4">
            {{ mission.state }}
          </Badge>
        </template>
        <template #action>
          <ButtonsSubmitFormMission
            class="hidden lg:flex"
            :mission="mission"
            :structure="mission.structure"
            :template-id="mission.template_id"
            :loading="loading"
            @submitted="handleSubmit($event)"
          />
        </template>
      </Sectionheading>

      <FormMission
        ref="form"
        :mission="mission"
        :structure="mission.structure"
        class="my-8"
      />

      <div class="border-t my-8 pt-8 lg:pt-12 lg:my-12">
        <ButtonsSubmitFormMission
          class="flex"
          :mission="mission"
          :structure="mission.structure"
          :template-id="mission.template_id"
          :loading="loading"
          @submitted="handleSubmit($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FormMission from '@/components/form/FormMission.vue'
import ButtonsSubmitFormMission from '@/components/custom/ButtonsSubmitFormMission.vue'

export default {
  components: {
    FormMission,
    ButtonsSubmitFormMission
  },
  middleware: 'authenticated',
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
