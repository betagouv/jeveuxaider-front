<template>
  <BaseAlertDialog
    icon="RiErrorWarningLine"
    title="Supprimer le territoire"
    :is-open="showModalDelete"
    @confirm="handleConfirmDelete()"
    @cancel="showModalDelete = false"
  >
    Vous êtes sur le point de supprimer le territoire {{ territoire.name }}.
  </BaseAlertDialog>
  <BaseDrawer
    :is-open="showDrawerAddResponsable"
    form-id="form-add-responsable"
    submit-label="Ajouter ce membre"
    @close="showDrawerAddResponsable = false"
    :classContainer="isMenuPinned ? 'pt-[80px]' : undefined"
  >
    <template #title>
      <BaseHeading :level="3"> Ajouter un reponsable </BaseHeading>
    </template>
    <FormAddResponsable
      class="mt-8"
      :endpoint="`/territoires/${territoire.id}/responsables`"
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
      <BaseHeading :level="3"> Inviter un responsable </BaseHeading>
    </template>
    <FormInvitation
      class="mt-8"
      role="responsable_territoire"
      :invitable-id="territoire.id"
      invitable-type="App\Models\Territoire"
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
          :to="`/admin/missions/?territoire_name=${territoire.name}&filter[ofTerritoire]=${territoire.id}`"
        >
          <BaseDropdownOptionsItem icon="RiListUnordered" :size="buttonSize">
            Voir les missions
          </BaseDropdownOptionsItem>
        </NuxtLink>
        <NuxtLink
          :to="`/admin/participations/?territoire_name=${territoire.name}&filter[ofTerritoire]=${territoire.id}`"
        >
          <BaseDropdownOptionsItem icon="RiMailStar" :size="buttonSize">
            Voir les participations
          </BaseDropdownOptionsItem>
        </NuxtLink>
        <BaseDropdownOptionsItem
          icon="RiUserAdd"
          :size="buttonSize"
          v-if="['admin', 'responsable_territoire'].includes($stores.auth.contextRole)"
          @click.native="
            () => {
              showDrawerInvitation = true
              showDrawerAddResponsable = false
            }
          "
        >
          Inviter un responsable
        </BaseDropdownOptionsItem>
        <BaseDropdownOptionsItem
          icon="RiUserAdd"
          :size="buttonSize"
          v-if="['admin'].includes($stores.auth.contextRole)"
          @click="
            () => {
              showDrawerAddResponsable = true
              showDrawerInvitation = false
            }
          "
        >
          <div
            v-tooltip="{
              content: 'L\'utilisateur ajouté au territoire ne recevra pas de notifications.',
            }"
            variant="white"
          >
            Ajouter un responsable
          </div>
        </BaseDropdownOptionsItem>
        <BaseDropdownOptionsItem
          icon="RiDeleteBinLine"
          :size="buttonSize"
          v-if="['admin'].includes($stores.auth.contextRole)"
          @click="showModalDelete = true"
        >
          Supprimer
        </BaseDropdownOptionsItem>
      </div>
    </template>
  </BaseDropdown>
</template>

<script>
import MixinTerritoire from '@/mixins/territoire'

export default defineNuxtComponent({
  emits: ['territoireDeleted', 'territoireUpdated'],
  data() {
    return {
      showModalDelete: false,
      showDrawerAddResponsable: false,
      showDrawerInvitation: false,
    }
  },
  mixins: [MixinTerritoire],
  props: {
    territoire: {
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
      this.$emit('territoireUpdated')
    },
    handleSubmitAddResponsable() {
      this.showDrawerAddResponsable = false
      this.$emit('territoireUpdated')
    },
    async handleConfirmDelete() {
      apiFetch(`/territoires/${this.territoire.id}`, {
        method: 'DELETE',
      })
        .then((res) => {
          this.showModalDelete = false
          this.$emit('territoireDeleted')
        })
        .catch(() => {})
    },
  },
})
</script>
