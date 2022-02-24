const steps = [
  {
    slug: 'grade',
    label: 'NOTE',
    icon: '⭐'
  },
  {
    slug: 'testimony',
    label: 'TÉMOIGNAGE',
    icon: '💬'
  },
  {
    slug: 'thanks',
    label: 'MERCI',
    icon: '🙏'
  }
]

export const state = () => ({
  steps,
  step: steps[0]
})

export const getters = {
  step: state => state.step,
  steps: state => state.steps,
  stepIndex: state =>
    state.steps.findIndex(step => step.slug == state.step.slug)
}

export const mutations = {
  setStep: (state, step) => {
    state.step = step
  }
}

export const actions = {
  nextStep ({ commit, state, getters }) {
    commit('setStep', state.steps[getters.stepIndex + 1])
  }
}
