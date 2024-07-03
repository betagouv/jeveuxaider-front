import { defineStore } from 'pinia'
import dayjs from 'dayjs'

export const useStatisticsStore = defineStore({
  id: 'statistics',
  state: () => ({
    params: {
      department: null,
      startDate: null,
      endDate: null,
    },
  }),
  getters: {},
  actions: {
    setParams(payload: any) {
      this.params = payload
    },
  },
})
