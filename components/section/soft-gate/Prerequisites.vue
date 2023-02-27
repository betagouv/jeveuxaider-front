<template>
  <div v-if="$store.state.softGate.selectedMission">
    <div class="text-center mb-8">
      <Heading as="div" size="lg" class="mb-2 lg:mb-4">
        Avant toute chose
      </Heading>
      <div class="text-cool-gray-500 max-w-md mx-auto">
        <span>Le responsable de l’organisation précise <br class="hidden sm:block"></span>
        <span>{{ $store.state.softGate.selectedMission.prerequisites.length | pluralize('le ', 'les', false) }}</span>
        <b> pré-requis </b>
        <span>{{ $store.state.softGate.selectedMission.prerequisites.length | pluralize('suivant', 'suivants', false) }}</span>
        <span> pour cette mission :</span>
      </div>

      <ol
        :class="[
          'hyphens-auto text-left max-w-md mx-auto inline-block mt-4',
          {'list-decimal pl-6': $store.state.softGate.selectedMission.prerequisites.length > 1}
        ]"
      >
        <li v-for="(prerequisite, key) in $store.state.softGate.selectedMission.prerequisites" :key="key">
          {{ prerequisite }}
        </li>
      </ol>
    </div>

    <div class="max-w-md mx-auto flex flex-col gap-4">
      <Button
        size="lg"
        @click.native="$emit('next')"
      >
        J'ai compris
      </Button>

      <Button type="tertiary" @click.native="$emit('close')">
        Retour
      </Button>
    </div>
  </div>
</template>

<script>
import Heading from '@/components/dsfr/Heading.vue'
import Button from '@/components/dsfr/Button.vue'

export default {
  name: 'SoftGatePrerequisites',
  components: {
    Heading,
    Button
  },
  data () {
    return {}
  }
}
</script>
