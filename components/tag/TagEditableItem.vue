<template>
  <div class="flex gap-2 items-center">
    <BaseInput
      ref="baseInput"
      name="name"
      v-model="value"
      :disabled="mode === 'view'"
      class="w-full"
    />
    <div>
      <RiPencilLine
        class="h-5 cursor-pointer fill-current hover:text-jva-blue-500"
        v-if="mode == 'view'"
        @click="switchModeEdit"
      />
      <RiSaveLine
        class="h-5 cursor-pointer fill-current hover:text-jva-blue-500"
        v-if="mode == 'edit'"
        @click="updateTag"
      />
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  emits: ['change'],
  components: {},
  props: {
    tag: {
      type: Object,
      required: true,
    },
    taggableOptions: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      value: this.tag.name,
      mode: 'view',
    }
  },
  created() {},
  computed: {},
  methods: {
    async switchModeEdit() {
      this.mode = 'edit'
      await this.$nextTick()
      this.$refs.baseInput.focus()
    },
    async toggleMode() {
      this.mode = this.mode === 'view' ? 'edit' : 'view'
    },
    async updateTag() {
      await apiFetch(`${this.taggableOptions.tags_endpoint}/${this.tag.id}`, {
        method: 'PUT',
        body: {
          ...this.tag,
          name: this.value,
        },
      })
      this.toggleMode()
    },
  },
})
</script>
