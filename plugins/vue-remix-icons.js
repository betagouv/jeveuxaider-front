// Icons for DSFR
// https://www.systeme-de-design.gouv.fr/elements-d-interface/fondamentaux-techniques/icones
// https://remixicon.com/

import Vue from 'vue'
import RiSearchLine from 'vue-remix-icons/icons/RiSearchLine.vue'
import RiSearchEyeFill from 'vue-remix-icons/icons/RiSearchEyeFill.vue'
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
import RiMapPin2Fill from 'vue-remix-icons/icons/RiMapPin2Fill.vue'
import RiMapPinFill from 'vue-remix-icons/icons/RiMapPinFill.vue'
import RiBookmark3Fill from 'vue-remix-icons/icons/RiBookmark3Fill.vue'
import RiTimeFill from 'vue-remix-icons/icons/RiTimeFill.vue'
import RiCloseFill from 'vue-remix-icons/icons/RiCloseFill.vue'
import RiCheckboxCircleLine from 'vue-remix-icons/icons/RiCheckboxCircleLine.vue'
import RiUserHeartFill from 'vue-remix-icons/icons/RiUserHeartFill.vue'
import RiComputerFill from 'vue-remix-icons/icons/RiComputerFill.vue'
import RiShareFill from 'vue-remix-icons/icons/RiShareFill.vue'
import RiErrorWarningLine from 'vue-remix-icons/icons/RiErrorWarningLine.vue'
import RiProfileLine from 'vue-remix-icons/icons/RiProfileLine.vue'
import RiInformationLine from 'vue-remix-icons/icons/RiInformationLine.vue'
import RiAlertLine from 'vue-remix-icons/icons/RiAlertLine.vue'
import RiSettings4Line from 'vue-remix-icons/icons/RiSettings4Line.vue'
import RiCalendarEventFill from 'vue-remix-icons/icons/RiCalendarEventFill.vue'

const components = {
  RiSearchLine,
  RiSearchEyeFill,
  RiArrowRightLine,
  RiAddLine,
  RiBuildingFill,
  RiExternalLinkLine,
  RiDoubleQuotesL,
  RiFacebookCircleFill,
  RiTwitterFill,
  RiLinkedinBoxFill,
  RiInstagramFill,
  RiYoutubeFill,
  RiMapPinFill,
  RiMapPin2Fill,
  RiBookmark3Fill,
  RiTimeFill,
  RiCloseFill,
  RiCheckboxCircleLine,
  RiUserHeartFill,
  RiComputerFill,
  RiShareFill,
  RiErrorWarningLine,
  RiProfileLine,
  RiInformationLine,
  RiAlertLine,
  RiSettings4Line,
  RiCalendarEventFill
}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
