import Vue from 'vue'
import { EyeIcon, EyeOffIcon, SearchIcon, MenuIcon, XIcon, LinkIcon } from '@vue-hero-icons/outline'

const components = { EyeIcon, EyeOffIcon, SearchIcon, MenuIcon, XIcon, LinkIcon }

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
