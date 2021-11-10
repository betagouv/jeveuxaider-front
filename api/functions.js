export default axios => ({
  async fetchPromotedToFrontPageMissions (params) {
    return await axios.get('/missions/promoted', { params })
  },
  async fetchReseaux (params) {
    return await axios.get('/reseaux', { params })
  },
  async fetchTerritoires (params) {
    return await axios.get('/territoires', { params })
  }
})
