<template>
  <div class="flex justify-between">
    <div class="p-4 lg:p-6">
      <div class="text-2xl font-bold">
        {{ user.profile.full_name }}
      </div>
      <div class="flex space-x-4 mt-2">
        <div class="flex space-x-1 items-center truncate text-sm text-cool-gray-500">
          <RiMailFill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
          <p class="truncate leading-none">
            {{ user.profile.email }}
          </p>
        </div>
        <div class="flex space-x-1 items-center truncate text-sm text-cool-gray-500">
          <RiPhoneLine class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
          <p class="truncate leading-none">
            {{ user.profile.mobile }}
          </p>
        </div>
        <div v-if=" user.profile.zip" class="flex space-x-1 items-center truncate text-sm text-cool-gray-500">
          <RiMapPin2Fill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
          <p class="truncate leading-none">
            {{ user.profile.zip }}
          </p>
        </div>
        <div v-if="user.profile.type" class="flex space-x-1 truncate text-sm text-cool-gray-500">
          <RiSuitcaseFill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
          <p class="truncate leading-none">
            {{ user.profile.type | label('profile_type') }}
          </p>
        </div>
      </div>
    </div>
    <div class="p-4 lg:p-6 flex items-center">
      <!-- <div class="flex space-x-1 items-center truncate text-sm text-cool-gray-500">
        <RiMailFill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
        <p class="truncate leading-none">
          {{ user.profile.email }}
        </p>
      </div>
      <div class="flex space-x-1 items-center truncate text-sm text-cool-gray-500">
        <RiPhoneLine class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
        <p class="truncate leading-none">
          {{ user.profile.mobile }}
        </p>
      </div> -->
    </div>
    <!-- <template v-if="variant === 'benevole'">
      <div>Zip: {{ user.profile.zip }}</div>
      <div>{{ user.profile.service_civique ? 'Service civique' : 'Pas service civique' }}</div>
      <div>Mobile: {{ user.profile.mobile }}</div>
      <div>Email: {{ user.profile.email }}</div>
      <div>
        Bouton Infos (Drawer ? Maquettes ?)
      </div>
    </template>
    <template v-if="variant === 'responsable'">
      <div>Fullname: {{ user.profile.full_name }}</div>
      <div>Responsable: structure.name</div>
      <div>Mobile: {{ user.profile.mobile }}</div>
      <div>Email: {{ user.profile.email }}</div>
    </template>
    <template v-if="variant === 'referent'">
      <div>Fullname: {{ user.profile.full_name }}</div>
      <div>Référent du département: department.name</div>
      <div>Mobile: {{ user.profile.mobile }}</div>
      <div>Email: {{ user.profile.email }}</div>
    </template> -->
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
    },
    variant: {
      type: String,
      required: true,
      validator: s => ['benevole', 'responsable', 'referent'].includes(s)
    }
  },
  computed: {

  }
}
</script>

<style>

</style>
