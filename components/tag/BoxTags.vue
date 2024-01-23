<template>
  <div class="">
    <template v-if="canManageTags">
      <SelectTags
        ref="selectTags"
        v-model="tags"
        :structure-tags-endpoint="structureTagsEndpoint"
        :taggable-endpoint="taggableEndpoint"
        :options="$stores.structureTags.options"
        @update-selected-tags="$emit('update-selected-tags', $event)"
        class="mt-2"
      />
    </template>
    <div v-if="tags.length > 0" class="flex flex-wrap gap-2 mt-2">
      <DsfrTag
        v-for="(tag, index) in $stores.structureTags.resolveTagsName(tags)"
        :key="tag.id"
        size="md"
        :context="canManageTags ? 'deletable' : 'default'"
        @delete="onDeleteClick(tag)"
      >
        {{ tag.name }}
      </DsfrTag>
    </div>
    <div v-else-if="!canManageTags" class="text-gray-300 mt-2">Aucun tag</div>
  </div>
</template>

<script>
import SelectTags from '@/components/tag/SelectTags.vue'

export default defineNuxtComponent({
  emits: ['update-selected-tags'],
  components: { SelectTags },
  props: {
    tags: {
      type: Array,
      required: true,
    },
    structureTagsEndpoint: {
      type: String,
      required: true,
    },
    taggableEndpoint: {
      type: String,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    canManageTags() {
      return ['responsable'].includes(this.$stores.auth.contextRole)
    },
  },
  methods: {
    onDeleteClick(structureTag) {
      this.$refs.selectTags.detachTag(structureTag.id)
    },
  },
})
</script>
