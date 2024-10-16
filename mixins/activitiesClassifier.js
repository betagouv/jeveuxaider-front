export default {
  data() {
    return {
      activitiesClassifier: null,
      activitiesClassifierLoading: false,
    }
  },
  computed: {
    activitiesClassifierDescription() {
      if (!this.form) {
        return null
      }

      let description = [this.form.objectif, this.form.description]
      if (this.form.template) {
        description = [this.form.template.title, ...description]
      } else {
        description = [this.form.name, ...description]
      }
      if (description.some((item) => item)) {
        return description.join(' ').trim()
      }
      return null
    },
  },
  watch: {
    activitiesClassifierDescription() {
      this.timeout?.cancel()
      this.timeout = _debounce(() => {
        this.fetchActivitiesClassifier()
      }, 3000)
      this.timeout()
    },
  },
  methods: {
    async fetchActivitiesClassifier() {
      if (!this.activitiesClassifierDescription) {
        return
      }

      this.activitiesClassifierLoading = true
      const activitiesClassifier = await apiFetch('/activity-classifier', {
        method: 'POST',
        body: { description: this.activitiesClassifierDescription },
      })

      // Si le model est en train de charger, refaire le call
      if (activitiesClassifier.code === 503) {
        await new Promise((resolve) => setTimeout(resolve, 15000))
        this.fetchActivitiesClassifier()
        return
      }

      if (activitiesClassifier.code === 200) {
        this.activities = this.activities
          .map((activity) => {
            const activityFromClassifier = activitiesClassifier.content[0].find(
              (ac) => activity.name === this.mapActivityName(ac.label)
            )
            const formattedScore = activityFromClassifier
              ? this.$numeral(activityFromClassifier.score, '0.0 %')
              : null
            return {
              ...activity,
              score: activityFromClassifier?.score,
              formattedScore,
              label: `${activity.icon} ${activity.name} (${formattedScore})`,
            }
          })
          .sort((a, b) => (a.score > b.score ? -1 : 1))
        this.activitiesClassifier = activitiesClassifier
      }

      this.activitiesClassifierLoading = false
    },
    mapActivityName(name) {
      let activityName

      switch (name) {
        case 'Accompagnement aux activités sportives':
          activityName = 'Activités sportives'
          break
        case 'Mentorat & Parrainage':
          activityName = 'Mentorat & parrainage'
          break
        case 'Gestion financière / comptabilité':
          activityName = 'Gestion financière / Comptabilité'
          break
        default:
          activityName = name
          break
      }

      return activityName
    },
  },
}
