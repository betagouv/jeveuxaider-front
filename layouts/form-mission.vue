<template>
  <div class="bg-white flex flex-col h-full overflow-x-hidden">
    <header id="teleport-header" class="relative z-50"></header>

    <div v-if="$stores.formMission.isDraft" class="h-[6px] bg-[#EEEEEE]">
      <div
        class="bg-[#6A6AF4] h-full transition-all"
        :style="`width:${$stores.formMission.progress}%;`"
      ></div>
    </div>
    <div v-if="$stores.formMission.mission && !$stores.formMission.isDraft" class="block lg:hidden">
      <div class="p-4">
        <BaseSelectAdvanced
          id="menu"
          v-model="selectedMenuItem"
          name="menu"
          :options="menuItems"
          @changed="handleChangeItem($event)"
        />
      </div>
    </div>
    <div class="flex-grow flex h-full min-h-0">
      <LayoutSidebarFormMission class="hidden lg:block w-[400px]" />
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

    if (route.name === 'admin-organisations-id-missions-add') {
      $stores.formMission.reset()
    }
    if (route.name !== 'admin-organisations-id-missions-add') {
      if ($stores.formMission.mission?.id !== route.params.id) {
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
        if (
          newVal.params.id &&
          newVal.params.id !== oldVal.params.id &&
          newVal.name.includes('admin-missions-id')
        ) {
          this.$stores.formMission.setLoading(true)
          const mission = await apiFetch(`/missions/${newVal.params.id}/show`)
          this.$stores.formMission.setMission(mission)
        }
      },
    },
  },
  data() {
    return {
      selectedMenuItem: this.$route.name,
    }
  },
  created() {},
  computed: {
    menuItems() {
      const missionId = this.$stores.formMission?.mission?.id
      return [
        {
          key: 'admin-missions-id-title',
          label: 'Titre',
          to: `/admin/missions/${missionId}/title`,
        },
        {
          key: 'admin-missions-id-visuel',
          label: 'Visuel',
          to: `/admin/missions/${missionId}/visuel`,
        },
        {
          key: 'admin-missions-id-informations',
          label: 'Informations',
          to: `/admin/missions/${missionId}/informations`,
        },
        {
          key: 'admin-missions-id-dates',
          label: 'Dates',
          to: `/admin/missions/${missionId}/dates`,
        },
        {
          key: 'admin-missions-id-lieux',
          label: 'Lieux',
          to: `/admin/missions/${missionId}/lieux`,
        },
        {
          key: 'admin-missions-id-benevoles',
          label: 'Bénévoles recherchés',
          to: `/admin/missions/${missionId}/benevoles`,
        },
        {
          key: 'admin-missions-id-benevoles-informations',
          label: 'Informations bénévoles',
          to: `/admin/missions/${missionId}/benevoles-informations`,
        },
        {
          key: 'admin-missions-id-responsables',
          label: 'Responsables',
          to: `/admin/missions/${missionId}/responsables`,
        },
      ]
    },
  },
  methods: {
    handleChangeItem(item) {
      if (!item) {
        return
      }

      if (item.to) {
        this.$router.push(item.to)
      } else if (item.href) {
        window.location.href = item.href
      }
    },
  },
}
</script>
