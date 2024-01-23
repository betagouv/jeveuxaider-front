import { defineStore } from 'pinia'

export const useAideModerationStore = defineStore('aideModeration', {
  state: () => ({
    type: null,
    model: null,
    response: null as any,
    loading: false,
  }),
  getters: {
    isAICompliant: (state) => (state.response ? state.response?.global > 0.87 : null),
  },
  actions: {
    async fetch({ type, model, text }: any) {
      const config = useRuntimeConfig()

      this.loading = true
      this.type = type
      this.model = model
      this.response = null

      const url =
        type == 'organisation'
          ? config.public.ai.organisationModerationUrl
          : config.public.ai.missionModerationUrl

      try {
        const data = await $fetch<any>(url, {
          method: 'POST',
          body: {
            text,
          },
        })
        this.response = data
      } catch {
      } finally {
        this.loading = false
      }
    },
  },
})
