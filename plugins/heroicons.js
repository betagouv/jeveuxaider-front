import Vue from 'vue'
import { EyeIcon, EyeOffIcon, SearchIcon, MenuIcon, XIcon } from '@vue-hero-icons/outline'

const components = { EyeIcon, EyeOffIcon, SearchIcon, MenuIcon, XIcon }

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
