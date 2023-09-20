<template>
  <div class="h-full flex flex-col">
    <div class="flex space-x-6 items-center p-4 lg:p-8">
      <RiArrowLeftLine
        class="h-8 w-8 fill-current text-jva-blue-500 hover:text-jva-blue-300 cursor-pointer"
        @click.native="$stores.messaging.toggleShowFilters()"
      />
      <div class="text-xl lg:text-2xl font-bold">Filtrer les conversations</div>
    </div>

    <BaseContainerScrollable
      class="flex-1 pl-4 lg:pl-6"
      scrollbar-class="pr-4 lg:pr-6 py-4 lg:py-6"
    >
      <div class="px-2 grid grid-cols-1 gap-6 lg:gap-8">
        <BaseFormControl label="Statut de la participation" html-for="participation_state">
          <BaseCheckboxGroup
            v-model="form['filter[participation_state]']"
            name="participation_state"
            variant="button"
            :options="$labels.participation_workflow_states"
          />
        </BaseFormControl>
        <BaseFormControl
          v-if="!['responsable'].includes($stores.auth.contextRole)"
          label="Nom de l’organisation"
          html-for="structure_name"
        >
          <BaseInput
            v-model="form['filter[structure_name]']"
            name="structure_name"
            placeholder="Recherche par mots clés"
            clearable
          />
        </BaseFormControl>
        <BaseFormControl label="Nom de la mission" html-for="mission_name">
          <BaseInput
            v-model="form['filter[mission_name]']"
            name="mission_name"
            placeholder="Recherche par mots clés"
            clearable
          />
        </BaseFormControl>
        <BaseFormControl label="Lieu de la mission" html-for="mission_zip_city">
          <BaseInput
            v-model="form['filter[mission_zip_city]']"
            name="mission_zip_city"
            placeholder="Code postal ou ville"
            clearable
          />
        </BaseFormControl>
      </div>
    </BaseContainerScrollable>

    <div class="flex items-center justify-between border-t p-4 lg:px-8 lg:py-4">
      <div>
        <DsfrLink v-if="$stores.messaging.activeFiltersCount > 0" @click.native="resetForm">
          Réinitialiser
        </DsfrLink>
      </div>
      <DsfrButton
        :loading="loading"
        type="primary"
        size="md"
        class="justify-self-end"
        @click.native="handleSubmit"
      >
        Appliquer les filtres
      </DsfrButton>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  data() {
    return {
      loading: false,
      form: _cloneDeep(this.$stores.messaging.conversationsQueryParams),
    }
  },
  methods: {
    resetForm() {
      this.form = {
        ...this.form,
        'filter[participation_state]': [],
        'filter[structure_name]': null,
        'filter[mission_name]': null,
        'filter[mission_zip_city]': null,
      }
      this.handleSubmit()
    },
    handleSubmit() {
      this.$stores.messaging.conversationsQueryParams = {
        ...this.form,
        page: 1,
      }
      this.$stores.messaging.fetchConversations()
      this.$stores.messaging.toggleShowFilters()
    },
  },
})
</script>
