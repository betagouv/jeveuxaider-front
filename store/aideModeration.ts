import { defineStore } from 'pinia'

export const useAideModerationStore = defineStore('aideModeration', {
  state: () => ({
    type: null,
    model: null,
    response: null as any,
    loading: false,
  }),
  getters: {
    isAICompliant: (state) => (state.response ? state.response?.report === 0 : null),
  },
  actions: {
    async fetch({ type, model, text }: any) {
      const config = useRuntimeConfig()

      this.loading = true
      this.type = type
      this.model = model
      this.response = null

      try {
        const data = await $fetch<any>(config.public.ai.moderationUrl, {
          method: 'POST',
          body: {
            text,
            type,
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
