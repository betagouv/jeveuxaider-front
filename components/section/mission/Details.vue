<template>
  <Box class="space-y-12">
    <div v-if="mission.prerequisites" class="border border-b-4 border-b-jva-blue-500 p-8">
      <div class="flex items-center gap-8">
        <img src="/images/missions/prerequisites.svg" alt="Pré-requis" class="flex-none">
        <div>
          <div class="text-base font-bold mb-2">
            Pré-requis pour réaliser cette mission
          </div>
          <ol
            :class="[
              'text-cool-gray-500 hyphens-auto',
              {'list-decimal pl-6': mission.prerequisites.length > 1}
            ]"
          >
            <li v-for="(prerequisite, key) in mission.prerequisites" :key="key">
              {{ prerequisite }}
            </li>
          </ol>
        </div>
      </div>
    </div>

    <div>
      <div class="text-lg mb-4 text-gray-800">
        Présentation de la mission
      </div>
      <TextFormatted :max-lines="2" :text="mission.objectif" class="text-cool-gray-500" />
    </div>

    <Quote
      v-if="mission.information"
      as="h3"
      :html-encoded="mission.information"
    />

    <div>
      <div class="text-lg mb-4 text-gray-800">
        Précisions
      </div>
      <TextFormatted :max-lines="3" :text="mission.description" class="text-cool-gray-500" />
    </div>

    <div v-if="mission.autonomy_precisions">
      <div class="text-lg mb-4 text-gray-800">
        Précisions sur la zone d'intervention
      </div>
      <TextFormatted :max-lines="3" :text="mission.autonomy_precisions" class="text-cool-gray-500" />
    </div>

    <div v-if="publicsVolontaires.length > 0">
      <HrTitle>
        Mission ouverte également aux
      </HrTitle>
      <div
        v-for="(public_volontaire, key) in publicsVolontaires"
        :key="key"
        class="flex items-center"
      >
        <component
          :is="getIcon(public_volontaire)"
          class="w-6 h-6 mr-3 text-[#808080]"
        />

        <div class="text-cool-gray-500 text-sm">
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
