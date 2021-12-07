<template>
  <header class="relative bg-white shadow-lg">
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
        <button @click="$store.commit('toggleSearchOverlay')">
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
      <nav class="hidden lg:flex lg:gap-8">
        <div class="flex divide-x divide-gray-200">
          <NavItem
            v-for="link in navigation"
            :key="link.name"
            :href="link.href"
            :to="link.to"
            :click="link.click"
            class="flex items-center text-jva-blue-500 font-medium hover:underline px-3 text-sm py-1"
          >
            <component :is="link.icon" class="flex-shrink-0 mr-3 h-4 w-4" aria-hidden="true" />
            {{ link.name }}
          </NavItem>
        </div>
        <DropdownUser v-if="$store.getters.isLogged" class="" />
      </nav>
    </div>
    <div class="hidden lg:flex p-4 justify-between border-t text-sm text-gray-800">
      <div class="flex space-x-8">
        <NavItem
          v-for="link in secondNavigation"
          :key="link.name"
          :href="link.href"
          :to="link.to"
          :click="link.click"
          class="hover:underline"
        >
          {{ link.name }}
        </NavItem>
      </div>
      <div class="flex space-x-6">
        <template v-if="$store.getters.isLogged">
          <router-link to="/profile" class="hover:underline">
            Mon profil
          </router-link>
        </template>
        <template v-else>
          <router-link to="/register" class="hover:underline">
            Inscription
          </router-link>
          <router-link to="/login" class="hover:underline">
            Connexion
          </router-link>
        </template>
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
                <NavItem
                  v-for="link in navigation"
                  :key="link.name"
                  :href="link.href"
                  :to="link.to"
                  :click="link.click"
                  class="flex items-center px-3 py-2 hover:bg-gray-100 hover:text-gray-800 text-jva-900 rounded-md"
                >
                  <component :is="link.icon" class="flex-shrink-0 h-4 w-4" aria-hidden="true" />
                  <span class="text-base font-medium ml-2">{{ link.name }}</span>
                </NavItem>
              </div>
            </div>
            <div class="mt-3 p-2">
              <NavItem
                v-for="link in secondNavigation"
                :key="link.name"
                :href="link.href"
                :to="link.to"
                :click="link.click"
                class="block rounded-md px-3 py-2 text-base text-cool-gray-600 font-medium hover:bg-gray-100 hover:text-gray-800"
              >
                {{ link.name }}
              </NavItem>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <client-only>
      <portal to="body-end">
        <transition name="fade">
          <LazySearchOverlay v-if="$store.state.showSearchOverlay" />
        </transition>
      </portal>
    </client-only>
  </header>
</template>

<script>
import { CalendarIcon, SearchIcon, UserIcon } from '@vue-hero-icons/outline'
import DropdownUser from '@/components/custom/DropdownUser'
import LazySearchOverlay from '@/components/section/SearchOverlay'

export default {
  components: {
    DropdownUser,
    LazySearchOverlay
  },
  data () {
    return {
      showMobileMenu: false,
      navigation: [
        { name: 'Trouver une mission', icon: SearchIcon, click: () => this.$store.commit('toggleSearchOverlay') },
        { name: 'Publier une mission', href: '#', icon: CalendarIcon },
        { name: 'Devenir bénévole', href: '#', icon: UserIcon }
      ],
      secondNavigation: [
        { name: 'Associations', href: '#' },
        { name: 'Territoires', to: '/territoires' },
        { name: 'Écoles et universités', href: '#' },
        { name: 'Actualités', href: '#' },
        { name: 'Centre d\'aide', href: '#' }
      ]
    }
  }
}
</script>
