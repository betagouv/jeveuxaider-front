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
  SwitchHorizontalIcon,
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
  DuplicateIcon,
  PlusIcon,
  ExclamationIcon,
  PhotographIcon,
  DownloadIcon,
  TrashIcon
} from '@vue-hero-icons/outline'
import { InformationCircleIcon, UsersIcon, HomeIcon, ChevronDownIcon as ChevronDownSolidIcon, CheckIcon as CheckSolidIcon, PlusCircleIcon, MinusCircleIcon } from '@vue-hero-icons/solid'

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
  ChevronDownSolidIcon,
  CheckSolidIcon,
  SwitchHorizontalIcon,
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
  HomeIcon,
  DuplicateIcon,
  PlusIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  ExclamationIcon,
  PhotographIcon,
  DownloadIcon,
  TrashIcon
}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
