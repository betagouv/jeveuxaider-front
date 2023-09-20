import { defineStore } from 'pinia'

type TypeSettings = {
  blog_active: boolean
  france_connect_active: boolean
  light_mode_active: boolean
  maintenance_mode_active: boolean
  snu_mig_active: boolean
}

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    general: null as null | TypeSettings,
  }),
  getters: {},
  actions: {
    async fetchGeneral() {
      const { data: general, error } = await useApiFetch<TypeSettings>(
        `/settings/general`
      )

      if (error.value) {
        this.general = null
        return
      }

      this.general = general.value
    },
    async updateGeneral(payload: any) {
      const { data, error } = await useApiFetch<any>(`/settings/general`, {
        method: 'POST',
        body: payload,
      })
      await this.fetchGeneral()
    },
  },
})
