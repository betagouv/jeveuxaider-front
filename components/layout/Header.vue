<template>
  <header class="bg-white shadow-lg">
    <div class="flex justify-between items-center relative lg:p-2">
      <div class="lg:flex lg:space-x-6 lg:items-center">
        <img
          src="@/assets/images/republique-francaise-logo.svg"
          alt="République Française"
          class="w-20 lg:w-24"
          width="166"
          height="150"
          data-not-lazy
        >
        <nuxt-link to="/">
          <img
            src="@/assets/images/jeveuxaider-logo.svg"
            alt="Bénévolat je veux aider"
            title="Bénévolat association"
            class="h-8 lg:h-9 absolute inset-x-0 mx-auto top-5 lg:relative lg:w-auto lg:top-auto"
            width="251"
            height="41"
            data-not-lazy
          >
        </nuxt-link>
      </div>
      <div class="flex lg:hidden space-x-2 pr-4 text-jva-blue-500">
        <button>
          <SearchIcon />
        </button>
        <button
          type="button"

          aria-haspopup="true"
          @click="showMobileMenu = !showMobileMenu"
        >
          <template v-if="!showMobileMenu">
            <span class="sr-only">Open main menu</span>
            <MenuIcon />
          </template>

          <template v-else>
            <span class="sr-only">Close main menu</span>
            <XIcon />
          </template>
        </button>
      </div>
      <div class="hidden lg:flex divide-x divide-gray-200">
        <a
          v-for="link in navigation"
          :key="link.name"
          class="flex items-center text-jva-blue-500 font-medium hover:underline px-3 text-sm py-1"
          :href="link.href"
        >
          <component :is="link.icon" class="flex-shrink-0 mr-3 h-4 w-4" aria-hidden="true" />
          {{ link.name }}
        </a>
      </div>
    </div>
    <div class="hidden lg:flex p-4 justify-between border-t text-sm text-gray-800">
      <div class="flex space-x-8">
        <a
          v-for="link in secondNavigation"
          :key="link.name"
          :href="link.href"
          class="hover:underline"
        >{{ link.name }}</a>
      </div>
      <div class="flex space-x-6">
        <a class="hover:underline">Inscription</a>
        <a class="hover:underline">Connexion</a>
      </div>
    </div>
    <!-- Mobile menu -->
    <div>
      <transition
        enter-active-class="duration-150 ease-out"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-150 ease-in"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-show="showMobileMenu" class="z-20 fixed inset-0 bg-black bg-opacity-25" aria-hidden="true" />
      </transition>
      <transition
        enter-active-class="duration-150 ease-out"
        enter-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="duration-150 ease-in"
        leave-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div v-show="showMobileMenu" class="z-30 absolute top-0 inset-x-0 max-w-3xl mx-auto w-full p-2 transition transform origin-top">
          <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200">
            <div class="pt-3 pb-2">
              <div class="flex items-center justify-between px-4">
                <div>
                  <img
                    class="h-8 w-auto"
                    src="@/assets/images/jeveuxaider-logo.svg"
                    alt="Bénévolat je veux aider"
                  >
                </div>
                <div class="-mr-2">
                  <button
                    type="button"
                    class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500"
                    @click="showMobileMenu = false"
                  >
                    <span class="sr-only">Close menu</span>
                    <!-- Heroicon name: outline/x -->
                    <XIcon class="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div class="flex flex-col mt-3 px-2 space-y-1">
                <div v-for="link in navigation" :key="link.name" class="flex items-center px-3 py-2 hover:bg-gray-100 hover:text-gray-800 text-jva-900 rounded-md">
                  <component :is="link.icon" class="flex-shrink-0 h-4 w-4" aria-hidden="true" />
                  <a
                    class="text-base font-medium ml-2"
                    :href="link.href"
                  >{{ link.name }}</a>
                </div>
              </div>
            </div>
            <div class="mt-3 p-2">
              <a
                v-for="link in secondNavigation"
                :key="link.name"
                :href="link.href"
                class="block rounded-md px-3 py-2 text-base text-cool-gray-600 font-medium hover:bg-gray-100 hover:text-gray-800"
              >{{ link.name }}</a>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </header>
</template>

<script>
import { CalendarIcon, SearchIcon, UserIcon } from '@vue-hero-icons/outline'

const navigation = [
  { name: 'Trouver une mission', href: '#', icon: SearchIcon, current: false },
  { name: 'Publier une mission', href: '#', icon: CalendarIcon, current: false },
  { name: 'Devenir bénévole', href: '#', icon: UserIcon, current: false }
]

const secondNavigation = [
  { name: 'Associations', href: '#', current: false },
  { name: 'Territoires', href: '#', current: false },
  { name: 'Écoles et universités', href: '#', current: false },
  { name: 'Actualités', href: '#', current: false },
  { name: 'Centre d\'aide', href: '#', current: false }
]

export default {
  data () {
    return {
      showMobileMenu: false,
      navigation,
      secondNavigation
    }
  }
}
</script>
