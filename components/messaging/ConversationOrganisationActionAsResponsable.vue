<template>
  <div class="p-4 lg:p-6 flex gap-4 lg:gap-6 justify-between items-center bg-jva-blue-500 text-white">
    <div class="text-lg lg:text-xl font-bold">
      {{ label }}
    </div>
    <div class="flex flex-shrink-0 gap-4 items-center">
      <Dropdown ref="dropdownActions" class="flex-none">
        <template #button>
          <Button
            type="transparent"
            size="lg"
            icon="RiArrowDownSLine"
            icon-position="right"
            class="hidden lg:flex hover:bg-jva-blue-300"
          >
            Autre
          </Button>
          <Button
            type="transparent"
            size="md"
            icon="RiMore2Line"
            icon-only
            class="flex lg:hidden hover:bg-jva-blue-300"
          />
        </template>

        <template #items>
          <div class="w-[300px] py-4">
            <DropdownOptionsItem @click.native.stop="$router.push(`/admin/organisations/${organisation.id}`)">
              <div class="px-4 text-base font-medium">
                Modifier cette organisation
              </div>
            </DropdownOptionsItem>
            <DropdownOptionsItem v-if="canArchive" @click.native="handleArchive">
              <div class="px-4 text-base font-medium">
                Archiver la conversation
              </div>
            </DropdownOptionsItem>
            <DropdownOptionsItem v-if="canUnarchive" @click.native.stop="handleUnarchive">
              <div class="px-4 text-base font-medium">
                Désarchiver la conversation
              </div>
            </DropdownOptionsItem>
          </div>
        </template>
      </Dropdown>
    </div>
  </div>
</template>

<script>
import Button from '@/components/dsfr/Button.vue'
import MixinConversationOrganisation from '@/mixins/conversation/organisation'

export default {
  components: {
    Button
  },
  mixins: [MixinConversationOrganisation],
  data () {
    return {
    }
  },
  computed: {
    label () {
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
    }
  },
  methods: {

  }
}
</script>

<style>

</style>
