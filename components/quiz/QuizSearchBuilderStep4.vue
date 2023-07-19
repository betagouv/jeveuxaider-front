<template>
  <QuizStep :title="title" :slogan="slogan" :picture="picture">
    <div class="mb-12">
      <TagsGroup
        v-model="selectedActivities"
        name="activites"
        variant="button"
        :options="selectableActivities"
        is-model
      />
    </div>
    <div class="flex flex-col lg:flex-row items-center gap-8">
      <Button
        size="lg"
        icon="RiArrowRightLine"
        icon-position="right"
        :disabled="selectedActivities.length === 0"
        @click.native="handleClick"
      >
        Voir ma sélection
      </Button>
      <Link
        size="lg"
        icon="RiArrowRightLine"
        icon-position="right"
        type="secondary"
        @click.native="handleClickAll"
      >
        Toutes les activités
      </Link>
    </div>
  </QuizStep>
</template>

<script>
import QuizStep from '@/components/quiz/QuizStep.vue'
import activities from '@/assets/activities.json'
import TagsGroup from '@/components/dsfr/TagsGroup.vue'
import Button from '@/components/dsfr/Button.vue'
import Link from '@/components/dsfr/Link.vue'

export default {
  components: {
    QuizStep,
    TagsGroup,
    Button,
    Link
  },
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
    },
    selectableActivitiesProcheDeChezMoiIds: {
      type: Array,
      default () {
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
          22 // Travaux manuels
        ]
      }
    },
    selectableActivitiesADistanceIds: {
      type: Array,
      default () {
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
          31 // Gestion administrative
        ]
      }
    }
  },
  data () {
    return {
      activities,
      selectedActivities: []
    }
  },
  computed: {
    selectableActivitiesResolverIds () {
      if (this.$route.query?.type === 'Mission à distance') {
        return this.selectableActivitiesADistanceIds
      } else {
        return this.selectableActivitiesProcheDeChezMoiIds
      }
    },
    selectableActivities () {
      return this.activities.filter(item => this.selectableActivitiesResolverIds.includes(item.id))
    },
    selectedActivitiesNames () {
      return this.activities.filter(item => this.selectedActivities.flatMap(element => element.id).includes(item.id))
    }
  },
  mounted () {
    //
  },
  methods: {
    handleClickAll () {
      this.selectedActivities = []
      window.plausible &&
        window.plausible('Quiz - Step 4', {
          props: {
            isLogged: this.$store.getters.isLogged,
            quizPath: this.$route.path,
            value: 'All'
          }
        })

      this.$emit('selected', {
        'activities.name': this.selectedActivitiesNames.map(activity => activity.name).join('|')
      })
    },
    handleClick () {
      window.plausible &&
        window.plausible('Quiz - Step 4', {
          props: {
            isLogged: this.$store.getters.isLogged,
            quizPath: this.$route.path,
            value: this.selectedActivitiesNames.map(activity => activity.name).join('|')
          }
        })
      this.$emit('selected', {
        'activities.name': this.selectedActivitiesNames.map(activity => activity.name).join('|')
      })
    }
  }
}
</script>

<style>

</style>
