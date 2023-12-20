<template>
  <div class="">
    <div v-if="tags.length > 0" class="flex flex-wrap gap-2 mt-2">
      <DsfrTag
        v-for="(tag, index) in tags"
        :key="tag.id"
        size="md"
        as="button"
        :context="canManageTags ? 'deletable' : 'default'"
        @delete="onDeleteClick(tag)"
      >
        {{ tag.name }}
      </DsfrTag>
    </div>
    <div v-else-if="!canManageTags" class="text-gray-300 mt-2">Aucune étiquette</div>
    <template v-if="canManageTags && taggable">
      <SelectTags
        v-model="tags"
        :taggableOptions="taggableOptions"
        @updated="$emit('updated')"
        @attach-tag="attachTag"
        @detach-tag="detachTag"
        @updated-structure-tags="onUpdatedStructureTags"
        class="mt-2"
      />
    </template>
  </div>
</template>

<script>
import SelectTags from '@/components/tag/SelectTags.vue'

export default defineNuxtComponent({
  emits: ['updated-structure-tags', 'selected-tags', 'updated'],
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
      return ['responsable'].includes(this.$stores.auth.contextRole)
    },
  },
  methods: {
    onUpdatedStructureTags(structureTags) {
      console.log('onUpdatedStructureTags', structureTags)
      this.$emit('updated-structure-tags', structureTags)
    },
    onDeleteClick(tag) {
      this.detachTag(tag.id)
    },
    async attachTag(payload) {
      const { tags } = await apiFetch(
        `${this.taggableOptions.taggable_endpoint}/${payload}/attach`,
        {
          method: 'POST',
        }
      )
      this.$emit('selected-tags', tags)
    },
    async detachTag(payload) {
      const { tags } = await apiFetch(
        `${this.taggableOptions.taggable_endpoint}/${payload}/detach`,
        {
          method: 'POST',
        }
      )
      this.$emit('selected-tags', tags)
    },
  },
})
</script>
