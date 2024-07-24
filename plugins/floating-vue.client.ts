import FloatingVue from 'floating-vue'

export default defineNuxtPlugin(() => {
  FloatingVue.options.themes['white'] = {
    ...FloatingVue.options.themes.tooltip,
    $resetCss: true,
  }

  FloatingVue.options.themes['dsfr'] = {
    ...FloatingVue.options.themes.tooltip,
    $resetCss: true,
  }
})
