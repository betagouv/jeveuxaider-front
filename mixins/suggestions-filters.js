export default {
  data() {
    return {
      autocompleteOptionsTerritoires: [],
      autocompleteOptionsTemplates: [],
      autocompleteOptionsReseaux: [],
      autocompleteOptionsOrganisations: [],
      autocompleteOptionsMissions: [],
      loadingFetchTerritoires: false,
      loadingFetchTemplates: false,
      loadingFetchReseaux: false,
      loadingFetchOrganisations: false,
      loadingFetchMissions: false,
    }
  },
  computed: {
    selectedTerritoire() {
      return {
        key: Number(this.$route.query['filter[ofTerritoire]']) || undefined,
        label: this.$route.query['territoire_name'],
      }
    },
    selectedTemplate() {
      return {
        key: Number(this.$route.query['filter[ofTemplate]']) || undefined,
        label: this.$route.query['template_name'],
      }
    },
    selectedReseau() {
      return {
        key: Number(this.$route.query['filter[ofReseau]']) || undefined,
        label: this.$route.query['reseau_name'],
      }
    },
    selectedOrganisation() {
      return {
        key: Number(this.$route.query['filter[ofStructure]']) || undefined,
        label: this.$route.query['organisation_name'],
      }
    },
    selectedMission() {
      return {
        key: Number(this.$route.query['filter[mission.id]']) || undefined,
        label: this.$route.query['mission_name'],
      }
    },
  },
  methods: {
    async onSelectTerritoire($event) {
      const queryTerritoireName =
        $event !== null && this.$route.query['territoire_name'] !== $event?.name
          ? $event.name
          : undefined
      const queryTerritoireId =
        $event !== null && Number(this.$route.query['filter[ofTerritoire]']) !== $event?.id
          ? $event.id
          : undefined

      await this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: undefined,
          territoire_name: queryTerritoireName,
          'filter[ofTerritoire]': queryTerritoireId,
        },
      })
    },
    async onSelectTemplate($event) {
      const queryTemplateName =
        $event !== null && this.$route.query['template_name'] !== $event?.title
          ? $event.title
          : undefined
      const queryTemplateId =
        $event !== null && Number(this.$route.query['filter[ofTemplate]']) !== $event?.id
          ? $event.id
          : undefined

      await this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: undefined,
          template_name: queryTemplateName,
          'filter[ofTemplate]': queryTemplateId,
        },
      })
    },
    async onSelectOrganisation($event) {
      const queryOrganisationName =
        $event !== null && this.$route.query['organisation_name'] !== $event?.name
          ? $event.name
          : undefined
      const queryOrganisationId =
        $event !== null && Number(this.$route.query['filter[ofStructure]']) !== $event?.id
          ? $event.id
          : undefined

      await this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: undefined,
          organisation_name: queryOrganisationName,
          'filter[ofStructure]': queryOrganisationId,
          'filter[ofResponsable]': undefined,
        },
      })
    },
    async onSelectMission($event) {
      const queryMissionName =
        $event !== null && this.$route.query['mission_name'] !== $event?.name
          ? $event.name
          : undefined
      const queryMissionId =
        $event !== null && Number(this.$route.query['filter[mission.id]']) !== $event?.id
          ? $event.id
          : undefined

      await this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: undefined,
          mission_name: queryMissionName,
          'filter[mission.id]': queryMissionId,
        },
      })
    },
    async onSelectReseau($event) {
      const queryReseauName =
        $event !== null && this.$route.query['reseau_name'] !== $event?.name
          ? $event.name
          : undefined
      const queryReseauId =
        $event !== null && Number(this.$route.query['filter[ofReseau]']) !== $event?.id
          ? $event.id
          : undefined

      await this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: undefined,
          reseau_name: queryReseauName,
          'filter[ofReseau]': queryReseauId,
        },
      })
    },
    async onFetchSuggestionsTerritoires(value) {
      this.loadingFetchTerritoires = true
      const territoires = await apiFetch('/territoires', {
        params: {
          'filter[search]': value,
          pagination: 20,
        },
      })
      this.autocompleteOptionsTerritoires = territoires.data
      this.loadingFetchTerritoires = false
    },
    async onFetchSuggestionsTemplates(value) {
      this.loadingFetchTemplates = true
      const templates = await apiFetch('/mission-templates', {
        params: {
          'filter[search]': value,
          pagination: 20,
        },
      })
      this.autocompleteOptionsTemplates = templates.data
      this.loadingFetchTemplates = false
    },
    async onFetchSuggestionsOrganisations(value) {
      this.loadingFetchOrganisations = true
      const organisations = await apiFetch('/structures', {
        params: {
          'filter[search]': value,
          pagination: 20,
        },
      })
      this.autocompleteOptionsOrganisations = organisations.data
      this.loadingFetchOrganisations = false
    },
    async onFetchSuggestionsReseaux(value) {
      this.loadingFetchReseaux = true
      const res = await apiFetch('/reseaux', {
        params: {
          'filter[search]': value,
          pagination: 20,
        },
      })
      this.autocompleteOptionsReseaux = res.data
      this.loadingFetchReseaux = false
    },
    async onFetchSuggestionsMissions(value) {
      this.loadingFetchMissions = true
      const missions = await apiFetch('/missions', {
        params: {
          'filter[search]': value,
          pagination: 20,
        },
      })
      this.autocompleteOptionsMissions = missions.data
      this.loadingFetchMissions = false
    },
  },
}
