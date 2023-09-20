import { defineStore } from 'pinia'

const steps = [
  {
    slug: 'grade',
    label: 'NOTE',
    icon: '⭐',
  },
  {
    slug: 'testimony',
    label: 'TÉMOIGNAGE',
    icon: '💬',
  },
  {
    slug: 'thanks',
    label: 'MERCI',
    icon: '🙏',
  },
]
export const useTemoignageStore = defineStore({
  id: 'temoignage',
  state: () => ({
    steps: steps,
    step: steps[0],
  }),
  getters: {
    stepIndex: (state) =>
      state.steps.findIndex((step) => step.slug == state.step.slug),
  },
  actions: {
    nextStep() {
      this.step = this.steps[this.stepIndex + 1]
    },
  },
})
