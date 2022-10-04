// Icons for DSFR
// https://www.systeme-de-design.gouv.fr/elements-d-interface/fondamentaux-techniques/icones
// https://remixicon.com/

import Vue from 'vue'
import RiSearchLine from 'vue-remix-icons/icons/RiSearchLine.vue'
import RiArrowRightLine from 'vue-remix-icons/icons/RiArrowRightLine.vue'
import RiAddLine from 'vue-remix-icons/icons/RiAddLine.vue'
import RiBuildingFill from 'vue-remix-icons/icons/RiBuildingFill.vue'
import RiExternalLinkLine from 'vue-remix-icons/icons/RiExternalLinkLine.vue'
import RiDoubleQuotesL from 'vue-remix-icons/icons/RiDoubleQuotesL.vue'
import RiFacebookCircleFill from 'vue-remix-icons/icons/RiFacebookCircleFill.vue'
import RiTwitterFill from 'vue-remix-icons/icons/RiTwitterFill.vue'
import RiLinkedinBoxFill from 'vue-remix-icons/icons/RiLinkedinBoxFill.vue'
import RiInstagramFill from 'vue-remix-icons/icons/RiInstagramFill.vue'
import RiYoutubeFill from 'vue-remix-icons/icons/RiYoutubeFill.vue'

const components = {
  RiSearchLine,
  RiArrowRightLine,
  RiAddLine,
  RiBuildingFill,
  RiExternalLinkLine,
  RiDoubleQuotesL,
  RiFacebookCircleFill,
  RiTwitterFill,
  RiLinkedinBoxFill,
  RiInstagramFill,
  RiYoutubeFill
}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
