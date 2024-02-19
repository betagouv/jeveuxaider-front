<template>
  <div>
    <div class="text-sm flex justify-between px-2 items-center">
      <div class="uppercase font-semibold text-gray-600">
        {{ title }}
      </div>
    </div>

    <div class="space-y-4 mt-4">
      <BaseBox
        v-for="responsable in reseau.responsables"
        :key="responsable.id"
        variant="flat"
        padding="xs"
      >
        <template #header>
          <div class="flex justify-between items-center mb-4">
            <BaseHeading as="h3" :level="5">
              {{ responsable.profile.full_name }}
            </BaseHeading>
            <BaseDropdown v-if="showDropdownActions">
              <template #button>
                <DsfrButton size="xs" type="tertiary" icon="RiMoreFill" icon-only />
              </template>
              <template #items>
                <div class="w-[240px]">
                  <BaseDropdownOptionsItem
                    v-if="canDeleteMember"
                    size="sm"
                    @click="handleDeleteMember(responsable)"
                  >
                    Retirer ce responsable
                  </BaseDropdownOptionsItem>
                  <BaseDropdownOptionsItem
                    v-if="canMasquerade"
                    size="sm"
                    @click="handleImpersonate(responsable)"
                  >
                    Prendre sa place
                  </BaseDropdownOptionsItem>
                </div>
              </template>
            </BaseDropdown>
          </div>
        </template>
        <BaseDescriptionList v-if="responsable">
          <BaseDescriptionListItem term="E-mail" :description="responsable.profile.email" />
          <BaseDescriptionListItem term="Mobile" :description="responsable.profile.mobile" />
        </BaseDescriptionList>
      </BaseBox>
    </div>

    <BaseAlertDialog
      v-if="memberSelected"
      icon="RiErrorWarningLine"
      title="Supprimer le responsable"
      :is-open="showAlertMemberDeleted"
      @confirm="handleConfirmDeleteMember"
      @cancel="showAlertMemberDeleted = false"
    >
      <strong>{{ memberSelected.profile.full_name }}</strong> ne sera plus responsable du réseau
      <strong>{{ reseau.name }}</strong>
    </BaseAlertDialog>
  </div>
</template>

<script>
export default defineNuxtComponent({
  emits: ['removed'],
  components: {},
  props: {
    title: {
      type: String,
      required: true,
    },
    reseau: {
      type: Object,
      required: true,
    },
    responsables: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      memberSelected: null,
      showAlertMemberDeleted: false,
    }
  },
  created() {},
  computed: {
    canDeleteMember() {
      return true
    },
    canMasquerade() {
      return this.$stores.auth.contextRole === 'admin'
    },
    showDropdownActions() {
      return this.canDeleteMember || this.canMasquerade
    },
  },
  methods: {
    async handleImpersonate(responsable) {
      await this.$stores.auth.impersonate(responsable.id)
    },
    handleDeleteMember(member) {
      this.memberSelected = member
      this.showAlertMemberDeleted = true
    },
    async handleConfirmDeleteMember() {
      await apiFetch(`/reseaux/${this.reseau.id}/responsables/${this.memberSelected.id}`, {
        method: 'DELETE',
      })
      this.$emit('removed')
      this.memberSelected = null
      this.showAlertMemberDeleted = false
    },
  },
})
</script>
