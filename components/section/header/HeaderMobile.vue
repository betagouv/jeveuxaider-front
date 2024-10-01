<template>
  <div>
    <div class="relative bg-white shadow-lg z-30">
      <div class="flex justify-between items-center relative p-4 h-[90px]">
        <div class="flex space-x-6 items-center">
          <img
            src="@/assets/images/republique-francaise-logo.svg"
            alt="République Française"
            class="w-20"
            width="166"
            height="150"
            data-not-lazy
          />
        </div>
        <div class="flex items-center">
          <nuxt-link no-prefetch to="/" aria-label="Page d'accueil">
            <img
              src="@/assets/images/jeveuxaider-logo.svg"
              alt=""
              class="h-[26px] w-[165px]"
              width="256"
              height="41"
              data-not-lazy
            />
          </nuxt-link>
        </div>
        <div class="flex items-center space-x-4 text-jva-blue-500">
          <nuxt-link no-prefetch to="/missions-benevolat" aria-label="Recherche">
            <MagnifyingGlassIcon class="h-6 w-6" />
          </nuxt-link>
          <button
            type="button"
            aria-haspopup="true"
            @click="showMobileMenu = !showMobileMenu"
            class="border"
          >
            <template v-if="!showMobileMenu">
              <span class="sr-only">Open main menu</span>
              <Bars3Icon class="h-6 w-6" />
            </template>

            <template v-else>
              <span class="sr-only">Close main menu</span>
              <RiCloseLine />
            </template>
          </button>
        </div>
      </div>

      <ClientOnly>
        <Teleport to="#teleport-body-end">
          <transition
            enter-active-class="duration-150 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="duration-150 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div
              v-show="showMobileMenu"
              class="z-20 fixed inset-0 bg-black bg-opacity-25"
              aria-hidden="true"
            />
          </transition>
          <transition
            enter-active-class="duration-150 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="duration-150 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div
              v-show="showMobileMenu"
              v-scroll-lock="showMobileMenu"
              class="h-screen overflow-y-auto z-[100] absolute top-0 inset-x-0 mx-auto w-full transition transform origin-top"
            >
              <FocusLoop :is-visible="showMobileMenu" @keydown.native.esc="showMobileMenu = false">
                <div class="bg-white h-full flex flex-col gap-3">
                  <div class="p-4 bg-white">
                    <div class="flex items-center justify-between pl-4 pb-6">
                      <div>
                        <img class="h-8 w-auto" src="@/assets/images/jeveuxaider-logo.svg" alt="" />
                      </div>
                      <div class="-mr-2">
                        <button
                          type="button"
                          class="bg-white p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                          @click="showMobileMenu = false"
                        >
                          <span class="sr-only">Close menu</span>
                          <RiCloseLine class="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                    <nav role="navigation">
                      <BaseNavItem
                        v-for="link in primaryNavigation"
                        :key="link.name"
                        :href="link.href"
                        :to="link.to"
                        :click="link.click"
                        class="flex items-center px-3 py-2 hover:bg-gray-100 hover:text-gray-800 text-jva-900"
                      >
                        <component
                          :is="link.icon"
                          class="flex-shrink-0 h-4 w-4"
                          aria-hidden="true"
                        />
                        <span class="text-base font-medium ml-2">{{ link.name }}</span>
                      </BaseNavItem>

                      <div class="border-t my-2" />

                      <BaseNavItem
                        v-for="(link, i) in secondaryNavigation"
                        :key="`secondary-menu-items-${i}`"
                        :href="link.href"
                        :to="link.to"
                        :target="link.target"
                        :click="link.click"
                        :class="[
                          'block px-3 py-2 text-base text-cool-gray-600',
                          {
                            '!text-jva-blue-500 bg-gray-50 font-medium': link.isActive,
                          },
                        ]"
                      >
                        {{ link.name }}
                      </BaseNavItem>

                      <div class="border-t my-2" />

                      <BaseNavItem
                        v-for="(link, i) in tertiaryNavigation"
                        :key="`tertiary-menu-items-${i}`"
                        :href="link.href"
                        :to="link.to"
                        :target="link.target"
                        :click="link.click"
                        :class="[
                          'block px-3 py-2 text-base text-cool-gray-600',
                          {
                            '!text-jva-blue-500 bg-gray-50 font-medium': link.isActive,
                          },
                        ]"
                      >
                        {{ link.name }}
                      </BaseNavItem>
                    </nav>
                  </div>
                </div>
              </FocusLoop>
            </div>
          </transition>
        </Teleport>
      </ClientOnly>
    </div>
  </div>
</template>

<script>
import { CalendarIcon, MagnifyingGlassIcon, Bars3Icon } from '@heroicons/vue/24/solid'
import { BellIcon } from '@heroicons/vue/24/outline'
import { FocusLoop } from '@vue-a11y/focus-loop'
import HeaderBanner from '@/components/layout/HeaderBanner.vue'

