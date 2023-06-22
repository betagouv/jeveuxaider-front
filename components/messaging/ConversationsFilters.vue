<template>
  <div class="h-full flex flex-col gap-12 p-4 lg:p-8">
    <div class="flex space-x-6 items-center">
      <RiArrowLeftLine
        class="h-8 w-8 fill-current text-jva-blue-500 hover:text-jva-blue-300 cursor-pointer"
        @click.native="$store.commit('messaging2/toggleShowFilters')"
      />
      <div class="text-xl lg:text-2xl font-bold">
        Filtrer les conversations
      </div>
    </div>

    <ContainerScrollable
      scrollbar-class="pr-4 lg:pr-6"
    >
      <div class="grid grid-cols-1 gap-12">
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
        <div class="flex flex-col items-center justify-center">
          <Button
            :loading="loading"
            type="primary"
            size="md"
            @click.native="handleSubmit"
          >
            Appliquer les filtres
          </Button>
          <Link v-if="$store.getters['messaging2/activeFiltersCount'] > 0" class="mt-1" @click.native="resetForm">
            Réinitialiser
          </Link>
        </div>
      </div>
    </ContainerScrollable>
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
      form: cloneDeep(this.$store.getters['messaging2/conversationsQueryParams'])
    }
  },
  methods: {
    resetForm () {
      console.log('resetForm')
      this.form = {
        ...this.form,
        'filter[participation_state]': [],
        'filter[structure_name]': null,
        'filter[mission_name]': null
      }
    },
    handleSubmit () {
      this.$store.commit('messaging2/setConversationsQueryParams', {
        ...this.form,
        page: 1
      })
      this.$store.dispatch('messaging2/fetchConversations')
      this.$store.commit('messaging2/toggleShowFilters')
    }
  }
}
</script>

<style>

</style>
