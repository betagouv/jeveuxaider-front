<template>
  <div>
    <template v-if="items && items.length">
      <div
        v-for="(item, index) in items"
        :key="item.uuid || item.id"
        class="bg-gray-50 py-4 px-4 mb-4"
      >
        <ParagraphItem
          :schema="schema"
          :item="item"
          @update="onUpdate($event, index)"
          @remove="onRemove(index)"
        />
      </div>
    </template>

    <div v-else class="bg-gray-50 py-4 px-4 mb-4 text-gray-500 text-sm">
      Aucune entrée
    </div>

    <div class="flex justify-end">
      <Button variant="white" @click.native="onAdd">
        Ajouter une entrée
      </Button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    schema: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    onAdd () {
      const item = {}
      this.schema.forEach((field) => {
        item[field.key] = null
      })
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
