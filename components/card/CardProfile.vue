<template>
  <Box padding="sm">
    <div
      class="flex gap-6"
    >
      <div class="">
        <Avatar
          :source="
            profile.image
              ? profile.image.thumb
              : null
          "
          :fallback="profile.short_name"
          width="h-16 w-16"
          font-size="text-lg font-bold"
        />
      </div>
      <div class="flex-1">
        <div class="flex justify-between">
          <h3
            class="font-black text-black text-lg relative mb-auto line-clamp-3"
          >
            {{ profile.first_name }} {{ profile.last_name[0] }}.
          </h3>
          <div
            v-if="profile.zip"
            class="text-gray-500 text-sm mt-2 truncate max-w-full"
          >
            📍 {{ profile.zip }}
          </div>
        </div>

        <template v-if="profile.disponibilities || profile.commitment__duration">
          <div class="flex flex-wrap gap-4 mt-2">
            <template v-if="profile.commitment__duration">
              <Badge color="green" size="xs">
                {{ profile.commitment__duration | label('duration') }}
                <template v-if="profile.commitment__time_period">
                  par {{
                    profile.commitment__time_period | label('time_period')
                  }}
                </template>
              </Badge>
            </template>
            <Badge v-for="item,i in profile.disponibilities" :key="i" color="gray-light" size="xs">
              {{ $options.filters.label(
                item,
                'disponibilities'
              ) }}
            </Badge>
          </div>
        </template>
      </div>
    </div>
  </Box>
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
