<template>
  <div
    class="p-4 lg:py-4 lg:px-6 flex gap-4 lg:gap-6 justify-between items-center bg-jva-blue-500 text-white"
  >
    <div class="text-base lg:text-xl font-bold truncate">{{ label }}</div>
    <div class="flex flex-shrink-0 gap-4 items-center">
      <BaseDropdown ref="dropdownActions" class="flex-none">
        <template #button>
          <DsfrButton
            type="transparent"
            icon="RiArrowDownSLine"
            icon-position="right"
            class="hidden lg:flex hover:bg-jva-blue-300"
          >
            Autre
          </DsfrButton>
          <DsfrButton
            type="transparent"
            icon="RiMore2Line"
            icon-only
            class="flex lg:hidden hover:bg-jva-blue-300"
          />
        </template>

        <template #items>
          <div class="w-[300px] py-4">
            <BaseDropdownOptionsItem
              @click.native.stop="$router.push(`/admin/missions/${mission.id}/title`)"
            >
              <div class="px-4 text-base font-medium">Modifier cette mission</div>
            </BaseDropdownOptionsItem>
            <BaseDropdownOptionsItem v-if="canArchive" @click.native="handleArchive">
              <div class="px-4 text-base font-medium">Archiver la conversation</div>
            </BaseDropdownOptionsItem>
            <BaseDropdownOptionsItem v-if="canUnarchive" @click.native.stop="handleUnarchive">
              <div class="px-4 text-base font-medium">Désarchiver la conversation</div>
            </BaseDropdownOptionsItem>
          </div>
        </template>
      </BaseDropdown>
    </div>
  </div>
</template>

<script>
import MixinConversationMission from '@/mixins/conversation/mission'

export default defineNuxtComponent({
  mixins: [MixinConversationMission],
  data() {
    return {}
  },
  computed: {
    label() {
      switch (this.mission.state) {
        case 'Brouillon':
          return 'La mission est en brouillon'
        case 'Validée':
          return 'La mission est validée'
        case 'Signalée':
          return 'La mission est signalée'
        case 'En attente de validation':
          return 'La mission est en attente de validation'
        case 'En cours de traitement':
          return 'La mission est en cours de traitement'
        case 'Terminée':
          return 'La mission est terminée'
        default:
          return this.mission.state
      }
    },
  },
  methods: {},
})
</script>
