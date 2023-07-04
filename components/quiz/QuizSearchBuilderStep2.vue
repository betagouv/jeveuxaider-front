<template>
  <div class="px-[64px] py-[48px] lg:px-[80px] lg:py-[56px]">
    <div class="text-[40px] text-black font-bold mb-12 leading-snug">
      Précisez où souhaitez-vous réaliser votre mission ?
    </div>
    <div class="max-w-lg flex flex-col gap-6">
      <QuizOption
        title="Autour de moi"
        description="Via la géolocalisation de votre navigateur"
        @click.native="onClickAroundMe"
      >
        <template #icon>
          <IconMap />
        </template>
      </QuizOption>
      <QuizOption
        title="Ville ou code postal"
        :selectable="false"
      >
        <template #icon>
          <IconFrance />
        </template>
        <InputAutocomplete
          icon="LocationMarkerIcon"
          name="adress"
          placeholder="Renseignez une ville ou un code postal"
          :options="autocompleteOptions"
          attribute-key="id"
          attribute-label="label"
          attribute-right-label="typeLabel"
          :min-value-length="3"
          @selected="handleSelectedGeo"
          @fetch-suggestions="onFetchGeoSuggestions"
        />
      </QuizOption>
    </div>
  </div>
</template>

<script>
import IconFrance from '@/static/images/icons/dsfr/france-localization.svg?inline'
import IconMap from '@/static/images/icons/dsfr/map.svg?inline'
import QuizOption from '@/components/quiz/QuizOption.vue'
import inputGeo from '@/mixins/input-geo'

export default {
  components: {
    QuizOption,
    IconFrance,
    IconMap
  },
  mixins: [inputGeo],
  data () {
    return {

    }
  },
  computed: {
  },
  mounted () {
    // console.log('route', this.$route)
  },
  methods: {
    onClickAroundMe () {
      // @TODO
      this.$store.commit('quiz/nextStep')
    },
    handleSelectedGeo (item) {
      if (item) {
        this.$store.commit('quiz/setQuery', {
          ...this.$store.getters['quiz/query'],
          city: item.city,
          aroundLatLng: `${item.coordinates[0]},${item.coordinates[1]}`
        })
      }
      this.$store.commit('quiz/nextStep')
    }
  }
}
</script>

<style>

</style>
