<template>
  <div>
    <div v-if="actions && actions.length">
      <div
        v-for="(action, index) in actions"
        :key="action.uuid || action.id"
        class="bg-gray-50 py-4 px-4 mb-4"
      >
        <RuleActionsItem
          :fields="availableActionFields"
          :action="action"
          @update="onUpdate($event, index)"
          @remove="onRemove(index)"
        />
      </div>
    </div>

    <div v-else class="bg-gray-50 py-4 px-4 mb-4 text-gray-500 text-sm">
      {{ emptyText }}
    </div>

    <div class="flex justify-end">
      <Button variant="white" @click.native="onAdd">
        {{ addButtonLabel }}
      </Button>
    </div>
  </div>
</template>

<script>
import RuleActionsItem from '@/components/custom/RuleActionsItem.vue'

export default {
  components: {
    RuleActionsItem
  },
  props: {
    availableActionFields: {
      type: Array,
      required: true
    },
    actions: {
      type: Array,
      default: () => {
        return []
      }
    },
    emptyText: {
      type: String,
      default: 'Aucun élément'
    },
    addButtonLabel: {
      type: String,
      default: 'Ajouter un élément'
    }
  },
  methods: {
    onAdd () {
      const item = {}
      this.$emit('add', item)
    },
    onUpdate (payload, index) {
      this.$emit('update', { payload, index })
    },
    onRemove (index) {
      this.$emit('remove', index)
    }
  }
}
</script>
