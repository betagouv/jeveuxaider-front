<template>
  <header class="relative bg-white shadow-lg z-40">
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
    <div class="hidden lg:flex px-4 justify-between border-t text-sm text-gray-800">
      <div class="flex">
        <Dropdown v-if="$store.getters.roles && $store.getters.roles.length > 2" position="left">
          <template #button>
            <div class="flex items-center border-r pr-4 py-4 w-52 truncate">
              <div class="truncate mr-auto">
                {{ $store.getters.currentRole.label }}
              </div>
              <ChevronDownIcon class="h-3" />
            </div>
          </template>
          <template #items>
            <template v-if="$store.getters.roles" class="w-80">
              <div class="w-80">
                <DropdownOptionsItem
                  v-for="role,index in $store.getters.roles"
                  :key="index"
                  :label="$options.filters.label(role.key, 'role', 'espace')"
                  @click.native="switchRole(role)"
                >
                  <template v-if="role.key == 'referent'">
                    {{ $options.filters.label(role.label, 'departments') }}
                  </template>
                  <template v-else>
                    {{ role.label }}
                  </template>
                  <template #icon>
                    <CheckIcon v-if="role.key == $store.getters.contextRole" class="h-5 text-jva-green-500 " />
                    <SwitchHorizontalIcon v-else class="h-5 text-gray-400 group-hover:scale-110" />
                  </template>
                </DropdownOptionsItem>
              </div>
            </template>
          </template>
        </Dropdown>
        <NavItem
          v-for="link in secondNavigation"
          :key="link.name"
          :href="link.href"
          :to="link.to"
          :click="link.click"
          :class="['hover:border-b-2 border-jva-blue-500 border-b-0 p-4', {'text-jva-blue-500 !border-b-2': link.isActive}]"
        >
          {{ link.name }}
        </NavItem>
      </div>
      <div class="flex space-x-6 py-4">
        <template v-if="$store.getters.isLogged">
          <router-link to="/profile" class="hover:underline">
            Mon profil
          </router-link>
        </template>
        <template v-else>
          <router-link to="/inscription" class="hover:underline">
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
      showMobileMenu: false
    }
  },
  computed: {
    navigation () {
      if (!this.$store.getters.isLogged) {
        return [
          { name: 'Trouver une mission', icon: SearchIcon, click: () => this.$store.commit('toggleSearchOverlay') },
          { name: 'Publier une mission', href: '/inscription/organisation', icon: CalendarIcon },
          { name: 'Devenir bénévole', href: '#', icon: UserIcon }
        ]
      }
      return [
        { name: 'Trouver une mission', icon: SearchIcon, click: () => this.$store.commit('toggleSearchOverlay') },
        { name: 'Publier une mission', href: '/inscription/organisation', icon: CalendarIcon }
      ]
    },
    secondNavigation () {
      if (!this.$store.getters.isLogged) {
        return [
          { name: 'Associations', href: '#' },
          { name: 'Territoires', to: '/territoires', isActive: this.isActiveLink('/territoires') },
          { name: 'Écoles et universités', href: '#' },
          { name: 'Actualités', href: '#' },
          { name: 'Centre d\'aide', href: '#' }
        ]
      } else if (this.$store.getters.currentRole?.key === 'admin') {
        return [
          { name: 'Tableau de bord', to: '/dashboard', isActive: this.isActiveLink('/dashboard') },
          { name: 'Organisations', to: '/admin/organisations', isActive: this.isActiveLink('/admin/organisations') },
          { name: 'Missions', to: '/admin/missions', isActive: this.isActiveLink('/admin/missions') },
          { name: 'Utilisateurs', href: '#', isActive: this.isActiveLink('/') },
          { name: 'Liens utiles', href: '#', isActive: this.isActiveLink('/') }
        ]
      } else if (this.$store.getters.currentRole?.key === 'responsable') {
        return [
          { name: 'Tableau de bord', to: '/dashboard', isActive: this.isActiveLink('/dashboard') },
          { name: 'Missions', to: '/admin/missions', isActive: this.isActiveLink('/admin/missions') },
          { name: 'Participations', href: '#' },
          { name: 'Liens utiles', href: '#' }
        ]
      }
      return [
      ]
    }
  },
  methods: {
    async switchRole (role) {
      await this.$store.dispatch('auth/updateUser', {
        context_role: role.key,
        contextable_type: role.contextable_type ?? null,
        contextable_id: role.contextable_id ?? null
      })

      if (role.key === 'volontaire') {
        this.$router.push('/profile')
      } else if (this.$router.history.current.path === '/dashboard') {
        window.location.reload(true)
      } else {
        this.$router.push('/dashboard')
      }
    },
    isActiveLink (url) {
      return this.$route.path === url
    }
  }
}
</script>
