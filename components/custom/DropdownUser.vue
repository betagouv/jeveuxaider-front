<template>
  <BaseDropdown ref="dropdownUser">
    <template #button>
      <button class="group flex items-center gap-3 lg:w-48 rounded-full">
        <BaseAvatar
          v-if="$stores.auth.user?.profile"
          :img-srcset="
            $stores.auth.user.profile.avatar && $stores.auth.user.profile.avatar.urls.thumbSmall
          "
          :img-src="
            $stores.auth.user.profile.avatar && $stores.auth.user.profile.avatar.urls.original
          "
          :initials="$stores.auth.user.profile.short_name"
          class="transition transform group-hover:scale-110"
          size="xs"
        />

        <div class="hidden lg:block overflow-hidden text-left">
          <div class="text-sm font-bold truncate">
            {{ $stores.auth.user?.profile?.first_name }}
          </div>
          <div class="text-gray-500 text-sm truncate leading-tight font-normal">
            {{
              $stores.auth.contextRole
                ? $filters.label($stores.auth.contextRole, 'roles')
                : 'Bénévole'
            }}
          </div>
        </div>

        <RiArrowDownSLine class="hidden lg:block h-4 ml-auto flex-none mr-[-6px]" />
      </button>
    </template>

    <template #items>
      <div class="w-[250px]">
        <BaseDropdownOptionsItem
          @click.native="handleClick('/profile')"
          icon="RiListUnordered"
          show-arrow
        >
          Mon espace
        </BaseDropdownOptionsItem>
        <BaseDropdownOptionsItem
          @click.native="handleClick('/profile/missions')"
          icon="RiCalendarEventLine"
          show-arrow
        >
          Mes missions
        </BaseDropdownOptionsItem>
        <BaseDropdownOptionsItem
          @click.native="handleClick('/profile/favoris')"
          icon="RiHeartLine"
          show-arrow
        >
          Mes favoris
        </BaseDropdownOptionsItem>
        <BaseDropdownOptionsItem
          @click.native="handleClick('/profile/alertes')"
          icon="RiNotification2Line"
          show-arrow
        >
          Mes alertes
        </BaseDropdownOptionsItem>
        <BaseDropdownOptionsItem
          @click.native="handleClick('/profile/edit')"
          icon="RiUserLine"
          show-arrow
        >
          Mon compte
        </BaseDropdownOptionsItem>
        <BaseDropdownOptionsItem
          @click.native="handleClick('logout')"
          icon="RiLogoutBoxRLine"
          icon-class="text-[#C9191E] group-hover/item:text-[#C9191E]"
        >
          <span class="text-[#C9191E]">Déconnexion</span>
        </BaseDropdownOptionsItem>
      </div>
    </template>
  </BaseDropdown>
</template>

<script>
export default defineNuxtComponent({
  methods: {
    handleClick(action) {
      switch (action) {
        case 'logout':
          this.$stores.auth.logout()
          break
        case '/profile':
        case '/profile/missions':
        case '/profile/favoris':
        case '/profile/alertes':
        case '/profile/settings':
        case '/profile/preferences':
        case '/profile/notifications':
        case '/profile/edit':
          this.$router.push(action)
          break
      }
      this.$refs.dropdownUser.close()
    },
  },
})
</script>
