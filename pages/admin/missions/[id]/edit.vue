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
  </div>
  <div
    ref="menuActions"
    :class="[isPinned ? 'bg-white shadow-lg' : '']"
    class="z-50 sticky top-[-1px]"
  >
    <div class="container">
      <div class="flex justify-between" :class="[isPinned ? 'py-8' : 'border-b pb-8 mb-8']">
        <div>
          <BaseHeading :level="1" class="mb-4">
            Mission
            <span class="font-normal text-gray-500 text-2xl">#{{ mission.id }}</span>
            <DsfrLink
              :to="`/missions-benevolat/${mission.id}/${mission.slug}`"
              :is-external="true"
              class="text-xs font-normal ml-2"
            >
              Voir la mission
            </DsfrLink>
          </BaseHeading>
          <Badges :mission="mission" />
        </div>
        <div class="flex space-x-3">
          <ButtonsSubmitFormMission
            class="hidden lg:flex"
            :mission="mission"
            :structure="mission.structure"
            :template-id="mission.template_id"
            :loading="loading"
            @submitted="handleSubmit($event)"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="pb-6">
      <FormMission ref="form" :mission="mission" :structure="mission.structure" class="my-8" />
    </div>
  </div>
</template>

<script>
import FormMission from '@/components/form/FormMission.vue'
import ButtonsSubmitFormMission from '@/components/custom/ButtonsSubmitFormMission.vue'
import MixinUsetiful from '@/mixins/usetiful.client.js'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import Badges from '@/components/section/mission/Badges.vue'

export default defineNuxtComponent({
  components: {
    FormMission,
    ButtonsSubmitFormMission,
    Breadcrumb,
    Badges,
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
  mounted() {
    let timeout
    window.addEventListener(
      'scroll',
      () => {
        if (timeout) {
          window.cancelAnimationFrame(timeout)
        }
        timeout = window.requestAnimationFrame(() => {
          this.handleScroll()
        })
      },
      false
    )
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  data() {
    return {
      loading: false,
      isPinned: false,
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
    handleScroll() {
      if (!this.$refs.menuActions) {
        return
      }
      this.isPinned = this.$refs.menuActions.getBoundingClientRect().top < 0
    },
  },
})
</script>
