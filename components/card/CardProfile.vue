<template>
  <div class="shadow-xl bg-white overflow-hidden safari-fix-scale cursor-pointer hover:shadow-2xl">
    <div
      class="relative bg-cover pt-9 pb-5 px-6 text-white"
      style="background-image: url('/images/profiles/bg-card-profile.jpg')"
    >
      <div class="flex space-x-3 items-center">
        <BaseAvatar
          :img-srcset="profile.avatar ? profile.avatar.urls.thumbLarge : null"
          :img-src="profile.avatar ? profile.avatar.urls.original : null"
          background-color="white"
          class="shadow-lg"
          size="md"
        />

        <div>
          <div class="font-extrabold line-clamp-1">
            {{ profile.full_name }}
          </div>
          <div class="text-sm">
            {{ $filters.label(profile.type, 'profile_type') }}
          </div>
        </div>
      </div>

      <div class="font-bold text-sm mt-2">
        <span>📍</span> {{ profile.zip ? profile.zip : 'Non communiqué' }}
      </div>

      <div class="absolute top-0 flex justify-center inset-x-0">
        <div v-if="profile.user" class="pill">
          {{ $filters.label(profile.user.context_role, 'roles') }}
        </div>
      </div>
    </div>

    <div class="border-t px-6 py-4 text-sm font-bold">
      <span class="text-gray-400">Der. connexion : </span>
      <span class="font-bold">{{
        profile.user.last_online_at ? $dayjs(profile.user.last_online_at).fromNow() : 'Jamais'
      }}</span>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
})
</script>

<style lang="postcss" scoped>
.pill {
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 11px;
  font-weight: bold;
  color: #171725;
  height: 23.5px;
  @apply px-3 inline-flex items-center truncate;
}
</style>
