<template>
  <div class="z-100">
    <AisToggleRefinement
      :ref="attribute"
      :attribute="attribute"
      :label="label"
    >
      <div slot-scope="{ value, refine }">
        <div class="flex justify-between items-center">
          <input
            :id="attribute"
            :name="attribute"
            type="checkbox"
            :checked="value.isRefined"
            @change="onChange(refine, value)"
          >
          <label
            :for="attribute"
            class="w-full ml-2 relative flex items-center cursor-pointer"
            :class="[
              { 'text-gray-900 font-bold': value.isRefined },
              { 'text-gray-600': !value.isRefined },
            ]"
          >
            {{ label }}
            <span class="count text-gray-600 ml-auto">
              {{ value.count }}
            </span>
          </label>
        </div>
      </div>
    </AisToggleRefinement>
  </div>
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
  data () {
    return {}
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
