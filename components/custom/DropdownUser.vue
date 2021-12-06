<template>
  <div v-click-outside="clickedOutside" class="relative inline-block text-left z-20">
    <div class="group cursor-pointer flex items-center" @click="showOptions = !showOptions">
      <div id="menu-button" class="flex gap-4 w-[165px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" aria-expanded="true" aria-haspopup="true">
        <Avatar
          v-if="$store.state.auth.user.profile"
          :source="
            $store.state.auth.user.profile.image
              ? $store.state.auth.user.profile.image.thumb
              : null
          "
          :fallback="$store.state.auth.user.profile.short_name"
          class="transition transform group-hover:scale-110"
        />
        <div class="">
          <div class="text-sm font-bold truncate">
            {{ $store.state.auth.user.profile.first_name }}
          </div>
          <div class="text-gray-500 text-sm truncate leading-tight font-normal">
            {{ $options.filters.label($store.state.auth.user.context_role, 'role') }}
          </div>
        </div>
      </div>
      <ChevronDownIcon class="ml-4 h-4 w-4 text-gray-500 group-hover:text-gray-800" />
    </div>

    <div
      v-if="showOptions"
      class="origin-top-right absolute right-0 mt-4 w-[297px] rounded-md border border-gray-100 shadow-xl bg-white divide-y divide-gray-100 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabindex="-1"
    >
      <template v-if="$store.getters.roles">
        <DropdownOptionsItem
          v-for="role,index in $store.getters.roles"
          :key="index"
          :label="$options.filters.label(role.key, 'role', 'espace')"
          @click.native="onClickOptionItem('switch_role', role)"
        >
          <template v-if="role.key == 'referent'">
            {{ $options.filters.label(role.label, 'departments',) }}
          </template>
          <template v-else>
            {{ role.label }}
          </template>
          <template #icon>
            <CheckIcon v-if="role.key == $store.getters.contextRole" class="h-5 text-jva-green-500 " />
            <SwitchHorizontalIcon v-else class="h-5 text-gray-400 group-hover:scale-110" />
          </template>
        </DropdownOptionsItem>
      </template>
      <DropdownOptionsItem @click.native="onClickOptionItem('push', '/profile')">
        Mon compte
      </DropdownOptionsItem>
      <DropdownOptionsItem @click.native="onClickOptionItem('logout')">
        <span class="text-[#E2011C]">Se déconnecter</span>
      </DropdownOptionsItem>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      showOptions: false,
      loading: false
    }
  },
  methods: {
    clickedOutside () {
      this.showOptions = false
    },
    onClickOptionItem (action, payload = null) {
      this.showOptions = false
      if (action === 'switch_role') {
        this.switchRole(payload)
      }
      if (action === 'push') {
        this.$router.push(payload)
      }
      if (action === 'logout') {
        this.$store.dispatch('auth/logout')
      }
    },
    async switchRole (role) {
      console.log('switchRole to', role)
      await this.$store.dispatch('auth/updateUser', {
        context_role: role.key,
        contextable_type: role.contextable_type ?? null,
        contextable_id: role.contextable_id ?? null
      })

      this.$router.push('/dashboard')
      if (this.$router.history.current.path === '/dashboard') {
        this.$router.app.refresh()
      }
    }

  }
}
</script>

<style>

</style>
