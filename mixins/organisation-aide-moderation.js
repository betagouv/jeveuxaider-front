export default {
  data () {
    return {
      blacklistedWords: [
        'emploi',
        'job',
        'salaire',
        'cdi',
        'service civique',
        '35h',
        'rémunération',
        'culte',
        'religion',
        'frais d’adhésion',
        'adhésion',
        'mécénat de compétences',
        'adhésion obligatoire',
        'service national universel',
        'snu',
        'stage',
        'cdd',
        'contrat'
      ],
      duplicatesOrganisations: []
    }
  },
  computed: {
    hasResults () {
      return this.$store.getters['aideModeration/isAICompliant'] === false ||
      this.sentencesWithBlacklistedWords?.length > 0 ||
      this.needRNA ||
      this.organisationHasDuplicates
    },
    needRNA () {
      return this.organisation.statut_juridique == 'Association' && !this.organisation.rna
    },
    organisationHasDuplicates () {
      return this.duplicatesOrganisations?.total > 0
    },
    textToAnalyze () {
      return this.organisation.name + ' | ' + this.organisation.description
    },
    textToAnalyzeWithoutTags () {
      return this.textToAnalyze?.replace(/<\/li>/g, '</li> | ').replace(/<\/p>/g, '</p> | ').replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '')
    },
    textToAnalyzeAsSentences () {
      return this.textToAnalyzeWithoutTags?.split(/[.?!|]\s+/)
    },
    sentencesWithBlacklistedWords () {
      return this.textToAnalyzeAsSentences?.filter(
        sentence => this.blacklistedWords.some(word => sentence.toLowerCase().includes(word))
      )
    }
  },
  methods: {
    async fetchAIReportScore () {
      if (this.$store.state.aideModeration.type != 'organisation' || this.organisation.id != this.$store.state.aideModeration.model?.id) {
        await this.$store.dispatch('aideModeration/fetch', {
          type: 'organisation', model: { ...this.organisation }, text: this.textToAnalyze
        })
      }
    },
    async fetchAlgoliaOrganisations () {
      const { data: response } = await this.$axios.post('/algolia/organisations', {
        search: this.organisation.name,
        filters: `id != ${this.organisation.id}`
      })
      this.duplicatesOrganisations = response
    }
  }
}
