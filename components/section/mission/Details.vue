<template>
  <BaseBox class="space-y-12">
    <div
      v-if="mission.prerequisites?.filter((i) => i).length > 0"
      class="border border-b-4 border-b-jva-blue-500 p-6 sm:p-8"
    >
      <div class="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-8 justify-start">
        <img src="/images/missions/prerequisites.svg" alt="Pré-requis" class="flex-none" />
        <div class="w-full sm:w-auto">
          <div class="text-base font-bold mb-2">Pré-requis pour réaliser cette mission</div>
          <ol
            :class="[
              'text-cool-gray-500 hyphens-auto',
              { 'list-decimal pl-6': mission.prerequisites.length > 1 },
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
      <div class="text-lg mb-4 text-gray-800">Présentation de la mission</div>
      <BaseTextFormatted :max-lines="2" :text="mission.objectif" class="text-cool-gray-500" />
    </div>

    <BaseQuote v-if="mission.information" as="h3" :html-encoded="mission.information" />

    <div>
      <div class="text-lg mb-4 text-gray-800">Précisions</div>
      <BaseTextFormatted :max-lines="3" :text="mission.description" class="text-cool-gray-500" />
    </div>

    <div v-if="mission.addresses_precisions">
      <div class="text-lg mb-4 text-gray-800">Précisions sur la zone d'intervention</div>
      <div class="text-cool-gray-500">
        {{ $filters.decodeHTMLEntities($filters.stripHTML(mission.addresses_precisions)) }}
      </div>
    </div>

    <div v-if="publicsVolontaires.length > 0">
      <BaseHrTitle> Mission ouverte également aux </BaseHrTitle>
      <div
        v-for="(public_volontaire, key) in publicsVolontaires"
        :key="key"
        class="flex items-center"
      >
        <component :is="getIcon(public_volontaire)" class="w-6 h-6 mr-3 text-[#808080]" />

        <div class="text-cool-gray-500 text-sm">
          {{ public_volontaire }}
        </div>
      </div>
    </div>
  </BaseBox>
</template>

<script>
import DsfrMineursIcon from '@/components/icon/dsfr/Mineurs.vue'
import DsfrHandicapIcon from '@/components/icon/dsfr/Handicap.vue'

export default defineNuxtComponent({
  components: {
    DsfrMineursIcon,
    DsfrHandicapIcon,
  },
  props: {
    mission: {
      type: Object,
      required: true,
    },
  },
  computed: {
    publicsVolontaires() {
      return this.mission.publics_volontaires
        ? this.mission.publics_volontaires.filter(
            (item) =>
              ![
                'Jeunes volontaires du Service National Universel',
                'Personnes en situation de handicap',
              ].includes(item)
          )
        : []
    },
  },
  methods: {
    getIcon(publicVolontaire) {
      switch (publicVolontaire) {
        case 'Personnes en situation de handicap':
          return 'DsfrHandicapIcon'
        case 'Mineurs':
          return 'DsfrMineursIcon'
      }
    },
  },
})
</script>
