import { debounce } from 'lodash'

export default {
  data () {
    return {
      activitiesClassifier: null

    }
  },
  computed: {
    activitiesClassifierDescription () {
      return [this.form.objectif, this.form.description].join(' ')
    }
  },
  watch: {
    // @todo: pourquoi 2 fois ?
    // @todo: 5sec
    activitiesClassifierDescription () {
      this.timeout?.cancel()
      this.timeout = debounce(() => {
        console.log('ICI')
        this.fetchActivitiesClassifier()
      }, 1000)
      this.timeout()
    }
  },
  methods: {
    async fetchActivitiesClassifier () {
      if (!this.activitiesClassifierDescription) {
        return
      }

      const { data: activitiesClassifier } = await this.$axios.post(
        '/activity-classifier', { description: this.activitiesClassifierDescription }
      )
      if (activitiesClassifier.code === 200) {
        this.activities = this.activities.map((activity) => {
          const activityFromClassifier = activitiesClassifier.content[0].find(ac => ac.label === activity.name)
          const formattedScore = activityFromClassifier ? this.$options.filters.formatNumber(activityFromClassifier.score, '0.0 %') : null
          return { ...activity, score: activityFromClassifier.score, formattedScore }
        }).sort((a, b) => a.score > b.score ? -1 : 1)
        this.activitiesClassifier = activitiesClassifier
      }
    }
  }
}
