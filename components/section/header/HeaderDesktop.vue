<template>
  <div>
    <div class="flex justify-start items-center relative p-4 h-[116px]" :class="{'xl:container': !fullWidth}">
      <div class="flex space-x-6 items-center">
        <img
          src="@/assets/images/republique-francaise-logo.svg"
          alt="République Française"
          class="w-[76px]"
          width="6500"
          height="5670"
          data-not-lazy
        >
      </div>
      <div class="flex items-center flex-1 pl-6">
        <nuxt-link to="/" aria-label="Page d'accueil">
          <img
            src="@/assets/images/jeveuxaider-logo.svg"
            alt=""
            class="h-[41px] w-[256px]"
            width="256"
            height="41"
            data-not-lazy
          >
        </nuxt-link>
      </div>
      <nav role="navigation" class="flex items-center gap-8">
        <div class="flex divide-x divide-gray-200">
          <NavItem
            v-for="link in primaryNavigation"
            :key="link.name"
            :href="link.href"
            :to="link.to"
            :click="link.click"
            class="flex items-center text-jva-blue-500 font-medium hover:underline px-3 text-sm py-1 relative"
          >
            <client-only>
              <div v-if="link.count" class="absolute -top-1.5 -right-1 bg-[#FF463D] px-1.5 py-0.5 rounded-full text-white font-bold text-xxs min-w-[20px] inline-flex justify-center">
                {{ link.count > 99 ? "99+" : link.count }}
              </div>
            </client-only>
            <component :is="link.icon" class="flex-shrink-0 mr-3 h-4 w-4" aria-hidden="true" />
            {{ link.name }}
          </NavItem>
        </div>

        <template v-if="$store.getters.isLogged">
          <div class="relative">
            <nuxt-link to="/messages" class="group">
              <MailIcon class="text-[#9CA3AF] group-hover:scale-105" />
              <div v-if="$store.getters['messaging/unreadMessagesCount']" class="group-hover:scale-105 absolute top-[-1px] right-[-3px] bg-[#FF463D] rounded-full w-[10px] h-[10px]" />
            </nuxt-link>
          </div>
          <DropdownUserNotifications />
          <DropdownUser />
        </template>

        <template v-if="!$store.getters.isLogged">
          <DsfrButton type="tertiary" size="sm" icon="UserIcon" @click="$router.push('/login')">
            Mon compte
          </DsfrButton>
        </template>
      </nav>
    </div>
    <div class="w-full border-t" />
    <div class="flex justify-between text-sm text-gray-800" :class="{'xl:container': !fullWidth}">
      <nav
        role="navigation"
        :class="['flex w-full', {'xl:-mx-4': !fullWidth}]"
        :style="!fullWidth ? 'width: calc(100% + 2rem);' : null"
      >
        <Dropdown v-if="$store.getters.roles && $store.getters.roles.length > 1" ref="switchRole" position="left" class="h-full">
          <template #button>
            <button class="flex items-center justify-between gap-4 border-r py-4 pr-2 pl-5 w-52">
              <div class="truncate">
                <div class="truncate mr-auto font-semibold">
                  <template v-if="$store.getters.currentRole">
                    {{ $store.getters.currentRole.label }}
                  </template>
                  <template v-else>
                    Bénévole
                  </template>
                </div>
              </div>
              <ChevronDownIcon class="h-3 flex-none" />
            </button>
          </template>
          <template #items>
            <template v-if="$store.getters.roles">
              <div class="w-80">
                <DropdownOptionsItem
                  v-for="role,index in $store.getters.roles"
                  :key="index"
                  :label="$options.filters.label(role.key, 'role', 'espace')"
                  @click.native="switchRole(role)"
                >
                  {{ role.label }}
                  <template #iconRight>
                    <template v-if="['responsable','responsable_territoire'].includes($store.getters.contextRole)">
                      <template v-if="$store.getters.contextRole === 'responsable'">
                        <CheckIcon v-if="role.contextable_type === 'structure' && role.contextable_id === $store.getters.contextableId " class="h-5 text-jva-green-500 " />
                        <SwitchHorizontalIcon v-else class="h-5 text-gray-400 group-hover:scale-110" />
                      </template>
                      <template v-if="$store.getters.contextRole === 'responsable_territoire'">
                        <CheckIcon v-if="role.contextable_type === 'responsable_territoire' && role.contextable_id === $store.getters.contextableId " class="h-5 text-jva-green-500 " />
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
          v-for="link in secondaryNavigation"
          :key="link.name"
          :href="link.href"
          :to="link.to"
          :click="link.click"
          :target="link.target"
          :class="[
            'p-4 hover:bg-gray-50 hover:text-jva-blue-500',
            {'text-jva-blue-500 bg-gray-50 font-medium': link.isActive},
          ]"
        >
          {{ link.name }}
        </NavItem>

        <div v-if="$store.getters.contextRole == 'admin'" class="flex ml-auto">
          <NavItem
            to="/admin"
            :class="['p-4 hover:bg-gray-50 hover:text-jva-blue-500 ml-auto flex items-center', {'text-jva-blue-500 bg-gray-50 font-medium': isActiveLink('/admin/(settings|contenus|scripts|taxonomies)/*')}]"
          >
            <RiAdminLine class="h-4 w-4 mr-2 flex-none" />
            Administration
          </NavItem>
          <NavItem
            to="/support"
            :class="['p-4 hover:bg-gray-50 hover:text-jva-blue-500 ml-auto flex items-center', {'text-jva-blue-500 bg-gray-50 font-medium': isActiveLink('/support/*')}]"
          >
            <RiUserStarLine class="h-4 w-4 mr-2 flex-none" />
            Support
          </NavItem>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { CalendarIcon, SearchIcon } from '@vue-hero-icons/outline'
