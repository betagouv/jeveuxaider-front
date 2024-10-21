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
          <div class="w-[300px]">
            <BaseDropdownOptionsItem
              @click.native.stop="$router.push(`/admin/organisations/${organisation.id}/edit`)"
            >
              Modifier cette organisation
            </BaseDropdownOptionsItem>
            <BaseDropdownOptionsItem v-if="canArchive" @click.native="handleArchive">
              Archiver la conversation
            </BaseDropdownOptionsItem>
            <BaseDropdownOptionsItem v-if="canUnarchive" @click.native.stop="handleUnarchive">
              Désarchiver la conversation
            </BaseDropdownOptionsItem>
          </div>
        </template>
      </BaseDropdown>
    </div>
  </div>
</template>

<script>
import MixinConversationOrganisation from '@/mixins/conversation/organisation'

export default defineNuxtComponent({
  mixins: [MixinConversationOrganisation],
  data() {
    return {}
  },
  computed: {
    label() {
      switch (this.organisation.state) {
        case 'Brouillon':
          return 'L’organisation est en brouillon'
        case 'Validée':
          return 'L’organisation est validée'
        case 'Signalée':
          return 'L’organisation est signalée'
        case 'En attente de validation':
          return 'L’organisation est en attente de validation'
        case 'En cours de traitement':
          return 'L’organisation est en cours de traitement'
        default:
          return this.organisation.state
      }
    },
  },
  methods: {},
})
</script>
