<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal
        :is-open="isOpen"
        title="Quelles activités de bénévolat vous intéressent ?"
        :prevent-click-outside="true"
        :sticky-footer="true"
        header-class="-mr-2"
        content-class="-mr-2 pt-0 pb-6 sm:pb-8"
        @close="$emit('cancel')"
      >
        <div class="">
          <p class="formatted-text text-[#666666] text-pretty max-w-[600px]">
            En ajoutant des activités favorites, nous pourrons vous suggérer des missions qui vous
            correspondent.
          </p>

          <FormUserActivities
            :initial-activities="initialActivities"
            @update:formActivities="formActivities = $event"
            @update:formPopularActivities="formPopularActivities = $event"
          />
        </div>

        <template #footer>
          <DsfrButton type="secondary" @click="onCancel">Annuler</DsfrButton>
          <DsfrButton @click="onConfirm">Valider</DsfrButton>
        </template>
      </BaseModal>
    </Teleport>
  </ClientOnly>
</template>

<script>
export default defineNuxtComponent({
  emits: ['cancel', 'confirm'],
  props: {
    isOpen: { type: Boolean, default: false },
    initialActivities: { type: Array, default: null },
  },
  data() {
    return {
      formActivities: [],
      formPopularActivities: [],
    }
  },
  methods: {
    onConfirm() {
      this.$emit(
        'confirm',
        [...this.formPopularActivities, ...this.formActivities].sort((a, b) =>
          a.key > b.key ? 1 : a.key < b.key ? -1 : 0
        )
      )
    },
    onCancel() {
      this.$emit('cancel')
    },
  },
})
</script>
