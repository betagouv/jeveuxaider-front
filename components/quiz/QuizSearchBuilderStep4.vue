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
        {{ selectedActivities.length|pluralize('sélectionnée') }}
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
    selectableActivitiesIds: {
      type: Array,
      default () {
        return [35, 16, 12, 10, 1, 33, 39, 38, 11, 5]
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
    selectableActivities () {
      return this.activities.filter(item => this.selectableActivitiesIds.includes(item.id))
    },
    selectedActivitiesNames () {
      return this.activities.filter(item => this.selectedActivities.flatMap(element => element.id).includes(item.id))
    }
  },
  mounted () {
    // console.log('route', this.$route)
  },
  methods: {
    handleClickAll () {
      this.selectedActivities = []
      this.$store.commit('quiz/setQuery', {
        ...this.$store.getters['quiz/query'],
        'activities.name': null
      })

      window.plausible &&
        window.plausible('Quiz - Step 4', {
          props: {
            isLogged: this.$store.getters.isLogged,
            quizPath: this.$route.path,
            value: 'All'
          }
        })

      this.setCookieAndRedirect()
    },
    handleClick () {
      this.$store.commit('quiz/setQuery', {
        ...this.$store.getters['quiz/query'],
        'activities.name': this.selectedActivitiesNames.map(activity => activity.name).join('|')
      })

      window.plausible &&
        window.plausible('Quiz - Step 4', {
          props: {
            isLogged: this.$store.getters.isLogged,
            quizPath: this.$route.path,
            value: this.selectedActivitiesNames?.length
          }
        })
      this.setCookieAndRedirect()
    },
    setCookieAndRedirect () {
      this.$cookies.set('utm_source', 'quiz')
      this.$cookies.set('utm_campaign', this.$route.path)

      this.$router.push({
        path: '/missions-benevolat',
        query: {
          ...this.$store.getters['quiz/query'],
          utm_source: 'quiz',
          utm_campaign: this.$route.path
        }
      })
    }
  }
}
</script>

<style>

</style>
