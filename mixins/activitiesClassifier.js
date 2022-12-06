import { debounce } from 'lodash'

export default {
  data () {
    return {
      activitiesClassifier: null,
      activitiesClassifierLoading: false
    }
  },
  computed: {
    activitiesClassifierDescription () {
      let description = [this.form.objectif, this.form.description]
      if (this.form.template) {
        description = [this.form.template.title, ...description]
      } else {
        description = [this.form.name, ...description]
      }
      if (description.some(item => item)) {
        return description.join(' ').trim()
      }
      return null
    }
  },
  watch: {
    // @todo: pourquoi 2 fois ?
    activitiesClassifierDescription () {
      this.timeout?.cancel()
      this.timeout = debounce(() => {
        this.fetchActivitiesClassifier()
      }, 3000)
      this.timeout()
    }
  },
  methods: {
    async fetchActivitiesClassifier () {
      if (!this.activitiesClassifierDescription) {
        return
      }

      this.activitiesClassifierLoading = true
      const { data: activitiesClassifier } = await this.$axios.post(
        '/activity-classifier', { description: this.activitiesClassifierDescription }
      )

      // Si le model est en train de charger, refaire le call
      if (activitiesClassifier.code === 503) {
        await new Promise(resolve => setTimeout(resolve, 15000))
        this.fetchActivitiesClassifier()
        return
      }

      if (activitiesClassifier.code === 200) {
        this.activities = this.activities.map((activity) => {
          const activityFromClassifier = activitiesClassifier.content[0].find(ac => ac.label === activity.name)
          const formattedScore = activityFromClassifier ? this.$options.filters.formatNumber(activityFromClassifier.score, '0.0 %') : null
          return { ...activity, score: activityFromClassifier.score, formattedScore }
        }).sort((a, b) => a.score > b.score ? -1 : 1)
        this.activitiesClassifier = activitiesClassifier
      }

      this.activitiesClassifierLoading = false
    }
  }
}
