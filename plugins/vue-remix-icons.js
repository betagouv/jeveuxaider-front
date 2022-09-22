// Icons for DSFR
// https://www.systeme-de-design.gouv.fr/elements-d-interface/fondamentaux-techniques/icones
// https://remixicon.com/

import Vue from 'vue'
import RiSearchLine from 'vue-remix-icons/icons/RiSearchLine.vue'
import RiArrowRightLine from 'vue-remix-icons/icons/RiArrowRightLine.vue'

const components = {
  RiSearchLine,
  RiArrowRightLine
}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
