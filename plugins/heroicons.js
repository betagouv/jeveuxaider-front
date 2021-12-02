import Vue from 'vue'
import {
  EyeIcon,
  EyeOffIcon,
  SearchIcon,
  MenuIcon,
  XIcon,
  LinkIcon,
  CheckIcon,
  SelectorIcon,
  ArrowRightIcon,
  ClockIcon,
  CalendarIcon,
  PencilIcon,
  UserIcon,
  LocationMarkerIcon,
  ExternalLinkIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  SwitchHorizontalIcon
} from '@vue-hero-icons/outline'
import { InformationCircleIcon, UsersIcon, HomeIcon } from '@vue-hero-icons/solid'

const components = {
  EyeIcon,
  EyeOffIcon,
  SearchIcon,
  MenuIcon,
  XIcon,
  LinkIcon,
  CheckIcon,
  SelectorIcon,
  ArrowRightIcon,
  InformationCircleIcon,
  UsersIcon,
  ClockIcon,
  CalendarIcon,
  PencilIcon,
  UserIcon,
  LocationMarkerIcon,
  ExternalLinkIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  SwitchHorizontalIcon,
  HomeIcon
}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
