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
      duplicatesTerritoires: null,
    }
  },
  computed: {
    hasResults() {
      return this.hasError
    },
    hasError() {
      return this.sentencesWithBlacklistedWords?.length > 0
    },
    territoiresHasDuplicates() {
      return this.duplicatesTerritoires?.length > 0
    },
    sentences() {
      return [
        this.territoire.name,
        this.territoire.suffix_title,
        this.territoire.seo_recruit_title,
        this.territoire.seo_recruit_description,
        this.territoire.seo_engage_title,
      ]
        .join('|')
        .replace(/<\/li>/g, '</li>|')
        .replace(/<\/p>/g, '</p>|')
        .replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '')
        .split(/[.?!|]/)
        .map((i) => this.$filters.decodeHTMLEntities(i).trim())
        .filter((i) => i && i.length >= 3)
    },
    textToAnalyze() {
      return this.sentences.join('|')
    },
    sentencesWithBlacklistedWords() {
      return this.sentences?.filter((sentence) =>
        this.blacklistedWords.some((word) => {
          const regex = new RegExp(`\\b${word}\\b`, 'gi')
          return regex.test(sentence.toLowerCase())
        })
      )
    },
  },
  methods: {
    async fetchDoublonTerritoires() {
      const response = await apiFetch('/support/contents/doublons-territoires/list', {
        method: 'POST',
        body: {
          search: this.territoire.name,
          excludeId: this.territoire.id,
        },
      })
      this.duplicatesTerritoires = response
    },
  },
}
