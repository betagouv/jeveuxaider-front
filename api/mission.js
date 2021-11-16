export default axios => ({
  async getMission (id) {
    return await axios.get(`/mission/${id}`)
  },
  async similarMission (id) {
    return await axios.get(`/mission/${id}/similar`)
  }
})
