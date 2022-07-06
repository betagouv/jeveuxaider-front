<template>
  <Box class="space-y-6 lg:space-y-10">
    <div>
      <Heading as="div" :level="3" class="mb-2">
        Présentation de la mission
      </Heading>
      <TextFormatted :max-lines="2" :text="mission.objectif" class="text-cool-gray-500" />
    </div>

    <div
      v-if="mission.information"
      class="p-6 md:p-8 xl:p-12 rounded-xl custom-gradient-2 relative min-h-[120px]"
    >
      <img
        class="absolute right-0 bottom-0 p-6"
        src="/images/icons/quote.svg"
        alt="Guillemets"
      >
      <h3 class="relative z-10 citation text-lg">
        <div v-html="mission.information" />
      </h3>
    </div>

    <div>
      <Heading as="div" :level="3" class="mb-2">
        Précisions
      </Heading>
      <TextFormatted :max-lines="3" :text="mission.description" class="text-cool-gray-500" />
    </div>

    <div v-if="mission.autonomy_precisions">
      <Heading as="div" :level="3" class="mb-2">
        Précisions sur la zone d'intervention
      </Heading>
      <TextFormatted :max-lines="3" :text="mission.autonomy_precisions" class="text-cool-gray-500" />
    </div>

    <div v-if="publicsVolontaires.length > 0">
      <div class="flex items-center gap-4 mb-4">
        <div
          class="flex-none font-bold text-xs uppercase text-gray-500"
        >
          Mission ouverte également aux
        </div>
        <hr class="text-gray-200 w-full">
      </div>
      <div
        v-for="(public_volontaire, key) in publicsVolontaires"
        :key="key"
        class="flex items-center"
      >
        <component
          :is="getIcon(public_volontaire)"
          class="w-6 h-6 mr-3 text-[#808080]"
        />

        <div class="text-cool-gray-500">
          {{ public_volontaire }}
        </div>
      </div>
    </div>
  </Box>
</template>

<script>
import IconMineurs from '@/static/images/icons/public-volontaire-mineurs.svg?inline'
import IconHandicap from '@/static/images/icons/public-volontaire-handicap.svg?inline'

export default {
  components: {
    IconMineurs,
    IconHandicap
  },
  props: {
    mission: {
      type: Object,
      required: true
    }
  },
  computed: {
    publicsVolontaires () {
      return this.mission.publics_volontaires
        ? this.mission.publics_volontaires.filter(
          item =>
            ![
              'Jeunes volontaires du Service National Universel',
              'Personnes en situation de handicap'
            ].includes(item)
        )
        : []
    }
  },
  methods: {
    getIcon (publicVolontaire) {
      switch (publicVolontaire) {
        case 'Personnes en situation de handicap':
          return 'IconHandicap'
        case 'Mineurs':
          return 'IconMineurs'
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
  .custom-gradient-2 {
    background: linear-gradient(to right, #070191 5px, #eeedf7 5px);
  }
  .citation {
    display: flex;
    &::before {
      content: '“\00A0';
    }
    &::after {
      content: '\00A0”';
    }
  }
</style>
