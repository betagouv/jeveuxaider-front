const dayjs = require('dayjs')

export const state = () => ({
  params: {
    department: null,
    startDate: dayjs().startOf('year').format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD')
  }
})

export const mutations = {
  setParams (state, params) {
    state.params = params
  }
}

export const actions = {

}
