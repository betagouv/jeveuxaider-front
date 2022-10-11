<template>
  <div class="relative flex items-start">
    <template v-if="variant == 'checkbox'">
      <div class="flex items-center h-5">
        <input
          :id="option.key"
          :aria-describedby="`${option.key}-description`"
          :name="option.key"
          type="checkbox"
          class="focus:ring-jva-blue-500 h-4 w-4 text-jva-blue-500 border border-gray-500 rounded"
          :checked="checked"
          @change="toggleChecked()"
        >
      </div>
      <div class="ml-3 text-sm">
        <label :for="option.key" class="font-medium text-gray-700">{{ option.label }}</label>
        <p v-if="option.description" :id="`${option.key}-description`" class="text-gray-500">
          {{ option.description }}
        </p>
      </div>
    </template>
    <template v-if="variant == 'button'">
      <div :class="['bg-white hover:scale-105 transition', {'bg-transparent': transparent}, {'!bg-white': checked} ]">
        <input
          :id="option.key"
          :aria-describedby="`${option.key}-description`"
          :name="option.key"
          type="checkbox"
          class="focus:ring-jva-blue-500 h-4 w-4 text-jva-blue-700 border border-gray-300 rounded sr-only"
          :checked="checked"
          tabindex="-1"
          @click="toggleChecked()"
        >
        <label
          :for="option.key"
          class="cursor-pointer text-sm border rounded-xl inline-flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jva-blue-500"
          :class="[checked ? 'text-jva-blue-500 border-jva-blue-500 font-bold' : 'text-gray-600 border-gray-300',
                   {
                     'px-2 py-1': size == 'xs',
                     'px-2.5 py-1.5': size == 'md',
                   },
          ]"

          tabindex="0"
          @keypress.space.prevent="toggleChecked()"
        >{{ option.label }}</label>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    option: { type: Object, required: true },
    isChecked: { type: Boolean, default: false },
    transparent: { type: Boolean, default: false },
    size: {
      type: String,
      default: 'md',
      validator: s => ['xs', 'md'].includes(s)
    },
    variant: {
      type: String,
      default: 'checkbox',
      validator: s =>
        ['checkbox', 'button'].includes(s)
    }
  },
  data () {
    return {
      checked: this.isChecked
    }
  },
  watch: {
    isChecked (newVal) {
      this.checked = newVal
    }
  },
  methods: {
    toggleChecked () {
      this.checked = !this.checked
      this.$emit('change', this.option.key)
    }
  }
}
</script>
