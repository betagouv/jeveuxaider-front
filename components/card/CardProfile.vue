<template>
  <div
    class="shadow-xl bg-white rounded-xl overflow-hidden safari-fix-scale cursor-pointer hover:shadow-2xl"
  >
    <div class="relative bg-cover pt-9 pb-5 px-6 text-white" style="background-image: url('/images/profiles/bg-card-profile.jpg')">
      <div class="flex space-x-3 items-center">
        <Avatar
          :image="profile.avatar ? profile.avatar.urls.thumbLarge: null"
          background-color="white"
          class="shadow-lg"
          size="md"
        />

        <div>
          <div class="font-extrabold line-clamp-1">
            {{ profile.full_name }}
          </div>
          <div class="text-sm">
            {{ profile.type | label('profile_type') }}
          </div>
        </div>
      </div>

      <div class="font-bold text-sm mt-2">
        <span>📍</span> {{ profile.zip }}
      </div>

      <div
        class="absolute top-0 flex justify-center inset-x-0"
      >
        <div class="pill !rounded-t-none capitalize">
          {{ profile.user.context_role | label('role') }}
        </div>
      </div>
    </div>

    <div class="border-t px-6 py-4 text-sm font-bold">
      {{ profile.participations_validated_count | pluralize('participation') }}
    </div>
  </div>
</template>

<script>

export default {
  props: {
    profile: {
      type: Object,
      required: true
    }
  },
  computed: {

  }
}
</script>

<style lang="postcss" scoped>
.pill {
  border-radius: 5px;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 11px;
  font-weight: bold;
  color: #171725;
  height: 23.5px;
  @apply px-3 inline-flex items-center truncate;
}
</style>
