<template>
  <div v-if="$stores.softGate.selectedMission">
    <div class="max-w-[380px] mx-auto text-center mb-8">
      <DsfrHeading as="div" size="lg" class="mb-2 lg:mb-4">
        Pré-requis pour la mission
      </DsfrHeading>
      <div class="text-cool-gray-500 font-medium text-[20px]">
        <span
          >Cochez
          {{
            $filters.pluralize(
              $stores.softGate.selectedMission.prerequisites.length,
              'le',
              'les',
              false
            )
          }}
          <span class="font-extrabold"> pré-requis </span>
          {{
            $filters.pluralize(
              $stores.softGate.selectedMission.prerequisites.length,
              'suivant',
              'suivants',
              false
            )
          }}
          pour valider votre candidature :</span
        >
      </div>

      <div class="mt-8">
        <BaseCheckboxGroup
          v-model="checkedPrerequisites"
          name="prerequisites"
          variant="checkbox"
          size="lg"
          :options="
            $stores.softGate.selectedMission.prerequisites.map((prerequisite, key) => ({
              key,
              label: prerequisite,
            }))
          "
        />
      </div>

      <div class="text-center mt-8">
        <div>
          <DsfrButton size="lg" @click.native="$emit('next')" :disabled="disabled" class="w-full">
            Je confirme
            {{
              $filters.pluralize(
                $stores.softGate.selectedMission.prerequisites.length,
                'ce',
                'ces',
                false
              )
            }}
            pré-requis
          </DsfrButton>
        </div>
        <div class="mt-4">
          <DsfrLink @click.native="$emit('close')" class="text-jva-blue-500"> Retour </DsfrLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  name: 'SoftGatePrerequisites',
  data() {
    return {
      checkedPrerequisites: [],
    }
  },
  computed: {
    disabled() {
      return (
        this.$stores.softGate.selectedMission.prerequisites.length !==
        this.checkedPrerequisites.length
      )
    },
  },
})
</script>
