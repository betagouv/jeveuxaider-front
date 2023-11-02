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
      duplicatesOrganisations: null,
      duplicatesRnaOrganisations: null,
    }
  },
  computed: {
    hasResults() {
      return (
        this.hasError ||
        this.needRNA ||
        this.organisationHasDuplicates ||
        this.organisationHasDuplicatesRna
      )
    },
    hasError() {
      return (
        this.$stores.aideModeration.isAICompliant === false ||
        this.sentencesWithBlacklistedWords?.length > 0
      )
    },
    needRNA() {
      return this.organisation.statut_juridique == 'Association' && !this.organisation.rna
    },
    organisationHasDuplicatesRna() {
      return this.duplicatesRnaOrganisations?.total > 0
    },
    organisationHasDuplicates() {
      return this.duplicatesOrganisations?.total > 0
    },
    textToAnalyze() {
      return this.organisation.name + ' | ' + this.organisation.description
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
        this.$stores.aideModeration.type != 'organisation' ||
        this.organisation.id != this.$stores.aideModeration.model?.id
      ) {
        await this.$stores.aideModeration.fetch({
          type: 'organisation',
          model: { ...this.organisation },
          text: this.textToAnalyze,
        })
      }
    },
    async fetchAlgoliaOrganisations() {
      const organisations = await apiFetch('/algolia/organisations', {
        method: 'POST',
        body: {
          search: this.organisation.name,
          filters: `id != ${this.organisation.id}`,
        },
      })
      this.duplicatesOrganisations = organisations
    },
    async fetchOrganisationsByRNA() {
      if (
        this.organisation.statut_juridique == 'Association' &&
        this.organisation.rna &&
        this.organisation.rna != 'N/A'
      ) {
        const organisations = await apiFetch('/structures', {
          params: {
            'filter[search]': this.organisation.rna,
            'filter[exclude]': this.organisation.id,
          },
        })
        this.duplicatesRnaOrganisations = organisations
      }
    },
  },
}
