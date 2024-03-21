<template>
  <QuizStep :title="title" :slogan="slogan" :picture="picture" :logos="logos">
    <div class="mb-12">
      <DsfrTagsGroup
        v-model="selectedActivities"
        name="activites"
        variant="button"
        :options="selectableActivities"
        is-model
      />
    </div>
    <div class="flex flex-col lg:flex-row items-center gap-8">
      <DsfrButton
        size="lg"
        icon="RiArrowRightLine"
        icon-position="right"
        :disabled="selectedActivities.length === 0"
        @click.native="handleClick"
      >
        Voir ma sélection
      </DsfrButton>
      <DsfrLink
        size="lg"
        icon="RiArrowRightLine"
        icon-position="right"
        type="secondary"
        @click.native="handleClickAll"
      >
        Toutes les activités
      </DsfrLink>
    </div>
  </QuizStep>
</template>

<script>
import QuizStep from '@/components/quiz/QuizStep.vue'
import activities from '@/assets/activities.json'

export default defineNuxtComponent({
  components: {
    QuizStep,
  },
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
    selectableActivitiesProcheDeChezMoiIds: {
      type: Array,
      default() {
        return [
          10, // Mentorat & Parrainage
          8, // Lutte contre l’isolement
          6, // Animation / loisirs
          17, // Soutien scolaire et formati
          24, // Communication
          11, // Evènementiel
          28, // Distribution
          4, // Alphabétisation
          19, // Actions de sensibilisation
          22, // Travaux manuels
        ]
      },
    },
    selectableActivitiesADistanceIds: {
      type: Array,
      default() {
        return [
          24, // Communication
          8, // Lutte contre l’isolement
          26, // Recherche de partenariats
          39, // Informatique
          10, // Mentorat & Parrainage
          30, // Gestion financière / comptabilité
          19, // Actions de sensibilisation
          11, // Evènementiel
          38, // Gestion des ressources humaines
          31, // Gestion administrative
        ]
      },
    },
  },
  data() {
    return {
      activities,
      selectedActivities: [],
    }
  },
  computed: {
    selectableActivitiesResolverIds() {
      if (this.$route.query?.type === 'Mission à distance') {
        return this.selectableActivitiesADistanceIds
      } else {
        return this.selectableActivitiesProcheDeChezMoiIds
      }
    },
    selectableActivities() {
      return this.activities.filter((item) =>
        this.selectableActivitiesResolverIds.includes(item.id)
      )
    },
    selectedActivitiesNames() {
      return this.activities.filter((item) =>
        this.selectedActivities.flatMap((element) => element.id).includes(item.id)
      )
    },
  },
  mounted() {
    //
  },
  methods: {
    handleClickAll() {
      this.$plausible.trackEvent('Quiz - Step 4', {
        props: {
          isLogged: this.$stores.auth.isLogged,
          quizPath: this.$route.path,
          value: 'All',
        },
      })

      this.$emit('selected', {
        'activities.name': this.selectableActivities.map((activity) => activity.name).join('|'),
      })
    },
    handleClick() {
      this.$plausible.trackEvent('Quiz - Step 4', {
        props: {
          isLogged: this.$stores.auth.isLogged,
          quizPath: this.$route.path,
          value: this.selectedActivitiesNames.map((activity) => activity.name).join('|'),
        },
      })
      this.$emit('selected', {
        'activities.name': this.selectedActivitiesNames.map((activity) => activity.name).join('|'),
      })
    },
  },
})
</script>
