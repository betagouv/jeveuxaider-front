<template>
  <QuizStep :title="title" :slogan="slogan" :picture="picture">
    <div class="max-w-lg flex flex-col gap-6">
      <QuizOption
        title="Autour de moi"
        description="Via la géolocalisation de votre navigateur"
        :selected="$store.getters['quiz/navigatorGeolocationSelected']"
        @click.native="onClickAroundMe"
      >
        <template #icon>
          <RiLoader5Line
            v-if="geolocationLoading"
            class="animate-spin h-[56px] w-[56px] text-gray-400 fill-current"
          />
          <IconMap v-else />
        </template>
      </QuizOption>
      <QuizOption
        title="Ville ou code postal"
        :selectable="false"
        :selected="$store.getters['quiz/query']?.aroundLatLng ? true : false"
      >
        <template #icon>
          <IconFrance />
        </template>
        <InputAutocomplete
          :value="$store.getters['quiz/query'].city"
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
  </QuizStep>
</template>

<script>
import QuizStep from '@/components/quiz/QuizStep.vue'
import IconFrance from '@/static/images/icons/dsfr/france-localization.svg?inline'
import IconMap from '@/static/images/icons/dsfr/map.svg?inline'
import QuizOption from '@/components/quiz/QuizOption.vue'
import inputGeo from '@/mixins/input-geo'
import Toast from '@/components/base/Toast'

export default {
  components: {
    QuizStep,
    QuizOption,
    IconFrance,
    IconMap
  },
  mixins: [inputGeo],
  props: {
    title: {
      type: String,
      required: true
    },
    slogan: {
      type: String,
      default: null
    },
    picture: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      geolocationLoading: false,
      geolocationOptions: {
        enableHighAccuracy: true,
        timeout: 50000,
        maximumAge: 120
      }
    }
  },
  computed: {
  },
  mounted () {
    // console.log('route', this.$route)
  },
  methods: {
    onClickAroundMe () {
      this.resetCityAndCoordinates()
      this.geolocationLoading = true
      navigator.geolocation.getCurrentPosition(this.onSuccessGeolocation, this.onErrorGeolocation)
    },
    onSuccessGeolocation (data) {
      // console.log('onSuccessGeolocation', data)
      this.geolocationLoading = false
      this.$store.commit('quiz/setNavigatorGeolocationSelected', true)
      this.$store.commit('algoliaSearch/setNavigatorGeolocation', data)
      this.onNextStep('Autour de moi')
    },
    onErrorGeolocation () {
      this.$toast.info({
        component: Toast,
        props: {
          message: "Vous avez bloqué l'accès à votre position",
          errors: [
            "À droite de la barre d'adresse, appuyez sur l'icône de localisation",
            "Puis sélectionnez: Toujours autoriser l'accès à votre position"
          ]
        }
      })
      this.$store.commit('quiz/setNavigatorGeolocationSelected', false)
      this.geolocationLoading = false
    },
    handleSelectedGeo (item) {
      this.$store.commit('quiz/setNavigatorGeolocationSelected', false)
      if (item) {
        this.$store.commit('quiz/setQuery', {
          ...this.$store.getters['quiz/query'],
          city: item.city,
          aroundLatLng: `${item.coordinates[1]},${item.coordinates[0]}`
        })
        this.onNextStep(item.city)
      } else {
        this.resetCityAndCoordinates()
      }
    },
    resetCityAndCoordinates () {
      this.$store.commit('quiz/setQuery', {
        ...this.$store.getters['quiz/query'],
        city: null,
        aroundLatLng: null
      })
    },
    onNextStep (value) {
      window.plausible &&
        window.plausible('Quiz - Step 2', {
          props: {
            isLogged: this.$store.getters.isLogged,
            quizPath: this.$route.path,
            value
          }
        })

      this.$store.commit('quiz/nextStep')
    }
  }
}
</script>

<style>

</style>
