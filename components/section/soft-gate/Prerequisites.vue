<template>
  <div v-if="$stores.softGate.selectedMission">
    <div class="text-center mb-8">
      <DsfrHeading as="div" size="xl" class="mb-2 lg:mb-4">
        Pré-requis pour la mission
      </DsfrHeading>
      <div class="text-cool-gray-500 lg:text-lg max-w-sm mx-auto">
        <span
          >Cochez
          {{ $filters.pluralize(options.length, 'le', 'les', false) }}
          <span class="font-extrabold"> pré-requis </span>
          {{ $filters.pluralize(options.length, 'suivant', 'suivants', false) }}
          pour valider votre candidature</span
        >
      </div>
    </div>
    <div>
      <div class="mt-8">
        <BaseCheckboxGroup
          v-model="checkedPrerequisites"
          name="prerequisites"
          variant="checkbox"
          size="lg"
          :options="options"
        />
      </div>

      <div class="text-center mt-8">
        <div>
          <DsfrButton size="lg" @click.native="$emit('next')" :disabled="disabled" class="w-full">
            Je confirme
            {{ $filters.pluralize(options.length, 'ce', 'ces', false) }}
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
  props: {
    checkDistance: {
      type: Boolean,
      default: false,
    },
  },
  name: 'SoftGatePrerequisites',
  data() {
    return {
      checkedPrerequisites: [],
    }
  },
  computed: {
    disabled() {
      return this.options.length !== this.checkedPrerequisites.length
    },
    userZip() {
      return `${this.$stores.auth.user.profile.zip} - ${this.$stores.auth.user.profile.city}`
    },
    missionZip() {
      return `${this.$stores.softGate.selectedMission.zip} - ${this.$stores.softGate.selectedMission.city}`
    },
    options() {
      if (this.checkDistance) {
        this.prerequisites.push({
          key: 'distance',
          label: `Je suis en mesure de me déplacer bien que mon code postal (${this.userZip}) se situe à plus de 30km du lieu de la mission (${this.missionZip})`,
        })
      }
      return this.prerequisites
    },
    prerequisites() {
      if (!this.$stores.softGate.selectedMission.prerequisites) {
        return []
      }
      return this.$stores.softGate.selectedMission.prerequisites.map((prerequisite, key) => ({
        key,
        label: prerequisite,
      }))
    },
  },
})
</script>
