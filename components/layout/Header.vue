<template>
  <header id="header" ref="header" class="relative bg-white shadow-lg z-30">
    <div class="flex justify-between lg:justify-start items-center space-x-2 relative lg:p-2" :class="{'lg:max-w-7xl lg:mx-auto': !fullWidth}">
      <div class="flex space-x-6 items-center">
        <img
          src="@/assets/images/republique-francaise-logo.svg"
          alt="République Française"
          class="w-20 lg:w-24"
          width="166"
          height="150"
          data-not-lazy
        >
      </div>
      <div class="flex items-center lg:flex-1 lg:pl-6">
        <nuxt-link to="/">
          <img
            src="@/assets/images/jeveuxaider-logo.svg"
            alt="Bénévolat je veux aider"
            title="Bénévolat association"
            class="h-[34px] w-[161px] lg:h-[41px] lg:w-[256px]"
            width="256"
            height="41"
            data-not-lazy
          >
        </nuxt-link>
      </div>
      <div class="flex lg:hidden space-x-2 pr-4 text-jva-blue-500">
        <nuxt-link to="/missions-benevolat">
          <SearchIcon />
        </nuxt-link>
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
            class="flex items-center text-jva-blue-500 font-medium hover:underline px-3 text-sm py-1 relative"
          >
            <div v-if="link.count" class="absolute -top-1.5 -right-1 bg-[#e41e3f] px-1.5 py-0.5 rounded-full text-white font-bold text-xs min-w-[20px] inline-flex justify-center">
              {{ link.count > 99 ? "99+" : link.count }}
            </div>
            <component :is="link.icon" class="flex-shrink-0 mr-3 h-4 w-4" aria-hidden="true" />
            {{ link.name }}
          </NavItem>
        </div>
        <DropdownUser v-if="$store.getters.isLogged" class="" />
      </nav>
    </div>
    <div class="hidden lg:block w-full border-t" />
    <div class="hidden lg:flex justify-between text-sm text-gray-800" :class="{'lg:max-w-7xl lg:mx-auto': !fullWidth}">
      <div class="flex w-full">
        <Dropdown v-if="$store.getters.roles && $store.getters.roles.length > 1" ref="switchRole" position="left" class="h-full">
          <template #button>
            <div class="flex items-center justify-between gap-4 border-r py-4 pr-2 pl-5 w-52">
              <div class="truncate">
                <!-- <div class="text-gray-500 uppercase text-xs">
                  {{ $options.filters.label($store.getters.currentRole.key, 'role', 'espace') }}
                </div> -->
                <div class="truncate mr-auto font-semibold">
                  {{ $store.getters.currentRole.key == 'referent' ? $options.filters.label($store.getters.currentRole.label, 'departments') : $store.getters.currentRole.label }}
                </div>
              </div>
              <ChevronDownIcon class="h-3 flex-none" />
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
                    <template v-if="['responsable','responsable_territoire'].includes($store.getters.contextRole)">
                      <template v-if="$store.getters.contextRole === 'responsable'">
                        <CheckIcon v-if="role.contextable_type === 'structure' && role.contextable_id === $store.getters.contextableId " class="h-5 text-jva-green-500 " />
                        <SwitchHorizontalIcon v-else class="h-5 text-gray-400 group-hover:scale-110" />
                      </template>
                      <template v-if="$store.getters.contextRole === 'responsable_territoire'">
                        <CheckIcon v-if="role.contextable_type === 'territoire' && role.contextable_id === $store.getters.contextableId " class="h-5 text-jva-green-500 " />
                        <SwitchHorizontalIcon v-else class="h-5 text-gray-400 group-hover:scale-110" />
                      </template>
                    </template>
                    <template v-else>
                      <CheckIcon v-if="role.key === $store.getters.contextRole " class="h-5 text-jva-green-500 " />
                      <SwitchHorizontalIcon v-else class="h-5 text-gray-400 group-hover:scale-110" />
                    </template>
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
          :target="link.target"
          :class="['p-4 hover:bg-gray-50 hover:text-jva-blue-500', {'text-jva-blue-500 bg-gray-50 font-medium': link.isActive}]"
        >
          {{ link.name }}
        </NavItem>

        <NavItem
          key="mesure-impact"
          href="https://www.jeveuxaider.gouv.fr/engagement/mesure-dimpact/"
          target="_blank"
          class="p-4 hover:bg-gray-50 hover:text-jva-blue-500 flex space-x-1 truncate"
        >
          <span>Notre impact</span>
          <span>🎯</span>
        </NavItem>

        <NavItem
          v-if="!$store.getters.isLogged || $store.getters.contextRole === 'volontaire'"
          key="banques-alimentaires"
          href="https://www.jeveuxaider.gouv.fr/engagement/banques-alimentaires/"
          target="_blank"
          class="p-4 hover:bg-gray-50 hover:text-jva-blue-500 flex space-x-1 truncate"
        >
          <span>Collecte des Banques Alimentaires</span>
          <span>🧡</span>
        </NavItem>

        <NavItem
          v-if="$store.getters.contextRole == 'admin'"
          to="/admin/contenus/missions-prioritaires"
          :class="['p-4 hover:bg-gray-50 hover:text-jva-blue-500 ml-auto flex items-center', {'text-jva-blue-500 bg-gray-50 font-medium': isActiveLink('/admin/(settings|contenus|scripts)/*')}]"
        >
          <CogIcon class="h-4 w-4 mr-2 flex-none" />
          Administration
        </NavItem>
      </div>
      <div class="flex">
        <template v-if="!$store.getters.isLogged">
          <NavItem
            to="/inscription"
            :class="['p-4 hover:bg-gray-50 hover:text-jva-blue-500', {'text-jva-blue-500 bg-gray-50 font-medium': isActiveLink('/inscription')}]"
          >
            Inscription
          </NavItem>
          <NavItem
            to="/login"
            :class="['p-4 hover:bg-gray-50 hover:text-jva-blue-500', {'text-jva-blue-500 bg-gray-50 font-medium': isActiveLink('/login')}]"
          >
            Connexion
          </NavItem>
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
        <div v-show="showMobileMenu" v-scroll-lock="showMobileMenu" class="h-screen overflow-y-auto z-30 absolute top-0 inset-x-0 mx-auto w-full transition transform origin-top">
          <div class="bg-white h-full flex flex-col gap-3 justify-between">
            <div class="p-4 bg-white">
              <div class="flex items-center justify-between pl-4 pb-6">
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
              <div class="">
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
              <div class="border-t my-2" />

              <div class="">
                <NavItem
                  v-for="link in secondNavigation"
                  :key="link.name"
                  :href="link.href"
                  :to="link.to"
                  :target="link.target"
                  :click="link.click"
                  :class="['block rounded-md px-3 py-2 text-base text-cool-gray-600', {'!text-jva-blue-500 bg-gray-50 font-medium': link.isActive}]"
                >
                  {{ link.name }}
                </NavItem>

                <NavItem
                  key="mesure-impact"
                  href="https://www.jeveuxaider.gouv.fr/engagement/mesure-dimpact/"
                  target="_blank"
                  :class="['flex space-x-1 rounded-md px-3 py-2 text-base text-cool-gray-600']"
                >
                  <span>Notre impact</span>
                  <span>🎯</span>
                </NavItem>

                <NavItem
                  v-if="!$store.getters.isLogged || $store.getters.contextRole === 'volontaire'"
                  key="banques-alimentaires"
                  href="https://www.jeveuxaider.gouv.fr/engagement/banques-alimentaires/"
                  target="_blank"
                  :class="['flex space-x-1 rounded-md px-3 py-2 text-base text-cool-gray-600']"
                >
                  <span>Collecte des Banques Alimentaires</span>
                  <span>🧡</span>
                </NavItem>
              </div>
            </div>

            <div class="bg-jva-blue-500 text-white p-4 pb-32">
              <NavItem
                v-for="link in mobileLoggedNavigation"
                :key="link.name"
                :href="link.href"
                :to="link.to"
                :target="link.target"
                :click="link.click"
                :class="['block rounded-md px-3 py-2 text-base text-cool-gray-100', {'bg-jva-blue-600 font-medium': link.isActive}]"
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
          <LazySoftGateOverlay v-if="$store.state.softGate.showOverlay" />
          <LazyMissionShareOverlay v-if="$store.state.missionShare.showOverlay" />
        </transition>
      </portal>
    </client-only>
  </header>
