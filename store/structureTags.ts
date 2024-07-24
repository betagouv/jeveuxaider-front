import { defineStore } from 'pinia'

type Option = {
  key: number
  id: number
  name?: string
}

export const useStructureTagsStore = defineStore({
  id: 'structureTags',
  state: () => ({
    endpoint: null,
    options: [] as Option[],
  }),
  getters: {},
  actions: {
    resolveTagsName(tags: Option[]) {
      if (this.options.length === 0) {
        return tags
      }
      return tags.map((tag: Option) => {
        const option = this.options.find((option: Option) => option.id === tag.id)
        return {
          ...tag,
          name: option ? option.name : tag.name,
        }
      })
    },
    async fetchOptions() {
      if (!this.endpoint) {
        return
      }
      const { data, error } = await useApiFetch<any>(this.endpoint)
      if (data.value) {
        this.options = data.value.map((option: Option) => ({
          ...option,
          key: option.id,
          label: option.name,
        }))
      }
    },
    async delete(tag: Option) {
      if (!this.endpoint) {
        return
      }
      const { data, error } = await useApiFetch<any>(`${this.endpoint}/${tag.id}`, {
        method: 'DELETE',
      })
      if (data.value) {
        this.fetchOptions()
      }
    },
  },
})
