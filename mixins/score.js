export default {
  data() {
    return {
      score: null,
      loadingScore: true,
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      if (!this.structureId) {
        return
      }
      const score = await apiFetch(`/structures/${this.structureId}/score`)
      this.score = score
      this.loadingScore = false
    },
  },
}
