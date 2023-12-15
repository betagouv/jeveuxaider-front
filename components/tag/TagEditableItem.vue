<template>
  <div class="flex gap-2 items-center">
    <input
      :id="`tag__${tag.id}`"
      :name="`tag__${tag.id}`"
      :value="isActive"
      type="checkbox"
      :checked="isActive"
      class="rounded text-jva-blue-500 transition focus:ring-jva-blue-500 group-hover:border-jva-blue-500 cursor-pointer"
      @change="onChange"
    />
    <BaseInput name="name" v-model="value" :disabled="mode === 'view'" class="w-full" />
    <div>
      <RiPencilLine
        class="h-5 cursor-pointer fill-current hover:text-jva-blue-500"
        v-if="mode == 'view'"
        @click="mode = 'edit'"
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
    isActive: {
      type: Boolean,
      default: false,
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
    onChange(event) {
      console.log('tageditableitem onChange', event.target.value)
      //   this.$emit('change', event)
    },
    toggleMode() {
      this.mode = this.mode === 'view' ? 'edit' : 'view'
    },
    updateTag() {
      console.log('updateTag')
    },
  },
})
</script>