export default defineNuxtComponent({
  components: {
    FocusLoop,
    HeaderBanner,
    CalendarIcon,
    MagnifyingGlassIcon,
    BellIcon,
    Bars3Icon,
  },
  props: {
    fullWidth: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showMobileMenu: false,
    }
  },
  computed: {
    primaryNavigation() {
      if (!this.$stores.auth.isLogged) {
        return [
          {
            name: 'Trouver une mission',
            icon: MagnifyingGlassIcon,
            to: '/missions-benevolat',
          },
          {
            name: 'Publier une mission',
            to: '/inscription/responsable',
            icon: CalendarIcon,
          },
        ]
      }
      return [
        {
          name: 'Trouver une mission',
          icon: MagnifyingGlassIcon,
          to: '/missions-benevolat',
        },
        {
          name: 'Messagerie',
          to: '/messages',
          icon: 'RiMessage3Line',
          count: this.$stores.messaging.unreadMessagesCount,
        },
        {
          name: 'Notifications',
          to: '/notifications',
          icon: BellIcon,
          count: this.$stores.notifications.unreadNotificationsCount,
        },
      ]
    },
    secondaryNavigation() {
      if (!this.$stores.auth.isLogged) {
        return [
          {
            name: 'Bénévolat près de chez moi',
            to: '/missions-benevolat',
            isActive:
              this.isBenevolatPresDeChezMoiActiveLink() &&
              !this.isActiveOperation('Collecte nationale des Restos du Cœur'),
          },
          {
            name: 'À distance',
            to: '/missions-benevolat?type=Mission%20à%20distance',
            isActive: this.isBenevolatADistanceActiveLink(),
          },
          {
            name: '🔥 En ce moment',
            to: '/en-ce-moment',
            isActive: this.isActiveLink('/en-ce-moment'),
          },
          // {
          //   name: 'Printemps pour la Planète 🌱',
          //   href: 'https://www.jeveuxaider.gouv.fr/engagement/printemps-pour-la-planete/',
          //   target: '_blank',
          // },
          // {
          //   name: 'Septembre pour Apprendre ✏️',
          //   href: 'https://www.jeveuxaider.gouv.fr/engagement/septembre-pour-apprendre/',
          //   target: '_blank',
          // },
          // {
          //   name: 'Élections législatives 🗳️',
          //   href: 'https://www.jeveuxaider.gouv.fr/engagement/trouver-des-assesseurs/',
          //   target: '_blank',
          // },
          // {
          //   name: 'La tournée d’été ☀️',
          //   href: 'https://www.jeveuxaider.gouv.fr/engagement/la-tournee-dete-cap-sur-les-solidarites-estivales/',
          //   target: '_blank',
          // },
          {
            name: 'Associations',
            to: '/organisations',
            isActive: this.isActiveLink('/organisations'),
          },
          {
            name: "Centre d'aide",
            href: 'https://reserve-civique.crisp.help/fr/',
            target: '_blank',
          },
        ]
      } else if (this.$stores.auth.currentRole?.key === 'admin') {
        return [
          {
            name: 'Tableau de bord',
            to: '/dashboard',
            isActive: this.isActiveLink('/dashboard'),
          },
          {
            name: 'Organisations',
            to: '/admin/organisations',
            isActive: this.isActiveLink('/admin/organisations/*'),
          },
          {
            name: 'Missions',
            to: '/admin/missions',
            isActive: this.isActiveLink('/admin/missions/*'),
          },
          {
            name: 'Participations',
            to: '/admin/participations',
            isActive: this.isActiveLink('/admin/participations/*'),
          },
          {
            name: 'Utilisateurs',
            to: '/admin/utilisateurs',
            isActive: this.isActiveLink('/admin/utilisateurs/*'),
          },
        ]
      } else if (this.$stores.auth.currentRole?.key === 'responsable') {
        return [
          {
            name: 'Tableau de bord',
            to: '/dashboard',
            isActive: this.isActiveLink('/dashboard'),
          },
          {
            name: 'Mon organisation',
            to: `/admin/organisations/${this.$stores.auth.contextableId}`,
            isActive: this.isActiveLink('/admin/organisations/*(?!.*missions/add)'),
          },
          {
            name: 'Missions',
            to: '/admin/missions',
            isActive: this.isActiveLink('/admin/missions/*|missions/add'),
          },
          {
            name: 'Participations',
            to: '/admin/participations',
            isActive: this.isActiveLink('/admin/participations/*'),
          },
          {
            name: "Centre d'aide",
            href: 'https://reserve-civique.crisp.help/fr/category/organisation-1u4m061/',
            target: '_blank',
          },
        ]
      } else if (this.$stores.auth.currentRole?.key === 'responsable_territoire') {
        return [
          {
            name: 'Tableau de bord',
            to: '/dashboard',
            isActive: this.isActiveLink('/dashboard'),
          },
          {
            name: 'Mon territoire',
            to: `/admin/contenus/territoires/${this.$stores.auth.contextableId}`,
            isActive: this.isActiveLink('/admin/contenus/territoires/*'),
          },
          {
            name: "Centre d'aide",
            href: 'https://reserve-civique.crisp.help/fr/category/collectivites-1s01ktj/',
            target: '_blank',
          },
        ]
      } else if (this.$stores.auth.currentRole?.key === 'tete_de_reseau') {
        return [
          {
            name: 'Tableau de bord',
            to: '/dashboard',
            isActive: this.isActiveLink('/dashboard'),
          },
          {
            name: 'Mon réseau',
            to: `/admin/contenus/reseaux/${this.$stores.auth.contextableId}`,
            isActive: this.isActiveLink('/admin/contenus/reseaux/*'),
          },
          {
            name: 'Membres du réseau',
            to: '/admin/organisations',
            isActive: this.isActiveLink('/admin/organisations/*'),
          },
          {
            name: 'Missions',
            to: '/admin/missions',
            isActive: this.isActiveLink('/admin/missions/*'),
          },
          {
            name: 'Participations',
            to: '/admin/participations',
            isActive: this.isActiveLink('/admin/participations/*'),
          },
          {
            name: "Centre d'aide",
            href: 'https://reserve-civique.crisp.help/fr/category/tetes-de-reseau-1pfzcje/',
            target: '_blank',
          },
        ]
      } else if (this.$stores.auth.currentRole?.key === 'referent') {
        return [
          {
            name: 'Tableau de bord',
            to: '/dashboard',
            isActive: this.isActiveLink('/dashboard'),
          },
          {
            name: 'Organisations',
            to: '/admin/organisations',
            isActive: this.isActiveLink('/admin/organisations/*'),
          },
          {
            name: 'Missions',
            to: '/admin/missions',
            isActive: this.isActiveLink('/admin/missions/*'),
          },
          {
            name: 'Participations',
            to: '/admin/participations',
            isActive: this.isActiveLink('/admin/participations/*'),
          },
          {
            name: 'Utilisateurs',
            to: '/admin/utilisateurs',
            isActive: this.isActiveLink('/admin/utilisateurs/*'),
          },
          {
            name: "Centre d'aide",
            href: 'https://reserve-civique.crisp.help/fr/category/referent-1j08uk0/',
            target: '_blank',
          },
        ]
      } else if (this.$stores.auth.currentRole?.key === 'referent_regional') {
        return [
          {
            name: 'Tableau de bord',
            to: '/dashboard',
            isActive: this.isActiveLink('/dashboard'),
          },
          {
            name: 'Organisations',
            to: '/admin/organisations',
            isActive: this.isActiveLink('/admin/organisations/*'),
          },
          {
            name: 'Missions',
            to: '/admin/missions',
            isActive: this.isActiveLink('/admin/missions/*'),
          },
          {
            name: 'Participations',
            to: '/admin/participations',
            isActive: this.isActiveLink('/admin/participations/*'),
          },
        ]
      }
      return [
        {
          name: 'Mon espace',
          to: '/profile',
          isActive: this.isActiveLink('/profile', true),
        },
        {
          name: 'Mes missions',
          to: '/profile/missions',
          isActive: this.isActiveLink('profile/missions'),
        },
        {
          name: '🔥 En ce moment',
          to: '/en-ce-moment',
          isActive: this.isActiveLink('/en-ce-moment'),
        },
        {
          name: 'Banques alimentaires 🛒',
          href: 'https://www.jeveuxaider.gouv.fr/engagement/banques-alimentaires/',
          target: '_blank',
        },
        {
          name: "Centre d'aide",
          href: 'https://reserve-civique.crisp.help/fr/category/benevole-1avwdvi/',
          target: '_blank',
        },
      ]
    },
    tertiaryNavigation() {
      if (!this.$stores.auth.isLogged) {
        return [
          {
            name: 'Mon compte',
            to: '/login',
            isActive: this.isActiveLink('login'),
          },
        ]
      }
      return [
        {
          name: 'Mon espace',
          to: '/profile',
          isActive: this.isActiveLink('/profile', true),
        },
        {
          name: 'Mon compte',
          to: '/profile/edit',
          isActive: this.isActiveLink('profile/edit'),
        },
        {
          name: 'Se déconnecter',
          click: async () => {
            await this.$stores.auth.logout()
            this.showMobileMenu = false
          },
        },
      ]
    },
  },
  watch: {
    $route() {
      this.showMobileMenu = false
    },
  },
  methods: {
    isActiveLink(regex, exact = false) {
      return exact ? this.$route.path === regex : RegExp(regex).test(this.$route.path)
    },
    isActiveOperation(operation) {
      return this.$route.query?.tags == operation
    },
    isBenevolatPresDeChezMoiActiveLink() {
      if (
        this.$route.path === '/missions-benevolat' &&
        this.$route.query.type !== 'Mission à distance'
      ) {
        return true
      }
      return false
    },
    isBenevolatADistanceActiveLink() {
      if (
        this.$route.path === '/missions-benevolat' &&
        this.$route.query.type === 'Mission à distance'
      ) {
        return true
      }
      return false
    },
  },
})
</script>
