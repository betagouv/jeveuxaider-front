export default axios => ({
  async fetchReseaux (params) {
    return await axios.get('/reseaux', { params })
  },
  async fetchTerritoires (params) {
    return await axios.get('/territoires', { params })
  }
})
