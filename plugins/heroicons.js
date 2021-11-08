import Vue from 'vue'
import { EyeIcon, EyeOffIcon, SearchIcon } from '@vue-hero-icons/outline'

const components = { EyeIcon, EyeOffIcon, SearchIcon }

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
