<template>
  <div class="bg-white flex flex-col h-screen">
    <div id="teleport-header" class="relative z-50"></div>
    <div v-if="$stores.formMission.isDraft" class="h-[6px] bg-[#EEEEEE]">
      <div
        class="bg-[#6A6AF4] h-full transition-all"
        :style="`width:${$stores.formMission.progress}%;`"
      ></div>
    </div>
    <div class="flex-grow flex h-full min-h-0">
      <LayoutSidebarFormMission class="hidden lg:block w-[400px]" width />
      <NuxtPage class="flex-1" />
    </div>
    <div id="teleport-body-end"></div>
  </div>
</template>

<script>
export default {
  async setup() {
    useHead({
      bodyAttrs: {
        class: 'full-height-layout',
      },
    })

    const { $stores } = useNuxtApp()
    const route = useRouter().currentRoute.value

    if (
      !['admin', 'referent', 'referent_regional', 'tete_de_reseau', 'responsable'].includes(
        $stores.auth.contextRole
      )
    ) {
      return showError({ statusCode: 403 })
    }

    console.log('form-mission setup')
    if (route.name === 'admin-organisations-id-missions-add') {
      $stores.formMission.reset()
    }
    if (route.name !== 'admin-organisations-id-missions-add') {
      if ($stores.formMission.mission?.id !== route.params.id) {
        console.log('form-mission edit', route.name, route.params.id)
        $stores.formMission.setLoading(true)
        const mission = await apiFetch(`/missions/${route.params.id}/show`)
        $stores.formMission.setMission(mission)
      }

      if (!$stores.formMission.mission) {
        return showError({ statusCode: 404 })
      }
      if ($stores.auth.contextRole == 'responsable') {
        if ($stores.auth.contextableId != $stores.formMission.mission.structure_id) {
          return showError({ statusCode: 403 })
        }
      }
    }
  },
  watch: {
    $route: {
      async handler(newVal, oldVal) {
        if (newVal.params.id && newVal.params.id !== oldVal.params.id) {
          console.log('FormMissionWrapper $route.params.id', newVal.params.id, oldVal.params.id)
          this.$stores.formMission.setLoading(true)
          const mission = await apiFetch(`/missions/${newVal.params.id}/show`)
          // await this.$nextTick()
          this.$stores.formMission.setMission(mission)
        }
      },
    },
  },
  data() {
    return {}
  },
  created() {},
  computed: {},
  methods: {},
}
</script>
