<template>
  <div class="flex justify-between">
    <div class="p-4 lg:p-6 flex flex-col gap-4">
      <div class="text-2xl font-bold">
        {{ user.profile.full_name }} (référent)
      </div>
      <div class="flex space-x-4 items-center">
        <div class="flex space-x-1 items-center truncate text-sm text-cool-gray-500">
          <RiMailFill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
          <p class="truncate leading-none">
            {{ user.profile.email }}
          </p>
        </div>
        <div v-if="user.profile.mobile" class="flex space-x-1 items-center truncate text-sm text-cool-gray-500">
          <RiPhoneLine class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
          <p class="truncate leading-none">
            {{ user.profile.mobile }}
          </p>
        </div>
      </div>
    </div>
    <div class="p-4 lg:p-6 flex items-center" />
  </div>
</template>

<script>

export default {
  components: {

  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {

  }
}
</script>

<style>

</style>
