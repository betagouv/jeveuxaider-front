<template>
  <div>
    <div v-if="conditions && conditions.length">
      <div
        v-for="(condition, index) in conditions"
        :key="condition.uuid || condition.id"
        class="bg-gray-50 py-4 px-4 mb-4"
      >
        <RuleConditionsItem
          :fields="availableConditionFields"
          :condition="condition"
          :is-first="index === 0"
          @update="onUpdate($event, index)"
          @remove="onRemove(index)"
        />
      </div>
    </div>

    <div v-else class="bg-gray-50 py-4 px-4 mb-4 text-gray-500 text-sm">
      {{ emptyText }}
    </div>

    <div class="flex justify-end space-x-4">
      <Button variant="white" icon="PlusIcon" @click.native="onAdd('and')">
        AND
      </Button>
      <Button variant="white" icon="PlusIcon" @click.native="onAdd('or')">
        OR
      </Button>
    </div>
  </div>
</template>

<script>
import RuleConditionsItem from '~/components/custom/RuleConditionsItem.vue'

export default {
  components: {
    RuleConditionsItem
  },
  props: {
    availableConditionFields: {
      type: Array,
      required: true
    },
    conditions: {
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
  created () {
    this.onAdd(null)
  },
  methods: {
    onAdd (type) {
      const item = {
        type,
        operand: '='
      }
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
