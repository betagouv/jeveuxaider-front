<template>
  <div
    class="h-auto flex flex-col flex-1 bg-white rounded-xl overflow-hidden safari-fix-scale"
  >
    <div class="flex flex-col items-center">
      <Avatar
        :source="
          profile.image
            ? profile.image.thumb
            : null
        "
        :fallback="profile.short_name"
        width="h-24 w-24"
        font-size="text-3xl font-bold"
      />
      <h3
        class="font-black text-black text-lg relative mb-auto line-clamp-3"
      >
        {{ profile.full_name }}
      </h3>
      <div
        class="text-gray-500 text-sm mt-2 truncate max-w-full"
      >
        {{ profile.type | label('profile_type') }}
      </div>
    </div>

    <div class="space-y-8">
      <div class="">
        <div class="text-sm font-medium text-gray-500 mb-4">
          Disponibilités
        </div>
        <template v-if="profile.disponibilities.length">
          <div class="flex flex-wrap gap-4">
            <Badge v-for="item,i in profile.disponibilities" :key="i" color="gray-light" size="sm">
              {{ $options.filters.label(
                item,
                'disponibilities'
              ) }}
            </Badge>
            <template v-if="profile.commitment__duration">
              <Badge color="gray-light" size="sm">
                {{ profile.commitment__duration | label('duration') }}
                <template v-if="profile.commitment__time_period">
                  par {{
                    profile.commitment__time_period | label('time_period')
                  }}
                </template>
              </Badge>
            </template>
          </div>
        </template>
        <template v-else>
          <div class="text-gray-400 font-semibold">
            Vous n'avez pas renseigné vos disponibilités
          </div>
        </template>
      </div>
      <div class="">
        <div class="text-sm font-medium text-gray-500 mb-4">
          Compétences
        </div>
        <template v-if="profile.skills.length">
          <div class="flex flex-wrap gap-4">
            <Badge v-for="skill in profile.skills" :key="skill.id" color="gray-light" size="sm">
              {{ skill.name.fr }}
            </Badge>
          </div>
        </template>
        <template v-else>
          <div class="text-gray-400 font-semibold">
            Vous n'avez pas renseigné de compétence
          </div>
        </template>
      </div>
    </div>

    <!-- <div
      class="border-t p-4 text-center flex items-center justify-center space-x-2"
      :class="[$options.filters.label(domainId, 'domaines', 'color')]"
    >
      <span class="text-sm font-bold">
        {{ placesLeftText }}
      </span>

      <ExternalLinkIcon v-if="mission.provider == 'api_engagement'" class="flex-none" />
    </div> -->
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

</style>
