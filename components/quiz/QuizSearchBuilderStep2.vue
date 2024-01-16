<template>
  <QuizStep :title="title" :slogan="slogan" :picture="picture" :logos="logos">
    <div class="max-w-lg flex flex-col gap-6">
      <QuizOption
        title="Autour de moi"
        description="Via la géolocalisation de votre navigateur"
        :selected="$route.query?.geolocalisation === 'true'"
        @click.native="onClickAroundMe"
      >
        <template #icon>
          <RiLoader5Line
            v-if="geolocationLoading"
            class="animate-spin h-[56px] w-[56px] text-gray-400 fill-current"
          />
          <DsfrMapIcon v-else />
        </template>
      </QuizOption>
      <QuizOption
        title="Ville ou code postal"
        :selectable="false"
        :selected="$route.query?.aroundLatLng ? true : false"
      >
        <template #icon>
          <DsfrFranceIcon />
        </template>
        <BaseInputAutocomplete
          :value="$route.query.city"
          icon="RiMapPinLine"
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
import QuizOption from '@/components/quiz/QuizOption.vue'
import inputGeo from '@/mixins/input-geo'
import DsfrFranceIcon from '@/components/icon/dsfr/France.vue'
import DsfrMapIcon from '@/components/icon/dsfr/Map.vue'
import Toast from '@/components/Toast.vue'

export default defineNuxtComponent({
  components: {
    QuizStep,
    QuizOption,
    DsfrFranceIcon,
    DsfrMapIcon,
    Toast,
  },
  mixins: [inputGeo],
  props: {
    title: {
      type: String,
      required: true,
    },
    slogan: {
      type: String,
      default: null,
    },
    picture: {
      type: String,
      required: true,
    },
    logos: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  async setup() {
    const { getMultidistributedCity } = await multidistributedCitiesHelper()
    return {
      getMultidistributedCity,
    }
  },
  data() {
    return {
      geolocationLoading: false,
      geolocationOptions: {
        enableHighAccuracy: true,
        timeout: 50000,
        maximumAge: 120,
      },
      inputGeoType: 'municipality',
      hideAllZipsOption: true,
    }
  },
  computed: {},
  methods: {
    onClickAroundMe() {
      this.resetCityAndCoordinates()
      this.geolocationLoading = true
      navigator.geolocation.getCurrentPosition(this.onSuccessGeolocation, this.onErrorGeolocation)
    },
    onSuccessGeolocation(data) {
      console.log('onSuccessGeolocation', data)
      this.geolocationLoading = false
      this.$stores.algoliaSearch.navigatorGeolocation = data
      this.onNextStep({ geolocalisation: true })
    },
    onErrorGeolocation() {
      this.$toast.info({
        component: Toast,
        props: {
          message: "Vous avez bloqué l'accès à votre position",
          errors: [
            "À droite de la barre d'adresse, appuyez sur l'icône de localisation",
            "Puis sélectionnez: Toujours autoriser l'accès à votre position",
          ],
        },
      })
      this.geolocationLoading = false
    },
    handleSelectedGeo(item) {
      if (item) {
        this.onNextStep({
          city: item.city,
          aroundLatLng: `${item.coordinates[1]},${item.coordinates[0]}`,
          geolocalisation: null,
        })
      } else {
        this.resetCityAndCoordinates()
      }
    },
    resetCityAndCoordinates() {
      this.$router.push({
        query: {
          ...this.$route.query,
          city: null,
          aroundLatLng: null,
          geolocalisation: null,
        },
      })
    },
    onNextStep(value) {
      this.$plausible.trackEvent('Quiz - Step 2', {
        props: {
          isLogged: this.$stores.auth.isLogged,
          quizPath: this.$route.path,
          value,
        },
      })

      this.$router.push({ query: { ...this.$route.query, step: 3, ...value } })
    },
  },
})
</script>
