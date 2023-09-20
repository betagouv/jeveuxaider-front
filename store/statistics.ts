import { defineStore } from 'pinia'
import dayjs from 'dayjs'

export const useStatisticsStore = defineStore({
  id: 'statistics',
  state: () => ({
    params: {
      department: null,
      startDate: dayjs().startOf('year').format('YYYY-MM-DD'),
      endDate: dayjs().format('YYYY-MM-DD'),
    },
  }),
  getters: {},
  actions: {
    setParams(payload: any) {
      this.params = payload
    },
  },
})
