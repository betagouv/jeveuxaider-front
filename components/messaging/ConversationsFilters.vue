<template>
  <div class="grid grid-cols-1 gap-12 p-6 lg:p-8">
    <div class="flex space-x-6 items-center">
      <RiArrowLeftLine
        class="h-8 w-8 fill-current text-jva-blue-500 cursor-pointer"
        @click.native="$store.commit('messaging2/toggleShowFilters')"
      />
      <div class="text-2xl font-bold">
        Filtrer les conversations
      </div>
    </div>
    <div class="grid grid-cols-1 gap-12">
      <FormControl
        label="Statut de la participation"
        html-for="participations_states"
      >
        <CheckboxGroup
          v-model="form.participations_states"
          name="participations_states"
          variant="button"
          :options="$labels.participation_workflow_states"
        />
      </FormControl>
      <FormControl
        label="Nom de la mission"
        html-for="mission_name"
      >
        <Input
          v-model="form.mission_name"
          name="mission_name"
          placeholder="Recherche par mots clés"
        />
      </FormControl>
      <div>
        <Button
          :loading="loading"
          type="primary"
          size="md"
          @click.native="handleSubmit"
        >
          Appliquer les filtres
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/dsfr/Button.vue'

export default {
  components: {
    Button
  },
  data () {
    return {
      loading: false,
      form: {}
    }
  },
  methods: {
    handleSubmit () {
      console.log('handlesubmit', this.form)
      this.$store.commit('messaging2/toggleShowFilters')
    }
  }
}
</script>

<style>

</style>
