<template>
  <div
    class="p-4 lg:p-6 flex gap-4 lg:gap-6 justify-between items-center bg-jva-blue-500 text-white"
  >
    <div class="text-lg lg:text-xl font-bold">
      {{ label }}
    </div>
    <div class="flex flex-shrink-0 gap-4 items-center">
      <BaseDropdown ref="dropdownActions" class="flex-none">
        <template #button>
          <DsfrButton
            type="transparent"
            size="lg"
            icon="RiArrowDownSLine"
            icon-position="right"
            class="hidden lg:flex hover:bg-jva-blue-300"
          >
            Autre
          </DsfrButton>
          <DsfrButton
            type="transparent"
            size="md"
            icon="RiMore2Line"
            icon-only
            class="flex lg:hidden hover:bg-jva-blue-300"
          />
        </template>

        <template #items>
          <div class="w-[300px] py-4">
            <BaseDropdownOptionsItem
              @click.native.stop="$router.push(`/admin/organisations/${organisation.id}/edit`)"
            >
              <div class="px-4 text-base font-medium">Modifier cette organisation</div>
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