</template>

<script>
import { CalendarIcon, SearchIcon, UserIcon, ChatAltIcon } from '@vue-hero-icons/outline'
import DropdownUser from '@/components/custom/DropdownUser'
import LazySoftGateOverlay from '@/components/section/SoftGateOverlay'
import LazyMissionShareOverlay from '@/components/section/MissionShareOverlay'

export default {
  components: {
    DropdownUser,
    LazySoftGateOverlay,
    LazyMissionShareOverlay
  },
  props: {
    fullWidth: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showMobileMenu: false,
      unreadMessageCount: 0
    }
  },
  computed: {
    navigation () {
      if (!this.$store.getters.isLogged) {
        return [
          { name: 'Trouver une mission', icon: SearchIcon, to: '/missions-benevolat' },
          { name: 'Publier une mission', to: '/inscription/responsable', icon: CalendarIcon },
          { name: 'Devenir bénévole', to: '/inscription/benevole', icon: UserIcon }
        ]
      }
      return [
        { name: 'Trouver une mission', icon: SearchIcon, to: '/missions-benevolat' },
        { name: 'Messagerie', to: '/messages', icon: ChatAltIcon, count: this.$store.getters['messaging/unreadMessages'] }
      ]
    },
    mobileLoggedNavigation () {
      if (!this.$store.getters.isLogged) {
        return [
          { name: 'Inscription', to: '/inscription', isActive: this.isActiveLink('inscription') },
          { name: 'Connexion', to: '/login', isActive: this.isActiveLink('login') }
        ]
      }
      return [
        { name: `${this.$store.state.auth.user.profile.full_name}`, to: '/profile', isActive: this.isActiveLink('/profile', true) },
        { name: 'Mes missions', to: '/profile/missions', isActive: this.isActiveLink('profile/missions') },
        { name: 'Mes paramètres', to: '/profile/settings', isActive: this.isActiveLink('profile/settings') },
        { name: 'Se déconnecter', click: () => this.$store.dispatch('auth/logout') }
      ]
    },
    secondNavigation () {
      if (!this.$store.getters.isLogged) {
        return [
          { name: 'Organisations', to: '/organisations', isActive: this.isActiveLink('/organisations') },
          { name: 'Territoires', to: '/territoires', isActive: this.isActiveLink('/territoires') },
          { name: 'Écoles et universités', href: 'https://www.jeveuxaider.gouv.fr/engagement/ecoles-et-universites/', target: '_blank' },
          { name: 'Actualités', href: 'https://www.jeveuxaider.gouv.fr/engagement/actualites/', target: '_blank' },
          { name: 'Centre d\'aide', href: 'https://reserve-civique.crisp.help/fr/', target: '_blank' }
        ]
      } else if (this.$store.getters.currentRole?.key === 'admin') {
        return [
          { name: 'Tableau de bord', to: '/dashboard', isActive: this.isActiveLink('/dashboard') },
          { name: 'Organisations', to: '/admin/organisations', isActive: this.isActiveLink('/admin/organisations/*') },
          { name: 'Missions', to: '/admin/missions', isActive: this.isActiveLink('/admin/missions/*') },
          { name: 'Participations', to: '/admin/participations', isActive: this.isActiveLink('/admin/participations/*') },
          { name: 'Utilisateurs', to: '/admin/utilisateurs', isActive: this.isActiveLink('/admin/utilisateurs/*') }
        ]
      } else if (this.$store.getters.currentRole?.key === 'responsable') {
        return [
          { name: 'Tableau de bord', to: '/dashboard', isActive: this.isActiveLink('/dashboard') },
          { name: 'Mon organisation', to: `/admin/organisations/${this.$store.getters.contextableId}`, isActive: this.isActiveLink('/admin/organisations/*(?!.*missions/add)') },
          { name: 'Missions', to: '/admin/missions', isActive: this.isActiveLink('/admin/missions/*|missions/add') },
          { name: 'Participations', to: '/admin/participations', isActive: this.isActiveLink('/admin/participations/*') }
        ]
      } else if (this.$store.getters.currentRole?.key === 'responsable_territoire') {
        return [
          { name: 'Tableau de bord', to: '/dashboard', isActive: this.isActiveLink('/dashboard') },
          { name: 'Mon territoire', to: `/admin/contenus/territoires/${this.$store.getters.contextableId}`, isActive: this.isActiveLink('/admin/contenus/territoires/*') }
        ]
      } else if (this.$store.getters.currentRole?.key === 'tete_de_reseau') {
        return [
          { name: 'Tableau de bord', to: '/dashboard', isActive: this.isActiveLink('/dashboard') },
          { name: 'Mon réseau', to: `/admin/contenus/reseaux/${this.$store.getters.profile.tete_de_reseau_id}`, isActive: this.isActiveLink('/admin/contenus/reseaux/*') },
          { name: 'Membres du réseau', to: '/admin/organisations', isActive: this.isActiveLink('/admin/organisations/*') },
          { name: 'Missions', to: '/admin/missions', isActive: this.isActiveLink('/admin/missions/*') },
          { name: 'Participations', to: '/admin/participations', isActive: this.isActiveLink('/admin/participations/*') }
        ]
      } else if (this.$store.getters.currentRole?.key === 'referent') {
        return [
          { name: 'Tableau de bord', to: '/dashboard', isActive: this.isActiveLink('/dashboard') },
          { name: 'Organisations', to: '/admin/organisations', isActive: this.isActiveLink('/admin/organisations/*') },
          { name: 'Missions', to: '/admin/missions', isActive: this.isActiveLink('/admin/missions/*') },
          { name: 'Participations', to: '/admin/participations', isActive: this.isActiveLink('/admin/participations/*') },
          { name: 'Utilisateurs', to: '/admin/utilisateurs', isActive: this.isActiveLink('/admin/utilisateurs/*') }
        ]
      } else if (this.$store.getters.currentRole?.key === 'referent_regional') {
        return [
          { name: 'Tableau de bord', to: '/dashboard', isActive: this.isActiveLink('/dashboard') },
          { name: 'Organisations', to: '/admin/organisations', isActive: this.isActiveLink('/admin/organisations/*') },
          { name: 'Missions', to: '/admin/missions', isActive: this.isActiveLink('/admin/missions/*') },
          { name: 'Participations', to: '/admin/participations', isActive: this.isActiveLink('/admin/participations/*') }
        ]
      } else if (this.$store.getters.currentRole?.key === 'analyste') {
        return [
          { name: 'Tableau de bord', to: '/dashboard', isActive: this.isActiveLink('/dashboard') }
        ]
      }
      return [
        { name: 'Mon profil', to: '/profile', isActive: this.isActiveLink('/profile', true) },
        { name: 'Mes missions', to: '/profile/missions', isActive: this.isActiveLink('profile/missions') },
        { name: 'Centre d\'aide', href: 'https://reserve-civique.crisp.help/fr/category/benevole-1avwdvi/', target: '_blank' }
      ]
    }
  },
  watch: {
    $route () {
      this.showMobileMenu = false
    }
  },
  methods: {
    async switchRole (role) {
      await this.$store.dispatch('auth/updateUser', {
        context_role: role.key,
        contextable_type: role.contextable_type ?? null,
        contextable_id: role.contextable_id ?? null
      })

      this.$refs.switchRole.show = false

      if (this.$router.history.current.path === '/dashboard') {
        window.location.reload(true)
      } else {
        this.$router.push('/dashboard')
      }
    },
    isActiveLink (regex, exact = false) {
      return exact ? this.$route.path === regex : RegExp(regex).test(this.$route.path)
    }
  }
}
</script>
