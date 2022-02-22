<template>
  <Dropdown ref="dropdownUser">
    <template #button>
      <div class="group flex items-center gap-4 w-48 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-jva-blue-500">
        <Avatar
          v-if="$store.state.auth.user.profile"
          :image="
            $store.state.auth.user.profile.avatar && $store.state.auth.user.profile.avatar.urls.thumbSmall
          "
          :initials="$store.state.auth.user.profile.short_name"
          class="transition transform group-hover:scale-110"
          size="xs"
        />

        <div>
          <div class="text-sm font-bold truncate">
            {{ $store.state.auth.user.profile.first_name }}
          </div>
          <div class="text-gray-500 text-sm truncate leading-tight font-normal">
            {{ $store.state.auth.user.context_role ? $options.filters.label($store.state.auth.user.context_role, 'role') : 'Bénévole' }}
          </div>
        </div>

        <ChevronDownIcon class="h-4 ml-auto" />
      </div>
    </template>

    <template #items>
      <div class="w-56 divide-y">
        <DropdownOptionsItem @click.native="handleClick('/profile')">
          Mon profil
        </DropdownOptionsItem>
        <DropdownOptionsItem @click.native="handleClick('/profile/missions')">
          Mes missions
        </DropdownOptionsItem>
        <DropdownOptionsItem @click.native="handleClick('/parameters')">
          Mes paramètres
        </DropdownOptionsItem>
        <DropdownOptionsItem @click.native="handleClick('logout')">
          <span class="text-[#E2011C]">Se déconnecter</span>
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
        case '/parameters':
          this.$router.push(action)
          break
      }
      this.$refs.dropdownUser.close()
    }
  }
}
</script>
