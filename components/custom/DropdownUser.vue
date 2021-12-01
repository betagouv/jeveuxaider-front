<template>
  <div v-click-outside="clickedOutside" class="relative inline-block text-left z-20">
    <div class="group cursor-pointer flex items-center" @click="showOptions = true">
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
      <ChevronDownIcon class="ml-4 h-4 w-4" />
    </div>

    <div
      v-if="showOptions"
      class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabindex="-1"
    >
      <div class="py-1" role="none">
        <nuxt-link id="menu-item-0" to="/account" class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabindex="-1">
          Mon compte
        </nuxt-link>
        <nuxt-link id="menu-item-1" to="/missions" class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabindex="-1">
          Mes missions
        </nuxt-link>
      </div>
      <div class="py-1" role="none">
        <div
          class="cursor-pointer text-[#E2011C] block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
          @click="logout()"
        >
          Se déconnecter
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      showOptions: false
    }
  },
  methods: {
    clickedOutside () {
      this.showOptions = false
    },
    logout () {
      console.log('dfdfdfs')
      this.$store.dispatch('auth/logout')
    }
  }
}
</script>

<style>

</style>
