<template>
  <BaseAlertDialog
    icon="RiErrorWarningLine"
    title="Supprimer l'organisation"
    :is-open="showModalDelete"
    @confirm="handleConfirmDelete()"
    @cancel="showModalDelete = false"
  >
    Vous êtes sur le point de supprimer l'organisation {{ organisation.name }}.
  </BaseAlertDialog>
  <BaseDrawer
    :is-open="showDrawerAddResponsable"
    form-id="form-add-responsable"
    submit-label="Ajouter ce membre"
    @close="showDrawerAddResponsable = false"
    :classContainer="isMenuPinned ? 'pt-[80px]' : undefined"
  >
    <template #title>
      <BaseHeading :level="3"> Ajouter un membre </BaseHeading>
    </template>
    <FormAddResponsable
      class="mt-8"
      :endpoint="`/structures/${organisation.id}/responsables`"
      @submited="handleSubmitAddResponsable"
    />
  </BaseDrawer>
  <BaseDrawer
    :is-open="showDrawerInvitation"
    form-id="form-invitation"
    submit-label="Envoyer l'invitation"
    @close="showDrawerInvitation = false"
    :classContainer="isMenuPinned ? 'pt-[80px]' : undefined"
  >
    <template #title>
      <BaseHeading :level="3"> Inviter un nouveau membre </BaseHeading>
    </template>
    <FormInvitation
      class="mt-8"
      role="responsable_organisation"
      :invitable-id="organisation.id"
      invitable-type="App\Models\Structure"
      @submited="handleSubmitInvitation"
    />
  </BaseDrawer>
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
            <RiMailStar class="h-4 w-4 mr-2 fill-current text-gray-600" /> Voir les participations
          </div>
        </BaseDropdownOptionsItem>
      </NuxtLink>
      <BaseDropdownOptionsItem
        @click.native="
          () => {
            showDrawerInvitation = true
            showDrawerAddResponsable = false
          }
        "
      >
        <div
          class="flex items-center"
          v-if="['admin', 'responsable', 'tete_de_reseau'].includes($stores.auth.contextRole)"
          variant="white"
        >
          <RiUserAdd class="h-4 w-4 mr-2" /> Inviter un membre
        </div>
      </BaseDropdownOptionsItem>
      <BaseDropdownOptionsItem
        v-if="['admin'].includes($stores.auth.contextRole)"
        @click="
          () => {
            showDrawerAddResponsable = true
            showDrawerInvitation = false
          }
        "
      >
        <div
          class="flex items-center"
          v-tooltip="{
            content: 'L\'utilisateur ajouté à l\'organisation ne recevra pas de notifications.',
          }"
          variant="white"
        >
          <RiUserAdd class="h-4 w-4 mr-2" /> Ajouter un membre
        </div>
      </BaseDropdownOptionsItem>
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
  emits: ['organisationDeleted', 'organisationUpdated'],
  data() {
    return {
      showModalDelete: false,
      showDrawerAddResponsable: false,
      showDrawerInvitation: false,
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
    isMenuPinned: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleSubmitInvitation() {
      this.showDrawerInvitation = false
      this.$emit('organisationUpdated')
    },
    handleSubmitAddResponsable() {
      this.showDrawerAddResponsable = false
      this.$emit('organisationUpdated')
    },
  },
})
</script>
