<template>
  <div v-if="participation && showTags" class="p-4 flex flex-wrap gap-2">
    <SelectTags
      ref="selectTags"
      v-if="canManageTags"
      v-model="participation.tags"
      :structure-tags-endpoint="`/structures/${this.participation?.mission.structure_id}/tags`"
      :taggable-endpoint="`/participations/${this.participation?.id}/tags`"
      @update-selected-tags="$emit('update-selected-tags', $event)"
    />
    <DsfrTag
      v-for="(tag, index) in $stores.structureTags.resolveTagsName(participation.tags)"
      :key="tag.id"
      size="md"
      :context="canManageTags ? 'deletable' : 'default'"
      @delete="onDeleteClick(tag)"
    >
      {{ tag.name }}
    </DsfrTag>
  </div>
</template>

<script>
import MixinConversationParticipation from '@/mixins/conversation/participation'
import SelectTags from '@/components/tag/SelectTags.vue'

export default defineNuxtComponent({
  components: {
    SelectTags,
  },
  mixins: [MixinConversationParticipation],
  props: {},
  data() {},
  computed: {
    showTags() {
      return this.participation.tags.length > 0 || this.canManageTags
    },
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
