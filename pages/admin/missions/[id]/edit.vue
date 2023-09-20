<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Tableau de bord', to: '/dashboard' },
        { text: 'Missions', to: '/admin/missions' },
        { text: mission.name, to: `/admin/missions/${mission.id}` },
        { text: 'Modification' },
      ]"
    />
    <div class="pb-6">
      <BaseSectionHeading :title="mission.name">
        <template #tags>
          <BaseBadge :color="mission.state" class="mt-4">
            {{ mission.state }}
          </BaseBadge>
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
      </BaseSectionHeading>

      <FormMission ref="form" :mission="mission" :structure="mission.structure" class="my-8" />

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
import MixinUsetiful from '@/mixins/usetiful.client.js'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: {
    FormMission,
    ButtonsSubmitFormMission,
    Breadcrumb,
  },
  mixins: [MixinUsetiful],
  async setup() {
    definePageMeta({
      middleware: ['authenticated', 'agreed-responsable-terms'],
    })

    const { $stores } = useNuxtApp()
    const route = useRoute()

    if (
      !['admin', 'referent', 'referent_regional', 'tete_de_reseau', 'responsable'].includes(
        $stores.auth.contextRole
      )
    ) {
      return showError({ statusCode: 403 })
    }

    const mission = await apiFetch(`/missions/${route.params.id}`)
    if (!mission) {
      return showError({ statusCode: 404 })
    }

    if ($stores.auth.contextRole == 'responsable') {
      if ($stores.auth.contextableId != mission.structure_id) {
        return showError({ statusCode: 403 })
      }
    }

    return {
      mission,
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
