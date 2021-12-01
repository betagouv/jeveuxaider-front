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
      class="origin-top-right absolute right-0 mt-4 w-56 rounded-md border border-gray-100 shadow-xl bg-white divide-y divide-gray-100 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabindex="-1"
    >
      <nuxt-link to="/account" class="text-gray-700 block p-4 text-sm hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabindex="-1">
        Mon compte
      </nuxt-link>
      <template v-if="$store.getters.contextRoles">
        <div v-for="contextRole,index in $store.getters.contextRoles" :key="index" class="cursor-pointer text-gray-700 block p-4 text-sm hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabindex="-1">
          {{ $options.filters.label(contextRole.role, 'role') }}
        </div>
      </template>
      <div
        class="cursor-pointer text-[#E2011C] block p-4 text-sm hover:bg-gray-100 hover:text-red-600"
        @click="logout()"
      >
        Se déconnecter
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
