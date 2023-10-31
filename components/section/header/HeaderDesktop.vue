<template>
  <div>
    <div
      class="flex justify-start items-center relative p-4 h-[116px]"
      :class="{ 'xl:container': !fullWidth }"
    >
      <div class="flex space-x-6 items-center">
        <img
          src="@/assets/images/republique-francaise-logo.svg"
          alt="République Française"
          class="w-[76px]"
          width="6500"
          height="5670"
          data-not-lazy
        />
      </div>
      <div class="flex items-center flex-1 pl-6">
        <nuxt-link no-prefetch to="/" aria-label="Page d'accueil">
          <img
            src="@/assets/images/jeveuxaider-logo.svg"
            alt=""
            class="h-[41px] w-[256px]"
            width="256"
            height="41"
            data-not-lazy
          />
        </nuxt-link>
      </div>
      <nav role="navigation" class="flex items-center gap-6">
        <div class="flex divide-x divide-gray-200">
          <BaseNavItem
            v-for="link in primaryNavigation"
            :key="link.name"
            :href="link.href"
            :to="link.to"
            :click="link.click"
            class="flex items-center text-jva-blue-500 font-medium hover:underline px-3 text-sm py-1 relative"
          >
            <component :is="link.icon" class="flex-shrink-0 mr-3 h-4 w-4" aria-hidden="true" />
            {{ link.name }}
          </BaseNavItem>
        </div>

        <template v-if="$stores.auth.isLogged">
          <div class="relative">
            <nuxt-link no-prefetch to="/messages" class="group flex p-1">
              <EnvelopeIcon class="text-jva-blue-500 h-[22px] group-hover:scale-105" />
              <div
                v-if="$stores.messaging.unreadMessagesCount"
                class="group-hover:scale-105 absolute top-[2px] right-[2px] border border-white bg-[#FF463D] rounded-full w-[10px] h-[10px]"
              />
            </nuxt-link>
          </div>
          <CustomDropdownUserNotifications />
          <CustomDropdownUser class="lg:ml-2" />
        </template>

        <template v-if="!$stores.auth.isLogged">
          <DsfrButton type="tertiary" size="sm" icon="RiUserLine" @click="$router.push('/login')">
            Mon compte
          </DsfrButton>
        </template>
      </nav>
    </div>
    <div class="w-full border-t" />
    <div class="flex justify-between text-sm text-gray-800" :class="{ 'xl:container': !fullWidth }">
      <nav
        role="navigation"
        :class="['flex w-full', { 'xl:-mx-4': !fullWidth }]"
        :style="!fullWidth ? 'width: calc(100% + 2rem);' : null"
      >
        <BaseDropdown
          v-if="$stores.auth.roles && $stores.auth.roles.length > 1"
          ref="switchRole"
          positionClass="origin-top-left left-0"
          class="h-full"
        >
          <template #button>
            <button class="flex items-center justify-between gap-4 border-r py-4 pr-2 pl-5 w-52">
              <div class="truncate">
                <div class="truncate mr-auto font-semibold">
                  <template v-if="$stores.auth.currentRole">
                    {{ $stores.auth.currentRole.label }}
                  </template>
                  <template v-else> Bénévole </template>
                </div>
              </div>
              <RiArrowDownSLine class="h-3 flex-none" />
            </button>
          </template>
          <template #items>
            <template v-if="$stores.auth.roles">
              <div class="w-80">
                <BaseDropdownOptionsItem
                  v-for="(role, index) in $stores.auth.roles"
                  :key="index"
                  :label="$filters.label(role.key, 'roles', 'espace')"
                  @click.native="switchRole(role)"
                >
                  {{ role.label }}
                  <template #iconRight>
                    <template
                      v-if="
                        ['responsable', 'responsable_territoire'].includes($stores.auth.contextRole)
                      "
                    >
                      <template v-if="$stores.auth.contextRole === 'responsable'">
                        <RiCheckLine
                          v-if="
                            role.contextable_type === 'structure' &&
                            role.contextable_id === $stores.auth.contextableId
                          "
                          class="h-5 text-jva-green-500 fill-current"
                        />
                        <ArrowsRightLeftIcon
                          v-else
                          class="h-5 text-gray-400 group-hover:scale-110"
                        />
                      </template>
                      <template v-if="$stores.auth.contextRole === 'responsable_territoire'">
                        <RiCheckLine
                          v-if="
                            role.contextable_type === 'responsable_territoire' &&
                            role.contextable_id === $stores.auth.contextableId
                          "
                          class="h-5 text-jva-green-500 fill-current"
                        />
                        <ArrowsRightLeftIcon
                          v-else
                          class="h-5 text-gray-400 group-hover:scale-110"
                        />
                      </template>
                    </template>
                    <template v-else>
                      <RiCheckLine
                        v-if="role.key === $stores.auth.contextRole"
                        class="h-5 text-jva-green-500 fill-current"
                      />
                      <ArrowsRightLeftIcon v-else class="h-5 text-gray-400 group-hover:scale-110" />
                    </template>
                  </template>
                </BaseDropdownOptionsItem>
              </div>
            </template>
          </template>
        </BaseDropdown>
        <BaseNavItem
          v-for="link in secondaryNavigation"
          :key="link.name"
          :href="link.href"
          :to="link.to"
          :click="link.click"
          :target="link.target"
          :class="[
            'p-4 hover:bg-gray-50 hover:text-jva-blue-500',
            { 'text-jva-blue-500 bg-gray-50 font-medium': link.isActive },
          ]"
        >
          {{ link.name }}
        </BaseNavItem>

        <div v-if="$stores.auth.contextRole == 'admin'" class="flex ml-auto">
          <BaseNavItem
            to="/admin"
            :class="[
              'p-4 hover:bg-gray-50 hover:text-jva-blue-500 ml-auto flex items-center',
              {
                'text-jva-blue-500 bg-gray-50 font-medium':
                  isActiveLink('/admin/(settings|contenus|scripts|taxonomies)/*') ||
                  isActiveLink('/admin'),
              },
            ]"
          >
            <RiAdminLine class="h-4 w-4 mr-2 flex-none" />
            Administration
          </BaseNavItem>
          <BaseNavItem
            to="/support"
            :class="[
              'p-4 hover:bg-gray-50 hover:text-jva-blue-500 ml-auto flex items-center',
              {
                'text-jva-blue-500 bg-gray-50 font-medium': isActiveLink('/support/*'),
              },
            ]"
          >
            <RiUserStarLine class="h-4 w-4 mr-2 flex-none" />
            Support
          </BaseNavItem>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { ArrowsRightLeftIcon, CalendarIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { FocusLoop } from '@vue-a11y/focus-loop'
import { EnvelopeIcon } from '@heroicons/vue/24/outline'

export default defineNuxtComponent({
  components: {
    FocusLoop,
    EnvelopeIcon,
    ArrowsRightLeftIcon,
  },
  props: {
    fullWidth: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
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
      ]
    },
    secondaryNavigation() {
      if (!this.$stores.auth.isLogged) {
        return [
          {
            name: 'Bénévolat près de chez moi',
            to: '/missions-benevolat',
            isActive: this.isBenevolatPresDeChezMoiActiveLink(),
          },
          {
            name: 'À distance',
            to: '/missions-benevolat?type=Mission%20à%20distance',
            isActive: this.isBenevolatADistanceActiveLink(),
          },
          {
            name: 'Associations',
            to: '/organisations',
            isActive: this.isActiveLink('/organisations'),
          },
          // {
          //   name: '✏️ Septembre pour Apprendre',
          //   href: 'https://www.jeveuxaider.gouv.fr/engagement/septembre-pour-apprendre/',
          //   target: '_blank',
          // },
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
            name:
              this.$stores.auth.user.statistics?.participations_need_to_be_treated_count > 0
                ? '⚠️ Participations'
                : 'Participations',
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
        // {
        //   name: '✏️ Septembre pour Apprendre',
        //   href: 'https://www.jeveuxaider.gouv.fr/engagement/septembre-pour-apprendre/',
        //   target: '_blank',
        // },
        {
          name: "Centre d'aide",
          href: 'https://reserve-civique.crisp.help/fr/category/benevole-1avwdvi/',
          target: '_blank',
        },
      ]
    },
  },
  watch: {
    $route() {
      this.showMobileMenu = false
    },
  },
  created() {},
  methods: {
    async switchRole(role) {
      await this.$stores.auth.updateUser({
        context_role: role.key,
        contextable_type: role.contextable_type ?? null,
        contextable_id: role.contextable_id ?? null,
      })

      this.$refs.switchRole.show = false

      if (this.$route.name === 'dashboard') {
        window.location.reload(true)
      } else {
        this.$router.push('/dashboard')
      }
    },
    isActiveLink(regex, exact = false) {
      return exact ? this.$route.path === regex : RegExp(regex).test(this.$route.path)
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
