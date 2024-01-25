<template>
  <BaseAlertDialog
    theme="danger"
    title="Supprimer l'organisation"
    :text="`Vous êtes sur le point de supprimer l'organisation ${organisation.name}.`"
    :is-open="showModalDelete"
    @confirm="handleConfirmDelete()"
    @cancel="showModalDelete = false"
  />
  <BaseDropdown>
    <template #button>
      <DsfrButton :size="buttonSize" type="tertiary" class="!text-gray-800">
        <RiMoreFill class="h-5 w-5 fill-current" />
      </DsfrButton>
    </template>
    <template #items>
      <NuxtLink
        :to="`/admin/missions/?organisation_name=${organisation.name}&filter[structure.id]=${organisation.id}`"
      >
        <BaseDropdownOptionsItem>
          <div class="flex items-center">
            <RiListUnordered class="h-4 w-4 mr-2 fill-current text-gray-600" /> Voir les missions
          </div>
        </BaseDropdownOptionsItem>
      </NuxtLink>
      <NuxtLink
        :to="`/admin/participations/?organisation_name=${organisation.name}&filter[mission.structure.id]=${organisation.id}`"
      >
        <BaseDropdownOptionsItem>
          <div class="flex items-center">
            <RiTeamLine class="h-4 w-4 mr-2 fill-current text-gray-600" /> Voir les participations
          </div>
        </BaseDropdownOptionsItem>
      </NuxtLink>
      <BaseDropdownOptionsItem
        v-if="['admin'].includes($stores.auth.contextRole)"
        @click="showModalDelete = true"
      >
        <div class="flex items-center">
          <RiDeleteBinLine class="h-4 w-4 mr-2 fill-current text-gray-600" /> Supprimer
        </div>
      </BaseDropdownOptionsItem>
    </template>
  </BaseDropdown>
</template>

<script>
import MixinOrganisation from '@/mixins/organisation'

export default defineNuxtComponent({
  emits: ['organisationDeleted'],
  data() {
    return {
      showModalDelete: false,
    }
  },
  mixins: [MixinOrganisation],
  props: {
    organisation: {
      type: Object,
      required: true,
    },
    buttonSize: {
      type: String,
      default: 'md',
    },
  },
})
</script>