import { FocusLoop } from '@vue-a11y/focus-loop'
import DropdownUser from '@/components/custom/DropdownUser'
import DropdownUserNotifications from '@/components/custom/DropdownUserNotifications'
import DsfrButton from '@/components/dsfr/Button.vue'
import HeaderBanner from '@/components/layout/HeaderBanner.vue'

export default {
  components: {
    DropdownUser,
    DropdownUserNotifications,
    DsfrButton,
    FocusLoop,
    HeaderBanner
  },
  props: {
    fullWidth: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      unreadMessageCount: 0
    }
  },
  computed: {
    primaryNavigation () {
      if (!this.$store.getters.isLogged) {
        return [
          { name: 'Trouver une mission', icon: SearchIcon, to: '/missions-benevolat' },
          { name: 'Publier une mission', to: '/inscription/responsable', icon: CalendarIcon }
        ]
      }
      return [
        { name: 'Trouver une mission', icon: SearchIcon, to: '/missions-benevolat' }
        // { name: 'Messagerie', to: '/messages', icon: ChatAltIcon, count: this.$store.getters['messaging/unreadMessagesCount'] }
      ]
    },
    secondaryNavigation () {
      if (!this.$store.getters.isLogged) {
        return [
          { name: 'Bénévolat près de chez moi', to: '/missions-benevolat', isActive: this.isBenevolatPresDeChezMoiActiveLink() },
          { name: 'À distance', to: '/missions-benevolat?type=Mission%20à%20distance', isActive: this.isBenevolatADistanceActiveLink() },
          { name: 'Associations', to: '/organisations', isActive: this.isActiveLink('/organisations') },
          // { name: '☀️ La tournée d\'été', href: 'https://www.jeveuxaider.gouv.fr/engagement/la-tournee-dete-cap-sur-les-solidarites-estivales/' },
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
          { name: this.$store.state.auth.user.statistics?.participations_need_to_be_treated_count > 0 ? '⚠️ Participations' : 'Participations', to: '/admin/participations', isActive: this.isActiveLink('/admin/participations/*') },
          { name: 'Centre d\'aide', href: 'https://reserve-civique.crisp.help/fr/category/organisation-1u4m061/', target: '_blank' }
        ]
      } else if (this.$store.getters.currentRole?.key === 'responsable_territoire') {
        return [
          { name: 'Tableau de bord', to: '/dashboard', isActive: this.isActiveLink('/dashboard') },
          { name: 'Mon territoire', to: `/admin/contenus/territoires/${this.$store.getters.contextableId}`, isActive: this.isActiveLink('/admin/contenus/territoires/*') },
          { name: 'Centre d\'aide', href: 'https://reserve-civique.crisp.help/fr/category/collectivites-1s01ktj/', target: '_blank' }

        ]
      } else if (this.$store.getters.currentRole?.key === 'tete_de_reseau') {
        return [
          { name: 'Tableau de bord', to: '/dashboard', isActive: this.isActiveLink('/dashboard') },
          { name: 'Mon réseau', to: `/admin/contenus/reseaux/${this.$store.getters.contextableId}`, isActive: this.isActiveLink('/admin/contenus/reseaux/*') },
          { name: 'Membres du réseau', to: '/admin/organisations', isActive: this.isActiveLink('/admin/organisations/*') },
          { name: 'Missions', to: '/admin/missions', isActive: this.isActiveLink('/admin/missions/*') },
          { name: 'Participations', to: '/admin/participations', isActive: this.isActiveLink('/admin/participations/*') },
          { name: 'Centre d\'aide', href: 'https://reserve-civique.crisp.help/fr/category/tetes-de-reseau-1pfzcje/', target: '_blank' }
        ]
      } else if (this.$store.getters.currentRole?.key === 'referent') {
        return [
          { name: 'Tableau de bord', to: '/dashboard', isActive: this.isActiveLink('/dashboard') },
          { name: 'Organisations', to: '/admin/organisations', isActive: this.isActiveLink('/admin/organisations/*') },
          { name: 'Missions', to: '/admin/missions', isActive: this.isActiveLink('/admin/missions/*') },
          { name: 'Participations', to: '/admin/participations', isActive: this.isActiveLink('/admin/participations/*') },
          { name: 'Utilisateurs', to: '/admin/utilisateurs', isActive: this.isActiveLink('/admin/utilisateurs/*') },
          { name: 'Centre d\'aide', href: 'https://reserve-civique.crisp.help/fr/category/referent-1j08uk0/', target: '_blank' }
        ]
      } else if (this.$store.getters.currentRole?.key === 'referent_regional') {
        return [
          { name: 'Tableau de bord', to: '/dashboard', isActive: this.isActiveLink('/dashboard') },
          { name: 'Organisations', to: '/admin/organisations', isActive: this.isActiveLink('/admin/organisations/*') },
          { name: 'Missions', to: '/admin/missions', isActive: this.isActiveLink('/admin/missions/*') },
          { name: 'Participations', to: '/admin/participations', isActive: this.isActiveLink('/admin/participations/*') }
        ]
      }
      return [
        { name: 'Mon espace', to: '/profile', isActive: this.isActiveLink('/profile', true) },
        { name: 'Mes missions', to: '/profile/missions', isActive: this.isActiveLink('profile/missions') },
        // { name: '☀️ La tournée d\'été', href: 'https://www.jeveuxaider.gouv.fr/engagement/la-tournee-dete-cap-sur-les-solidarites-estivales/' },
        { name: 'Centre d\'aide', href: 'https://reserve-civique.crisp.help/fr/category/benevole-1avwdvi/', target: '_blank' }
      ]
    }
  },
  watch: {
    $route () {
      this.showMobileMenu = false
    }
  },
  created () {
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
    },
    isBenevolatPresDeChezMoiActiveLink () {
      if (this.$route.path === '/missions-benevolat' && this.$route.query.type !== 'Mission à distance') {
        return true
      }
      return false
    },
    isBenevolatADistanceActiveLink () {
      if (this.$route.path === '/missions-benevolat' && this.$route.query.type === 'Mission à distance') {
        return true
      }
      return false
    }
  }
}
</script>
