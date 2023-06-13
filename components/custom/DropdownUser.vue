<template>
  <Dropdown ref="dropdownUser">
    <template #button>
      <button class="group flex items-center gap-3 w-48 rounded-full">
        <Avatar
          v-if="$store.state.auth.user.profile"
          :img-srcset="
            $store.state.auth.user.profile.avatar && $store.state.auth.user.profile.avatar.urls.thumbSmall
          "
          :img-src="$store.state.auth.user.profile.avatar && $store.state.auth.user.profile.avatar.urls.original"
          :initials="$store.state.auth.user.profile.short_name"
          class="transition transform group-hover:scale-110"
          size="xs"
        />

        <div class="overflow-hidden text-left">
          <div class="text-sm font-bold truncate">
            {{ $store.state.auth.user.profile.first_name }}
          </div>
          <div class="text-gray-500 text-sm truncate leading-tight font-normal">
            {{ $store.state.auth.user.context_role ? $options.filters.label($store.state.auth.user.context_role, 'role') : 'Bénévole' }}
          </div>
        </div>

        <ChevronDownIcon class="h-4 ml-auto flex-none mr-[-6px]" />
      </button>
    </template>

    <template #items>
      <div class="w-[330px] py-4 ">
        <DropdownOptionsItem @click.native="handleClick('/profile')">
          <div class="flex items-center justify-center space-x-3 px-4 text-base font-medium">
            <RiListUnordered class="h-[17px] w-auto fill-current" /> <span>Mon espace</span>
          </div>
        </DropdownOptionsItem>
        <DropdownOptionsItem @click.native="handleClick('/profile/missions')">
          <div class="flex items-center justify-center space-x-3 px-4 text-base font-medium">
            <RiCalendarEventLine class="h-[17px] w-auto fill-current" /> <span>Mes missions</span>
          </div>
        </DropdownOptionsItem>
        <DropdownOptionsItem @click.native="handleClick('/profile/edit')">
          <div class="flex items-center justify-center space-x-3 px-4 text-base font-medium">
            <RiUserLine class="h-[17px] w-auto fill-current" /> <span>Mon profil</span>
          </div>
        </DropdownOptionsItem>
        <DropdownOptionsItem @click.native="handleClick('/profile/preferences')">
          <div class="flex items-center justify-center space-x-3 px-4 text-base font-medium">
            <RiHeartLine class="h-[17px] w-auto fill-current" /> <span>Mes préférences de missions</span>
          </div>
        </DropdownOptionsItem>
        <DropdownOptionsItem v-if="['referent','responsable'].includes($store.getters.contextRole)" @click.native="handleClick('/profile/notifications')">
          <div class="flex items-center justify-center space-x-3 px-4 text-base font-medium">
            <RiNotification3Line class="h-[17px] w-auto fill-current" /> <span>Mes notifications</span>
          </div>
        </DropdownOptionsItem>
        <DropdownOptionsItem @click.native="handleClick('/profile/settings')">
          <div class="flex items-center justify-center space-x-3 px-4 text-base font-medium">
            <RiSettings4Line class="h-[17px] w-auto fill-current" /> <span>Mes paramètres</span>
          </div>
        </DropdownOptionsItem>
        <DropdownOptionsItem @click.native="handleClick('logout')">
          <div class="flex items-center justify-center space-x-3 px-4 text-base font-medium text-[#C9191E]">
            <RiLogoutBoxRLine class="h-[17px] w-auto fill-current" /> <span>Déconnexion</span>
          </div>
        </DropdownOptionsItem>
      </div>
    </template>
  </Dropdown>
</template>

<script>
export default {
  methods: {
    handleClick (action) {
      switch (action) {
        case 'logout':
          this.$store.dispatch('auth/logout')
          break
        case '/profile':
        case '/profile/missions':
        case '/profile/settings':
        case '/profile/preferences':
        case '/profile/notifications':
        case '/profile/edit':
          this.$router.push(action)
          break
      }
      this.$refs.dropdownUser.close()
    }
  }
}
</script>
