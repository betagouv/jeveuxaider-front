<template>
  <BaseDropdown>
    <template #button>
      <DsfrButton :size="buttonSize" type="tertiary" class="!text-gray-800">
        <RiMoreFill class="h-5 w-5 fill-current" />
      </DsfrButton>
    </template>
    <template #items>
      <BaseDropdownOptionsItem
        v-if="['admin'].includes($stores.auth.contextRole)"
        @click="handleImpersonate()"
      >
        <div class="flex items-center">
          <RiSpy class="h-4 w-4 mr-2 fill-current text-gray-600" /> Prendre sa place
        </div>
      </BaseDropdownOptionsItem>
    </template>
  </BaseDropdown>
</template>

<script>
export default defineNuxtComponent({
  data() {
    return {}
  },
  props: {
    profile: {
      type: Object,
      required: true,
    },
    buttonSize: {
      type: String,
      default: 'md',
    },
  },
  methods: {
    async handleImpersonate() {
      await this.$stores.auth.impersonate(this.profile.user.id)
    },
  },
})
</script>
