import Vue from 'vue'
import { EyeIcon, EyeOffIcon, SearchIcon, MenuIcon, XIcon, LinkIcon, CheckIcon, SelectorIcon, ArrowRightIcon } from '@vue-hero-icons/outline'

const components = { EyeIcon, EyeOffIcon, SearchIcon, MenuIcon, XIcon, LinkIcon, CheckIcon, SelectorIcon, ArrowRightIcon }

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
