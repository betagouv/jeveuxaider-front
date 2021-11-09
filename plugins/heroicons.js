import Vue from 'vue'
import { EyeIcon, EyeOffIcon, SearchIcon, LinkIcon } from '@vue-hero-icons/outline'

const components = { EyeIcon, EyeOffIcon, SearchIcon, LinkIcon }

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
