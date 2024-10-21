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
      <DsfrButton
        :size="buttonSize"
        type="tertiary"
        class="!text-gray-800"
        icon="RiMoreFill"
        icon-only
      >
      </DsfrButton>
    </template>
    <template #items>
      <div :class="[{ 'w-[220px]': buttonSize === 'sm' }, { 'w-[270px]': buttonSize === 'md' }]">
        <NuxtLink
          :to="`/admin/missions/?organisation_name=${organisation.name}&filter[structure.id]=${organisation.id}`"
        >
          <BaseDropdownOptionsItem :size="buttonSize" icon="RiListUnordered">
            Voir les missions
          </BaseDropdownOptionsItem>
        </NuxtLink>
        <NuxtLink
          :to="`/admin/participations/?organisation_name=${organisation.name}&filter[mission.structure.id]=${organisation.id}`"
        >
          <BaseDropdownOptionsItem :size="buttonSize" icon="RiMailStar">
            Voir les participations
          </BaseDropdownOptionsItem>
        </NuxtLink>
        <BaseDropdownOptionsItem
          v-if="['admin', 'responsable', 'tete_de_reseau'].includes($stores.auth.contextRole)"
          @click.native="
            () => {
              showDrawerInvitation = true
              showDrawerAddResponsable = false
            }
          "
          :size="buttonSize"
          icon="RiUserAdd"
        >
          Inviter un membre
        </BaseDropdownOptionsItem>
        <BaseDropdownOptionsItem
          :size="buttonSize"
          v-if="['admin'].includes($stores.auth.contextRole)"
          @click="
            () => {
              showDrawerAddResponsable = true
              showDrawerInvitation = false
            }
          "
          icon="RiUserAdd"
        >
          <div
            class="flex items-center"
            v-tooltip="{
              content: 'L\'utilisateur ajouté à l\'organisation ne recevra pas de notifications.',
            }"
            variant="white"
          >
            Ajouter un membre
          </div>
        </BaseDropdownOptionsItem>
        <BaseDropdownOptionsItem
          :size="buttonSize"
          v-if="['admin'].includes($stores.auth.contextRole)"
          @click="showModalDelete = true"
          icon="RiDeleteBinLine"
        >
          Supprimer
        </BaseDropdownOptionsItem>
      </div>
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
