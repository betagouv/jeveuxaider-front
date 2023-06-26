<template>
  <div class="h-full flex flex-col">
    <div class="flex space-x-6 items-center p-4 lg:p-8">
      <RiArrowLeftLine
        class="h-8 w-8 fill-current text-jva-blue-500 hover:text-jva-blue-300 cursor-pointer"
        @click.native="$store.commit('messaging/toggleShowFilters')"
      />
      <div class="text-xl lg:text-2xl font-bold">
        Filtrer les conversations
      </div>
    </div>

    <ContainerScrollable
      class="-mx-2 flex-1 p-4 lg:px-8 lg:py-4"
      scrollbar-class="pr-4 lg:pr-6"
    >
      <div class="px-2 grid grid-cols-1 gap-6 lg:gap-8">
        <FormControl
          label="Statut de la participation"
          html-for="participation_state"
        >
          <CheckboxGroup
            v-model="form['filter[participation_state]']"
            name="participation_state"
            variant="button"
            :options="$labels.participation_workflow_states"
          />
        </FormControl>
        <FormControl
          v-if="!['responsable'].includes($store.getters.contextRole)"
          label="Nom de l’organisation"
          html-for="structure_name"
        >
          <Input
            v-model="form['filter[structure_name]']"
            name="structure_name"
            placeholder="Recherche par mots clés"
            clearable
          />
        </FormControl>
        <FormControl
          label="Nom de la mission"
          html-for="mission_name"
        >
          <Input
            v-model="form['filter[mission_name]']"
            name="mission_name"
            placeholder="Recherche par mots clés"
            clearable
          />
        </FormControl>
        <FormControl
          label="Lieu de la mission"
          html-for="mission_zip_city"
        >
          <Input
            v-model="form['filter[mission_zip_city]']"
            name="mission_zip_city"
            placeholder="Code postal ou ville"
            clearable
          />
        </FormControl>
      </div>
    </ContainerScrollable>

    <div class="flex items-center justify-between border-t p-4 lg:px-8 lg:py-4">
      <div>
        <Link v-if="$store.getters['messaging/activeFiltersCount'] > 0" @click.native="resetForm">
          Réinitialiser
        </Link>
      </div>
      <Button
        :loading="loading"
        type="primary"
        size="md"
        class=" justify-self-end"
        @click.native="handleSubmit"
      >
        Appliquer les filtres
      </Button>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import Button from '@/components/dsfr/Button.vue'
import Link from '@/components/dsfr/Link.vue'

export default {
  components: {
    Button,
    Link
  },
  data () {
    return {
      loading: false,
      form: cloneDeep(this.$store.getters['messaging/conversationsQueryParams'])
    }
  },
  methods: {
    resetForm () {
      this.form = {
        ...this.form,
        'filter[participation_state]': [],
        'filter[structure_name]': null,
        'filter[mission_name]': null,
        'filter[mission_zip_city]': null
      }
      this.handleSubmit()
    },
    handleSubmit () {
      this.$store.commit('messaging/setConversationsQueryParams', {
        ...this.form,
        page: 1
      })
      this.$store.dispatch('messaging/fetchConversations')
      this.$store.commit('messaging/toggleShowFilters')
    }
  }
}
</script>

<style>

</style>
