<template>
  <div class="flex flex-wrap gap-2 mt-2">
    <DsfrTag
      v-for="(tag, index) in tags"
      :key="tag.id"
      size="md"
      as="button"
      :context="canManageTags ? 'deletable' : 'default'"
    >
      {{ tag.name }}
    </DsfrTag>
    <template v-if="canManageTags && taggable">
      <SelectTags
        :taggable-id="taggableOptions.id"
        :taggable-type="taggableOptions.type"
        :endpoint="taggableOptions.endpoint"
      />
    </template>
  </div>
</template>

<script>
import SelectTags from '@/components/tag/SelectTags.vue'

export default defineNuxtComponent({
  components: { SelectTags },
  props: {
    tags: {
      type: Array,
      required: true,
    },
    taggable: {
      type: Boolean,
      default: false,
    },
    taggableOptions: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {}
  },

  computed: {
    canManageTags() {
      return ['admin', 'responsable'].includes(this.$stores.auth.contextRole)
    },
  },
})
</script>
