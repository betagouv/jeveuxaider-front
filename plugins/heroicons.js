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
  TrashIcon,
  SpeakerphoneIcon,
  CogIcon,
  ChatAltIcon,
  IdentificationIcon,
  ArchiveIcon,
  MailIcon,
  ChevronUpIcon,
  ShareIcon,
  DotsVerticalIcon,
  AdjustmentsIcon,
  VideoCameraIcon,
  LockClosedIcon,
  DesktopComputerIcon,
  HandIcon,
  XCircleIcon,
  InformationCircleIcon
} from '@vue-hero-icons/outline'
import {
  InformationCircleIcon as InformationCircleSolidIcon,
  UsersIcon,
  HomeIcon,
  ChevronDownIcon as ChevronDownSolidIcon,
  CheckCircleIcon as CheckCircleSolidIcon,
  XCircleIcon as XCircleSolidIcon,
  CheckIcon as CheckSolidIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  UserIcon as UserSolidIcon,
  ClockIcon as ClockSolidIcon,
  HandIcon as HandSolidIcon,
  CalendarIcon as CalendarSolidIcon,
  LocationMarkerIcon as LocationMarkerSolidIcon
} from '@vue-hero-icons/solid'

const components = {
  HandIcon,
  LocationMarkerSolidIcon,
  DesktopComputerIcon,
  CalendarSolidIcon,
  HandSolidIcon,
  InformationCircleSolidIcon,
  LockClosedIcon,
  ClockSolidIcon,
  CheckCircleSolidIcon,
  XCircleSolidIcon,
  VideoCameraIcon,
  DotsVerticalIcon,
  ShareIcon,
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
  TrashIcon,
  UserSolidIcon,
  SpeakerphoneIcon,
  CogIcon,
  ChatAltIcon,
  IdentificationIcon,
  ArchiveIcon,
  MailIcon,
  ChevronUpIcon,
  AdjustmentsIcon,
  XCircleIcon
}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
