export default {
  data() {
    return {
      blacklistedWords: [
        'job',
        'jobs',
        'salaire',
        'salaires',
        'cdi',
        'service civique',
        '35h',
        'rémunération',
        'rémunérations',
        'culte',
        'cultes',
        'religion',
        'religions',
        'frais d’adhésion',
        'adhésion',
        'adhésions',
        'mécénat de compétences',
        'adhésion obligatoire',
        'service national universel',
        'snu',
        'stage',
        'stages',
        'cdd',
        'contrat',
        'contrats',
        'dieu',
        'spirituel',
        'église',
        'églises',
        'chrétien',
        'chrétiens',
        'chrétienne',
        'chrétiennes',
        'foi',
        'prière',
        'prières',
        'temple',
        'temples',
        'prophète',
        'prophètes',
        'pèlerinage',
        'pèlerinages',
        'pèlerin',
        'pèlerins',
        'dogme',
        'dogmes',
        'paroisse',
        'paroisses',
        'messie',
        'monastère',
        'monastères',
        'théologie',
        'théologies',
        'rite',
        'rites',
        'confession',
        'confessions',
        'évangile',
        'évangiles',
        'messe',
        'messes',
        'abbaye',
        'abbayes',
        'mosquée',
        'mosquées',
        'cathédrale',
        'cathédrales',
        'basilique',
        'basiliques',
        'catéchisme',
        'catéchismes',
        'liturgie',
        'liturgies',
        'synagogue',
        'synagogues',
        'psaume',
        'psaumes',
        'vierge',
        'vierges',
        'boudhisme',
        'judaïsme',
        'christianisme',
        'islam',
        'hindouisme',
        'bouddha',
        'moïse',
        'jésus',
        'mahomet',
        'catholique',
        'catholiques',
        'orthodoxe',
        'orthodoxes',
        'protestante',
        'protestantes',
        'musulman',
        'musulmans',
        'coran',
        'bible',
        'torah',
        'allah',
        'scientologie',
        'hubbard',
        'juif',
        'juive',
        'juives',
        'juifs',
      ],
    }
  },
  computed: {
    hasResults() {
      return (
        this.hasError ||
        this.tooManyParticipationsMax ||
        this.needReviewTitle ||
        this.startDateInPastAndNoFrequency
      )
    },
    hasError() {
      return (
        this.$stores.aideModeration.isAICompliant === false ||
        this.sentencesWithBlacklistedWords?.length > 0 ||
        this.commitmentIsHigh
      )
    },
    commitmentIsHigh() {
      return this.mission.commitment__total > 1091
    },
    tooManyParticipationsMax() {
      return this.mission.participations_max > 70
    },
    needReviewTitle() {
      return !this.mission.name.match(/^(Je|J'|J’)/)
    },
    startDateInPastAndNoFrequency() {
      return (
        !this.mission.commitment__time_period &&
        ['Brouillon', 'En attente de validation', 'En cours de traitement'].includes(
          this.mission.state
        ) &&
        this.$dayjs().isAfter(this.mission.start_date)
      )
    },
    textToAnalyze() {
      return (
        this.mission.name +
        ' | ' +
        this.mission.objectif +
        ' | ' +
        this.mission.description +
        ' | ' +
        this.mission.information +
        (this.mission.prerequisites ? ' | ' + this.mission.prerequisites.join(' | ') : '')
      )
    },
    textToAnalyzeWithoutTags() {
      return this.textToAnalyze
        ?.replace(/<\/li>/g, '</li> | ')
        .replace(/<\/p>/g, '</p> | ')
        .replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '')
    },
    textToAnalyzeAsSentences() {
      return this.textToAnalyzeWithoutTags?.split(/[.?!|]\s+/)
    },
    sentencesWithBlacklistedWords() {
      return this.textToAnalyzeAsSentences?.filter((sentence) =>
        this.blacklistedWords.some((word) => {
          const regex = new RegExp(`\\b${word}\\b`, 'gi')
          return regex.test(sentence.toLowerCase())
        })
      )
    },
  },
  methods: {
    async fetchAIReportScore() {
      if (
        this.$stores.aideModeration.type != 'mission' ||
        this.mission.id != this.$stores.aideModeration.model?.id
      ) {
        await this.$stores.aideModeration.fetch({
          type: 'mission',
          model: { ...this.mission },
          text: this.textToAnalyze,
        })
      }
    },
  },
}
