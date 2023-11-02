<template>
  <ClientOnly>
    <v-date-picker
      ref="datePicker"
      v-model="date"
      :is-required="required"
      :model-config="modelConfig"
      :min-date="minDate"
      :attributes="attributes"
      @popoverWillShow="$emit('popoverWillShow', $refs.datePicker)"
    >
      <template #default="data">
        <div class="flex items-center relative w-full">
          <input
            class="px-6 py-3 text-sm appearance-none block w-full placeholder-gray-text-400 border border-gray-300 overflow-ellipsis"
            :value="data.inputValue"
            placeholder="jj/mm/aaaa"
            :aria-required="ariaRequired"
            :autocomplete="autocomplete || 'off'"
            v-on="data.inputEvents"
          />
          <div class="absolute right-4">
            <RiCalendarLine class="h-4 w-4 text-gray-400 fill-current" />
          </div>
        </div>
      </template>
    </v-date-picker>
  </ClientOnly>
</template>

<script>
export default defineNuxtComponent({
  emits: ['update:modelValue', 'popoverWillShow'],
  props: {
    modelValue: {
      type: [String, Date],
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    minDate: {
      type: Date,
      default: null,
    },
    attributes: {
      type: Array,
      default: null,
    },
    popoverWillShow: {
      type: Function,
      default: () => {},
    },
    ariaRequired: { type: String, default: null },
    autocomplete: { type: String, default: null },
  },
  data() {
    return {
      date: this.modelValue,
      modelConfig: {
        type: 'string',
        mask: 'YYYY-MM-DD',
      },
    }
  },
  watch: {
    date(val) {
      this.$emit('update:modelValue', val)
    },
  },
})
</script>
