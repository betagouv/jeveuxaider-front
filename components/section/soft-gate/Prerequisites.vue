<template>
  <div v-if="$stores.softGate.selectedMission">
    <div class="text-center mb-8">
      <DsfrHeading as="div" size="lg" class="mb-2 lg:mb-4"> Avant toute chose </DsfrHeading>
      <div class="text-cool-gray-500 max-w-md mx-auto">
        <span>Le responsable de l’organisation précise <br class="hidden sm:block" /></span>
        <span>{{
          $filters.pluralize(
            $stores.softGate.selectedMission.prerequisites.length,
            'le ',
            'les',
            false
          )
        }}</span>
        <b> pré-requis </b>
        <span>{{
          $filters.pluralize(
            $stores.softGate.selectedMission.prerequisites.length,
            'suivant',
            'suivants',
            false
          )
        }}</span>
        <span> pour cette mission :</span>
      </div>

      <ol
        :class="[
          'hyphens-auto text-left max-w-md mx-auto inline-block mt-4',
          {
            'list-decimal pl-6': $stores.softGate.selectedMission.prerequisites.length > 1,
          },
        ]"
      >
        <li
          v-for="(prerequisite, key) in $stores.softGate.selectedMission.prerequisites"
          :key="key"
        >
          {{ prerequisite }}
        </li>
      </ol>
    </div>

    <div class="max-w-md mx-auto flex flex-col gap-4">
      <DsfrButton size="lg" @click.native="$emit('next')"> J'ai compris </DsfrButton>

      <DsfrButton type="tertiary" @click.native="$emit('close')"> Retour </DsfrButton>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  name: 'SoftGatePrerequisites',
  data() {
    return {}
  },
})
</script>
