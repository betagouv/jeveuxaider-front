<template>
  <div>
    <div class="text-sm flex justify-between px-2 items-center">
      <div class="uppercase font-semibold text-gray-600">
        {{ title }}
      </div>
    </div>

    <div class="space-y-4 mt-4">
      <SectionBoxMember
        v-for="responsable in responsables"
        :key="responsable.id"
        :responsable="responsable.profile"
        :organisation="organisation"
        :conversable="organisation"
        conversable-type="App\Models\Structure"
        @updated="$emit('updated')"
        @removed="$emit('removed')"
      />
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  emits: ['updated', 'removed'],
  components: {},
  props: {
    title: {
      type: String,
      required: true,
    },
    organisation: {
      type: Object,
      required: true,
    },
    responsables: {
      type: Array,
      required: true,
    },
    conversable: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {}
  },
  created() {},
  methods: {},
})
</script>
