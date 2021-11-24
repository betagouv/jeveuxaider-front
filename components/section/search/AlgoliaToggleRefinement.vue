<template>
  <AisToggleRefinement
    :ref="attribute"
    :attribute="attribute"
    :label="label"
  >
    <div slot-scope="{ value, refine }">
      <div class="algolia-facet flex justify-between items-center">
        <input
          :id="attribute"
          :name="attribute"
          type="checkbox"
          :checked="value.isRefined"
          @change="onChange(refine, value)"
        >
        <label
          :for="attribute"
          :class="[{ 'is-refined': value.isRefined }]"
        >
          <span class="truncate">{{ label }}</span>
          <span class="count">
            {{ value.count }}
          </span>
        </label>
      </div>
    </div>
  </AisToggleRefinement>
</template>

<script>
import { AisToggleRefinement } from 'vue-instantsearch'

export default {
  components: {
    AisToggleRefinement
  },
  props: {
    attribute: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    showCount: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onChange (refine, value) {
      refine(value)
      this.$emit('toggle-facet', {
        active: !value.isRefined,
        name: this.attribute,
        value: !value.isRefined
      })
    }
  }
}
</script>
